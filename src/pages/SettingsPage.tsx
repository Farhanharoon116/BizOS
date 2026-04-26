import { useState } from 'react'
import { motion } from 'framer-motion'
import { Store, Bell, Shield, CreditCard, Globe, ChevronRight } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'

const SETTINGS_NAV = [
  { icon: Store,      label: 'Business Profile' },
  { icon: Bell,       label: 'Notifications' },
  { icon: Shield,     label: 'Security' },
  { icon: CreditCard, label: 'Billing & Plan' },
  { icon: Globe,      label: 'Localization' },
]

export function SettingsPage() {
  const [activeSection, setActiveSection] = useState('Business Profile')

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-bold font-display text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500">Manage your business configuration</p>
      </div>

      <div className="flex gap-6">
        {/* Nav */}
        <div className="w-52 shrink-0 space-y-1">
          {SETTINGS_NAV.map(({ icon: Icon, label }) => (
            <button
              key={label}
              onClick={() => setActiveSection(label)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors ${
                activeSection === label
                  ? 'bg-brand-50 text-brand-600 font-medium'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className="w-4 h-4" />
                {label}
              </div>
              <ChevronRight className="w-4 h-4 opacity-40" />
            </button>
          ))}
        </div>

        {/* Content */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1 bg-white rounded-xl border border-gray-100 p-6 shadow-sm"
        >
          <h2 className="text-base font-semibold text-gray-900 mb-5">{activeSection}</h2>

          {activeSection === 'Business Profile' && (
            <div className="space-y-4 max-w-md">
              <div className="space-y-1.5">
                <Label>Business Name</Label>
                <Input defaultValue="Raza General Store" />
              </div>
              <div className="space-y-1.5">
                <Label>City</Label>
                <Input defaultValue="Lahore" />
              </div>
              <div className="space-y-1.5">
                <Label>NTN / Tax ID</Label>
                <Input defaultValue="1234567-8" />
              </div>
              <div className="space-y-1.5">
                <Label>Phone</Label>
                <Input defaultValue="+92-42-1234567" />
              </div>
              <Button className="mt-2">Save Changes</Button>
            </div>
          )}

          {activeSection !== 'Business Profile' && (
            <p className="text-sm text-gray-400">Settings for {activeSection} coming soon.</p>
          )}
        </motion.div>
      </div>
    </div>
  )
}
