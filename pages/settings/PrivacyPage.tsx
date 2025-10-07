import { ArrowLeft } from 'lucide-react';

interface PrivacyPageProps {
  onBack: () => void;
}

export function PrivacyPage({ onBack }: PrivacyPageProps) {
  return (
    <div className="relative z-10 min-h-screen flex flex-col" style={{ background: 'rgba(5, 15, 35, 0.9)' }}>
      {/* Header */}
      <div className="px-4 py-4 flex items-center gap-4 border-b border-white/10">
        <button onClick={onBack} className="text-white/70 hover:text-white">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-white text-2xl font-bold">Privacy Policy</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="space-y-6 text-white/80">
          <section>
            <h2 className="text-white font-bold text-xl mb-3">1. Information We Collect</h2>
            <p className="text-sm leading-relaxed mb-2">
              We collect information you provide directly to us, including:
            </p>
            <ul className="list-disc list-inside text-sm space-y-1 ml-4">
              <li>Account information (name, email, phone number)</li>
              <li>Profile information and photos</li>
              <li>Payment information</li>
              <li>Content you create, upload, or stream</li>
              <li>Messages and communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-bold text-xl mb-3">2. How We Use Your Information</h2>
            <p className="text-sm leading-relaxed mb-2">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-sm space-y-1 ml-4">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send you technical notices and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Detect and prevent fraud and abuse</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-bold text-xl mb-3">3. Information Sharing</h2>
            <p className="text-sm leading-relaxed">
              We do not sell your personal information. We may share your information with:
            </p>
            <ul className="list-disc list-inside text-sm space-y-1 ml-4">
              <li>Service providers who assist in our operations</li>
              <li>Law enforcement when required by law</li>
              <li>Other users as part of normal platform functionality</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-bold text-xl mb-3">4. Data Security</h2>
            <p className="text-sm leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal information. However, no security system is impenetrable and we cannot guarantee the security of our systems.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-xl mb-3">5. Data Retention</h2>
            <p className="text-sm leading-relaxed">
              We retain your information for as long as your account is active or as needed to provide services. You may request deletion of your account at any time through Settings.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-xl mb-3">6. Your Rights</h2>
            <p className="text-sm leading-relaxed mb-2">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-sm space-y-1 ml-4">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Object to processing of your information</li>
              <li>Export your data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-bold text-xl mb-3">7. Cookies and Tracking</h2>
            <p className="text-sm leading-relaxed">
              We use cookies and similar tracking technologies to collect and track information about your use of our services. You can control cookies through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-xl mb-3">8. Children's Privacy</h2>
            <p className="text-sm leading-relaxed">
              Our service is not intended for users under 18. We do not knowingly collect information from children under 18.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-xl mb-3">9. International Data Transfers</h2>
            <p className="text-sm leading-relaxed">
              Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for such transfers.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-xl mb-3">10. Changes to Privacy Policy</h2>
            <p className="text-sm leading-relaxed">
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-xl mb-3">11. Contact Us</h2>
            <p className="text-sm leading-relaxed">
              If you have any questions about this privacy policy, please contact us at privacy@streamingapp.com
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