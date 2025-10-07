import { ImageWithFallback } from './figma/ImageWithFallback';
import cameraIconImage from 'figma:asset/0005539bc9cd312565f8519880dd7acaccebd9da.png';

interface PersonCardProps {
  imageUrl: string;
  name: string;
  gender: 'male' | 'female';
  age: number;
  showOnlineBadge?: boolean;
  showCameraButton?: boolean;
  isLive?: boolean;
  onLiveClick?: () => void;
  onVideoCall?: () => void;
  onClick?: () => void;
}

export function PersonCard({ imageUrl, name, gender, age, showOnlineBadge = true, showCameraButton = true, isLive = false, onLiveClick, onVideoCall, onClick }: PersonCardProps) {
  const isFemale = gender === 'female';
  
  const handleCardClick = () => {
    if (onClick) {
      onClick();
    } else if (isLive && onLiveClick) {
      onLiveClick();
    }
  };

  const handleVideoCallClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    if (onVideoCall) {
      onVideoCall();
    }
  };
  
  return (
    <div 
      className={`relative w-full aspect-[3/4] overflow-hidden rounded-lg border-2 border-white/10 shadow-lg ${(isLive || onClick) ? 'cursor-pointer' : ''}`}
      onClick={handleCardClick}
    >
      {/* Person Image */}
      <ImageWithFallback
        src={imageUrl} 
        alt={name}
        className="w-full h-full object-cover"
      />
      
      {/* Status Badges Container */}
      <div className="absolute top-2 left-2 flex items-center gap-1.5">
        {/* Online Badge */}
        {showOnlineBadge && (
          <div className="rounded-full px-1.5 py-0.5 flex items-center gap-0.5 bg-black/40 backdrop-blur-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span className="text-[8px] text-green-500 uppercase tracking-wide">Online</span>
          </div>
        )}
        
        {/* Live Badge */}
        {isLive && (
          <div className="rounded-full px-1.5 py-0.5 flex items-center gap-0.5 bg-red-600/90 backdrop-blur-sm animate-pulse">
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
            <span className="text-[8px] text-white uppercase tracking-wide font-bold">Live</span>
          </div>
        )}
      </div>
      
      {/* Gender and Age Badge */}
      <div 
        className={`absolute bottom-7 left-2 rounded-full px-1.5 py-0.5 flex items-center gap-0.5 ${
          isFemale ? 'bg-pink-500' : 'bg-blue-500'
        }`}
      >
        <span 
          className="text-white text-[10px]"
          style={{
            textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white',
            WebkitTextStroke: '0.5px white'
          }}
        >
          {isFemale ? '♀' : '♂'}
        </span>
        <span 
          className="text-white text-[10px]"
          style={{
            WebkitTextStroke: '0.5px white'
          }}
        >
          {age}
        </span>
      </div>
      
      {/* Name Badge */}
      <div className="absolute bottom-2 left-2">
        <span className="text-sm text-white">{name}</span>
      </div>
      
      {/* Video Button */}
      {showCameraButton && (
        <button 
          onClick={handleVideoCallClick}
          className="absolute bottom-2 right-2 w-12 h-12 flex items-center justify-center hover:scale-110 transition-transform"
          aria-label="Video Call"
        >
          <img src={cameraIconImage} alt="Video Call" className="w-full h-full object-contain" />
        </button>
      )}
    </div>
  );
}