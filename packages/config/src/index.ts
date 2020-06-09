import pkgDir from 'pkg-dir'
import {join} from 'path'
import {existsSync} from 'fs'

const configFiles = ['blitz.config.js', 'next.config.js']
/**
 * @param {boolean | undefined} reload - reimport config files to reset global cache
 */
export const getConfig = async (reload?: boolean): Promise<Record<string, unknown>> => {
  if (Object.keys(global.config).length > 0 && !reload) {
    return global.config
  }

  let config = {}
  const projectRoot = (await pkgDir()) || process.cwd()

  for (const configFile of configFiles) {
    if (existsSync(join(projectRoot, configFile))) {
      const file = require(join(projectRoot, configFile))
      config = {...config, ...file}
    }
  }

  global.config = config

  return config
}