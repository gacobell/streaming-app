import { PersonCard } from '../components/PersonCard';
import { Search, X } from 'lucide-react';
import { useState } from 'react';

interface SearchPageProps {
  onClose: () => void;
}

const searchResults = [
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
    name: 'GLOW',
    gender: 'female' as const,
    age: 22,
    imageUrl: 'https://images.unsplash.com/photo-1694299352873-0c29d862e87a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHdvbWFuJTIwc21pbGluZ3xlbnwxfHx8fDE3NTk0MTQ2NzR8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 5,
    name: 'Catt888',
    gender: 'male' as const,
    age: 26,
    imageUrl: 'https://images.unsplash.com/photo-1597202992582-9ee5c6672095?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMG1hbiUyMGNhc3VhbHxlbnwxfHx8fDE3NTkzODQyMTR8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 6,
    name: 'LuxeVibe',
    gender: 'female' as const,
    age: 25,
    imageUrl: 'https://images.unsplash.com/photo-1696659958441-fd72cc30db89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHdvbWFuJTIwZmFzaGlvbnxlbnwxfHx8fDE3NTk0NjE3NjB8MA&ixlib=rb-4.1.0&q=80&w=1080'
  }
];

export function SearchPage({ onClose }: SearchPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(true);

  return (
    <div className="relative z-10 min-h-screen">
      {/* Search Header - Sticky */}
      <div className="sticky top-0 z-10 bg-[#1a1a2e] border-b border-white/10 p-3">
        {/* Search Bar */}
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            {/* Gradient Border Wrapper */}
            <div 
              className="rounded-full p-[2px] transition-all"
              style={{
                background: isFocused 
                  ? 'linear-gradient(90deg, #ff0099 0%, #dd00ff 50%, #00ffff 100%)'
                  : 'rgba(255, 255, 255, 0.2)',
                boxShadow: isFocused 
                  ? '0 0 12px rgba(255, 0, 153, 0.4), 0 0 20px rgba(0, 255, 255, 0.3)'
                  : 'none'
              }}
            >
              <div className="relative bg-black/30 rounded-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50 z-10" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className="w-full bg-transparent rounded-full pl-10 pr-4 py-2 text-white placeholder:text-white/50 focus:outline-none"
                  autoFocus
                />
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Search Results */}
      <div className="p-2">
        {searchQuery ? (
          // Show filtered results when searching
          <div className="grid grid-cols-2 gap-2">
            {searchResults
              .filter((person) =>
                person.name.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((person) => (
                <PersonCard
                  key={person.id}
                  imageUrl={person.imageUrl}
                  name={person.name}
                  gender={person.gender}
                  age={person.age}
                />
              ))}
          </div>
        ) : (
          // Show all results when search is empty
          <div className="grid grid-cols-2 gap-2">
            {searchResults.map((person) => (
              <PersonCard
                key={person.id}
                imageUrl={person.imageUrl}
                name={person.name}
                gender={person.gender}
                age={person.age}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
