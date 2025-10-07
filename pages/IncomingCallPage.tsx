import { Phone, PhoneOff, Ban } from 'lucide-react';

interface IncomingCallPageProps {
  callerName: string;
  callerImage: string;
  onAccept: () => void;
  onDecline: () => void;
  onBlock: () => void;
}

export function IncomingCallPage({ callerName, callerImage, onAccept, onDecline, onBlock }: IncomingCallPageProps) {
  return (
    <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6" style={{ background: 'rgba(5, 15, 35, 0.95)' }}>
      {/* Pulsing background effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center">
        {/* Caller Image */}
        <div className="mb-6 flex justify-center">
          <div 
            className="w-32 h-32 rounded-full overflow-hidden animate-pulse"
            style={{
              boxShadow: '0 0 20px rgba(0, 180, 216, 0.8), 0 0 40px rgba(0, 180, 216, 0.6), 0 0 60px rgba(0, 180, 216, 0.4)',
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
            }}
          >
            <img 
              src={callerImage}
              alt={callerName}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Caller Name */}
        <h2 className="text-white text-3xl font-bold mb-2">{callerName}</h2>
        <p className="text-cyan-400 text-lg mb-12">Incoming Video Call...</p>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-6 mb-8">
          {/* Decline Button */}
          <button
            onClick={onDecline}
            className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-all hover:scale-110"
            style={{
              boxShadow: '0 0 20px rgba(239, 68, 68, 0.6)'
            }}
          >
            <PhoneOff className="w-8 h-8 text-white" />
          </button>

          {/* Accept Button */}
          <button
            onClick={onAccept}
            className="w-20 h-20 rounded-full flex items-center justify-center transition-all hover:scale-110 animate-pulse"
            style={{
              background: 'linear-gradient(135deg, #00b4d8 0%, #0096c7 100%)',
              boxShadow: '0 0 30px rgba(0, 180, 216, 0.8)'
            }}
          >
            <Phone className="w-10 h-10 text-white" />
          </button>
        </div>

        {/* Block Button */}
        <button
          onClick={onBlock}
          className="text-red-400 hover:text-red-300 text-sm flex items-center gap-2 mx-auto transition-colors"
        >
          <Ban className="w-4 h-4" />
          Block & Prevent Future Calls
        </button>
      </div>
    </div>
  );
}
