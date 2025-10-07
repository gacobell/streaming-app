import { PersonCard } from '../components/PersonCard';
import { ExploreFilterBar } from '../components/ExploreFilterBar';
import { useState } from 'react';
import { UserPlus } from 'lucide-react';

interface FollowedUser {
  name: string;
  imageUrl: string;
  gender: 'male' | 'female';
  age: number;
  isLive?: boolean;
}

interface ExplorePageProps {
  onOpenSearch: () => void;
  followedUsers: FollowedUser[];
  onOpenLiveStream?: (name: string, imageUrl: string) => void;
  onOpenProfile?: (name: string, imageUrl: string) => void;
}

const explorePeople = [
  {
    id: 1,
    name: 'Luna_Star',
    gender: 'female' as const,
    age: 25,
    imageUrl: 'https://images.unsplash.com/photo-1679614819895-db411eef004e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHdvbWFuJTIwZ2xhbW91cnxlbnwxfHx8fDE3NTk0NjQ2MjV8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 2,
    name: 'Max_Thunder',
    gender: 'male' as const,
    age: 29,
    imageUrl: 'https://images.unsplash.com/photo-1561688961-7588856fe6ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMG1hbiUyMGhhbmRzb21lfGVufDF8fHx8MTc1OTQ2NDYyNXww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 3,
    name: 'Cestrum',
    gender: 'female' as const,
    age: 24,
    imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHdvbWFufGVufDF8fHx8MTc1OTQ1OTQzOXww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 4,
    name: 'Paloma Pervil',
    gender: 'male' as const,
    age: 28,
    imageUrl: 'https://images.unsplash.com/photo-1623366302587-b38b1ddaefd9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMG1hbnxlbnwxfHx8fDE3NTk0MjA1OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 5,
    name: 'GLOW',
    gender: 'female' as const,
    age: 22,
    imageUrl: 'https://images.unsplash.com/photo-1694299352873-0c29d862e87a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHdvbWFuJTIwc21pbGluZ3xlbnwxfHx8fDE3NTk0MTQ2NzR8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 6,
    name: 'Catt888',
    gender: 'male' as const,
    age: 26,
    imageUrl: 'https://images.unsplash.com/photo-1597202992582-9ee5c6672095?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMG1hbiUyMGNhc3VhbHxlbnwxfHx8fDE3NTkzODQyMTR8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 7,
    name: 'LuxeVibe',
    gender: 'female' as const,
    age: 25,
    imageUrl: 'https://images.unsplash.com/photo-1696659958441-fd72cc30db89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHdvbWFuJTIwZmFzaGlvbnxlbnwxfHx8fDE3NTk0NjE3NjB8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 8,
    name: 'Neo_Matrix',
    gender: 'male' as const,
    age: 27,
    imageUrl: 'https://images.unsplash.com/photo-1620681980845-a4afcfff9fea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMG1hbiUyMHN0eWxlfGVufDF8fHx8MTc1OTQ2MTc2MHww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 9,
    name: 'StarryNight',
    gender: 'female' as const,
    age: 23,
    imageUrl: 'https://images.unsplash.com/photo-1669689290695-7f0efe5d4c8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHdvbWFuJTIwaGFwcHl8ZW58MXx8fHwxNzU5NDYxNzY0fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 10,
    name: 'Alex_Dash',
    gender: 'male' as const,
    age: 29,
    imageUrl: 'https://images.unsplash.com/photo-1609846685336-9cb06880bb48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMG1hbiUyMGNvbmZpZGVudHxlbnwxfHx8fDE3NTk0NjE3NjV8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 11,
    name: 'Violet_Sky',
    gender: 'female' as const,
    age: 26,
    imageUrl: 'https://images.unsplash.com/photo-1637690076866-c4809faa5d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHdvbWFuJTIwZWxlZ2FudHxlbnwxfHx8fDE3NTkzNjMxNjh8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 12,
    name: 'Phoenix_Reign',
    gender: 'male' as const,
    age: 31,
    imageUrl: 'https://images.unsplash.com/photo-1701503098048-671c0a40d458?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMG1hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc1OTQ2MTc2NXww&ixlib=rb-4.1.0&q=80&w=1080'
  }
];

export function ExplorePage({ onOpenSearch, followedUsers, onOpenLiveStream, onOpenProfile }: ExplorePageProps) {
  const [activeFilter, setActiveFilter] = useState<'live' | 'hot' | 'new' | 'following'>('live');

  // Separate followed users into live and offline
  const liveFollowedUsers = followedUsers.filter(user => user.isLive);
  const offlineFollowedUsers = followedUsers.filter(user => !user.isLive);

  return (
    <div className="relative z-10">
      {/* Filter Bar - Sticky under header */}
      <ExploreFilterBar 
        activeFilter={activeFilter} 
        onFilterChange={setActiveFilter}
        onSearchClick={onOpenSearch}
      />
      
      {/* Conditional Content Based on Active Filter */}
      {activeFilter === 'following' ? (
        // Show Following Page Content (Identical to FollowingPage)
        followedUsers.length === 0 ? (
          // Empty State for new users
          <div className="p-6 min-h-[calc(100vh-200px)] flex flex-col items-center justify-center">
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
        ) : (
          <div className="p-3 pb-20 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
            {/* Live Now Section */}
            <div className="mb-4">
              <h2 className="text-white font-bold mb-3">
                <span className="text-red-500">●</span> Live Now - Following ({liveFollowedUsers.length})
              </h2>
              {liveFollowedUsers.length === 0 ? (
                <div className="grid grid-cols-2 gap-2 min-h-[200px]">
                  {/* Empty space placeholder */}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {liveFollowedUsers.map((person, index) => (
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
                Offline - Following ({offlineFollowedUsers.length})
              </h2>
              {offlineFollowedUsers.length === 0 ? (
                <div className="grid grid-cols-2 gap-2 min-h-[200px]">
                  {/* Empty space placeholder */}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {offlineFollowedUsers.map((person, index) => (
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
        )
      ) : (
        // Show Regular Explore Cards Grid for Live/Hot/New
        <div className="p-2">
          <div className="grid grid-cols-2 gap-2">
            {explorePeople.map((person) => (
              <PersonCard
                key={person.id}
                imageUrl={person.imageUrl}
                name={person.name}
                gender={person.gender}
                age={person.age}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
