import { StatusBar } from './StatusBar';
import { TopBar } from './TopBar';
import bannerImage from 'figma:asset/7bd8c229ddaf8d7bb4e42743ee7b3cfb1cacc2d6.png';

interface HeaderProps {
  currentTab: 'forYou' | 'following' | 'explore' | 'coins' | 'chats' | 'wallet';
  onTabChange: (tab: 'forYou' | 'following' | 'explore' | 'coins' | 'chats' | 'wallet') => void;
  onWalletClick?: () => void;
  onProfileClick?: () => void;
}

export function Header({ currentTab, onTabChange, onWalletClick, onProfileClick }: HeaderProps) {
  return (
    <div className="w-full relative h-[136px] flex-shrink-0">
      {/* Single Background Image for entire header */}
      <div 
        className="absolute inset-0 bg-cover bg-no-repeat"
        style={{ 
          backgroundImage: `url(${bannerImage})`,
          backgroundPosition: 'center 75%'
        }}
      />
      
      {/* Dark Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20" />
      
      {/* Content */}
      <div className="relative z-10">
        <StatusBar />
        <TopBar currentTab={currentTab} onTabChange={onTabChange} onWalletClick={onWalletClick} onProfileClick={onProfileClick} />
      </div>
    </div>
  );
}
