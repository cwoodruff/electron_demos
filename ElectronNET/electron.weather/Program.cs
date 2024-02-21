using electron.weather;
using ElectronNET.API;
using ElectronNET.API.Entities;

var builder = WebApplication.CreateBuilder(args);
builder.WebHost.UseElectron(args);
builder.Services.AddElectron();

// Add services to the container.

builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

await app.StartAsync();

InfoDialogListener.SetupInfoDialogListener();

var browserWindow = await Electron.WindowManager.CreateWindowAsync(new BrowserWindowOptions
{
    Width = 1000,
    Height = 600,
    Show = false,
});

await browserWindow.WebContents.Session.ClearCacheAsync();

browserWindow.OnReadyToShow += () => browserWindow.Show();

app.WaitForShutdown();
