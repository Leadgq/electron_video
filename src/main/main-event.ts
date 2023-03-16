import { BrowserWindow, dialog, ipcMain } from 'electron'
import { defaultHeight, defaultWidth } from './window-config'

ipcMain.on('changeWindowSize', (_, args) => {
  const { width, height } = args
  const mainWindow = BrowserWindow.getFocusedWindow()
  if (mainWindow) {
    mainWindow.setSize(width, height)
    mainWindow.center()
  }
})

ipcMain.on('resetWindowSize', () => {
  // 重置窗口大小
  const mainWindow = BrowserWindow.getFocusedWindow()
  if (mainWindow) {
    mainWindow.setSize(defaultWidth, defaultHeight)
    mainWindow.center()
  }
})

ipcMain.handle('uploadFile', async () => {
  return await dialog.showOpenDialog({
    title: '请上传视频',
    properties: ['openFile', 'multiSelections'],
    filters: [{ name: 'Movies', extensions: ['mkv', 'avi', 'mp4', 'mov'] }]
  })
})

ipcMain.on('showMessage', async (_, args) => {
  const { message, type } = args
  await dialog.showMessageBox({
    type,
    message
  })
})
