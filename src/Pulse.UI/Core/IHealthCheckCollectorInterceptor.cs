using Pulse.UI.Data;

namespace Pulse.UI.Core;

public interface IHealthCheckCollectorInterceptor
{
    ValueTask OnCollectExecuting(HealthCheckConfiguration healthCheck);
    ValueTask OnCollectExecuted(UIHealthReport report);
}
