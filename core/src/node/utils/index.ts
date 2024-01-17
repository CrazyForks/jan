import { AppConfiguration } from '../../types'
import { join } from 'path'
import fs from 'fs'
import os from 'os'

/**
 * Getting App path. This is the path where the app is installed.
 *
 * @returns {string} The app path.
 */
export const getAppPath = (): string => {
  let applicationPath: string | undefined = undefined
  if (os.platform() === 'darwin') {
    applicationPath = join(os.homedir(), 'Library', 'Application Support', 'jan')
  } else if (os.platform() === 'win32') {
    // TODO: implement this
  } else if (os.platform() === 'linux') {
    // TODO: implement this
  }

  if (applicationPath == null) {
    throw new Error(`Unsupported platform ${os.platform()}`)
  }

  return applicationPath
}

// TODO: move this to core
const configurationFileName = 'settings.json'
const defaultJanDataFolder = join(os.homedir(), 'jan')
const defaultAppConfig: AppConfiguration = {
  data_folder: defaultJanDataFolder,
}

/**
 * Getting App Configurations.
 *
 * @returns {AppConfiguration} The app configurations.
 */
export const getAppConfigurations = (): AppConfiguration => {
  const isDev = true
  let configurationFile = ''
  if (isDev) {
    // TODO: need to handle this for extensions
    configurationFile = '/Users/james/workspace/sources/jan/electron/settings.json'
    //join(__dirname, '..', '..', '..', 'electron', 'settings.json')
    console.log(`configurationFile123: ${configurationFile}`)
  } else {
    configurationFile = join(getAppPath(), configurationFileName)
  }
  // console.log('NamH getAppConfigurations configurationFile: ', configurationFile)

  if (!fs.existsSync(configurationFile)) {
    // create default app config if we don't have one
    console.debug(`App config not found, creating default config at ${configurationFile}`)
    fs.writeFileSync(configurationFile, JSON.stringify(defaultAppConfig))
    return defaultAppConfig
  }

  try {
    const appConfigurations: AppConfiguration = JSON.parse(
      fs.readFileSync(configurationFile, 'utf-8'),
    )
    return appConfigurations
  } catch (err) {
    console.error(`Failed to read app config, return default config instead! Err: ${err}`)
    return defaultAppConfig
  }
}

/**
 * Utility function to get server log path
 *
 * @returns {string} The log path.
 */
export const getServerLogPath = (): string => {
  const appConfigurations = getAppConfigurations()
  const logFolderPath = join(appConfigurations.data_folder, 'logs')
  if (!fs.existsSync(logFolderPath)) {
    fs.mkdirSync(logFolderPath, { recursive: true })
  }
  return join(logFolderPath, 'server.log')
}

/**
 * Utility function to get app log path
 *
 * @returns {string} The log path.
 */
export const getAppLogPath = (): string => {
  const appConfigurations = getAppConfigurations()
  const logFolderPath = join(appConfigurations.data_folder, 'logs')
  if (!fs.existsSync(logFolderPath)) {
    fs.mkdirSync(logFolderPath, { recursive: true })
  }
  return join(logFolderPath, 'app.log')
}

/**
 * Utility function to get data folder path
 *
 * @returns {string} The data folder path.
 */
export const getJanDataFolderPath = (): string => {
  const appConfigurations = getAppConfigurations()
  return appConfigurations.data_folder
}

/**
 * Utility function to get extension path
 *
 * @returns {string} The extensions path.
 */
export const getJanExtensionsPath = (): string => {
  const appConfigurations = getAppConfigurations()
  return join(appConfigurations.data_folder, 'extensions')
}
