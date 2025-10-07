import { ArrowLeft, ChevronRight, User, Bell, Shield, CreditCard, Globe, HelpCircle, FileText, LogOut, Trash2, UserX, Lock, Mail, Phone } from 'lucide-react';
import { useState } from 'react';
import { EditProfilePage } from './settings/EditProfilePage';
import { ChangePasswordPage } from './settings/ChangePasswordPage';
import { EmailAddressPage } from './settings/EmailAddressPage';
import { PhoneNumberPage } from './settings/PhoneNumberPage';
import { BlockedUsersPage } from './settings/BlockedUsersPage';
import { TwoFactorPage } from './settings/TwoFactorPage';
import { PaymentMethodsPage } from './settings/PaymentMethodsPage';
import { BillingHistoryPage, BillingTransaction } from './settings/BillingHistoryPage';
import { LanguagePage } from './settings/LanguagePage';
import { HelpCenterPage } from './settings/HelpCenterPage';
import { ContactSupportPage } from './settings/ContactSupportPage';
import { TermsPage } from './settings/TermsPage';
import { PrivacyPage } from './settings/PrivacyPage';

interface SettingsPageProps {
  onBack: () => void;
  userGender: 'male' | 'female' | '';
  userAge: number | null;
  userCoinRate: number | null;
  onUpdateProfile: (gender: 'male' | 'female', age: number, coinRate: number) => void;
  billingHistory: BillingTransaction[];
}

type SettingsSubPage = 
  | 'edit-profile'
  | 'change-photo'
  | 'email'
  | 'phone'
  | 'change-password'
  | 'blocked-users'
  | '2fa'
  | 'payment-methods'
  | 'billing-history'
  | 'language'
  | 'help'
  | 'contact'
  | 'terms'
  | 'privacy'
  | 'logout'
  | 'delete-account'
  | null;

