import { Search, Edit3, MoreVertical, X, Trash2 } from 'lucide-react';
import { ChatConversation } from '../components/ChatConversation';
import { useState } from 'react';

interface ChatMessage {
  id: number;
  name: string;
  message: string;
  timestamp: string;
  avatar: string;
  isOnline: boolean;
  unreadCount?: number;
}

const chatMessages: ChatMessage[] = [
  {
    id: 1,
    name: 'Sarah Martinez',
    message: 'Hey! How are you doing? 😊',
    timestamp: '11:01 PM',
    avatar: 'https://images.unsplash.com/photo-1589729482945-ca6f3a235f7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHdvbWFuJTIwaGVhZHNob3R8ZW58MXx8fHwxNzU5NDcxNjUzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    isOnline: true,
    unreadCount: 3
  },
  {
    id: 2,
    name: 'Emma Rose',
    message: 'That sounds great! Let me know',
    timestamp: '10:36 PM',
    avatar: 'https://images.unsplash.com/photo-1672462478040-a5920e2c23d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHdvbWFuJTIwc21pbGV8ZW58MXx8fHwxNzU5Mzc2MDUyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    isOnline: true
  },
  {
    id: 3,
    name: 'Lava 777',
    message: 'Thanks for the update!',
    timestamp: '9:06 PM',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHdvbWFufGVufDF8fHx8MTc1OTQ1OTQzOXww&ixlib=rb-4.1.0&q=80&w=1080',
    isOnline: false,
    unreadCount: 1
  },
  {
    id: 4,
    name: 'Sophie Chen',
    message: 'See you tomorrow!',
    timestamp: '6:06 PM',
    avatar: 'https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMG1hbiUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NTk0MTQ2NzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    isOnline: true
  },
  {
    id: 5,
    name: 'Maria Garcia',
    message: 'I will send you the files later',
    timestamp: 'Oct 1',
    avatar: 'https://images.unsplash.com/photo-1597202992582-9ee5c6672095?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMG1hbiUyMGNhc3VhbHxlbnwxfHx8fDE3NTkzODQyMTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    isOnline: false
  },
  {
    id: 6,
    name: 'Alex Kim',
    message: 'Perfect! Talk to you soon',
    timestamp: 'Oct 1',
    avatar: 'https://images.unsplash.com/photo-1589729482945-ca6f3a235f7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHdvbWFuJTIwaGVhZHNob3R8ZW58MXx8fHwxNzU5NDcxNjUzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    isOnline: true,
    unreadCount: 2
  },
  {
    id: 7,
    name: 'Jessica Lane',
    message: 'Can we reschedule?',
    timestamp: 'Sep 30',
    avatar: 'https://images.unsplash.com/photo-1672462478040-a5920e2c23d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHdvbWFuJTIwc21pbGV8ZW58MXx8fHwxNzU5Mzc2MDUyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    isOnline: false
  },
  {
    id: 8,
    name: 'Ryan Taylor',
    message: 'Got it, thanks!',
    timestamp: 'Sep 29',
    avatar: 'https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMG1hbiUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NTk0MTQ2NzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    isOnline: true
  },
  {
    id: 9,
    name: 'Nina Patel',
    message: 'Looking forward to it!',
    timestamp: 'Sep 28',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHdvbWFufGVufDF8fHx8MTc1OTQ1OTQzOXww&ixlib=rb-4.1.0&q=80&w=1080',
    isOnline: false,
    unreadCount: 5
  },
  {
    id: 10,
    name: 'David Wong',
    message: 'Sounds good to me',
    timestamp: 'Sep 27',
    avatar: 'https://images.unsplash.com/photo-1597202992582-9ee5c6672095?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMG1hbiUyMGNhc3VhbHxlbnwxfHx8fDE3NTkzODQyMTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    isOnline: true
  }
];

interface ChatsPageProps {
  onVideoCall?: (name: string, imageUrl: string) => void;
}

