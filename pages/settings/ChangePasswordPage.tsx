import { ArrowLeft, Eye, EyeOff, Check, X } from 'lucide-react';
import { useState } from 'react';

interface ChangePasswordPageProps {
  onBack: () => void;
}

export function ChangePasswordPage({ onBack }: ChangePasswordPageProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Password requirements
  const hasMinLength = newPassword.length >= 8;
  const hasUppercase = /[A-Z]/.test(newPassword);
  const hasLowercase = /[a-z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  const hasSpecialChar = /[!@#$%^&*]/.test(newPassword);
  const passwordsMatch = newPassword === confirmPassword && newPassword.length > 0;

  const isValid = hasMinLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar && passwordsMatch && currentPassword.length > 0;

  const handleSave = () => {
    if (isValid) {
      console.log('Password changed');
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
          <h1 className="text-white text-2xl font-bold">Change Password</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="space-y-6">
          {/* Current Password */}
          <div>
            <label className="text-white text-sm font-bold mb-2 block">Current Password</label>
            <div className="relative">
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className="w-full px-4 py-3 pr-12 rounded-xl bg-white/10 text-white border border-white/20 placeholder:text-white/40 focus:outline-none focus:border-purple-400"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60"
              >
                {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="text-white text-sm font-bold mb-2 block">New Password</label>
            <div className="relative">
              <input
                type={showNewPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full px-4 py-3 pr-12 rounded-xl bg-white/10 text-white border border-white/20 placeholder:text-white/40 focus:outline-none focus:border-purple-400"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60"
              >
                {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-white text-sm font-bold mb-2 block">Confirm New Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full px-4 py-3 pr-12 rounded-xl bg-white/10 text-white border border-white/20 placeholder:text-white/40 focus:outline-none focus:border-purple-400"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Password Requirements */}
          {newPassword.length > 0 && (
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <p className="text-white font-bold text-sm mb-3">Password Requirements:</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  {hasMinLength ? <Check className="w-4 h-4 text-green-400" /> : <X className="w-4 h-4 text-red-400" />}
                  <span className={hasMinLength ? 'text-green-400 text-sm' : 'text-white/60 text-sm'}>
                    At least 8 characters
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {hasUppercase ? <Check className="w-4 h-4 text-green-400" /> : <X className="w-4 h-4 text-red-400" />}
                  <span className={hasUppercase ? 'text-green-400 text-sm' : 'text-white/60 text-sm'}>
                    One uppercase letter
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {hasLowercase ? <Check className="w-4 h-4 text-green-400" /> : <X className="w-4 h-4 text-red-400" />}
                  <span className={hasLowercase ? 'text-green-400 text-sm' : 'text-white/60 text-sm'}>
                    One lowercase letter
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {hasNumber ? <Check className="w-4 h-4 text-green-400" /> : <X className="w-4 h-4 text-red-400" />}
                  <span className={hasNumber ? 'text-green-400 text-sm' : 'text-white/60 text-sm'}>
                    One number
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {hasSpecialChar ? <Check className="w-4 h-4 text-green-400" /> : <X className="w-4 h-4 text-red-400" />}
                  <span className={hasSpecialChar ? 'text-green-400 text-sm' : 'text-white/60 text-sm'}>
                    One special character (!@#$%^&*)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {passwordsMatch ? <Check className="w-4 h-4 text-green-400" /> : <X className="w-4 h-4 text-red-400" />}
                  <span className={passwordsMatch ? 'text-green-400 text-sm' : 'text-white/60 text-sm'}>
                    Passwords match
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={!isValid}
            className="w-full py-4 rounded-2xl font-bold text-white disabled:opacity-50 disabled:cursor-not-allowed text-center"
            style={{
              background: 'linear-gradient(135deg, #ff0099 0%, #dd00ff 50%, #00ffff 100%)'
            }}
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}
