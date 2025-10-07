import { Battery, Wifi, Signal } from 'lucide-react';
import { useEffect, useState } from 'react';

export function StatusBar() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full px-6 pt-3 pb-1 h-[32px] flex-shrink-0">
      <div className="flex items-center justify-between h-full">
        {/* Time */}
        <span className="text-sm text-white drop-shadow-lg">{time}</span>
        
        {/* Right side indicators */}
        <div className="flex items-center gap-1 text-white drop-shadow-lg">
          <Signal className="w-4 h-4" />
          <Wifi className="w-4 h-4" />
          <Battery className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
