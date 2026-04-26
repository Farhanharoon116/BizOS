import { useState } from 'react'
import { motion } from 'framer-motion'
import { Store, Bell, Shield, CreditCard, Globe, ChevronRight, Save } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../components/ui/select'
import { toast } from 'sonner'

const SETTINGS_NAV = [
  { icon: Store,      label: 'Business Profile' },
  { icon: Bell,       label: 'Notifications' },
  { icon: Shield,     label: 'Security' },
  { icon: CreditCard, label: 'Billing & Plan' },
  { icon: Globe,      label: 'Localization' },
]

export function SettingsPage() {
  const [activeSection, setActiveSection] = useState('Business Profile')

  // Business Profile state
  const [businessName, setBusinessName] = useState('Raza General Store')
  const [city, setCity] = useState('Lahore')
  const [ntn, setNtn] = useState('1234567-8')
  const [phone, setPhone] = useState('+92-42-1234567')

  // Notifications state
  const [notifLowStock, setNotifLowStock] = useState(true)
  const [notifDailySummary, setNotifDailySummary] = useState(true)
  const [notifNewSale, setNotifNewSale] = useState(false)

  // Security state
  const [currentPin, setCurrentPin] = useState('')
  const [newPin, setNewPin] = useState('')
  const [confirmPin, setConfirmPin] = useState('')

  // Billing state (read-only display)
  const plan = 'Growth'
  const nextBilling = '2026-05-15'

  // Localization state
  const [currency, setCurrency] = useState('PKR')
  const [taxRate, setTaxRate] = useState('17')
  const [timezone, setTimezone] = useState('Asia/Karachi')

  function saveBusinessProfile() {
    if (!businessName.trim()) { toast.error('Business name is required'); return }
    toast.success('Business profile saved')
  }

  function saveNotifications() {
    toast.success('Notification preferences saved')
  }

  function saveSecurity() {
    if (!currentPin || !newPin || !confirmPin) { toast.error('All PIN fields are required'); return }
    if (newPin !== confirmPin) { toast.error('New PINs do not match'); return }
    if (newPin.length < 4) { toast.error('PIN must be at least 4 digits'); return }
    toast.success('PIN updated successfully')
    setCurrentPin(''); setNewPin(''); setConfirmPin('')
  }

  function saveLocalization() {
    toast.success('Localization settings saved')
  }

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

          {/* Business Profile */}
          {activeSection === 'Business Profile' && (
            <div className="space-y-4 max-w-md">
              <div className="space-y-1.5">
                <Label>Business Name</Label>
                <Input value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>City</Label>
                <Input value={city} onChange={(e) => setCity(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>NTN / Tax ID</Label>
                <Input value={ntn} onChange={(e) => setNtn(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Phone</Label>
                <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <Button className="mt-2 gap-2" onClick={saveBusinessProfile}>
                <Save className="w-4 h-4" /> Save Changes
              </Button>
            </div>
          )}

          {/* Notifications */}
          {activeSection === 'Notifications' && (
            <div className="space-y-5 max-w-md">
              {[
                { label: 'Low Stock Alerts', description: 'Notify when products fall below reorder point', value: notifLowStock, set: setNotifLowStock },
                { label: 'Daily Sales Summary', description: 'Receive a daily summary of sales at end of day', value: notifDailySummary, set: setNotifDailySummary },
                { label: 'New Sale Notifications', description: 'Alert on every completed transaction', value: notifNewSale, set: setNotifNewSale },
              ].map(({ label, description, value, set }) => (
                <div key={label} className="flex items-center justify-between p-3 rounded-lg border border-gray-100">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{description}</p>
                  </div>
                  <button
                    onClick={() => set(!value)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${value ? 'bg-brand-500' : 'bg-gray-200'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${value ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
              ))}
              <Button className="gap-2" onClick={saveNotifications}>
                <Save className="w-4 h-4" /> Save Preferences
              </Button>
            </div>
          )}

          {/* Security */}
          {activeSection === 'Security' && (
            <div className="space-y-4 max-w-md">
              <div className="space-y-1.5">
                <Label>Current PIN</Label>
                <Input type="password" maxLength={6} placeholder="••••••" value={currentPin} onChange={(e) => setCurrentPin(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>New PIN</Label>
                <Input type="password" maxLength={6} placeholder="••••••" value={newPin} onChange={(e) => setNewPin(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Confirm New PIN</Label>
                <Input type="password" maxLength={6} placeholder="••••••" value={confirmPin} onChange={(e) => setConfirmPin(e.target.value)} />
              </div>
              <Button className="gap-2" onClick={saveSecurity}>
                <Save className="w-4 h-4" /> Update PIN
              </Button>
            </div>
          )}

          {/* Billing & Plan */}
          {activeSection === 'Billing & Plan' && (
            <div className="space-y-5 max-w-md">
              <div className="p-4 rounded-xl bg-brand-50 border border-brand-200">
                <p className="text-sm text-brand-600 font-medium">Current Plan</p>
                <p className="text-2xl font-bold text-brand-700 mt-1">{plan}</p>
                <p className="text-xs text-brand-500 mt-1">Next billing: {nextBilling}</p>
              </div>

              {['Starter – Rs 2,500/mo', 'Growth – Rs 5,000/mo', 'Enterprise – Rs 12,000/mo'].map((p) => (
                <div key={p} className="flex items-center justify-between p-3 rounded-lg border border-gray-100">
                  <p className="text-sm text-gray-900">{p}</p>
                  <Button size="sm" variant={p.startsWith(plan) ? 'default' : 'outline'} onClick={() => toast.success('Plan change request submitted')}>
                    {p.startsWith(plan) ? 'Current' : 'Upgrade'}
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Localization */}
          {activeSection === 'Localization' && (
            <div className="space-y-4 max-w-md">
              <div className="space-y-1.5">
                <Label>Currency</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PKR">PKR – Pakistani Rupee</SelectItem>
                    <SelectItem value="USD">USD – US Dollar</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label>Default GST Rate (%)</Label>
                <Input type="number" min="0" max="100" step="0.1" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} />
              </div>

              <div className="space-y-1.5">
                <Label>Timezone</Label>
                <Select value={timezone} onValueChange={setTimezone}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Asia/Karachi">Asia/Karachi (PKT +5:00)</SelectItem>
                    <SelectItem value="Asia/Dubai">Asia/Dubai (GST +4:00)</SelectItem>
                    <SelectItem value="UTC">UTC</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="gap-2" onClick={saveLocalization}>
                <Save className="w-4 h-4" /> Save Settings
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
