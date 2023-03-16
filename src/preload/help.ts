const platform = process.platform
const reg = platform === 'win32' ? '\\' : '/'

export const getFileName = (filename: string): string => {
  const file = filename.split(reg).pop()
  let name
  if (file) name = file.split('.').shift()
  return name
}

// 获取文件后缀
export const getFileSuffix = (filename: string): string => {
  const file = filename.split(reg).pop()
  let suffix
  if (file) suffix = file.split('.').pop()
  return suffix
}

export const bufferToBlob = (buffer: Buffer, fleSuffix: string) => {
  return new Blob([buffer], { type: `video/${fleSuffix}` })
}
