using Microsoft.Extensions.Diagnostics.HealthChecks;
using Milvus.Client;

namespace Pulse.Milvus;

/// <summary>
/// A health check for Milvus database.
/// </summary>
public class MilvusHealthCheck(MilvusHealthCheckOptions options) : IHealthCheck
{
    private readonly MilvusClient _client = new(options.Host, options.Username, options.Password, options.Port);

    /// <inheritdoc />
    public async Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken = default)
    {
        try
        {
            var healthResult = await _client.HealthAsync(cancellationToken).ConfigureAwait(false);

            return !healthResult.IsHealthy
                ? new HealthCheckResult(context.Registration.FailureStatus, description: healthResult.ToString())
                : HealthCheckResult.Healthy();
        }
        catch (Exception ex)
        {
            return new HealthCheckResult(context.Registration.FailureStatus, exception: ex);
        }
    }
}
