using System.Reflection;

namespace Pulse.UI.Core;

internal class UIEmbeddedResourcesReader : IUIResourcesReader
{
    private readonly Assembly _assembly;

    public UIEmbeddedResourcesReader(Assembly assembly)
    {
        _assembly = Guard.ThrowIfNull(assembly);
    }

    public IEnumerable<UIResource> UIResources
    {
        get
        {
            var embeddedResources = _assembly.GetManifestResourceNames();
            return ParseEmbeddedResources(embeddedResources);
        }
    }

    private IEnumerable<UIResource> ParseEmbeddedResources(string[] embeddedFiles)
    {
        const char SPLIT_SEPARATOR = '.';

        var resourceList = new List<UIResource>();

        foreach (var file in embeddedFiles)
        {
            var segments = file.Split(SPLIT_SEPARATOR);
            var fileName = segments[segments.Length - 2];
            var extension = segments[segments.Length - 1];
            var fileAssetName = file.Replace("Pulse.UI.assets.", "");
            int lastDotIndex = fileAssetName.LastIndexOf('.');
            string pathLikeString = fileAssetName.Substring(0, lastDotIndex).Replace('.', '/').Replace(fileName, "");

            using var contentStream = _assembly.GetManifestResourceStream(file)!;
            using var reader = new StreamReader(contentStream);

            string result = reader.ReadToEnd();

            resourceList.Add(
                UIResource.Create($"{fileName}.{extension}", result,
                ContentType.FromExtension(extension), pathLikeString));
        }

        return resourceList;
    }
}
