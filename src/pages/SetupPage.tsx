import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutGrid, Store, Utensils, Pill, Scissors, Wrench, Package, ArrowRight, Check,
} from 'lucide-react'
import { cn } from '../lib/utils'

/* ─── Types ──────────────────────────────────────────────────────────────── */

interface StepMeta {
  label: string
  sub: string
}

const STEPS: StepMeta[] = [
  { label: 'Verify Phone',   sub: 'OTP confirmed' },
  { label: 'Business Info',  sub: 'Name, type & location' },
  { label: 'Tax & Currency', sub: 'NTN, GST settings' },
  { label: 'First Branch',   sub: 'Address & timings' },
  { label: 'Invite Team',    sub: 'Add staff members' },
]

const BUSINESS_TYPES = [
  { id: 'retail',      label: 'Retail Shop',  sub: 'General & clothing',  emoji: '🏪' },
  { id: 'restaurant',  label: 'Restaurant',   sub: 'Dine-in & takeaway',  emoji: '🍽️' },
  { id: 'pharmacy',    label: 'Pharmacy',     sub: 'Medical & health',    emoji: '💊' },
  { id: 'salon',       label: 'Salon / Spa',  sub: 'Services & beauty',   emoji: '✂️' },
  { id: 'workshop',    label: 'Workshop',     sub: 'Repair & hardware',   emoji: '🔧' },
  { id: 'wholesale',   label: 'Wholesale',    sub: 'B2B distribution',    emoji: '📦' },
]

const CITIES = [
  'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad',
  'Peshawar', 'Quetta', 'Multan', 'Hyderabad', 'Sialkot',
]

/* ─── Component ──────────────────────────────────────────────────────────── */

