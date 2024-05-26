using Microsoft.Extensions.Diagnostics.HealthChecks;
using Pulse.Milvus;

namespace Microsoft.Extensions.DependencyInjection;

/// <summary>
/// Extension methods to configure <see cref="MilvusHealthCheck"/>.
/// </summary>
public static class MilvusHealthCheckBuilderExtensions
{
    private const string NAME = "milvus";

    /// <summary>
    /// Add a health check for Milvus database.
    /// </summary>
    /// <param name="builder">The <see cref="IHealthChecksBuilder"/>.</param>
    /// <param name="options">Options to configure Milvus health check.</param>
    /// <param name="name">The health check name. Optional. If <c>null</c> the type name 'milvus' will be used for the name.</param>
    /// <param name="failureStatus">
    /// The <see cref="HealthStatus"/> that should be reported when the health check fails. Optional. If <c>null</c> then
    /// the default status of <see cref="HealthStatus.Unhealthy"/> will be reported.
    /// </param>
    /// <param name="tags">A list of tags that can be used to filter sets of health checks. Optional.</param>
    /// <param name="timeout">An optional <see cref="TimeSpan"/> representing the timeout of the check.</param>
    /// <returns>The specified <paramref name="builder"/>.</returns>
    public static IHealthChecksBuilder AddMilvus(
        this IHealthChecksBuilder builder,
       MilvusHealthCheckOptions? options = default,
        string? name = default,
        HealthStatus? failureStatus = default,
        IEnumerable<string>? tags = default,
        TimeSpan? timeout = default)
    {
        options ??= new MilvusHealthCheckOptions();
        _ = builder.Services.AddSingleton(_ => new MilvusHealthCheck(options));

        return builder.Add(new HealthCheckRegistration(
            name ?? NAME,
            sp => sp.GetRequiredService<MilvusHealthCheck>(),
            failureStatus,
            tags,
            timeout));
    }
}
