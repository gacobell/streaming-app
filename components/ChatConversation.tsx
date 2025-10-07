import { ArrowLeft, MoreVertical, Paperclip } from 'lucide-react';
import giftBoxImage from 'figma:asset/bc95fd24c1ce6fceb586e0793b80646fbd2fc942.png';
import sendIconImage from 'figma:asset/1c8916258b4a83432e6ac48d710936cd1915bc21.png';
import cameraIconImage from 'figma:asset/0005539bc9cd312565f8519880dd7acaccebd9da.png';
import { useState, useRef, useEffect } from 'react';

interface Message {
  id: number;
  text: string;
  timestamp: string;
  isOwn: boolean;
  isGift?: boolean;
  giftEmoji?: string;
  giftName?: string;
  giftCost?: number;
}

interface Gift {
  id: number;
  emoji: string;
  name: string;
  cost: number;
}

const giftOptions: Gift[] = [
  // Ultra cheap gifts (1-5 coins) - Very simple
  { id: 1, emoji: '👋', name: 'Wave', cost: 1 },
  { id: 2, emoji: '😀', name: 'Happy', cost: 1 },
  { id: 3, emoji: '👏', name: 'Clap', cost: 3 },
  { id: 4, emoji: '🙌', name: 'Hands Up', cost: 3 },
  { id: 5, emoji: '💜', name: 'Purple Heart', cost: 5 },
  { id: 6, emoji: '✌️', name: 'Peace', cost: 5 },
  
  // Cheap gifts (10-50 coins) - Simple emojis
  { id: 7, emoji: '👍', name: 'Thumbs Up', cost: 10 },
  { id: 8, emoji: '❤️', name: 'Heart', cost: 10 },
  { id: 9, emoji: '😊', name: 'Smile', cost: 10 },
  { id: 10, emoji: '🎉', name: 'Party', cost: 15 },
  { id: 11, emoji: '🔥', name: 'Fire', cost: 15 },
  { id: 12, emoji: '⭐', name: 'Star', cost: 15 },
  { id: 13, emoji: '💪', name: 'Strong', cost: 20 },
  { id: 14, emoji: '🌟', name: 'Sparkle', cost: 20 },
  { id: 15, emoji: '🎵', name: 'Music', cost: 25 },
  { id: 16, emoji: '🌹', name: 'Rose', cost: 30 },
  { id: 17, emoji: '🍕', name: 'Pizza', cost: 30 },
  { id: 18, emoji: '☕', name: 'Coffee', cost: 35 },
  { id: 19, emoji: '🍰', name: 'Cake', cost: 40 },
  { id: 20, emoji: '🎂', name: 'Birthday Cake', cost: 45 },
  { id: 21, emoji: '🌈', name: 'Rainbow', cost: 50 },
  
  // Medium gifts (60-200 coins) - More elaborate
  { id: 22, emoji: '💎', name: 'Diamond', cost: 60 },
  { id: 23, emoji: '🎁', name: 'Gift Box', cost: 75 },
  { id: 24, emoji: '🏆', name: 'Trophy', cost: 80 },
  { id: 25, emoji: '👑', name: 'Crown', cost: 100 },
  { id: 26, emoji: '💍', name: 'Ring', cost: 120 },
  { id: 27, emoji: '🌺', name: 'Flower Bouquet', cost: 130 },
  { id: 28, emoji: '🎭', name: 'Theater Masks', cost: 140 },
  { id: 29, emoji: '🎪', name: 'Circus', cost: 150 },
  { id: 30, emoji: '🎨', name: 'Art Palette', cost: 160 },
  { id: 31, emoji: '🎬', name: 'Movie Camera', cost: 180 },
  { id: 32, emoji: '🎯', name: 'Bullseye', cost: 200 },
  
  // Premium gifts (250-500 coins) - Luxurious
  { id: 33, emoji: '💰', name: 'Money Bag', cost: 250 },
  { id: 34, emoji: '🏅', name: 'Gold Medal', cost: 280 },
  { id: 35, emoji: '🦋', name: 'Butterfly', cost: 300 },
  { id: 36, emoji: '🌸', name: 'Cherry Blossom', cost: 320 },
  { id: 37, emoji: '🎆', name: 'Fireworks', cost: 350 },
  { id: 38, emoji: '✨', name: 'Sparkles', cost: 380 },
  { id: 39, emoji: '🌠', name: 'Shooting Star', cost: 400 },
  { id: 40, emoji: '🎇', name: 'Sparkler', cost: 420 },
  { id: 41, emoji: '🔮', name: 'Crystal Ball', cost: 450 },
  { id: 42, emoji: '💫', name: 'Dizzy Star', cost: 500 },
  
  // Ultra Premium gifts (600-1000 coins) - Most luxurious
  { id: 43, emoji: '🦄', name: 'Unicorn', cost: 600 },
  { id: 44, emoji: '🎪', name: 'Carnival', cost: 650 },
  { id: 45, emoji: '🏰', name: 'Castle', cost: 700 },
  { id: 46, emoji: '🚀', name: 'Rocket', cost: 750 },
  { id: 47, emoji: '🌌', name: 'Milky Way', cost: 800 },
  { id: 48, emoji: '🎠', name: 'Carousel', cost: 850 },
  { id: 49, emoji: '🎡', name: 'Ferris Wheel', cost: 900 },
  { id: 50, emoji: '🌃', name: 'Night City', cost: 950 },
  { id: 51, emoji: '🎆', name: 'Grand Fireworks', cost: 1000 },
  
  // Elite Premium gifts (1250-3000 coins) - Ultimate luxury
  { id: 52, emoji: '🎰', name: 'Jackpot', cost: 1250 },
  { id: 53, emoji: '🦚', name: 'Peacock', cost: 1500 },
  { id: 54, emoji: '🐉', name: 'Dragon', cost: 1850 },
  { id: 55, emoji: '🗼', name: 'Eiffel Tower', cost: 2000 },
  { id: 56, emoji: '⚜️', name: 'Royal Emblem', cost: 2500 },
  { id: 57, emoji: '🏛️', name: 'Palace', cost: 3000 },
];

