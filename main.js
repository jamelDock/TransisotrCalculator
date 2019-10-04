const { app, BrowserWindow } = require('electron')

function createWindow(){
    let window = new BrowserWindow({
        width: 800,
        height: 600
    })
    window.loadFile(__dirname + '/front/index.html')
    window.on('closed', function(){
        window = null
    })
    window.setMenuBarVisibility(false)
}

app.on('ready', createWindow)