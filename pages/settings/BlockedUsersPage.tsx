import { ArrowLeft, UserX } from 'lucide-react';
import { useState } from 'react';

interface BlockedUsersPageProps {
  onBack: () => void;
}

interface BlockedUser {
  id: number;
  name: string;
  username: string;
  avatar: string;
}

const mockBlockedUsers: BlockedUser[] = [
  {
    id: 1,
    name: 'John Doe',
    username: '@johndoe',
    avatar: 'https://images.unsplash.com/photo-1623366302587-b38b1ddaefd9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMG1hbnxlbnwxfHx8fDE3NTk0MjA1OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 2,
    name: 'Jane Smith',
    username: '@janesmith',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHdvbWFufGVufDF8fHx8MTc1OTQ1OTQzOXww&ixlib=rb-4.1.0&q=80&w=1080'
  }
];

export function BlockedUsersPage({ onBack }: BlockedUsersPageProps) {
  const [blockedUsers, setBlockedUsers] = useState<BlockedUser[]>(mockBlockedUsers);

  const handleUnblock = (userId: number) => {
    setBlockedUsers(blockedUsers.filter(user => user.id !== userId));
  };

  return (
    <div className="relative z-10 min-h-screen flex flex-col" style={{ background: 'rgba(5, 15, 35, 0.9)' }}>
      {/* Header */}
      <div className="px-4 py-4 flex items-center gap-4 border-b border-white/10">
        <button onClick={onBack} className="text-white/70 hover:text-white">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-white text-2xl font-bold">Blocked Users</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {blockedUsers.length === 0 ? (
          <div className="text-center py-12">
            <UserX className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <h3 className="text-white font-bold text-lg mb-2">No Blocked Users</h3>
            <p className="text-white/60 text-sm">You haven't blocked anyone yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {blockedUsers.map((user) => (
              <div key={user.id} className="bg-white/5 rounded-xl p-4 border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-full overflow-hidden"
                    style={{
                      boxShadow: '0 0 8px rgba(135, 206, 250, 0.8), 0 0 12px rgba(255, 255, 255, 0.7), 0 0 16px rgba(255, 215, 0, 0.5)'
                    }}
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-white font-bold">{user.name}</p>
                    <p className="text-white/60 text-sm">{user.username}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleUnblock(user.id)}
                  className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 font-bold hover:bg-red-500/30 transition-colors"
                >
                  Unblock
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}