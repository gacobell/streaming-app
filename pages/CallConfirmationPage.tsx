import { ArrowLeft, Video, Clock, Coins } from 'lucide-react';
import coinIconImage from 'figma:asset/cc0349f11bd96dedece6b8e3ce0aebe644cfe828.png';

interface CallConfirmationPageProps {
  personName: string;
  personImage: string;
  coinRate: number; // coins per minute
  onBack: () => void;
  onConfirm: () => void;
  coinBalance: number;
  isOnline: boolean;
  isBusy: boolean;
}

export function CallConfirmationPage({ personName, personImage, coinRate, onBack, onConfirm, coinBalance, isOnline, isBusy }: CallConfirmationPageProps) {
  const estimatedCost10Min = coinRate * 10;
  const canAfford = coinBalance >= coinRate;
  const canCall = isOnline && !isBusy && canAfford;

  return (
    <div className="relative z-10 min-h-screen flex flex-col">
      {/* Neon Gradient Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-black to-cyan-900">
        {/* Neon Glow Overlays */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-[55%] left-1/2 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `
            linear-gradient(rgba(255, 0, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
        
        {/* Subtle Noise Texture */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")'
        }}></div>
      </div>

      {/* Header */}
      <div className="relative z-10 px-4 py-4 flex items-center gap-4 border-b border-white/10" style={{ background: 'rgba(5, 15, 35, 0.9)' }}>
        <button onClick={onBack} className="text-white/70 hover:text-white">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-white text-2xl font-bold">Video Call</h1>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-8">
        {/* Profile Image */}
        <div 
          className="w-32 h-32 rounded-full overflow-hidden mb-6"
          style={{
            boxShadow: '0 0 8px rgba(135, 206, 250, 0.8), 0 0 12px rgba(255, 255, 255, 0.7), 0 0 16px rgba(255, 215, 0, 0.5)'
          }}
        >
          <img 
            src={personImage}
            alt={personName}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Name */}
        <h2 className="text-white text-2xl font-bold mb-2">{personName}</h2>
        <p className="text-white/60 mb-8">Video Call Request</p>

        {/* Coin Rate Card */}
        <div className="w-full max-w-sm bg-white/5 rounded-2xl p-6 mb-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-cyan-400" />
              <span className="text-white font-bold">Call Rate</span>
            </div>
            <div className="flex items-center gap-1">
              <img src={coinIconImage} alt="Coin" className="w-6 h-6 object-contain" />
              <span className="text-white text-xl font-bold">{coinRate}</span>
              <span className="text-white/60 text-sm">/min</span>
            </div>
          </div>

          <div className="space-y-3 pt-3 border-t border-white/10">
            <div className="flex justify-between text-sm">
              <span className="text-white/60">Estimated 10 min</span>
              <div className="flex items-center gap-1">
                <img src={coinIconImage} alt="Coin" className="w-4 h-4 object-contain" />
                <span className="text-white font-bold">{estimatedCost10Min}</span>
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/60">Your Balance</span>
              <div className="flex items-center gap-1">
                <img src={coinIconImage} alt="Coin" className="w-4 h-4 object-contain" />
                <span className={`font-bold ${canAfford ? 'text-green-400' : 'text-red-400'}`}>
                  {coinBalance.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Warning for offline status */}
        {!isOnline && (
          <div className="w-full max-w-sm bg-gray-500/10 border border-gray-400/30 rounded-xl p-4 mb-6">
            <p className="text-gray-400 text-sm text-center">
              📵 {personName} is currently offline. Please try again when they're online.
            </p>
          </div>
        )}

        {/* Warning for busy status */}
        {isOnline && isBusy && (
          <div className="w-full max-w-sm bg-yellow-500/10 border border-yellow-400/30 rounded-xl p-4 mb-6">
            <p className="text-yellow-400 text-sm text-center">
              📞 {personName} is currently in another call. Please try again later.
            </p>
          </div>
        )}

        {/* Warning for insufficient balance */}
        {isOnline && !isBusy && !canAfford && (
          <div className="w-full max-w-sm bg-red-500/10 border border-red-400/30 rounded-xl p-4 mb-6">
            <p className="text-red-400 text-sm text-center">
              ⚠️ Insufficient balance. Please purchase more coins to make this call.
            </p>
          </div>
        )}

        {/* Info */}
        {isOnline && !isBusy && (
          <div className="w-full max-w-sm bg-blue-500/10 border border-blue-400/30 rounded-xl p-4 mb-6">
            <p className="text-blue-400 text-sm">
              <strong>Note:</strong> Coins will be deducted per minute during the call. The call will automatically end when your balance runs out.
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="w-full max-w-sm space-y-3">
          <button
            onClick={onConfirm}
            disabled={!canCall}
            className="w-full py-4 rounded-2xl font-bold text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            style={{
              background: canCall 
                ? 'linear-gradient(135deg, #00b4d8 0%, #0096c7 100%)'
                : 'rgba(255, 255, 255, 0.1)',
              boxShadow: canCall ? '0 0 20px rgba(0, 180, 216, 0.6)' : 'none'
            }}
          >
            <Video className="w-5 h-5" />
            {!isOnline ? 'User Offline' : isBusy ? 'User Busy' : 'Start Video Call'}
          </button>

          <button
            onClick={onBack}
            className="w-full py-4 rounded-2xl font-bold text-white bg-white/10 border border-white/20 hover:bg-white/20 transition-colors text-center"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