interface ChatConversationProps {
  name: string;
  avatar: string;
  isOnline: boolean;
  onBack: () => void;
  onVideoCall?: () => void;
}

const initialMessages: Message[] = [
  {
    id: 1,
    text: 'Hi there! How have you been?',
    timestamp: '10:00 PM',
    isOwn: false
  },
  {
    id: 2,
    text: 'Hey! I have been great, thanks for asking!',
    timestamp: '10:02 PM',
    isOwn: true
  },
  {
    id: 3,
    text: 'That is awesome! Want to catch up later?',
    timestamp: '10:05 PM',
    isOwn: false
  },
  {
    id: 4,
    text: 'Sure! What time works for you?',
    timestamp: '10:07 PM',
    isOwn: true
  },
  {
    id: 5,
    text: 'How about 8pm tomorrow?',
    timestamp: '10:10 PM',
    isOwn: false
  },
  {
    id: 6,
    text: 'Perfect! That works great for me',
    timestamp: '10:12 PM',
    isOwn: true
  },
  {
    id: 7,
    text: 'Awesome! Should we meet at the usual place?',
    timestamp: '10:15 PM',
    isOwn: false
  },
  {
    id: 8,
    text: 'Yes, that sounds good!',
    timestamp: '10:18 PM',
    isOwn: true
  },
  {
    id: 9,
    text: 'Great! Looking forward to it 😊',
    timestamp: '10:20 PM',
    isOwn: false
  },
  {
    id: 10,
    text: 'Me too! See you then',
    timestamp: '10:22 PM',
    isOwn: true
  },
  {
    id: 11,
    text: 'By the way, did you finish that project?',
    timestamp: '10:25 PM',
    isOwn: false
  },
  {
    id: 12,
    text: 'Yes! Just submitted it yesterday',
    timestamp: '10:27 PM',
    isOwn: true
  },
  {
    id: 13,
    text: 'That is amazing! How did it go?',
    timestamp: '10:30 PM',
    isOwn: false
  },
  {
    id: 14,
    text: 'It went really well actually! I am happy with the results',
    timestamp: '10:32 PM',
    isOwn: true
  },
  {
    id: 15,
    text: 'I knew you would do great! 🎉',
    timestamp: '10:35 PM',
    isOwn: false
  },
  {
    id: 16,
    text: 'Thanks! Your support really helped',
    timestamp: '10:37 PM',
    isOwn: true
  },
  {
    id: 17,
    text: 'Anytime! That is what friends are for',
    timestamp: '10:40 PM',
    isOwn: false
  },
  {
    id: 18,
    text: 'So what have you been up to lately?',
    timestamp: '10:42 PM',
    isOwn: true
  },
  {
    id: 19,
    text: 'Not much, just working on some new ideas',
    timestamp: '10:45 PM',
    isOwn: false
  },
  {
    id: 20,
    text: 'Oh really? Tell me more!',
    timestamp: '10:47 PM',
    isOwn: true
  },
  {
    id: 21,
    text: 'Well, I have been thinking about starting a new business',
    timestamp: '10:50 PM',
    isOwn: false
  },
  {
    id: 22,
    text: 'That sounds exciting! What kind of business?',
    timestamp: '10:52 PM',
    isOwn: true
  },
  {
    id: 23,
    text: 'Something in the tech space, still working out the details',
    timestamp: '10:55 PM',
    isOwn: false
  },
  {
    id: 24,
    text: 'I would love to hear more about it tomorrow!',
    timestamp: '10:57 PM',
    isOwn: true
  },
  {
    id: 25,
    text: 'Definitely! I will tell you all about it',
    timestamp: '11:00 PM',
    isOwn: false
  },
  {
    id: 26,
    text: "Can't wait! This is going to be interesting",
    timestamp: '11:02 PM',
    isOwn: true
  },
  {
    id: 27,
    text: 'I hope so! I am really passionate about this idea',
    timestamp: '11:05 PM',
    isOwn: false
  },
  {
    id: 28,
    text: 'That is the most important thing!',
    timestamp: '11:07 PM',
    isOwn: true
  },
  {
    id: 29,
    text: 'Exactly! Passion drives everything',
    timestamp: '11:10 PM',
    isOwn: false
  },
  {
    id: 30,
    text: 'Hey! How are you doing? 😊',
    timestamp: '11:12 PM',
    isOwn: false
  }
];

