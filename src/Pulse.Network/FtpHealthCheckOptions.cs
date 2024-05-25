using System.Net;

namespace Pulse.Network;

public class FtpHealthCheckOptions
{
    internal Dictionary<string, (string host, bool createFile, NetworkCredential? credentials)> Hosts { get; } = new();

    public FtpHealthCheckOptions AddHost(string host, bool createFile = false, NetworkCredential? credentials = null)
    {
        Hosts.Add(host, (host, createFile, credentials));

        return this;
    }

    public FtpHealthCheckOptions WithCheckAllHosts()
    {
        CheckAllHosts = true;
        return this;
    }

    public bool CheckAllHosts { get; set; }
}
