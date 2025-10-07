import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface HelpCenterPageProps {
  onBack: () => void;
}

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQ[] = [
  {
    id: 1,
    category: 'Account',
    question: 'How do I reset my password?',
    answer: 'Go to Settings > Change Password. Enter your current password and choose a new one that meets our security requirements.'
  },
  {
    id: 2,
    category: 'Account',
    question: 'How do I verify my account?',
    answer: 'Navigate to Settings > Email Address or Phone Number and follow the verification process. You\'ll receive a code to confirm your contact information.'
  },
  {
    id: 3,
    category: 'Coins',
    question: 'How do I purchase coins?',
    answer: 'Tap the Coins icon in the navigation bar, select a package, and complete the payment process. Coins will be added to your wallet instantly.'
  },
  {
    id: 4,
    category: 'Coins',
    question: 'Can I get a refund for coins?',
    answer: 'Coin purchases are generally non-refundable. However, if you experienced a technical issue, please contact support with your transaction details.'
  },
  {
    id: 5,
    category: 'Streaming',
    question: 'How do I start a live stream?',
    answer: 'From your profile, tap the "Go Live" button. Set up your stream title and settings, then start broadcasting to your followers.'
  },
  {
    id: 6,
    category: 'Streaming',
    question: 'What are the requirements to stream?',
    answer: 'You need a verified account and must be at least 18 years old. Ensure you have a stable internet connection for the best streaming quality.'
  },
  {
    id: 7,
    category: 'Privacy',
    question: 'How do I block someone?',
    answer: 'Go to the user\'s profile, tap the three dots menu, and select "Block User". You can manage blocked users in Settings > Blocked Users.'
  },
  {
    id: 8,
    category: 'Privacy',
    question: 'Can I make my account private?',
    answer: 'You can control your privacy settings in the Settings menu. Adjust who can see your profile, contact you, and view your streams.'
  }
];

export function HelpCenterPage({ onBack }: HelpCenterPageProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(faqs.map(faq => faq.category)))];
  const filteredFaqs = selectedCategory === 'All' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  return (
    <div className="relative z-10 min-h-screen flex flex-col" style={{ background: 'rgba(5, 15, 35, 0.9)' }}>
      {/* Header */}
      <div className="px-4 py-4 flex items-center gap-4 border-b border-white/10">
        <button onClick={onBack} className="text-white/70 hover:text-white">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-white text-2xl font-bold">Help Center</h1>
      </div>

      {/* Category Filter */}
      <div className="px-4 py-4 border-b border-white/10 overflow-x-auto">
        <div className="flex gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-bold whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'text-white'
                  : 'bg-white/10 text-white/60 hover:bg-white/20'
              }`}
              style={selectedCategory === category ? {
                background: 'linear-gradient(135deg, #ff0099 0%, #dd00ff 50%, #00ffff 100%)'
              } : {}}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="space-y-3">
          {filteredFaqs.map((faq) => (
            <div key={faq.id} className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
              <button
                onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                className="w-full px-4 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
              >
                <div className="flex-1 text-left">
                  <p className="text-purple-400 text-xs font-bold mb-1">{faq.category}</p>
                  <p className="text-white font-bold">{faq.question}</p>
                </div>
                {expandedId === faq.id ? (
                  <ChevronUp className="w-5 h-5 text-white/40 flex-shrink-0 ml-2" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-white/40 flex-shrink-0 ml-2" />
                )}
              </button>
              {expandedId === faq.id && (
                <div className="px-4 pb-4 border-t border-white/10 pt-3">
                  <p className="text-white/60 text-sm">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}