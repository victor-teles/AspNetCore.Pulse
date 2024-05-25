namespace Pulse.UI.Core;

internal class UIResource
{
    public string Content { get; internal set; }
    public string ContentType { get; }
    public string FileName { get; }
    public string FilePath { get; }

    private UIResource(string fileName, string content, string contentType, string filePath)
    {
        Content = Guard.ThrowIfNull(content);
        ContentType = Guard.ThrowIfNull(contentType);
        FileName = Guard.ThrowIfNull(fileName);
        FilePath = Guard.ThrowIfNull(filePath);
    }

    public static UIResource Create(string fileName, string content, string contentType, string filePath)
    {
        return new UIResource(fileName, content, contentType, filePath);
    }
}
