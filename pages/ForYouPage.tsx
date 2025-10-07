import { PersonCard } from '../components/PersonCard';

const people = [
  {
    id: 1,
    name: 'Cestrum',
    gender: 'female' as const,
    age: 24,
    isLive: true,
    isOnline: true,
    imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHdvbWFufGVufDF8fHx8MTc1OTQ1OTQzOXww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 2,
    name: 'Paloma Pervil',
    gender: 'male' as const,
    age: 28,
    isLive: false,
    isOnline: false,
    imageUrl: 'https://images.unsplash.com/photo-1623366302587-b38b1ddaefd9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMG1hbnxlbnwxfHx8fDE3NTk0MjA1OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 3,
    name: 'GLOW',
    gender: 'female' as const,
    age: 22,
    isLive: true,
    isOnline: true,
    imageUrl: 'https://images.unsplash.com/photo-1694299352873-0c29d862e87a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHdvbWFuJTIwc21pbGluZ3xlbnwxfHx8fDE3NTk0MTQ2NzR8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 4,
    name: 'Catt888',
    gender: 'male' as const,
    age: 26,
    isLive: false,
    isOnline: true,
    imageUrl: 'https://images.unsplash.com/photo-1597202992582-9ee5c6672095?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMG1hbiUyMGNhc3VhbHxlbnwxfHx8fDE3NTkzODQyMTR8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 5,
    name: 'Olivia',
    gender: 'female' as const,
    age: 21,
    isLive: true,
    isOnline: true,
    imageUrl: 'https://images.unsplash.com/photo-1687456338499-54d3de388a98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHlvdW5nJTIwd29tYW58ZW58MXx8fHwxNzU5NDQ1NzM2fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 6,
    name: 'James',
    gender: 'male' as const,
    age: 30,
    isLive: false,
    isOnline: true,
    imageUrl: 'https://images.unsplash.com/photo-1596690097396-bb75a1d6c807?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHlvdW5nJTIwbWFufGVufDF8fHx8MTc1OTM5MjgxN3ww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 7,
    name: 'LuxeVibe',
    gender: 'female' as const,
    age: 25,
    isLive: true,
    isOnline: true,
    imageUrl: 'https://images.unsplash.com/photo-1696659958441-fd72cc30db89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHdvbWFuJTIwZmFzaGlvbnxlbnwxfHx8fDE3NTk0NjE3NjB8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 8,
    name: 'Neo_Matrix',
    gender: 'male' as const,
    age: 27,
    isLive: false,
    isOnline: false,
    imageUrl: 'https://images.unsplash.com/photo-1620681980845-a4afcfff9fea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMG1hbiUyMHN0eWxlfGVufDF8fHx8MTc1OTQ2MTc2MHww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 9,
    name: 'StarryNight',
    gender: 'female' as const,
    age: 23,
    isLive: true,
    isOnline: true,
    imageUrl: 'https://images.unsplash.com/photo-1669689290695-7f0efe5d4c8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHdvbWFuJTIwaGFwcHl8ZW58MXx8fHwxNzU5NDYxNzY0fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 10,
    name: 'Alex_Dash',
    gender: 'male' as const,
    age: 29,
    isLive: false,
    isOnline: true,
    imageUrl: 'https://images.unsplash.com/photo-1609846685336-9cb06880bb48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMG1hbiUyMGNvbmZpZGVudHxlbnwxfHx8fDE3NTk0NjE3NjV8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 11,
    name: 'Violet_Sky',
    gender: 'female' as const,
    age: 26,
    isLive: true,
    isOnline: true,
    imageUrl: 'https://images.unsplash.com/photo-1637690076866-c4809faa5d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHdvbWFuJTIwZWxlZ2FudHxlbnwxfHx8fDE3NTkzNjMxNjh8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 12,
    name: 'Phoenix_Reign',
    gender: 'male' as const,
    age: 31,
    isLive: false,
    isOnline: false,
    imageUrl: 'https://images.unsplash.com/photo-1701503098048-671c0a40d458?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMG1hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc1OTQ2MTc2NXww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 13,
    name: 'Ruby_Rose',
    gender: 'female' as const,
    age: 24,
    isLive: false,
    isOnline: true,
    imageUrl: 'https://images.unsplash.com/photo-1613730317928-246094cb6a82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHdvbWFuJTIwY2xvc2V1cHxlbnwxfHx8fDE3NTk0NjE3NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 14,
    name: 'TitanX',
    gender: 'male' as const,
    age: 28,
    isLive: true,
    isOnline: true,
    imageUrl: 'https://images.unsplash.com/photo-1639372015358-a530d7fe08cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMG1hbiUyMGNsb3NldXB8ZW58MXx8fHwxNzU5NDYxNzY2fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 15,
    name: 'MysticMoon',
    gender: 'female' as const,
    age: 22,
    isLive: false,
    isOnline: false,
    imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHdvbWFufGVufDF8fHx8MTc1OTQ1OTQzOXww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 16,
    name: 'Blaze_King',
    gender: 'male' as const,
    age: 25,
    isLive: true,
    isOnline: true,
    imageUrl: 'https://images.unsplash.com/photo-1623366302587-b38b1ddaefd9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMG1hbnxlbnwxfHx8fDE3NTk0MjA1OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 17,
    name: 'Crystal_Wave',
    gender: 'female' as const,
    age: 27,
    isLive: false,
    isOnline: true,
    imageUrl: 'https://images.unsplash.com/photo-1694299352873-0c29d862e87a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHdvbWFuJTIwc21pbGluZ3xlbnwxfHx8fDE3NTk0MTQ2NzR8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 18,
    name: 'Cyber_Wolf',
    gender: 'male' as const,
    age: 32,
    isLive: false,
    isOnline: false,
    imageUrl: 'https://images.unsplash.com/photo-1597202992582-9ee5c6672095?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMG1hbiUyMGNhc3VhbHxlbnwxfHx8fDE3NTkzODQyMTR8MA&ixlib=rb-4.1.0&q=80&w=1080'
  }
];

interface ForYouPageProps {
  onOpenLiveStream?: (person: { name: string; imageUrl: string }) => void;
  onVideoCall?: (name: string, imageUrl: string, coinRate: number, isOnline: boolean) => void;
}

export function ForYouPage({ onOpenLiveStream, onVideoCall }: ForYouPageProps) {
  return (
    <div className="relative z-10 p-2">
      <div className="grid grid-cols-2 gap-2">
        {people.map((person) => (
          <PersonCard
            key={person.id}
            imageUrl={person.imageUrl}
            name={person.name}
            gender={person.gender}
            age={person.age}
            isLive={person.isLive}
            onLiveClick={
              person.isLive && onOpenLiveStream
                ? () => onOpenLiveStream({ name: person.name, imageUrl: person.imageUrl })
                : undefined
            }
            onVideoCall={
              onVideoCall
                ? () => onVideoCall(person.name, person.imageUrl, 10, person.isOnline) // Pass isOnline status
                : undefined
            }
          />
        ))}
      </div>
    </div>
  );
}
