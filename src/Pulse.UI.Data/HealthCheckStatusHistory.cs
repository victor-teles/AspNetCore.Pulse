using Pulse.UI.Core;

namespace Pulse.UI.Data;

public class HealthCheckExecutionHistory
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public UIHealthStatus Status { get; set; }

    public DateTime On { get; set; }
}