export function ChatsPage({ onVideoCall }: ChatsPageProps) {
  const [selectedChat, setSelectedChat] = useState<ChatMessage | null>(null);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [chats, setChats] = useState<ChatMessage[]>(chatMessages);
  const [selectedChatIds, setSelectedChatIds] = useState<number[]>([]);

  // If a chat is selected, show the conversation view
  if (selectedChat) {
    return (
      <ChatConversation
        name={selectedChat.name}
        avatar={selectedChat.avatar}
        isOnline={selectedChat.isOnline}
        onBack={() => setSelectedChat(null)}
        onVideoCall={() => {
          if (onVideoCall) {
            onVideoCall(selectedChat.name, selectedChat.avatar);
          }
        }}
      />
    );
  }

  const handleToggleSelectChat = (chatId: number) => {
    setSelectedChatIds(prev => 
      prev.includes(chatId) 
        ? prev.filter(id => id !== chatId)
        : [...prev, chatId]
    );
  };

  const handleDeleteSelected = () => {
    setChats(chats.filter(chat => !selectedChatIds.includes(chat.id)));
    setSelectedChatIds([]);
    setIsDeleteMode(false);
  };

  const handleCancelDelete = () => {
    setIsDeleteMode(false);
    setSelectedChatIds([]);
  };

  return (
    <div className="relative z-10 min-h-screen flex flex-col" style={{ background: 'rgba(5, 15, 35, 0.9)' }}>
      {/* Chats Header */}
      <div className="px-4 py-4 flex items-center justify-between border-b border-white/10" style={{ background: 'rgba(5, 15, 35, 0.9)' }}>
        {isDeleteMode ? (
          <>
            <button 
              onClick={handleCancelDelete}
              className="text-white/70 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            <h1 className="text-xl text-white">
              {selectedChatIds.length > 0 ? `${selectedChatIds.length} Selected` : 'Select Chats'}
            </h1>
            <button 
              onClick={handleDeleteSelected}
              disabled={selectedChatIds.length === 0}
              className={`px-4 py-2 rounded-lg transition-all ${
                selectedChatIds.length > 0
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-white/10 text-white/30 cursor-not-allowed'
              }`}
            >
              Delete
            </button>
          </>
        ) : (
          <>
            <h1 className="text-2xl text-white font-bold">Chats</h1>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsDeleteMode(true)}
                className="text-white/70 hover:text-white"
              >
                <Edit3 className="w-5 h-5" />
              </button>
              <button className="text-white/70 hover:text-white">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </>
        )}
      </div>

      {/* Search Bar */}
      <div className="px-4 py-3 border-b border-white/10" style={{ background: 'rgba(5, 15, 35, 0.9)' }}>
        <div 
          className="rounded-full p-[2px]"
          style={{
            background: 'linear-gradient(135deg, #ff0099 0%, #dd00ff 50%, #00ffff 100%)',
            boxShadow: '0 0 8px rgba(255, 0, 153, 0.6), 0 0 12px rgba(0, 255, 255, 0.4)'
          }}
        >
          <div className="relative rounded-full overflow-hidden">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 z-10" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full rounded-full pl-10 pr-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none"
              style={{
                background: 'rgba(5, 15, 35, 0.9)'
              }}
            />
          </div>
        </div>
      </div>

      {/* Chat List - Scrollable */}
      <div className="flex-1 overflow-y-auto" style={{ background: 'rgba(5, 15, 35, 0.9)' }}>
        {chats.map((chat) => (
          <div
            key={chat.id}
            className="w-full px-4 py-3 flex items-start gap-3 hover:bg-white/5 transition-colors border-b border-white/10"
          >
            {/* Avatar with Online Status */}
            <button
              onClick={() => !isDeleteMode && setSelectedChat(chat)}
              className="relative flex-shrink-0"
            >
              <div 
                className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center"
                style={{
                  boxShadow: '0 0 8px rgba(135, 206, 250, 0.8), 0 0 12px rgba(255, 255, 255, 0.7), 0 0 16px rgba(255, 215, 0, 0.5)'
                }}
              >
                <div className="relative w-full h-full">
                  <img
                    src={chat.avatar}
                    alt={chat.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Status Dot - Green for Online only */}
                  {chat.isOnline && (
                    <div className="absolute w-2.5 h-2.5 rounded-full bg-green-500" style={{ bottom: '2px', right: '2px' }}></div>
                  )}
                </div>
              </div>
            </button>

            {/* Message Content */}
            <button
              onClick={() => !isDeleteMode && setSelectedChat(chat)}
              className="flex-1 min-w-0 text-left"
            >
              <h3 className="text-white font-medium mb-1">{chat.name}</h3>
              <p className="text-sm text-white/80 truncate">{chat.message}</p>
            </button>

            {/* Time/Date and Unread Badge or Checkbox Column */}
            <div className="flex flex-col items-end gap-1 flex-shrink-0">
              {isDeleteMode ? (
                <button
                  onClick={() => handleToggleSelectChat(chat.id)}
                  className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                    selectedChatIds.includes(chat.id)
                      ? 'bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500 border-transparent'
                      : 'border-white/40 bg-white/10'
                  }`}
                  style={selectedChatIds.includes(chat.id) ? {
                    boxShadow: '0 0 4px rgba(236, 72, 153, 1), 0 0 6px rgba(168, 85, 247, 0.9), 0 0 8px rgba(6, 182, 212, 0.8)'
                  } : undefined}
                >
                  {selectedChatIds.includes(chat.id) && (
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              ) : (
                <>
                  <span className="text-xs text-white/70">{chat.timestamp}</span>
                  {chat.unreadCount && (
                    <div 
                      className="w-6 h-6 bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500 rounded-full flex items-center justify-center"
                      style={{
                        boxShadow: '0 0 4px rgba(236, 72, 153, 1), 0 0 6px rgba(168, 85, 247, 0.9), 0 0 8px rgba(6, 182, 212, 0.8)'
                      }}
                    >
                      <span className="text-white text-xs">{chat.unreadCount}</span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
