const { app, BrowserWindow , ipcMain , Notification} = require('electron')
const path = require("path")
const url = require("url")
const process = require("child_process");
app.allowRendererProcessReuse = false
function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(createWindow)

app.on('ready',() => {
    process.execSync("find . -name '.DS_Store' -type f -delete");
    ipcMain.on('fail',(err,data) => {
        const notification = {
          title: 'Basic Notification',
          body: 'Kişi Bulunamadı'
      }
      new Notification(notification).show()
    })

    ipcMain.on('ok',(err,data) => {
        if(data == "unknow"){
          data = "Bilinmeyen Kullanıcı";
        }else{
          data = data + ' işleminiz alınmıştır'
        }
        const notification = {
          title: 'Basic Notification',
          body: data
      }
      new Notification(notification).show()
    })
    
})


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})