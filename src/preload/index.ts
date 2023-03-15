import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import fs from 'fs'
import { fileType } from '../type/index'
import { getFileName, getFileSuffix } from './help'

const fileList: fileType[] = []

// Custom APIs for renderer
const api = {
  changeWindowSize: (width: number, height: number): void => {
    ipcRenderer.send('changeWindowSize', { width, height })
  },
  resetWindowSize: () => {
    ipcRenderer.send('resetWindowSize')
  },
  uploadFile: async () => {
    const result = await ipcRenderer.invoke('uploadFile')
    if (result.filePaths && result.filePaths.length !== 0) {
      result.filePaths.forEach((file) => {
        const buffer = fs.readFileSync(file)
        const fleSuffix = getFileSuffix(file)
        const blob = bufferToBlob(buffer, fleSuffix)
        const blobUrl = URL.createObjectURL(blob)
        fileList.push({
          name: getFileName(file),
          blob: blobUrl
        })
      })
    }
    return fileList
  }
}

const bufferToBlob = (buffer: Buffer, fleSuffix: string) => {
  return new Blob([buffer], { type: `video/${fleSuffix}` })
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
