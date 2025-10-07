import { PersonCard } from '../components/PersonCard';
import { UserPlus } from 'lucide-react';

interface FollowedUser {
  name: string;
  imageUrl: string;
  gender: 'male' | 'female';
  age: number;
  isLive?: boolean;
}

interface FollowingPageProps {
  followedUsers: FollowedUser[];
  onOpenLiveStream?: (name: string, imageUrl: string) => void;
  onOpenProfile?: (name: string, imageUrl: string) => void;
}

export function FollowingPage({ followedUsers, onOpenLiveStream, onOpenProfile }: FollowingPageProps) {
  // Separate into live and offline
  const liveUsers = followedUsers.filter(user => user.isLive);
  const offlineUsers = followedUsers.filter(user => !user.isLive);

  // Empty state for new users
  if (followedUsers.length === 0) {
    return (
      <div className="relative z-10 p-6 min-h-[calc(100vh-136px)] flex flex-col items-center justify-center">
        <div className="w-24 h-24 rounded-full bg-white/5 border-2 border-white/10 flex items-center justify-center mb-6">
          <UserPlus className="w-12 h-12 text-white/40" />
        </div>
        <h3 className="text-white text-xl font-bold mb-2">No Following Yet</h3>
        <p className="text-white/60 text-center text-sm mb-6 max-w-xs">
          Follow streamers to see their content here. Click the follow button on any profile or live stream!
        </p>
        <div className="bg-purple-500/10 border border-purple-400/30 rounded-xl p-4 w-full max-w-sm">
          <p className="text-purple-400 text-sm text-center">
            💡 <span className="font-bold">Tip:</span> Explore the "For You" tab to discover amazing streamers!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-10 p-3 pb-20 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 136px)' }}>
      {/* Live Now Section */}
      <div className="mb-4">
        <h2 className="text-white font-bold mb-3">
          <span className="text-red-500">●</span> Live Now - Following ({liveUsers.length})
        </h2>
        {liveUsers.length === 0 ? (
          <div className="grid grid-cols-2 gap-2 min-h-[200px]">
            {/* Empty space placeholder */}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {liveUsers.map((person, index) => (
              <PersonCard
                key={`${person.name}-${index}`}
                imageUrl={person.imageUrl}
                name={person.name}
                gender={person.gender}
                age={person.age}
                onClick={() => onOpenLiveStream?.(person.name, person.imageUrl)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Offline Section */}
      <div>
        <h2 className="text-white font-bold mb-3">
          Offline - Following ({offlineUsers.length})
        </h2>
        {offlineUsers.length === 0 ? (
          <div className="grid grid-cols-2 gap-2 min-h-[200px]">
            {/* Empty space placeholder */}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {offlineUsers.map((person, index) => (
              <PersonCard
                key={`${person.name}-${index}`}
                imageUrl={person.imageUrl}
                name={person.name}
                gender={person.gender}
                age={person.age}
                showOnlineBadge={false}
                showCameraButton={false}
                onClick={() => onOpenProfile?.(person.name, person.imageUrl)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
