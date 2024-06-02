import { existsSync, readFileSync, statSync } from 'fs'
import { basename, extname } from 'path'

export const isFile = (filePath) => existsSync(filePath) && statSync(filePath).isFile()

export const fileContents = (pathOrContents) => {
    if (isFile(pathOrContents)) {
        return readFileSync(pathOrContents, 'utf8').toString()
    }
    return pathOrContents
}

const extractProjectSdks = (content) => {
  return [...content.matchAll(/<Project(?:\s+[a-zA-Z0-9\-_]+=\".*?\")*\s+Sdk="(.+?)"(\s|>)/g)]
      .flatMap(ref => ref[1].split(';'))
      .sort()
}

const extractPackageRefs = (content) => {
  return [...content.matchAll(/<PackageReference Include="(.+?)" Version="(.+?)"/g)]
      .map(ref => ({ name: ref[1], version: ref[2] }))
      .sort((a, b) => a.name.localeCompare(b.name))
}

const extractExtrasRefs = (content) => {
  return [...content.matchAll(/<([A-Za-z][A-Za-z0-9]*)[^>]*>(.*?)<\/([A-Za-z][A-Za-z0-9]*)>/g)]
      .map(ref => ({ name: ref[1], value: ref[2] }))
      .sort((a, b) => a.name.localeCompare(b.name))
}

const parseProjectFileContent = (filePath, content) => {
  return {
      name: basename(filePath, extname(filePath)),
      path: filePath,
      type: '',
      guid: '',
      sdks: extractProjectSdks(content),
      dependencies: extractPackageRefs(content),
      extras: extractExtrasRefs(content)
  }
}

export const supportedProjectFileExtensions = ['.csproj', '.fsproj', '.vbproj', '.vcxproj']

export const parseCsproj = (pathOrContents) => {
  const projectFilePath = isFile(pathOrContents) ? pathOrContents : ''
  if (projectFilePath !== '' && !supportedProjectFileExtensions.includes(extname(projectFilePath))) throw new Error(`Not a valid Visual Studio project file name: ${projectFilePath}`)
  const content = fileContents(pathOrContents)
  return parseProjectFileContent(projectFilePath, content)
}

export const extractPropValue = (content, tagName) => {
  const regex = new RegExp(`<${tagName}>(.*?)<\/${tagName}>`, 'g')
  return  [...content.matchAll(regex)]
  .map(ref => (ref[1]))
  .at(0)
}