export function SetupPage() {
  // currentStep: 2..5 (step 1 already done via login)
  const [currentStep, setCurrentStep] = useState(2)
  const navigate = useNavigate()

  // Step 2 state
  const [businessName, setBusinessName] = useState('')
  const [ownerName, setOwnerName] = useState('')
  const [businessType, setBusinessType] = useState('')
  const [city, setCity] = useState('')
  const [currency, setCurrency] = useState('PKR — Pakistani Rupee')

  // Step 3 state
  const [ntn, setNtn] = useState('')
  const [gst, setGst] = useState('')
  const [taxRate, setTaxRate] = useState('17')

  // Step 4 state
  const [branchAddress, setBranchAddress] = useState('')
  const [openTime, setOpenTime] = useState('09:00')
  const [closeTime, setCloseTime] = useState('22:00')

  // Step 5 state
  const [memberPhone, setMemberPhone] = useState('')
  const [memberRole, setMemberRole] = useState('Cashier')

  function goNext() {
    if (currentStep < 5) setCurrentStep((s) => s + 1)
    else navigate('/')
  }

  function goBack() {
    if (currentStep > 2) setCurrentStep((s) => s - 1)
    else navigate('/login')
  }

  const stepLabel = `0${currentStep} — ${
    currentStep === 2 ? 'Business Setup' :
    currentStep === 3 ? 'Tax & Currency' :
    currentStep === 4 ? 'First Branch' :
    'Invite Team'
  }`

  const progressPct = ((currentStep - 1) / (STEPS.length - 1)) * 100

  return (
    <div className="min-h-screen flex" style={{ background: '#f8f9fb' }}>
      {/* ── Sidebar ────────────────────────────────────────────────── */}
      <aside
        className="w-64 flex-shrink-0 flex flex-col p-6"
        style={{ background: '#0d1117', minHeight: '100vh' }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 mb-10">
          <div className="w-9 h-9 rounded-lg bg-brand-500 flex items-center justify-center">
            <LayoutGrid className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-bold font-display text-lg">
            Biz<span className="text-brand-400">OS</span>
          </span>
        </div>

        {/* Step indicators */}
        <nav className="flex flex-col gap-1">
          {STEPS.map((s, i) => {
            const stepNum = i + 1
            const done = stepNum < currentStep
            const active = stepNum === currentStep
            return (
              <div key={stepNum} className="flex items-start gap-3 py-3 px-2">
                {/* Circle */}
                <div
                  className={cn(
                    'w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold transition-all',
                    done
                      ? 'bg-green-500 text-white'
                      : active
                      ? 'bg-brand-500 text-white'
                      : 'text-white/30 border border-white/15',
                  )}
                >
                  {done ? <Check className="w-3.5 h-3.5" /> : stepNum}
                </div>
                {/* Text */}
                <div>
                  <p
                    className={cn(
                      'text-sm font-medium leading-tight',
                      done || active ? 'text-white' : 'text-white/35',
                    )}
                  >
                    {s.label}
                  </p>
                  <p
                    className={cn(
                      'text-xs mt-0.5',
                      done || active ? 'text-white/50' : 'text-white/20',
                    )}
                  >
                    {s.sub}
                  </p>
                </div>
              </div>
            )
          })}
        </nav>
      </aside>

      {/* ── Main content ──────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col bg-white relative overflow-hidden">
        {/* Step badge */}
        <div className="absolute top-5 right-6">
          <span
            className="text-xs font-semibold px-3 py-1.5 rounded-full"
            style={{ background: '#1a1f2e', color: 'rgba(255,255,255,0.7)' }}
          >
            {stepLabel}
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-1 w-full" style={{ background: '#e5e7eb' }}>
          <motion.div
            className="h-full bg-brand-500"
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

        <div className="flex-1 px-12 py-10 max-w-3xl mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >

              {/* ── Step 2: Business Info ──────────────────────── */}
              {currentStep === 2 && (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">Tell us about your business</h2>
                  <p className="text-sm text-brand-500 mb-7">This helps us customize your dashboard and modules.</p>

                  <div className="grid grid-cols-2 gap-5 mb-6">
                    <Field label="BUSINESS NAME">
                      <input
                        type="text"
                        placeholder="Ahmed General Store"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        className={inputCls}
                      />
                    </Field>
                    <Field label="OWNER NAME">
                      <input
                        type="text"
                        placeholder="Ahmed Farhan"
                        value={ownerName}
                        onChange={(e) => setOwnerName(e.target.value)}
                        className={inputCls}
                      />
                    </Field>
                  </div>

                  <Field label="SELECT YOUR BUSINESS TYPE" className="mb-6">
                    <div className="grid grid-cols-3 gap-3">
                      {BUSINESS_TYPES.map((bt) => (
                        <button
                          key={bt.id}
                          onClick={() => setBusinessType(bt.id)}
                          className={cn(
                            'flex flex-col items-center gap-2 py-4 px-3 rounded-xl border-2 transition-all',
                            businessType === bt.id
                              ? 'border-brand-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300',
                          )}
                        >
                          <span className="text-2xl">{bt.emoji}</span>
                          <span className={cn('text-sm font-semibold', businessType === bt.id ? 'text-brand-600' : 'text-gray-800')}>
                            {bt.label}
                          </span>
                          <span className="text-xs text-gray-400">{bt.sub}</span>
                        </button>
                      ))}
                    </div>
                  </Field>

                  <div className="grid grid-cols-2 gap-5 mb-8">
                    <Field label="CITY">
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className={inputCls}
                      >
                        <option value="">Select city…</option>
                        {CITIES.map((c) => <option key={c}>{c}</option>)}
                      </select>
                    </Field>
                    <Field label="CURRENCY">
                      <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className={inputCls}
                      >
                        <option>PKR — Pakistani Rupee</option>
                        <option>USD — US Dollar</option>
                        <option>AED — UAE Dirham</option>
                      </select>
                    </Field>
                  </div>
                </>
              )}

              {/* ── Step 3: Tax & Currency ─────────────────────── */}
              {currentStep === 3 && (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">Tax &amp; Currency Settings</h2>
                  <p className="text-sm text-brand-500 mb-7">Configure your NTN, GST and default tax rate.</p>

                  <div className="grid grid-cols-2 gap-5 mb-6">
                    <Field label="NTN NUMBER">
                      <input
                        type="text"
                        placeholder="e.g. 1234567-8"
                        value={ntn}
                        onChange={(e) => setNtn(e.target.value)}
                        className={inputCls}
                      />
                    </Field>
                    <Field label="GST REGISTRATION NUMBER">
                      <input
                        type="text"
                        placeholder="e.g. 03-00-1234-567-89"
                        value={gst}
                        onChange={(e) => setGst(e.target.value)}
                        className={inputCls}
                      />
                    </Field>
                  </div>
                  <Field label="DEFAULT TAX RATE (%)" className="mb-8 max-w-xs">
                    <input
                      type="number"
                      placeholder="17"
                      value={taxRate}
                      onChange={(e) => setTaxRate(e.target.value)}
                      className={inputCls}
                    />
                  </Field>
                  <p className="text-xs text-gray-400">
                    Leave blank if not registered. You can update these in Settings later.
                  </p>
                </>
              )}

              {/* ── Step 4: First Branch ───────────────────────── */}
              {currentStep === 4 && (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">Set Up Your First Branch</h2>
                  <p className="text-sm text-brand-500 mb-7">You can add more branches from Settings later.</p>

                  <Field label="BRANCH ADDRESS" className="mb-5">
                    <input
                      type="text"
                      placeholder="Shop #5, Main Market, Karachi"
                      value={branchAddress}
                      onChange={(e) => setBranchAddress(e.target.value)}
                      className={inputCls}
                    />
                  </Field>
                  <div className="grid grid-cols-2 gap-5 mb-8">
                    <Field label="OPENING TIME">
                      <input
                        type="time"
                        value={openTime}
                        onChange={(e) => setOpenTime(e.target.value)}
                        className={inputCls}
                      />
                    </Field>
                    <Field label="CLOSING TIME">
                      <input
                        type="time"
                        value={closeTime}
                        onChange={(e) => setCloseTime(e.target.value)}
                        className={inputCls}
                      />
                    </Field>
                  </div>
                </>
              )}

              {/* ── Step 5: Invite Team ────────────────────────── */}
              {currentStep === 5 && (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">Invite Your Team</h2>
                  <p className="text-sm text-brand-500 mb-7">Add staff members so they can start using BizOS.</p>

                  <div className="grid grid-cols-2 gap-5 mb-8">
                    <Field label="STAFF PHONE NUMBER">
                      <input
                        type="tel"
                        placeholder="+92 300 1234567"
                        value={memberPhone}
                        onChange={(e) => setMemberPhone(e.target.value)}
                        className={inputCls}
                      />
                    </Field>
                    <Field label="ROLE">
                      <select
                        value={memberRole}
                        onChange={(e) => setMemberRole(e.target.value)}
                        className={inputCls}
                      >
                        <option>Cashier</option>
                        <option>Manager</option>
                        <option>Inventory Staff</option>
                        <option>Accountant</option>
                      </select>
                    </Field>
                  </div>
                  <p className="text-sm text-gray-400">
                    You can skip this step and invite team members later from the Employees page.
                  </p>
                </>
              )}

            </motion.div>
          </AnimatePresence>

          {/* ── Action buttons ── */}
          <div className="flex items-center justify-between mt-4">
            <button
              onClick={goBack}
              className="px-6 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
            <button
              onClick={goNext}
              className="px-7 py-2.5 rounded-lg bg-brand-500 text-white text-sm font-semibold flex items-center gap-2 hover:bg-brand-600 transition-colors"
            >
              {currentStep === 5 ? 'Launch BizOS' : 'Continue'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

/* ─── Helpers ─────────────────────────────────────────────────────────────── */

const inputCls =
  'w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 bg-white'

function Field({
  label,
  children,
  className,
}: {
  label: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={className}>
      <label className="block text-xs font-semibold tracking-widest text-gray-500 mb-1.5">
        {label}
      </label>
      {children}
    </div>
  )
}
