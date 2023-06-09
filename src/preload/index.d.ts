import { ElectronAPI } from '@electron-toolkit/preload'
import { fileType } from '../type'
declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      changeWindowSize: (width: number, height: number) => void
      resetWindowSize: () => void
      uploadFile: () => fileType[]
      removeFile: (index: number) => void
      showMessage:(message: string,type:string) => void
    }
  }
}
