import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';

interface PhoneNumberPageProps {
  onBack: () => void;
}

export function PhoneNumberPage({ onBack }: PhoneNumberPageProps) {
  const [currentPhone, setCurrentPhone] = useState('+1 (555) 123-4567');
  const [newPhone, setNewPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  };

  const handleSendCode = () => {
    if (newPhone.replace(/\D/g, '').length === 10) {
      setCodeSent(true);
    }
  };

  const handleVerify = () => {
    if (verificationCode.length === 6) {
      console.log('Phone updated to:', newPhone);
      onBack();
    }
  };

  return (
    <div className="relative z-10 min-h-screen flex flex-col" style={{ background: 'rgba(5, 15, 35, 0.9)' }}>
      {/* Header */}
      <div className="px-4 py-4 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-white/70 hover:text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-white text-2xl font-bold">Phone Number</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="space-y-6">
          {/* Current Phone */}
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <p className="text-white/60 text-sm mb-1">Current Phone Number</p>
            <p className="text-white font-bold">{currentPhone}</p>
          </div>

          {!codeSent ? (
            <>
              {/* New Phone */}
              <div>
                <label className="text-white text-sm font-bold mb-2 block">New Phone Number</label>
                <input
                  type="tel"
                  value={newPhone}
                  onChange={(e) => setNewPhone(formatPhone(e.target.value))}
                  placeholder="(555) 123-4567"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 placeholder:text-white/40 focus:outline-none focus:border-purple-400"
                />
                <p className="text-white/60 text-xs mt-1">We'll send you a verification code</p>
              </div>

              {/* Send Code Button */}
              <button
                onClick={handleSendCode}
                disabled={newPhone.replace(/\D/g, '').length !== 10}
                className="w-full py-4 rounded-2xl font-bold text-white disabled:opacity-50 disabled:cursor-not-allowed text-center"
                style={{
                  background: 'linear-gradient(135deg, #ff0099 0%, #dd00ff 50%, #00ffff 100%)'
                }}
              >
                Send Verification Code
              </button>
            </>
          ) : (
            <>
              {/* Verification Code */}
              <div className="bg-green-500/10 border border-green-400/30 rounded-xl p-4">
                <p className="text-green-400 text-sm font-bold">✓ Code sent to {newPhone}</p>
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

              {/* Verify Button */}
              <button
                onClick={handleVerify}
                disabled={verificationCode.length !== 6}
                className="w-full py-4 rounded-2xl font-bold text-white disabled:opacity-50 disabled:cursor-not-allowed text-center"
                style={{
                  background: 'linear-gradient(135deg, #ff0099 0%, #dd00ff 50%, #00ffff 100%)'
                }}
              >
                Verify & Update
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}