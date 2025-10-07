import { useState, useRef, useEffect } from 'react';
import searchIconImage from 'figma:asset/8a380a32bd4c74b6542e3b709d005b5c53695e43.png';
import globeIconImage from 'figma:asset/469ace71ba5e272e7db9f76607ca4d4d3fa9a1c0.png';

interface ExploreFilterBarProps {
  activeFilter: 'live' | 'hot' | 'new' | 'following';
  onFilterChange: (filter: 'live' | 'hot' | 'new' | 'following') => void;
  onSearchClick: () => void;
}

const regions = ['ASIA', 'MENA', 'E-EUROPE', 'EU/NA', 'LATIN', 'GLOBAL'] as const;

const regionEmojis: Record<typeof regions[number], string> = {
  'ASIA': '🏯',
  'MENA': '🕌',
  'E-EUROPE': '🏛️',
  'EU/NA': '🗽',
  'LATIN': '💃',
  'GLOBAL': '🌐'
};

export function ExploreFilterBar({ activeFilter, onFilterChange, onSearchClick }: ExploreFilterBarProps) {
  const [isRegionMenuOpen, setIsRegionMenuOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<typeof regions[number]>('GLOBAL');
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsRegionMenuOpen(false);
      }
    }

    if (isRegionMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isRegionMenuOpen]);

  const handleRegionSelect = (region: typeof regions[number]) => {
    setSelectedRegion(region);
    setIsRegionMenuOpen(false);
  };
  return (
    <div 
      className="sticky top-0 z-10 border-b border-white/10 px-3 py-3 flex items-center justify-between"
      style={{ background: 'rgba(5, 15, 35, 0.9)' }}
    >
      {/* SVG Gradient Definition */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#ff0099', stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: '#dd00ff', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#00ffff', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Filter Tabs */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => onFilterChange('live')}
          className="relative"
        >
          <span className={`text-sm font-bold ${activeFilter === 'live' ? 'text-white' : 'text-white/60'}`}>
            Live
          </span>
          {activeFilter === 'live' && (
            <>
              {/* Upward glow effect - flashlight from below */}
              <div 
                className="absolute -bottom-3 left-0 right-0 h-8 pointer-events-none"
                style={{
                  background: 'linear-gradient(to top, rgba(255, 0, 153, 0.4) 0%, rgba(221, 0, 255, 0.3) 30%, rgba(0, 255, 255, 0.2) 60%, transparent 100%)',
                  filter: 'blur(8px)'
                }}
              ></div>
              {/* Neon underline */}
              <div 
                className="absolute -bottom-3 left-0 right-0 h-0.5"
                style={{
                  background: 'linear-gradient(90deg, #ff0099 0%, #dd00ff 50%, #00ffff 100%)',
                  boxShadow: '0 0 8px rgba(255, 0, 153, 0.6), 0 0 12px rgba(0, 255, 255, 0.4)'
                }}
              ></div>
            </>
          )}
        </button>

        <button
          onClick={() => onFilterChange('hot')}
          className="relative"
        >
          <span className={`text-sm font-bold ${activeFilter === 'hot' ? 'text-white' : 'text-white/60'}`}>
            Hot
          </span>
          {activeFilter === 'hot' && (
            <>
              {/* Upward glow effect - flashlight from below */}
              <div 
                className="absolute -bottom-3 left-0 right-0 h-8 pointer-events-none"
                style={{
                  background: 'linear-gradient(to top, rgba(255, 0, 153, 0.4) 0%, rgba(221, 0, 255, 0.3) 30%, rgba(0, 255, 255, 0.2) 60%, transparent 100%)',
                  filter: 'blur(8px)'
                }}
              ></div>
              {/* Neon underline */}
              <div 
                className="absolute -bottom-3 left-0 right-0 h-0.5"
                style={{
                  background: 'linear-gradient(90deg, #ff0099 0%, #dd00ff 50%, #00ffff 100%)',
                  boxShadow: '0 0 8px rgba(255, 0, 153, 0.6), 0 0 12px rgba(0, 255, 255, 0.4)'
                }}
              ></div>
            </>
          )}
        </button>

        <button
          onClick={() => onFilterChange('new')}
          className="relative"
        >
          <span className={`text-sm font-bold ${activeFilter === 'new' ? 'text-white' : 'text-white/60'}`}>
            New
          </span>
          {activeFilter === 'new' && (
            <>
              {/* Upward glow effect - flashlight from below */}
              <div 
                className="absolute -bottom-3 left-0 right-0 h-8 pointer-events-none"
                style={{
                  background: 'linear-gradient(to top, rgba(255, 0, 153, 0.4) 0%, rgba(221, 0, 255, 0.3) 30%, rgba(0, 255, 255, 0.2) 60%, transparent 100%)',
                  filter: 'blur(8px)'
                }}
              ></div>
              {/* Neon underline */}
              <div 
                className="absolute -bottom-3 left-0 right-0 h-0.5"
                style={{
                  background: 'linear-gradient(90deg, #ff0099 0%, #dd00ff 50%, #00ffff 100%)',
                  boxShadow: '0 0 8px rgba(255, 0, 153, 0.6), 0 0 12px rgba(0, 255, 255, 0.4)'
                }}
              ></div>
            </>
          )}
        </button>

        <button
          onClick={() => onFilterChange('following')}
          className="relative"
        >
          <span className={`text-sm font-bold ${activeFilter === 'following' ? 'text-white' : 'text-white/60'}`}>
            Following
          </span>
          {activeFilter === 'following' && (
            <>
              {/* Upward glow effect - flashlight from below */}
              <div 
                className="absolute -bottom-3 left-0 right-0 h-8 pointer-events-none"
                style={{
                  background: 'linear-gradient(to top, rgba(255, 0, 153, 0.4) 0%, rgba(221, 0, 255, 0.3) 30%, rgba(0, 255, 255, 0.2) 60%, transparent 100%)',
                  filter: 'blur(8px)'
                }}
              ></div>
              {/* Neon underline */}
              <div 
                className="absolute -bottom-3 left-0 right-0 h-0.5"
                style={{
                  background: 'linear-gradient(90deg, #ff0099 0%, #dd00ff 50%, #00ffff 100%)',
                  boxShadow: '0 0 8px rgba(255, 0, 153, 0.6), 0 0 12px rgba(0, 255, 255, 0.4)'
                }}
              ></div>
            </>
          )}
        </button>
      </div>

      {/* Right Icons */}
      <div className="flex items-center gap-3">
        <button 
          onClick={onSearchClick}
          className="relative flex items-center"
        >
          <img 
            src={searchIconImage} 
            alt="Search" 
            className="w-6 h-6 object-contain"
          />
        </button>
        
        {/* Regions Dropdown */}
        <div className="relative flex items-center" ref={menuRef}>
          <button 
            onClick={() => setIsRegionMenuOpen(!isRegionMenuOpen)}
            className="relative flex items-center"
          >
            <img 
              src={globeIconImage} 
              alt="Regions" 
              className="w-6 h-6 object-contain"
            />
          </button>
          
          {/* Dropdown Menu */}
          {isRegionMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-32 bg-[#1a1a2e] border border-white/20 rounded-lg shadow-lg overflow-hidden z-50">
              {regions.map((region) => (
                <button
                  key={region}
                  onClick={() => handleRegionSelect(region)}
                  className={`w-full px-4 py-2 text-left text-sm transition-colors flex items-center gap-2 ${
                    selectedRegion === region
                      ? 'bg-pink-500/20 text-pink-400'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  <span className="text-base">{regionEmojis[region]}</span>
                  <span>{region}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
