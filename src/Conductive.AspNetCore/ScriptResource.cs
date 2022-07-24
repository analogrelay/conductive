using System.Diagnostics;

namespace Conductive.AspNetCore;

static class ScriptResource
{
    static readonly Task<string> _script = LoadScriptAsync();

    public static Task<string> GetScriptAsync() => _script;

    static async Task<string> LoadScriptAsync()
    {
        await using var stream = typeof(ScriptResource).Assembly.GetManifestResourceStream("Conductive.AspNetCore.conductive.js");
        using var reader = new StreamReader(stream ?? throw new UnreachableException());
        return await reader.ReadToEndAsync();
    }
}
