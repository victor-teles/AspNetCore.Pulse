using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.AspNetCore.Http;
using Pulse.Prometheus.Metrics;

namespace Microsoft.AspNetCore.Builder;

public static class PrometheusHealthCheckMiddleware
{
    public static IApplicationBuilder UseHealthChecksPrometheusExporter(this IApplicationBuilder applicationBuilder, PathString endpoint)
    {
        return applicationBuilder.UseHealthChecksPrometheusExporter(endpoint, configure: null);
    }

    public static IApplicationBuilder UseHealthChecksPrometheusExporter(this IApplicationBuilder applicationBuilder, PathString endpoint, Action<HealthCheckOptions>? configure)
    {
        var options = new HealthCheckOptions
        {
            ResponseWriter = PrometheusResponseWriter.WritePrometheusResultText
        };
        configure?.Invoke(options);

        applicationBuilder.UseHealthChecks(endpoint, options);
        return applicationBuilder;
    }
}
