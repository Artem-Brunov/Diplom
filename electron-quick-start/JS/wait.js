const { ipcRenderer } = require('electron')
ipcRenderer.send('wait', "aaa")
  
