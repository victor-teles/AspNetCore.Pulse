using System.Net;

namespace Pulse.Milvus.Tests.Functional;

public class milvus_healthcheck_should
{
    [Fact]
    public async Task be_healthy_if_milvus_is_available_with_default_connection()
    {
        var webHostBuilder = new WebHostBuilder()
         .ConfigureServices(services =>
         {
             services.AddHealthChecks()
              .AddMilvus(tags: ["milvus"]);
         })
         .Configure(app =>
         {
             app.UseHealthChecks("/health", new HealthCheckOptions
             {
                 Predicate = r => r.Tags.Contains("milvus")
             });
         });

        using var server = new TestServer(webHostBuilder);

        using var response = await server.CreateRequest("/health").GetAsync();

        response.StatusCode.ShouldBe(HttpStatusCode.OK);
    }

    [Fact]
    public async Task be_healthy_if_multiple_milvus_is_available_with_default_connection()
    {
        var webHostBuilder = new WebHostBuilder()
         .ConfigureServices(services =>
         {
             services.AddHealthChecks()
              .AddMilvus(tags: ["milvus"], name: "1")
              .AddMilvus(tags: ["milvus"], name: "2");
         })
         .Configure(app =>
         {
             app.UseHealthChecks("/health", new HealthCheckOptions
             {
                 Predicate = r => r.Tags.Contains("milvus")
             });
         });

        using var server = new TestServer(webHostBuilder);

        using var response = await server.CreateRequest("/health").GetAsync();

        response.StatusCode.ShouldBe(HttpStatusCode.OK);
    }


    [Fact]
    public async Task be_unhealthy_if_milvus_is_not_available()
    {
        var webHostBuilder = new WebHostBuilder()
         .ConfigureServices(services =>
         {
             services.AddHealthChecks()
              .AddMilvus(new MilvusHealthCheckOptions
              {
                  Host = "nonexistinghost"
              }, tags: new string[] { "milvus" });
         })
         .Configure(app =>
         {
             app.UseHealthChecks("/health", new HealthCheckOptions
             {
                 Predicate = r => r.Tags.Contains("milvus")
             });
         });

        using var server = new TestServer(webHostBuilder);

        using var response = await server.CreateRequest("/health").GetAsync();

        response.StatusCode.ShouldBe(HttpStatusCode.ServiceUnavailable);
    }
}
