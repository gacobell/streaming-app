import { ArrowLeft, Shield, Check, Smartphone } from 'lucide-react';
import { useState } from 'react';

interface TwoFactorPageProps {
  onBack: () => void;
}

export function TwoFactorPage({ onBack }: TwoFactorPageProps) {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [step, setStep] = useState<'main' | 'setup' | 'verify'>('main');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  const handleEnable2FA = () => {
    setStep('setup');
  };

  const handleSendCode = () => {
    if (phoneNumber) {
      setStep('verify');
    }
  };

  const handleVerify = () => {
    if (verificationCode.length === 6) {
      setIs2FAEnabled(true);
      setStep('main');
    }
  };

  const handleDisable = () => {
    setIs2FAEnabled(false);
  };

  return (
    <div className="relative z-10 min-h-screen flex flex-col" style={{ background: 'rgba(5, 15, 35, 0.9)' }}>
      {/* Header */}
      <div className="px-4 py-4 flex items-center gap-4 border-b border-white/10">
        <button onClick={() => step === 'main' ? onBack() : setStep('main')} className="text-white/70 hover:text-white">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-white text-2xl font-bold">Two-Factor Authentication</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {step === 'main' && (
          <div className="space-y-6">
            {/* Status Card */}
            <div className={`rounded-xl p-6 border-2 ${is2FAEnabled ? 'bg-green-500/10 border-green-400/30' : 'bg-white/5 border-white/10'}`}>
              <div className="flex items-center gap-3 mb-4">
                <Shield className={`w-8 h-8 ${is2FAEnabled ? 'text-green-400' : 'text-white/60'}`} />
                <div>
                  <p className="text-white font-bold">Status: {is2FAEnabled ? 'Enabled' : 'Disabled'}</p>
                  <p className="text-white/60 text-sm">
                    {is2FAEnabled ? 'Your account is protected' : 'Add an extra layer of security'}
                  </p>
                </div>
              </div>

              {is2FAEnabled && (
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white/60 text-sm">Protection Method</p>
                  <p className="text-white font-bold">SMS to +1 (555) 123-4567</p>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="bg-blue-500/10 border border-blue-400/30 rounded-xl p-4">
              <p className="text-blue-400 font-bold mb-2">What is 2FA?</p>
              <p className="text-white/60 text-sm">
                Two-Factor Authentication adds an extra security step when logging in. You'll need both your password and a code sent to your phone.
              </p>
            </div>

            {/* Benefits */}
            <div>
              <h3 className="text-white font-bold mb-3">Benefits:</h3>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-white/60 text-sm">Protect your account from unauthorized access</p>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-white/60 text-sm">Get notified of login attempts</p>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-white/60 text-sm">Keep your personal information secure</p>
                </div>
              </div>
            </div>

            {/* Action Button */}
            {!is2FAEnabled ? (
              <button
                onClick={handleEnable2FA}
                className="w-full py-4 rounded-2xl font-bold text-white text-center"
                style={{
                  background: 'linear-gradient(135deg, #ff0099 0%, #dd00ff 50%, #00ffff 100%)'
                }}
              >
                Enable 2FA
              </button>
            ) : (
              <button
                onClick={handleDisable}
                className="w-full py-4 rounded-2xl font-bold text-white text-center bg-red-600 hover:bg-red-700 transition-colors"
              >
                Disable 2FA
              </button>
            )}
          </div>
        )}

        {step === 'setup' && (
          <div className="space-y-6">
            <div className="text-center">
              <Smartphone className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <h3 className="text-white font-bold text-xl mb-2">Setup 2FA</h3>
              <p className="text-white/60">Enter your phone number to receive verification codes</p>
            </div>

            <div>
              <label className="text-white text-sm font-bold mb-2 block">Phone Number</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="(555) 123-4567"
                className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 placeholder:text-white/40 focus:outline-none focus:border-purple-400"
              />
            </div>

            <button
              onClick={handleSendCode}
              disabled={!phoneNumber}
              className="w-full py-4 rounded-2xl font-bold text-white disabled:opacity-50 disabled:cursor-not-allowed text-center"
              style={{
                background: 'linear-gradient(135deg, #ff0099 0%, #dd00ff 50%, #00ffff 100%)'
              }}
            >
              Send Verification Code
            </button>
          </div>
        )}

        {step === 'verify' && (
          <div className="space-y-6">
            <div className="bg-green-500/10 border border-green-400/30 rounded-xl p-4">
              <p className="text-green-400 text-sm font-bold">✓ Code sent to {phoneNumber}</p>
            </div>

            <div>
              <label className="text-white text-sm font-bold mb-2 block">Verification Code</label>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').substring(0, 6))}
                placeholder="Enter 6-digit code"
                maxLength={6}
                className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 placeholder:text-white/40 focus:outline-none focus:border-purple-400 text-center text-2xl tracking-widest"
              />
              <button 
                onClick={handleSendCode}
                className="text-purple-400 text-sm mt-2 hover:underline"
              >
                Resend code
              </button>
            </div>

            <button
              onClick={handleVerify}
              disabled={verificationCode.length !== 6}
              className="w-full py-4 rounded-2xl font-bold text-white disabled:opacity-50 disabled:cursor-not-allowed text-center"
              style={{
                background: 'linear-gradient(135deg, #ff0099 0%, #dd00ff 50%, #00ffff 100%)'
              }}
            >
              Complete Setup
            </button>
          </div>
        )}
      </div>
    </div>
  );
}