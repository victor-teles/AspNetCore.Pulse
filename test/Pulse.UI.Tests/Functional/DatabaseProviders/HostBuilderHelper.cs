using Microsoft.Extensions.Hosting;
using Pulse.UI.Client;
using Pulse.UI.Core;

namespace Pulse.UI.Tests;

public class HostBuilderHelper
{
    public static IWebHostBuilder Create(ManualResetEventSlim hostReset, ManualResetEventSlim? collectorReset = null, Action<HealthChecksUIBuilder>? configureUI = null)
    {
        return new WebHostBuilder()
           .ConfigureServices(services =>
           {
               var builder = services
               .AddRouting()
               .AddHealthChecks()
               .AddCheck("check1", () => HealthCheckResult.Healthy())
               .Services
               .AddHealthChecksUI(setup => setup.AddHealthCheckEndpoint(ProviderTestHelper.Endpoints[0].Name, ProviderTestHelper.Endpoints[0].Uri));

               configureUI?.Invoke(builder);

               if (collectorReset != null)
               {
                   services.AddTransient<IHealthCheckCollectorInterceptor>(sp => new TestCollectorInterceptor(collectorReset));
               }
           }).Configure(app =>
           {
               app
               .UseRouting()
               .UseEndpoints(endpoints =>
               {
                   endpoints.MapHealthChecks("/health", new HealthCheckOptions
                   {
                       Predicate = r => true,
                       ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse
                   });
                   endpoints.MapHealthChecksUI();
               });

               var lifetime = app.ApplicationServices.GetRequiredService<IHostApplicationLifetime>();
               lifetime.ApplicationStarted.Register(() => hostReset.Set());
           });
    }
}
