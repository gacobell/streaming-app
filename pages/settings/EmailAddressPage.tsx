import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';

interface EmailAddressPageProps {
  onBack: () => void;
}

export function EmailAddressPage({ onBack }: EmailAddressPageProps) {
  const [currentEmail, setCurrentEmail] = useState('jessica.anderson@email.com');
  const [newEmail, setNewEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');

  const isValid = newEmail && confirmEmail && newEmail === confirmEmail && password && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail);

  const handleSave = () => {
    if (isValid) {
      console.log('Email updated to:', newEmail);
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
          <h1 className="text-white text-2xl font-bold">Email Address</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="space-y-6">
          {/* Current Email */}
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <p className="text-white/60 text-sm mb-1">Current Email</p>
            <p className="text-white font-bold">{currentEmail}</p>
          </div>

          {/* New Email */}
          <div>
            <label className="text-white text-sm font-bold mb-2 block">New Email Address</label>
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="your.new@email.com"
              className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 placeholder:text-white/40 focus:outline-none focus:border-purple-400"
            />
          </div>

          {/* Confirm Email */}
          <div>
            <label className="text-white text-sm font-bold mb-2 block">Confirm Email Address</label>
            <input
              type="email"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
              placeholder="Confirm your email"
              className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 placeholder:text-white/40 focus:outline-none focus:border-purple-400"
            />
            {newEmail && confirmEmail && newEmail !== confirmEmail && (
              <p className="text-red-400 text-sm mt-1">⚠️ Emails do not match</p>
            )}
          </div>

          {/* Password Confirmation */}
          <div>
            <label className="text-white text-sm font-bold mb-2 block">Confirm Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 placeholder:text-white/40 focus:outline-none focus:border-purple-400"
            />
            <p className="text-white/60 text-xs mt-1">For security, please confirm your password</p>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={!isValid}
            className="w-full py-4 rounded-2xl font-bold text-white disabled:opacity-50 disabled:cursor-not-allowed text-center"
            style={{
              background: 'linear-gradient(135deg, #ff0099 0%, #dd00ff 50%, #00ffff 100%)'
            }}
          >
            Update Email
          </button>
        </div>
      </div>
    </div>
  );
}