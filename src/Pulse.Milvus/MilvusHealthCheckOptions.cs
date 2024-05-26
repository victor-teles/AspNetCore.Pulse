namespace Pulse.Milvus;

/// <summary>
/// Options for <see cref="MilvusHealthCheck"/>.
/// </summary>
public class MilvusHealthCheckOptions
{
    /// <summary>
    /// The Milvus host name
    /// </summary>
    public string Host { get; set; } = "localhost";

    /// <summary>
    /// The Milvus port
    /// </summary>
    public int Port { get; set; } = 19530;

    /// <summary>
    /// The Milvus username
    /// </summary>
    public string Username { get; set; } = "";

    /// <summary>
    /// The Milvus password
    /// </summary>
    public string Password { get; set; } = "";
}
