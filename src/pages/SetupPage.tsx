import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Zap, Store, Utensils, Pill, Scissors, Wrench, Package, ArrowRight } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { cn } from '../lib/utils'

const BUSINESS_TYPES = [
  { id: 'retail',      label: 'Retail Store',  icon: Store },
  { id: 'restaurant',  label: 'Restaurant',    icon: Utensils },
  { id: 'pharmacy',    label: 'Pharmacy',      icon: Pill },
  { id: 'salon',       label: 'Salon/Spa',     icon: Scissors },
  { id: 'workshop',    label: 'Workshop',      icon: Wrench },
  { id: 'wholesale',   label: 'Wholesale',     icon: Package },
]

export function SetupPage() {
  const [step, setStep] = useState(1)
  const [businessType, setBusinessType] = useState('')
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-brand-500 flex items-center justify-center mx-auto mb-4">
            <Zap className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold font-display text-gray-900">Set Up Your Business</h1>
          <p className="text-gray-500 text-sm mt-1">Step {step} of 2</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-base font-semibold text-gray-900">Select Business Type</h2>
              <div className="grid grid-cols-3 gap-3">
                {BUSINESS_TYPES.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setBusinessType(id)}
                    className={cn(
                      'flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all',
                      businessType === id
                        ? 'border-brand-500 bg-brand-50 text-brand-600'
                        : 'border-gray-100 text-gray-500 hover:border-gray-200',
                    )}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="text-xs font-medium">{label}</span>
                  </button>
                ))}
              </div>
              <Button
                className="w-full gap-2 mt-2"
                disabled={!businessType}
                onClick={() => setStep(2)}
              >
                Continue <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-base font-semibold text-gray-900">Business Details</h2>
              <div className="space-y-1.5">
                <Label>Business Name</Label>
                <Input placeholder="e.g. Raza General Store" />
              </div>
              <div className="space-y-1.5">
                <Label>City</Label>
                <Input placeholder="Lahore" />
              </div>
              <div className="space-y-1.5">
                <Label>Owner Phone</Label>
                <Input placeholder="0300-1234567" type="tel" />
              </div>
              <div className="space-y-1.5">
                <Label>Set PIN (4-6 digits)</Label>
                <Input placeholder="••••••" type="password" maxLength={6} />
              </div>
              <div className="flex gap-3 mt-2">
                <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                <Button className="flex-1 gap-2" onClick={() => navigate('/')}>
                  Launch BizOS <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
