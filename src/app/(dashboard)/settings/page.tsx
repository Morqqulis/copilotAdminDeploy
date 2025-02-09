'use client'

import { useState, useEffect } from 'react'
import { Tab } from '@headlessui/react'
import { Cog6ToothIcon, GlobeAltIcon, BellIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'
import CopyButton from '@/components/ui/CopyButton'
import { configureApi } from '@/lib/api'
import { Settings as SettingsType } from '@/lib/types'

interface AppSettings {
  general: {
    siteName: string;
    timezone: string;
    dateFormat: string;
    timeFormat: string;
  };
  api: {
    apiKey: string;
    webhookUrl: string;
  };
  notifications: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    dailyReports: boolean;
  };
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<AppSettings>({
    general: {
      siteName: 'RadioCopilot',
      timezone: 'UTC',
      dateFormat: 'MM/DD/YYYY',
      timeFormat: '24h',
    },
    api: {
      apiKey: '',
      webhookUrl: '',
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: false,
      dailyReports: true,
    },
  })

  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [saveSuccess, setSaveSuccess] = useState(false)

  useEffect(() => {
    if (settings.api.apiKey) {
      configureApi({ apiKey: settings.api.apiKey })
    }
  }, [settings.api.apiKey])

  const handleGenerateApiKey = async () => {
    try {
      const response = await fetch('/api/settings/generate-api-key', {
        method: 'POST',
      })
      const data = await response.json()
      
      if (response.ok) {
        setSettings({
          ...settings,
          api: { ...settings.api, apiKey: data.apiKey }
        })
      } else {
        throw new Error(data.error || 'Failed to generate API key')
      }
    } catch (error) {
      console.error('Failed to generate API key:', error)
    }
  }

  const handleSaveSettings = async () => {
    setIsSaving(true)
    setSaveError(null)
    setSaveSuccess(false)

    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      })

      if (!response.ok) {
        throw new Error('Failed to save settings')
      }

      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    } catch (error) {
      setSaveError('Failed to save settings. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-6">
      <h1 className="text-2xl font-semibold text-foreground">Settings</h1>

      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-secondary p-1">
          {[
            { name: 'General', icon: Cog6ToothIcon },
            { name: 'Notifications', icon: BellIcon },
            { name: 'API', icon: ShieldCheckIcon },
          ].map((tab) => (
            <Tab
              key={tab.name}
              className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5 flex items-center justify-center gap-2
                ${selected
                  ? 'bg-background text-foreground shadow'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`
              }
            >
              <tab.icon className="h-5 w-5" />
              {tab.name}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels className="mt-4">
          <Tab.Panel>
            <div className="stats-card space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground">
                  Site Name
                </label>
                <input
                  type="text"
                  value={settings.general.siteName}
                  onChange={(e) => setSettings({
                    ...settings,
                    general: { ...settings.general, siteName: e.target.value }
                  })}
                  className="input-modern"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground">
                  Timezone
                </label>
                <select
                  value={settings.general.timezone}
                  onChange={(e) => setSettings({
                    ...settings,
                    general: { ...settings.general, timezone: e.target.value }
                  })}
                  className="input-modern"
                >
                  <option value="UTC">UTC</option>
                  <option value="America/New_York">Eastern Time</option>
                  <option value="America/Los_Angeles">Pacific Time</option>
                  <option value="Europe/London">London</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground">
                  Date Format
                </label>
                <select
                  value={settings.general.dateFormat}
                  onChange={(e) => setSettings({
                    ...settings,
                    general: { ...settings.general, dateFormat: e.target.value }
                  })}
                  className="input-modern"
                >
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground">
                  Time Format
                </label>
                <select
                  value={settings.general.timeFormat}
                  onChange={(e) => setSettings({
                    ...settings,
                    general: { ...settings.general, timeFormat: e.target.value }
                  })}
                  className="input-modern"
                >
                  <option value="12h">12-hour</option>
                  <option value="24h">24-hour</option>
                </select>
              </div>
            </div>
          </Tab.Panel>

          <Tab.Panel>
            <div className="stats-card space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-foreground">Email Notifications</h3>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.notifications.emailNotifications}
                    onChange={(e) => setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, emailNotifications: e.target.checked }
                    })}
                    className="h-4 w-4 rounded border-gray-300 text-foreground focus:ring-foreground"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-foreground">Push Notifications</h3>
                    <p className="text-sm text-muted-foreground">Receive browser push notifications</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.notifications.pushNotifications}
                    onChange={(e) => setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, pushNotifications: e.target.checked }
                    })}
                    className="h-4 w-4 rounded border-gray-300 text-foreground focus:ring-foreground"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-foreground">Daily Reports</h3>
                    <p className="text-sm text-muted-foreground">Receive daily summary reports</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.notifications.dailyReports}
                    onChange={(e) => setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, dailyReports: e.target.checked }
                    })}
                    className="h-4 w-4 rounded border-gray-300 text-foreground focus:ring-foreground"
                  />
                </div>
              </div>
            </div>
          </Tab.Panel>

          <Tab.Panel>
            <div className="stats-card space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  API Key
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={settings.api.apiKey}
                    readOnly
                    className="input-modern flex-1 bg-muted"
                    placeholder="No API key generated"
                  />
                  <CopyButton text={settings.api.apiKey} />
                  <button
                    onClick={handleGenerateApiKey}
                    className="btn-primary"
                  >
                    Generate New Key
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Webhook URL
                </label>
                <input
                  type="url"
                  value={settings.api.webhookUrl}
                  onChange={(e) => setSettings({
                    ...settings,
                    api: { ...settings.api, webhookUrl: e.target.value }
                  })}
                  className="input-modern"
                  placeholder="https://your-webhook-url.com"
                />
              </div>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>

      <div className="flex items-center justify-end gap-4">
        {saveError && (
          <p className="text-sm text-destructive">{saveError}</p>
        )}
        {saveSuccess && (
          <p className="text-sm text-green-400">Settings saved successfully!</p>
        )}
        <button
          onClick={handleSaveSettings}
          disabled={isSaving}
          className="btn-primary"
        >
          {isSaving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </div>
  )
} 