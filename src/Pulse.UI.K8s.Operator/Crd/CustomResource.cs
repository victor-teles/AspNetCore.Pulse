using k8s;
using k8s.Models;

namespace Pulse.UI.K8s.Operator.Crd;

public abstract class CustomResource<TSpec, TStatus> : CustomResource
{
    public TSpec Spec { get; set; } = default!;

    public TStatus? Status { get; set; }
}

public abstract class CustomResource : KubernetesObject
{
    public V1ObjectMeta Metadata { get; set; } = null!;
}
