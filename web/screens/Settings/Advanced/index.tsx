/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useContext, useEffect, useState } from 'react'

import { fs, getResourcePath, joinPath, AppConfiguration } from '@janhq/core'
import { Switch, Button } from '@janhq/uikit'

import { atom, useAtom } from 'jotai'

import ShortcutModal from '@/containers/ShortcutModal'
import { toaster } from '@/containers/Toast'

import { FeatureToggleContext } from '@/context/FeatureToggle'

import { useSettings } from '@/hooks/useSettings'

const serverEnabledAtom = atom<boolean>(false)

const Advanced = () => {
  const { experimentalFeatureEnabed, setExperimentalFeatureEnabled } =
    useContext(FeatureToggleContext)
  const [gpuEnabled, setGpuEnabled] = useState<boolean>(false)
  const [serverEnabled, setServerEnabled] = useAtom(serverEnabledAtom)
  const { readSettings, saveSettings, validateSettings, setShowNotification } =
    useSettings()

  useEffect(() => {
    readSettings().then((settings) => {
      setGpuEnabled(settings.run_mode === 'gpu')
    })
  }, [])

  const clearLogs = async () => {
    if (await fs.existsSync(`file://logs`)) {
      await fs.rmdirSync(`file://logs`, { recursive: true })
    }
    toaster({
      title: 'Logs cleared',
      description: 'All logs have been cleared.',
    })
  }

  const onJanVaultDirectoryClick = async () => {
    const destination = await window.myAPI.selectFolder()
    if (destination) {
      console.log(`NamH vault selected: ${destination}`)

      const fileSettingPath = await joinPath([
        await getResourcePath(),
        'settings.json',
      ])
      console.log(`NamH settingFilePath ${fileSettingPath}`)
      // if (!(await fs.existsSync(fileSettingPath))) {
      //   const defaultSettings: AppConfiguration = {
      //     data_folder: destination,
      //   }
      //   await fs.writeFileSync(fileSettingPath, JSON.stringify(defaultSettings))
      // }

      // update settings.json
      const settings = await fs.readFileSync(fileSettingPath, 'utf-8')
      const appConfiguration: AppConfiguration = JSON.parse(settings)
      const source = appConfiguration.data_folder
      appConfiguration.data_folder = destination
      await startSyncFiles(source, destination)
      await fs.writeFileSync(fileSettingPath, JSON.stringify(appConfiguration))
    }
  }

  const startSyncFiles = async (source: string, dest: string) => {
    try {
      await fs.syncFile(source, dest)
      console.debug(`File sync finished from ${source} to ${dest}`)
    } catch (e) {
      console.error(`File sync error: ${e}`)
    }
  }

  return (
    <div className="block w-full">
      {/* CPU / GPU switching */}
      {!isMac && (
        <div className="flex w-full items-start justify-between border-b border-border py-4 first:pt-0 last:border-none">
          <div className="w-4/5 flex-shrink-0 space-y-1.5">
            <div className="flex gap-x-2">
              <h6 className="text-sm font-semibold capitalize">NVidia GPU</h6>
            </div>
            <p className="whitespace-pre-wrap leading-relaxed">
              Enable GPU acceleration for NVidia GPUs.
            </p>
          </div>
          <Switch
            checked={gpuEnabled}
            onCheckedChange={(e: boolean) => {
              if (e === true) {
                saveSettings({ runMode: 'gpu' })
                setGpuEnabled(true)
                setShowNotification(false)
                setTimeout(() => {
                  validateSettings()
                }, 300)
              } else {
                saveSettings({ runMode: 'cpu' })
                setGpuEnabled(false)
              }
            }}
          />
        </div>
      )}
      {/* Experimental */}
      <div className="flex w-full items-start justify-between border-b border-border py-4 first:pt-0 last:border-none">
        <div className="w-4/5 flex-shrink-0 space-y-1.5">
          <div className="flex gap-x-2">
            <h6 className="text-sm font-semibold capitalize">
              Experimental Mode
            </h6>
          </div>
          <p className="whitespace-pre-wrap leading-relaxed">
            Enable experimental features that may be unstable tested.
          </p>
        </div>
        <Switch
          checked={experimentalFeatureEnabed}
          onCheckedChange={(e) => {
            if (e === true) {
              setExperimentalFeatureEnabled(true)
            } else {
              setExperimentalFeatureEnabled(false)
            }
          }}
        />
      </div>
      {/* Server */}
      <div className="flex w-full items-start justify-between border-b border-border py-4 first:pt-0 last:border-none">
        <div className="w-4/5 flex-shrink-0 space-y-1.5">
          <div className="flex gap-x-2">
            <h6 className="text-sm font-semibold capitalize">
              Enable API Server
            </h6>
          </div>
          <p className="whitespace-pre-wrap leading-relaxed">
            Enable API server for Jan app.
          </p>
        </div>
        <Switch
          checked={serverEnabled}
          onCheckedChange={(e: boolean) => {
            if (e === true) {
              window.core?.api?.startServer()
            } else {
              window.core?.api?.stopServer()
            }
            setServerEnabled(e)
          }}
        />
      </div>
      {window.electronAPI && (
        <div className="flex w-full items-start justify-between border-b border-border py-4 first:pt-0 last:border-none">
          <div className="w-4/5 flex-shrink-0 space-y-1.5">
            <div className="flex gap-x-2">
              <h6 className="text-sm font-semibold capitalize">
                Open App Directory
              </h6>
            </div>
            <p className="whitespace-pre-wrap leading-relaxed">
              Open the directory where your app data, like conversation history
              and model configurations, is located.
            </p>
          </div>
          <Button
            size="sm"
            themes="secondary"
            onClick={() => window.electronAPI.openAppDirectory()}
          >
            Open
          </Button>
        </div>
      )}
      <div className="flex w-full items-start justify-between border-b border-border py-4 first:pt-0 last:border-none">
        <div className="w-4/5 flex-shrink-0 space-y-1.5">
          <div className="flex gap-x-2">
            <h6 className="text-sm font-semibold capitalize">Clear logs</h6>
          </div>
          <p className="whitespace-pre-wrap leading-relaxed">
            Clear all logs from Jan app.
          </p>
        </div>
        <Button size="sm" themes="secondary" onClick={clearLogs}>
          Clear
        </Button>
      </div>
      <div className="flex w-full items-start justify-between border-b border-border py-4 first:pt-0 last:border-none">
        <div className="w-4/5 flex-shrink-0 space-y-1.5">
          <div className="flex gap-x-2">
            <h6 className="text-sm font-semibold capitalize">
              Select Directory
            </h6>
          </div>
          <p className="whitespace-pre-wrap leading-relaxed">
            Select Jan&apos;s vault directory
          </p>
        </div>
        <Button size="sm" themes="secondary" onClick={onJanVaultDirectoryClick}>
          Select
        </Button>
      </div>
      <div className="flex w-full items-start justify-between border-b border-border py-4 first:pt-0 last:border-none">
        <div className="w-4/5 flex-shrink-0 space-y-1.5">
          <div className="flex gap-x-2">
            <h6 className="text-sm font-semibold capitalize">
              Keyboard Shortcuts
            </h6>
          </div>
          <p className="whitespace-pre-wrap leading-relaxed">
            Shortcuts that you might find useful in Jan app.
          </p>
        </div>
        <ShortcutModal />
      </div>
    </div>
  )
}

export default Advanced