export function ChatConversation({ name, avatar, isOnline, onBack, onVideoCall }: ChatConversationProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [showGiftModal, setShowGiftModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when new messages are added
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Get current time in format like "10:00 PM"
  const getCurrentTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutesStr} ${ampm}`;
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      timestamp: getCurrentTime(),
      isOwn: true
    };

    setMessages([...messages, newMessage]);
    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleSendGift = (gift: Gift) => {
    const newMessage: Message = {
      id: messages.length + 1,
      text: `You sent a ${gift.name}`,
      timestamp: getCurrentTime(),
      isOwn: true,
      isGift: true,
      giftEmoji: gift.emoji,
      giftName: gift.name,
      giftCost: gift.cost
    };

    setMessages([...messages, newMessage]);
    setShowGiftModal(false);
  };

  return (
    <div className="relative z-10 h-screen flex flex-col" style={{ background: 'rgba(5, 15, 35, 0.9)' }}>
      {/* Chat Header - Fixed */}
      <div className="flex-shrink-0 px-4 py-3 flex items-center justify-between border-b border-white/10" style={{ background: 'rgba(5, 15, 35, 0.9)' }}>
        <div className="flex items-center gap-3 flex-1">
          {/* Back Button */}
          <button onClick={onBack} className="text-white/70 hover:text-white">
            <ArrowLeft 
              className="w-6 h-6"
              style={{
                filter: 'drop-shadow(0 0 4px rgba(0, 255, 255, 0.6)) drop-shadow(0 0 8px rgba(255, 0, 153, 0.4)) drop-shadow(0 0 12px rgba(138, 43, 226, 0.3))'
              }}
            />
          </button>

          {/* Profile Picture */}
          <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0"
            style={{
              boxShadow: '0 0 8px rgba(135, 206, 250, 0.8), 0 0 12px rgba(255, 255, 255, 0.7), 0 0 16px rgba(255, 215, 0, 0.5)'
            }}
          >
            <img
              src={avatar}
              alt={name}
              className="w-full h-full object-cover"
            />
            {/* Status Dot - Green for Online, Dark Grey for Offline - Cutting into profile */}
            <div className={`absolute w-2.5 h-2.5 rounded-full ${
              isOnline ? 'bg-green-500' : 'bg-gray-600'
            }`} style={{ bottom: '2px', right: '2px' }}></div>
          </div>

          {/* Name and Status */}
          <div className="flex-1 min-w-0">
            <h2 className="text-white font-medium">{name}</h2>
            <p className={`text-xs ${isOnline ? 'text-green-500' : 'text-red-500'}`}>
              {isOnline ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Only show video call button when user is online */}
          {isOnline && (
            <button 
              onClick={onVideoCall}
              className="flex items-center justify-center hover:scale-110 transition-transform"
              aria-label="Video Call"
            >
              <img src={cameraIconImage} alt="Video Call" className="w-10 h-10 object-contain" />
            </button>
          )}
          <button className="text-white/70 hover:text-white">
            <MoreVertical className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Messages Container - Scrollable */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4" style={{ background: 'rgba(5, 15, 35, 0.9)' }}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'} gap-2`}
          >
            {!message.isOwn && (
              <div 
                className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0"
                style={{
                  boxShadow: '0 0 8px rgba(135, 206, 250, 0.8), 0 0 12px rgba(255, 255, 255, 0.7), 0 0 16px rgba(255, 215, 0, 0.5)'
                }}
              >
                <img
                  src={avatar}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className={`flex flex-col ${message.isOwn ? 'items-end' : 'items-start'} max-w-[70%]`}>
              <div
                className={`px-4 py-2 rounded-2xl ${
                  message.isOwn
                    ? 'bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500'
                    : 'bg-white/10'
                }`}
              >
                {message.isGift ? (
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{message.giftEmoji}</span>
                    <div>
                      <p className="text-white font-bold">{message.text}</p>
                      <p className="text-white/80 text-sm">{message.giftCost} coins</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-white">{message.text}</p>
                )}
              </div>
              <span className="text-xs text-white/50 mt-1">{message.timestamp}</span>
            </div>
          </div>
        ))}
        {/* Invisible div for auto-scrolling */}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input Bar - Fixed */}
      <div className="flex-shrink-0 px-4 py-3 border-t border-white/10" style={{ background: 'rgba(5, 15, 35, 0.9)' }}>
        {/* SVG Gradient Definition for Paperclip */}
        <svg width="0" height="0" style={{ position: 'absolute' }}>
          <defs>
            <linearGradient id="paperclipGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#FFF176', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: '#FFE66D', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#FFED4E', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
        </svg>
        
        <div className="flex items-center gap-2">
          {/* Attachment Icon with Light Gold Neon Gradient */}
          <button className="flex-shrink-0">
            <Paperclip 
              className="w-5 h-5"
              style={{
                stroke: 'url(#paperclipGradient)',
                filter: 'drop-shadow(0 0 4px rgba(255, 237, 78, 0.8)) drop-shadow(0 0 6px rgba(255, 230, 109, 0.6))',
                strokeWidth: 2
              }}
            />
          </button>

          {/* Input Field with Neon Outline */}
          <div 
            className="flex-1 rounded-full p-[1px]"
            style={{
              background: 'linear-gradient(135deg, #ff0099 0%, #dd00ff 50%, #00ffff 100%)'
            }}
          >
            <input
              type="text"
              placeholder="Type a message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full bg-white/10 rounded-full px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none"
              style={{
                background: 'rgba(5, 15, 35, 0.9)'
              }}
            />
          </div>

          {/* Neon Gift Box Image */}
          <button 
            onClick={() => setShowGiftModal(true)}
            className="flex-shrink-0 ml-2"
          >
            <img 
              src={giftBoxImage} 
              alt="Gift" 
              className="w-9 h-9 object-contain"
              style={{
                filter: 'drop-shadow(0 0 4px rgba(0, 255, 255, 0.6)) drop-shadow(0 0 8px rgba(255, 0, 153, 0.4)) drop-shadow(0 0 12px rgba(138, 43, 226, 0.3))'
              }}
            />
          </button>

          {/* Send Button */}
          <button 
            onClick={handleSendMessage}
            className="flex-shrink-0 -ml-1 hover:scale-110 transition-transform"
          >
            <img 
              src={sendIconImage} 
              alt="Send" 
              className="w-14 h-14 object-contain"
              style={{
                filter: 'drop-shadow(0 0 6px rgba(0, 255, 255, 0.8)) drop-shadow(0 0 12px rgba(255, 0, 153, 0.6)) drop-shadow(0 0 18px rgba(138, 43, 226, 0.5))'
              }}
            />
          </button>
        </div>
      </div>

      {/* Gift Selection Modal */}
      {showGiftModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end justify-center max-w-[430px] mx-auto">
          <div className="bg-gradient-to-b from-[#1a1a2e] to-[#0a0f23] rounded-t-3xl w-full max-h-[70vh] overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
              <h3 className="text-white text-xl font-bold">Send a Gift</h3>
              <button
                onClick={() => setShowGiftModal(false)}
                className="text-white/60 hover:text-white text-2xl font-bold"
              >
                ×
              </button>
            </div>

            {/* Gift Grid - Scrollable */}
            <div className="overflow-y-auto max-h-[calc(70vh-80px)] p-4">
              <div className="grid grid-cols-3 gap-3">
                {giftOptions.map((gift) => (
                  <button
                    key={gift.id}
                    onClick={() => handleSendGift(gift)}
                    className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-400 rounded-2xl p-4 flex flex-col items-center gap-2 transition-all hover:scale-105"
                  >
                    <span className="text-5xl">{gift.emoji}</span>
                    <p className="text-white text-xs font-bold text-center line-clamp-1">{gift.name}</p>
                    <div 
                      className="px-2 py-1 rounded-full text-xs font-bold text-white"
                      style={{
                        background: 'linear-gradient(135deg, #ff0099 0%, #dd00ff 50%, #00ffff 100%)'
                      }}
                    >
                      {gift.cost} 💎
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}