export function SettingsPage({ onBack, userGender, userAge, userCoinRate, onUpdateProfile, billingHistory }: SettingsPageProps) {
  const [currentSubPage, setCurrentSubPage] = useState<SettingsSubPage>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // If a sub-page is open, render it
  if (currentSubPage === 'edit-profile') {
    return <EditProfilePage 
      onBack={() => setCurrentSubPage(null)} 
      userGender={userGender}
      userAge={userAge}
      userCoinRate={userCoinRate}
      onUpdateProfile={onUpdateProfile}
    />;
  }
  
  if (currentSubPage === 'change-password') {
    return <ChangePasswordPage onBack={() => setCurrentSubPage(null)} />;
  }

  if (currentSubPage === 'email') {
    return <EmailAddressPage onBack={() => setCurrentSubPage(null)} />;
  }

  if (currentSubPage === 'phone') {
    return <PhoneNumberPage onBack={() => setCurrentSubPage(null)} />;
  }

  if (currentSubPage === 'blocked-users') {
    return <BlockedUsersPage onBack={() => setCurrentSubPage(null)} />;
  }

  if (currentSubPage === '2fa') {
    return <TwoFactorPage onBack={() => setCurrentSubPage(null)} />;
  }

  if (currentSubPage === 'payment-methods') {
    return <PaymentMethodsPage onBack={() => setCurrentSubPage(null)} />;
  }

  if (currentSubPage === 'billing-history') {
    return <BillingHistoryPage onBack={() => setCurrentSubPage(null)} transactions={billingHistory} />;
  }

  if (currentSubPage === 'language') {
    return <LanguagePage onBack={() => setCurrentSubPage(null)} />;
  }

  if (currentSubPage === 'help') {
    return <HelpCenterPage onBack={() => setCurrentSubPage(null)} />;
  }

  if (currentSubPage === 'contact') {
    return <ContactSupportPage onBack={() => setCurrentSubPage(null)} />;
  }

  if (currentSubPage === 'terms') {
    return <TermsPage onBack={() => setCurrentSubPage(null)} />;
  }

  if (currentSubPage === 'privacy') {
    return <PrivacyPage onBack={() => setCurrentSubPage(null)} />;
  }

  return (
    <div className="relative z-10 min-h-screen flex flex-col" style={{ background: 'rgba(5, 15, 35, 0.9)' }}>
      {/* Header */}
      <div className="px-4 py-4 flex items-center gap-4 border-b border-white/10">
        <button onClick={onBack} className="text-white/70 hover:text-white">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-white text-2xl font-bold">Settings</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {/* Account Section */}
        <div className="mb-6">
          <h2 className="text-white/60 text-sm font-bold mb-3 uppercase tracking-wide">Account</h2>
          <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
            <button 
              onClick={() => setCurrentSubPage('edit-profile')}
              className="w-full px-4 py-4 flex items-center justify-between hover:bg-white/5 transition-colors border-b border-white/10"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <User className="w-5 h-5 text-purple-400" />
                </div>
                <div className="text-left">
                  <p className="text-white font-bold">Edit Profile</p>
                  <p className="text-white/60 text-sm">Update your profile information</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-white/40" />
            </button>

            <button 
              onClick={() => setCurrentSubPage('email')}
              className="w-full px-4 py-4 flex items-center justify-between hover:bg-white/5 transition-colors border-b border-white/10"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-pink-400" />
                </div>
                <div className="text-left">
                  <p className="text-white font-bold">Email Address</p>
                  <p className="text-white/60 text-sm">jessica.anderson@email.com</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-white/40" />
            </button>

            <button 
              onClick={() => setCurrentSubPage('phone')}
              className="w-full px-4 py-4 flex items-center justify-between hover:bg-white/5 transition-colors border-b border-white/10"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-green-400" />
                </div>
                <div className="text-left">
                  <p className="text-white font-bold">Phone Number</p>
                  <p className="text-white/60 text-sm">+1 (555) 123-4567</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-white/40" />
            </button>

            <button 
              onClick={() => setCurrentSubPage('change-password')}
              className="w-full px-4 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-yellow-400" />
                </div>
                <div className="text-left">
                  <p className="text-white font-bold">Change Password</p>
                  <p className="text-white/60 text-sm">Update your password</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-white/40" />
            </button>
          </div>
        </div>

        {/* Privacy & Security Section */}
        <div className="mb-6">
          <h2 className="text-white/60 text-sm font-bold mb-3 uppercase tracking-wide">Privacy & Security</h2>
          <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
            <button 
              onClick={() => setCurrentSubPage('blocked-users')}
              className="w-full px-4 py-4 flex items-center justify-between hover:bg-white/5 transition-colors border-b border-white/10"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                  <UserX className="w-5 h-5 text-red-400" />
                </div>
                <div className="text-left">
                  <p className="text-white font-bold">Blocked Users</p>
                  <p className="text-white/60 text-sm">Manage blocked accounts</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-white/40" />
            </button>

            <button 
              onClick={() => setCurrentSubPage('2fa')}
              className="w-full px-4 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-blue-400" />
                </div>
                <div className="text-left">
                  <p className="text-white font-bold">Two-Factor Authentication</p>
                  <p className="text-white/60 text-sm">Add an extra layer of security</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-white/40" />
            </button>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="mb-6">
          <h2 className="text-white/60 text-sm font-bold mb-3 uppercase tracking-wide">Notifications</h2>
          <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
            <div className="px-4 py-4 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-purple-400" />
                </div>
                <div className="text-left">
                  <p className="text-white font-bold">Enable Notifications</p>
                  <p className="text-white/60 text-sm">Receive all notifications</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationsEnabled}
                  onChange={(e) => setNotificationsEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-500 peer-checked:to-pink-500"></div>
              </label>
            </div>


          </div>
        </div>

        {/* Payment & Billing Section */}
        <div className="mb-6">
          <h2 className="text-white/60 text-sm font-bold mb-3 uppercase tracking-wide">Payment & Billing</h2>
          <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
            <button 
              onClick={() => setCurrentSubPage('payment-methods')}
              className="w-full px-4 py-4 flex items-center justify-between hover:bg-white/5 transition-colors border-b border-white/10"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-yellow-400" />
                </div>
                <div className="text-left">
                  <p className="text-white font-bold">Payment Methods</p>
                  <p className="text-white/60 text-sm">Manage payment cards</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-white/40" />
            </button>

            <button 
              onClick={() => setCurrentSubPage('billing-history')}
              className="w-full px-4 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-green-400" />
                </div>
                <div className="text-left">
                  <p className="text-white font-bold">Billing History</p>
                  <p className="text-white/60 text-sm">View past transactions</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-white/40" />
            </button>
          </div>
        </div>

        {/* General Section */}
        <div className="mb-6">
          <h2 className="text-white/60 text-sm font-bold mb-3 uppercase tracking-wide">General</h2>
          <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
            <button 
              onClick={() => setCurrentSubPage('language')}
              className="w-full px-4 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-blue-400" />
                </div>
                <div className="text-left">
                  <p className="text-white font-bold">Language & Region</p>
                  <p className="text-white/60 text-sm">English (US)</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-white/40" />
            </button>
          </div>
        </div>

        {/* Help & Support Section */}
        <div className="mb-6">
          <h2 className="text-white/60 text-sm font-bold mb-3 uppercase tracking-wide">Help & Support</h2>
          <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
            <button 
              onClick={() => setCurrentSubPage('help')}
              className="w-full px-4 py-4 flex items-center justify-between hover:bg-white/5 transition-colors border-b border-white/10"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="text-left">
                  <p className="text-white font-bold">Help Center</p>
                  <p className="text-white/60 text-sm">FAQs and support articles</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-white/40" />
            </button>

            <button 
              onClick={() => setCurrentSubPage('contact')}
              className="w-full px-4 py-4 flex items-center justify-between hover:bg-white/5 transition-colors border-b border-white/10"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-purple-400" />
                </div>
                <div className="text-left">
                  <p className="text-white font-bold">Contact Support</p>
                  <p className="text-white/60 text-sm">Get help from our team</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-white/40" />
            </button>

            <button 
              onClick={() => setCurrentSubPage('terms')}
              className="w-full px-4 py-4 flex items-center justify-between hover:bg-white/5 transition-colors border-b border-white/10"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-pink-400" />
                </div>
                <div className="text-left">
                  <p className="text-white font-bold">Terms of Service</p>
                  <p className="text-white/60 text-sm">Read our terms</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-white/40" />
            </button>

            <button 
              onClick={() => setCurrentSubPage('privacy')}
              className="w-full px-4 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-blue-400" />
                </div>
                <div className="text-left">
                  <p className="text-white font-bold">Privacy Policy</p>
                  <p className="text-white/60 text-sm">How we protect your data</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-white/40" />
            </button>
          </div>
        </div>

        {/* Danger Zone Section */}
        <div className="mb-6">
          <h2 className="text-white/60 text-sm font-bold mb-3 uppercase tracking-wide">Account Actions</h2>
          <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
            <button 
              onClick={() => setShowLogoutDialog(true)}
              className="w-full px-4 py-4 flex items-center justify-between hover:bg-white/5 transition-colors border-b border-white/10"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
                  <LogOut className="w-5 h-5 text-yellow-400" />
                </div>
                <div className="text-left">
                  <p className="text-white font-bold">Log Out</p>
                  <p className="text-white/60 text-sm">Sign out of your account</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-white/40" />
            </button>

            <button 
              onClick={() => setShowDeleteDialog(true)}
              className="w-full px-4 py-4 flex items-center justify-between hover:bg-red-500/10 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                  <Trash2 className="w-5 h-5 text-red-400" />
                </div>
                <div className="text-left">
                  <p className="text-red-400 font-bold">Delete Account</p>
                  <p className="text-white/60 text-sm">Permanently delete your account</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-red-400/40" />
            </button>
          </div>
        </div>

        {/* App Version */}
        <div className="text-center py-6">
          <p className="text-white/40 text-sm">Version 1.0.0</p>
          <p className="text-white/30 text-xs mt-1">© 2025 Streaming App. All rights reserved.</p>
        </div>
      </div>

      {/* Logout Confirmation Dialog */}
      {showLogoutDialog && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center max-w-[430px] mx-auto p-4">
          <div className="bg-gradient-to-b from-[#1a1a2e] to-[#0a0f23] rounded-3xl p-6 w-full max-w-sm">
            <h3 className="text-white text-xl font-bold mb-2">Log Out?</h3>
            <p className="text-white/60 mb-6">Are you sure you want to log out of your account?</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutDialog(false)}
                className="flex-1 py-3 rounded-xl bg-white/10 text-white font-bold hover:bg-white/20 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowLogoutDialog(false);
                  onBack();
                }}
                className="flex-1 py-3 rounded-xl font-bold text-white"
                style={{
                  background: 'linear-gradient(135deg, #ff0099 0%, #dd00ff 50%, #00ffff 100%)'
                }}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Confirmation Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center max-w-[430px] mx-auto p-4">
          <div className="bg-gradient-to-b from-[#1a1a2e] to-[#0a0f23] rounded-3xl p-6 w-full max-w-sm border-2 border-red-500/30">
            <h3 className="text-red-400 text-xl font-bold mb-2">Delete Account?</h3>
            <p className="text-white/60 mb-2">This action cannot be undone. You will lose:</p>
            <ul className="text-white/60 text-sm mb-6 space-y-1">
              <li>• All your posts and content</li>
              <li>• Your followers and connections</li>
              <li>• Your coins and wallet balance</li>
              <li>• All your account data permanently</li>
            </ul>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteDialog(false)}
                className="flex-1 py-3 rounded-xl bg-white/10 text-white font-bold hover:bg-white/20 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowDeleteDialog(false);
                  alert('Account deletion initiated. This feature is not yet implemented.');
                }}
                className="flex-1 py-3 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
