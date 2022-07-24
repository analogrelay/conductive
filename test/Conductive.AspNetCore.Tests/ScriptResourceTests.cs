namespace Conductive.AspNetCore.Tests;

public class ScriptResourceTests
{
    [Fact]
    public async Task ScriptIsEmbedded()
    {
        var str = await ScriptResource.GetScriptAsync();
        Assert.NotNull(str);
        Assert.NotEmpty(str);
    }
}