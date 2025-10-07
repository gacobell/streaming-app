import { ArrowLeft, Mail, MessageCircle } from 'lucide-react';
import { useState } from 'react';

interface ContactSupportPageProps {
  onBack: () => void;
}

export function ContactSupportPage({ onBack }: ContactSupportPageProps) {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (subject && message) {
      setSubmitted(true);
      setTimeout(() => {
        onBack();
      }, 2000);
    }
  };

  if (submitted) {
    return (
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center" style={{ background: 'rgba(5, 15, 35, 0.9)' }}>
        <div className="text-center px-4">
          <div className="w-20 h-20 rounded-full bg-green-500/20 border-2 border-green-400/50 flex items-center justify-center mx-auto mb-4">
            <Mail className="w-10 h-10 text-green-400" />
          </div>
          <h2 className="text-white text-2xl font-bold mb-2">Message Sent!</h2>
          <p className="text-white/60">Our support team will get back to you within 24 hours.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-10 min-h-screen flex flex-col" style={{ background: 'rgba(5, 15, 35, 0.9)' }}>
      {/* Header */}
      <div className="px-4 py-4 flex items-center gap-4 border-b border-white/10">
        <button onClick={onBack} className="text-white/70 hover:text-white">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-white text-2xl font-bold">Contact Support</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="space-y-6">
          {/* Info Card */}
          <div className="bg-purple-500/10 border border-purple-400/30 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <MessageCircle className="w-6 h-6 text-purple-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-purple-400 font-bold mb-1">Need help?</p>
                <p className="text-white/60 text-sm">
                  Fill out the form below and our support team will respond within 24 hours.
                </p>
              </div>
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className="text-white text-sm font-bold mb-2 block">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Brief description of your issue"
              className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 placeholder:text-white/40 focus:outline-none focus:border-purple-400"
            />
          </div>

          {/* Message */}
          <div>
            <label className="text-white text-sm font-bold mb-2 block">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              placeholder="Describe your issue in detail..."
              className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 placeholder:text-white/40 focus:outline-none focus:border-purple-400 resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!subject || !message}
            className="w-full py-4 rounded-2xl font-bold text-white disabled:opacity-50 disabled:cursor-not-allowed text-center"
            style={{
              background: 'linear-gradient(135deg, #ff0099 0%, #dd00ff 50%, #00ffff 100%)'
            }}
          >
            Send Message
          </button>

          {/* Contact Info */}
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <p className="text-white/60 text-sm mb-2">You can also reach us at:</p>
            <p className="text-white font-bold">support@streamingapp.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}