import { ArrowLeft } from 'lucide-react';

interface TermsPageProps {
  onBack: () => void;
}

export function TermsPage({ onBack }: TermsPageProps) {
  return (
    <div className="relative z-10 min-h-screen flex flex-col" style={{ background: 'rgba(5, 15, 35, 0.9)' }}>
      {/* Header */}
      <div className="px-4 py-4 flex items-center gap-4 border-b border-white/10">
        <button onClick={onBack} className="text-white/70 hover:text-white">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-white text-2xl font-bold">Terms of Service</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="space-y-6 text-white/80">
          <section>
            <h2 className="text-white font-bold text-xl mb-3">1. Acceptance of Terms</h2>
            <p className="text-sm leading-relaxed">
              By accessing and using this streaming platform, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-xl mb-3">2. User Accounts</h2>
            <p className="text-sm leading-relaxed mb-2">
              You are responsible for maintaining the confidentiality of your account and password. You agree to:
            </p>
            <ul className="list-disc list-inside text-sm space-y-1 ml-4">
              <li>Provide accurate and complete information</li>
              <li>Keep your password secure</li>
              <li>Notify us immediately of any unauthorized use</li>
              <li>Be at least 18 years old to create an account</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-bold text-xl mb-3">3. Content Guidelines</h2>
            <p className="text-sm leading-relaxed mb-2">
              Users must not post or stream content that:
            </p>
            <ul className="list-disc list-inside text-sm space-y-1 ml-4">
              <li>Violates any laws or regulations</li>
              <li>Infringes on intellectual property rights</li>
              <li>Contains hate speech or harassment</li>
              <li>Is sexually explicit or inappropriate</li>
              <li>Promotes violence or illegal activities</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-bold text-xl mb-3">4. Virtual Currency</h2>
            <p className="text-sm leading-relaxed">
              Coins purchased on the platform are virtual items with no real-world value. All purchases are final and non-refundable unless required by law. Coins cannot be exchanged for cash or transferred between accounts.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-xl mb-3">5. Streaming Rules</h2>
            <p className="text-sm leading-relaxed">
              Streamers must comply with community guidelines and content policies. We reserve the right to terminate streams or accounts that violate these terms without prior notice.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-xl mb-3">6. Intellectual Property</h2>
            <p className="text-sm leading-relaxed">
              All content on this platform, including but not limited to text, graphics, logos, and software, is the property of the platform or its content suppliers and is protected by copyright laws.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-xl mb-3">7. Termination</h2>
            <p className="text-sm leading-relaxed">
              We reserve the right to terminate or suspend your account at any time for violations of these terms or for any other reason at our sole discretion.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-xl mb-3">8. Limitation of Liability</h2>
            <p className="text-sm leading-relaxed">
              The platform is provided "as is" without warranties of any kind. We are not liable for any damages arising from your use of the service.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-xl mb-3">9. Changes to Terms</h2>
            <p className="text-sm leading-relaxed">
              We reserve the right to modify these terms at any time. Continued use of the platform after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-xl mb-3">10. Contact</h2>
            <p className="text-sm leading-relaxed">
              For questions about these terms, please contact us at legal@streamingapp.com
            </p>
          </section>

          <div className="pt-6 border-t border-white/10">
            <p className="text-white/40 text-xs text-center">
              © 2025 Streaming App. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}