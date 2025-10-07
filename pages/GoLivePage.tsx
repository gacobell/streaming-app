import { ArrowLeft, Video, Users, Globe, Eye, Camera } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface GoLivePageProps {
  onBack: () => void;
  onStartLiveStream: () => void;
  onStopCamera?: () => void;
}

const categories = [
  { id: 'gaming', name: '🎮 Gaming', emoji: '🎮' },
  { id: 'music', name: '🎵 Music', emoji: '🎵' },
  { id: 'talk', name: '💬 Just Chatting', emoji: '💬' },
  { id: 'lifestyle', name: '✨ Lifestyle', emoji: '✨' },
  { id: 'fitness', name: '💪 Fitness', emoji: '💪' },
  { id: 'cooking', name: '🍳 Cooking', emoji: '🍳' },
  { id: 'art', name: '🎨 Art', emoji: '🎨' },
  { id: 'education', name: '📚 Education', emoji: '📚' },
  { id: 'travel', name: '✈️ Travel', emoji: '✈️' }
];

export function GoLivePage({ onBack, onStartLiveStream }: GoLivePageProps) {
  const [streamTitle, setStreamTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [visibility, setVisibility] = useState<'public' | 'followers'>('public');
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [cameraRequested, setCameraRequested] = useState(false);
  const [isLoadingCamera, setIsLoadingCamera] = useState(false);
  const [isInIframe, setIsInIframe] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Check if running in iframe (like Figma Make preview)
  useEffect(() => {
    try {
      setIsInIframe(window.self !== window.top);
    } catch (e) {
      // If we can't access window.top, we're definitely in an iframe
      setIsInIframe(true);
    }
  }, []);

  // Cleanup: stop camera when component unmounts
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  // Update video element when stream changes
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const startCamera = async () => {
    setCameraRequested(true);
    setIsLoadingCamera(true);
    setCameraError(null);
    
    try {
      console.log('🎥 Requesting camera access...');
      
      // Try with simpler constraints first (more compatible)
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,  // Simplified - just request any video
        audio: true   // Simplified - just request any audio
      });
      
      console.log('✅ Camera access granted!', mediaStream);
      setStream(mediaStream);
      setCameraError(null);
    } catch (error: any) {
      console.error('❌ Camera error:', error.name, error.message);
      
      let errorMessage = '';
      
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        errorMessage = '⚠️ Camera permission denied. Please click the camera icon in the address bar and select "Allow".';
      } else if (error.name === 'NotFoundError') {
        errorMessage = '📷 No camera found. Please connect a camera to your device.';
      } else if (error.name === 'NotReadableError') {
        errorMessage = '⚠️ Camera is being used by another app. Please close other apps using the camera and try again.';
      } else if (error.name === 'OverconstrainedError') {
        errorMessage = '⚠️ Camera settings not supported. Trying with default settings...';
        // Try again with no constraints
        try {
          const simpleStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
          setStream(simpleStream);
          setCameraError(null);
          setIsLoadingCamera(false);
          return;
        } catch (retryError) {
          errorMessage = '❌ Unable to access camera with any settings.';
        }
      } else if (error.name === 'TypeError') {
        errorMessage = '⚠️ Camera API not supported. Please use Chrome, Firefox, or Safari.';
      } else {
        errorMessage = `❌ Camera error: ${error.name}. Check console for details.`;
      }
      
      setCameraError(errorMessage);
    } finally {
      setIsLoadingCamera(false);
    }
  };

  const handleStartStream = () => {
    if (!streamTitle) {
      alert('Please add a title for your stream');
      return;
    }
    
    // Allow going live without camera in preview mode (iframe)
    if (!stream && !isInIframe) {
      alert('Camera is not ready. Please allow camera access.');
      return;
    }

    // If in iframe without camera, warn user but allow proceeding
    if (!stream && isInIframe) {
      const proceed = confirm('⚠️ Camera unavailable in Figma preview.\n\nYou can test the UI flow, but camera will only work after deploying to Vercel.\n\nContinue anyway?');
      if (!proceed) return;
    }
    
    // Stop the camera before transitioning to live stream page
    // This releases the camera so Agora can access it
    if (stream) {
      console.log('🎥 Stopping GoLive camera before starting Agora stream...');
      stream.getTracks().forEach(track => {
        track.stop();
        console.log('✅ Stopped track:', track.kind);
      });
      setStream(null);
    }
    
    // In a real app, this would initialize the stream
    console.log('Starting stream:', { 
      title: streamTitle, 
      category: selectedCategory, 
      visibility
    });
    
    // Add small delay to ensure camera is fully released
    setTimeout(() => {
      console.log('✅ Camera released, starting Agora live stream...');
      onStartLiveStream();
    }, 200);
  };

  return (
    <div className="relative z-10 min-h-screen flex flex-col" style={{ background: 'rgba(5, 15, 35, 0.9)' }}>
      {/* Iframe Warning Banner */}
      {isInIframe && (
        <div className="bg-yellow-500/95 px-3 py-2 text-center border-b border-yellow-600">
          <p className="text-black text-[11px] font-bold leading-tight">
            ⚠️ Figma Preview Mode: Camera blocked. Click "Publish" to test live streaming.
          </p>
        </div>
      )}
      
      {/* Header */}
      <div className="px-4 py-4 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-white/70 hover:text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-white text-2xl font-bold">Go Live</h1>
        </div>
        <button
          onClick={handleStartStream}
          className="px-6 py-2 rounded-full font-bold text-white animate-pulse"
          style={{
            background: 'linear-gradient(135deg, #00b4d8 0%, #0096c7 100%)',
            boxShadow: '0 0 20px rgba(0, 180, 216, 0.7)'
          }}
        >
          Start Stream
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {/* Camera Preview */}
        <div className="mb-6">
          <h3 className="text-white font-bold mb-3">Camera Preview</h3>
          <div 
            className="h-[320px] rounded-2xl relative overflow-hidden bg-black flex items-center justify-center"
            style={{ border: '2px solid rgba(255, 255, 255, 0.2)' }}
          >
            {/* Video Element */}
            {stream && !cameraError ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
            ) : cameraError ? (
              <div className="text-center p-6">
                <Camera className="w-16 h-16 text-red-400/50 mx-auto mb-4" />
                <p className="text-red-400 text-sm mb-4 max-w-xs mx-auto leading-relaxed">{cameraError}</p>
                
                {/* Figma Make iframe solution */}
                {isInIframe && (
                  <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4 mb-4 max-w-sm mx-auto">
                    <p className="text-yellow-300 text-xs font-bold mb-2">⚠️ Running in Figma Preview (Iframe)</p>
                    <p className="text-yellow-200/80 text-xs mb-3 leading-relaxed">
                      Camera access is blocked in Figma Make's preview. You have 2 options:
                    </p>
                    
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          alert('📋 Instructions:\n\n1. Click "Publish" button in Figma Make (top right)\n2. Copy the published URL\n3. Open it in a new browser tab\n4. Camera will work there!\n\nAlternatively, test locally:\n1. Download your code\n2. Run: npm install && npm run dev\n3. Open http://localhost:5173');
                        }}
                        className="w-full px-4 py-2.5 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-black font-bold transition-colors text-sm"
                      >
                        📖 How to Test Camera
                      </button>
                      
                      <p className="text-yellow-200/60 text-[10px] text-center">
                        Camera works in: Published app, Deployed app, or Local dev server
                      </p>
                    </div>
                  </div>
                )}
                
                {/* Diagnostic info for non-iframe issues */}
                {!isInIframe && (
                  <div className="bg-white/5 rounded-lg p-3 mb-4 text-left max-w-xs mx-auto">
                    <p className="text-white/60 text-xs font-bold mb-2">Troubleshooting:</p>
                    <ul className="text-white/50 text-xs space-y-1">
                      <li>1. Click 🔒 icon in address bar</li>
                      <li>2. Set Camera to "Allow"</li>
                      <li>3. Set Microphone to "Allow"</li>
                      <li>4. Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)</li>
                      <li>5. Close other apps using camera (Zoom, Teams, etc.)</li>
                    </ul>
                  </div>
                )}
                
                <button
                  onClick={startCamera}
                  className="px-6 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white font-bold transition-colors mb-2"
                >
                  Try Again
                </button>
                
                {/* Hard refresh button */}
                <button
                  onClick={() => {
                    // Force hard refresh
                    window.location.reload();
                  }}
                  className="block mx-auto text-cyan-400 text-xs underline mb-2"
                >
                  Force Refresh Page
                </button>
                
                {/* Check what's available */}
                <button
                  onClick={async () => {
                    try {
                      const devices = await navigator.mediaDevices.enumerateDevices();
                      const cameras = devices.filter(d => d.kind === 'videoinput');
                      const mics = devices.filter(d => d.kind === 'audioinput');
                      const inIframeMsg = isInIframe ? '\n⚠️ Running in iframe (restricted permissions)' : '';
                      alert(`📷 Found ${cameras.length} camera(s)\n🎤 Found ${mics.length} microphone(s)${inIframeMsg}\n\nCheck browser console (F12) for details.`);
                      console.log('📷 Camera diagnostics:', { 
                        cameras, 
                        mics, 
                        isInIframe,
                        userAgent: navigator.userAgent,
                        isSecure: window.isSecureContext,
                        protocol: window.location.protocol
                      });
                    } catch (err) {
                      alert('Error checking devices: ' + (err as Error).message);
                      console.error('Device check error:', err);
                    }
                  }}
                  className="text-cyan-400 text-xs underline"
                >
                  🔍 Check System Diagnostics
                </button>
              </div>
            ) : isLoadingCamera ? (
              <div className="text-center">
                <Video className="w-20 h-20 text-white/30 mx-auto mb-4 animate-pulse" />
                <p className="text-white/50 text-sm">Starting camera...</p>
              </div>
            ) : !cameraRequested ? (
              <div className="text-center p-6">
                <Video className="w-20 h-20 text-white/30 mx-auto mb-4" />
                <p className="text-white/60 text-sm mb-4">Enable your camera to preview your stream</p>
                <button
                  onClick={startCamera}
                  className="px-6 py-3 rounded-lg font-bold text-white transition-all hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #00b4d8 0%, #0096c7 100%)',
                    boxShadow: '0 0 15px rgba(0, 180, 216, 0.6)'
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Camera className="w-5 h-5" />
                    <span>Enable Camera</span>
                  </div>
                </button>
              </div>
            ) : null}

            {/* Live Indicator (Preview) */}
            <div className="absolute top-4 left-4 bg-red-500 rounded-full px-3 py-1 flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-white text-xs font-bold">PREVIEW</span>
            </div>

            {/* Viewer Count (Preview) */}
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md rounded-full px-3 py-1.5 flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-bold">0</span>
            </div>
          </div>
        </div>

        {/* Stream Title */}
        <div className="mb-4">
          <label className="text-white text-sm font-bold mb-2 block">Stream Title</label>
          <input
            type="text"
            value={streamTitle}
            onChange={(e) => setStreamTitle(e.target.value)}
            placeholder="Give your stream a catchy title..."
            maxLength={60}
            className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 placeholder:text-white/40 focus:outline-none focus:border-cyan-400"
          />
          <p className="text-white/40 text-xs mt-1">{streamTitle.length}/60 characters</p>
        </div>

        {/* Category Selection */}
        <div className="mb-4">
          <label className="text-white text-sm font-bold mb-3 block">Category</label>
          <div className="grid grid-cols-3 gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category)}
                className={`p-3 rounded-xl border-2 transition-all ${
                  selectedCategory.id === category.id
                    ? 'border-cyan-400 bg-cyan-500/20'
                    : 'border-white/20 bg-white/5 hover:bg-white/10'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-1">{category.emoji}</div>
                  <span className="text-white text-xs font-bold">{category.name.split(' ')[1]}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Visibility Settings */}
        <div className="mb-6">
          <label className="text-white text-sm font-bold mb-3 block">Who can watch?</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setVisibility('public')}
              className={`p-4 rounded-xl border-2 transition-all ${
                visibility === 'public'
                  ? 'border-cyan-400 bg-cyan-500/20'
                  : 'border-white/20 bg-white/5 hover:bg-white/10'
              }`}
            >
              <Globe className="w-6 h-6 text-white mx-auto mb-2" />
              <p className="text-white text-sm font-bold">Everyone</p>
              <p className="text-white/60 text-xs">Public stream</p>
            </button>

            <button
              onClick={() => setVisibility('followers')}
              className={`p-4 rounded-xl border-2 transition-all ${
                visibility === 'followers'
                  ? 'border-cyan-400 bg-cyan-500/20'
                  : 'border-white/20 bg-white/5 hover:bg-white/10'
              }`}
            >
              <Users className="w-6 h-6 text-white mx-auto mb-2" />
              <p className="text-white text-sm font-bold">Followers</p>
              <p className="text-white/60 text-xs">Followers only</p>
            </button>
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl p-4 border border-cyan-400/30">
          <h4 className="text-white font-bold mb-2 flex items-center gap-2">
            <span>💡</span>
            Tips for a Great Stream
          </h4>
          <ul className="space-y-2 text-white/70 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 flex-shrink-0">•</span>
              <span>Make sure you have good lighting and a stable internet connection</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 flex-shrink-0">•</span>
              <span>Engage with your viewers and respond to comments</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 flex-shrink-0">•</span>
              <span>Choose a catchy title that describes what you'll be doing</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
