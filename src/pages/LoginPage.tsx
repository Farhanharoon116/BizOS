import { useState, useRef, KeyboardEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { LayoutGrid, QrCode, ArrowRight, Mail, Phone } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '../lib/utils'

const OTP_LENGTH = 6

export function LoginPage() {
  const [tab, setTab] = useState<'phone' | 'email'>('phone')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''))
  const [otpSent, setOtpSent] = useState(false)
  const otpRefs = useRef<(HTMLInputElement | null)[]>([])
  const navigate = useNavigate()

  function handleSendOtp() {
    if (phone.length >= 10) setOtpSent(true)
  }

  function handleOtpChange(index: number, value: string) {
    if (!/^\d*$/.test(value)) return
    const next = [...otp]
    next[index] = value.slice(-1)
    setOtp(next)
    if (value && index < OTP_LENGTH - 1) {
      otpRefs.current[index + 1]?.focus()
    }
  }

  function handleOtpKeyDown(index: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus()
    }
  }

  function handleVerify() {
    navigate('/setup')
  }

  function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault()
    navigate('/setup')
  }

  const allOtpFilled = otp.every((d) => d !== '')

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: 'radial-gradient(ellipse at 30% 50%, #0f1b3d 0%, #080d1a 60%, #050810 100%)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        {/* Card */}
        <div
          className="rounded-2xl p-8 shadow-lg"
          style={{
            background: 'rgba(15, 20, 45, 0.85)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {/* Logo */}
          <div className="flex flex-col items-center mb-7">
            <div className="w-12 h-12 rounded-xl bg-brand-500 flex items-center justify-center mb-3">
              <LayoutGrid className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold font-display text-white tracking-tight">
              Biz<span className="text-brand-400">OS</span>
            </h1>
            <p className="text-sm text-center mt-1.5" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Pakistan&apos;s all-in-one
              <br />
              Business Operating System
            </p>
          </div>

          {/* Tabs */}
          <div
            className="flex rounded-xl p-1 mb-6"
            style={{ background: 'rgba(255,255,255,0.06)' }}
          >
            <button
              onClick={() => setTab('phone')}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all',
                tab === 'phone'
                  ? 'bg-brand-500 text-white shadow'
                  : 'text-white/50 hover:text-white/70',
              )}
            >
              <Phone className="w-4 h-4" />
              Phone Login
            </button>
            <button
              onClick={() => setTab('email')}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all',
                tab === 'email'
                  ? 'bg-brand-500 text-white shadow'
                  : 'text-white/50 hover:text-white/70',
              )}
            >
              <Mail className="w-4 h-4" />
              Email Login
            </button>
          </div>

          {tab === 'phone' ? (
            <div className="space-y-5">
              {/* Phone Number */}
              <div>
                <label className="block text-xs font-semibold tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  PHONE NUMBER
                </label>
                <input
                  type="tel"
                  placeholder="+92 333 1234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  onBlur={handleSendOtp}
                  className="w-full px-4 py-3 rounded-xl text-white placeholder-white/30 text-sm outline-none focus:ring-2 focus:ring-brand-500"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                />
              </div>

              {/* OTP */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <label className="text-xs font-semibold tracking-widest" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    ENTER OTP
                  </label>
                  <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
                    {otpSent ? 'Sent to your number' : 'Enter phone to receive OTP'}
                  </span>
                </div>
                <div className="flex gap-2 justify-center">
                  {Array.from({ length: OTP_LENGTH }).map((_, i) => (
                    <input
                      key={i}
                      ref={(el) => { otpRefs.current[i] = el }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={otp[i]}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(i, e)}
                      className={cn(
                        'w-10 h-10 text-center text-lg font-bold text-white rounded-xl outline-none transition-all focus:ring-2 focus:ring-brand-500',
                        otp[i]
                          ? 'border-brand-500'
                          : 'border-white/10',
                      )}
                      style={{
                        background: otp[i] ? 'rgba(37,99,235,0.25)' : 'rgba(255,255,255,0.08)',
                        border: `1px solid ${otp[i] ? 'rgba(37,99,235,0.6)' : 'rgba(255,255,255,0.1)'}`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Verify Button */}
              <button
                onClick={handleVerify}
                disabled={!allOtpFilled}
                className={cn(
                  'w-full py-3.5 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all',
                  allOtpFilled
                    ? 'bg-brand-500 hover:bg-brand-600 shadow-lg'
                    : 'opacity-40 cursor-not-allowed',
                )}
                style={allOtpFilled ? { background: 'linear-gradient(135deg, #3b82f6, #2563eb)' } : {}}
              >
                Verify &amp; Continue
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
                <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  or scan QR to login
                </span>
                <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
              </div>

              {/* QR Section */}
              <div
                className="flex items-center gap-3 p-4 rounded-xl cursor-pointer hover:opacity-80 transition-opacity"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                onClick={handleVerify}
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-lg" style={{ background: 'rgba(255,255,255,0.08)' }}>
                  <QrCode className="w-5 h-5 text-white/60" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Scan with BizOS Mobile App</p>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    Instant login — no OTP needed on mobile
                  </p>
                </div>
              </div>

              {/* Sign Up */}
              <p className="text-center text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                New to BizOS?{' '}
                <button
                  onClick={() => navigate('/setup')}
                  className="text-brand-400 font-medium hover:underline"
                >
                  Sign up &amp; set up your business
                </button>
              </p>
            </div>
          ) : (
            <form onSubmit={handleEmailLogin} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-white placeholder-white/30 text-sm outline-none focus:ring-2 focus:ring-brand-500"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  PASSWORD
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-white placeholder-white/30 text-sm outline-none focus:ring-2 focus:ring-brand-500"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all bg-brand-500 hover:bg-brand-600 shadow-lg"
                style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)' }}
              >
                Sign In
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-center text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                New to BizOS?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/setup')}
                  className="text-brand-400 font-medium hover:underline"
                >
                  Sign up &amp; set up your business
                </button>
              </p>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  )
}
