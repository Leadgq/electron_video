export const getFileName = (filename: string): string => {
  const file = filename.split('\\').pop()
  let name
  if (file) name = file.split('.').shift()
  return name
}
