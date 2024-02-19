using ElectronNET.API;
using ElectronNET.API.Entities;

static class InfoDialogListener
{
    public static void SetupInfoDialogListener()
    {
        Electron.IpcMain.On("information-dialog", async (args) =>
        {
            var options = new MessageBoxOptions("This is an information dialog. Isn't it nice?")
            {
                Type = MessageBoxType.info,
                Title = "Information",
                Buttons = new string[] { "Yes", "No" }
            };

            var result = await Electron.Dialog.ShowMessageBoxAsync(options);

            var mainWindow = Electron.WindowManager.BrowserWindows.First();
            Electron.IpcMain.Send(mainWindow, "information-dialog-reply", result.Response);
        });
    }
}