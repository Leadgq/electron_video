export const getFileName = (filename: string): string => {
  const file = filename.split('\\').pop()
  let name
  if (file) name = file.split('.').shift()
  return name
}

// 获取文件后缀
export const getFileSuffix = (filename: string): string => {
  const file = filename.split('\\').pop()
  let suffix
  if (file) suffix = file.split('.').pop()
  return suffix
}
