using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Pulse.UI.Configuration;

namespace Pulse.UI.Middleware;

internal class UISettingsMiddleware
{
    private readonly object _uiOutputSettings;

    public UISettingsMiddleware(RequestDelegate next, IOptions<Settings> settings)
    {
        _ = next;
        _ = Guard.ThrowIfNull(settings);
        _uiOutputSettings = new
        {
            pollingInterval = settings.Value.EvaluationTimeInSeconds,
            headerText = settings.Value.HeaderText
        };
    }

    public Task InvokeAsync(HttpContext context) => context.Response.WriteAsJsonAsync(_uiOutputSettings);
}
