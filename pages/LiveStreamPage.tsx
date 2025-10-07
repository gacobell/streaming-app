import { ArrowLeft, Paperclip, Eye } from 'lucide-react';
import giftBoxImage from 'figma:asset/bc95fd24c1ce6fceb586e0793b80646fbd2fc942.png';
import sendIconImage from 'figma:asset/1c8916258b4a83432e6ac48d710936cd1915bc21.png';
import followIconImage from 'figma:asset/366dbc4bd913f1b56c65c361701271246db38a83.png';
import { useState, useEffect, useRef } from 'react';
import { 
  createLiveStreamClient, 
  AGORA_APP_ID, 
  generateChannelName, 
  generateTempToken,
  type IAgoraRTCClient,
  type ICameraVideoTrack,
  type IMicrophoneAudioTrack,
  type IAgoraRTCRemoteUser
} from '../lib/agora';

interface LiveStreamPageProps {
  personName: string;
  personImage: string;
  onBack: () => void;
  onOpenProfile: () => void;
  onSendGift?: (giftName: string, cost: number, recipientName: string) => void;
  coinBalance?: number;
  onDeductCoins?: (amount: number) => void;
  isFollowing?: boolean;
  onToggleFollow?: () => void;
  isBroadcasting?: boolean; // True if user is going live, false if viewing someone else
}

interface Comment {
  id: number;
  username: string;
  message: string;
}

interface Gift {
  id: number;
  emoji: string;
  name: string;
  cost: number;
}

interface GiftNotification {
  id: number;
  senderName: string;
  giftEmoji: string;
  giftName: string;
  cost: number;
}

const giftOptions: Gift[] = [
  // Ultra cheap gifts (1-5 coins) - Very simple
  { id: 1, emoji: '👋', name: 'Wave', cost: 1 },
  { id: 2, emoji: '😀', name: 'Happy', cost: 1 },
  { id: 3, emoji: '👏', name: 'Clap', cost: 3 },
  { id: 4, emoji: '🙌', name: 'Hands Up', cost: 3 },
  { id: 5, emoji: '💜', name: 'Purple Heart', cost: 5 },
  { id: 6, emoji: '✌️', name: 'Peace', cost: 5 },
  
  // Cheap gifts (10-50 coins) - Simple emojis
  { id: 7, emoji: '👍', name: 'Thumbs Up', cost: 10 },
  { id: 8, emoji: '❤️', name: 'Heart', cost: 10 },
  { id: 9, emoji: '😊', name: 'Smile', cost: 10 },
  { id: 10, emoji: '🎉', name: 'Party', cost: 15 },
  { id: 11, emoji: '🔥', name: 'Fire', cost: 15 },
  { id: 12, emoji: '⭐', name: 'Star', cost: 15 },
  { id: 13, emoji: '💪', name: 'Strong', cost: 20 },
  { id: 14, emoji: '🌟', name: 'Sparkle', cost: 20 },
  { id: 15, emoji: '🎵', name: 'Music', cost: 25 },
  { id: 16, emoji: '🌹', name: 'Rose', cost: 30 },
  { id: 17, emoji: '🍕', name: 'Pizza', cost: 30 },
  { id: 18, emoji: '☕', name: 'Coffee', cost: 35 },
  { id: 19, emoji: '🍰', name: 'Cake', cost: 40 },
  { id: 20, emoji: '🎂', name: 'Birthday Cake', cost: 45 },
  { id: 21, emoji: '🌈', name: 'Rainbow', cost: 50 },
  
  // Medium gifts (60-200 coins) - More elaborate
  { id: 22, emoji: '💎', name: 'Diamond', cost: 60 },
  { id: 23, emoji: '🎁', name: 'Gift Box', cost: 75 },
  { id: 24, emoji: '🏆', name: 'Trophy', cost: 80 },
  { id: 25, emoji: '👑', name: 'Crown', cost: 100 },
  { id: 26, emoji: '💍', name: 'Ring', cost: 120 },
  { id: 27, emoji: '🌺', name: 'Flower Bouquet', cost: 130 },
  { id: 28, emoji: '🎭', name: 'Theater Masks', cost: 140 },
  { id: 29, emoji: '🎪', name: 'Circus', cost: 150 },
  { id: 30, emoji: '🎨', name: 'Art Palette', cost: 160 },
  { id: 31, emoji: '🎬', name: 'Movie Camera', cost: 180 },
  { id: 32, emoji: '🎯', name: 'Bullseye', cost: 200 },
  
  // Premium gifts (250-500 coins) - Luxurious
  { id: 33, emoji: '💰', name: 'Money Bag', cost: 250 },
  { id: 34, emoji: '🏅', name: 'Gold Medal', cost: 280 },
  { id: 35, emoji: '🦋', name: 'Butterfly', cost: 300 },
  { id: 36, emoji: '🌸', name: 'Cherry Blossom', cost: 320 },
  { id: 37, emoji: '🎆', name: 'Fireworks', cost: 350 },
  { id: 38, emoji: '✨', name: 'Sparkles', cost: 380 },
  { id: 39, emoji: '🌠', name: 'Shooting Star', cost: 400 },
  { id: 40, emoji: '🎇', name: 'Sparkler', cost: 420 },
  { id: 41, emoji: '🔮', name: 'Crystal Ball', cost: 450 },
  { id: 42, emoji: '💫', name: 'Dizzy Star', cost: 500 },
  
  // Ultra Premium gifts (600-1000 coins) - Most luxurious
  { id: 43, emoji: '🦄', name: 'Unicorn', cost: 600 },
  { id: 44, emoji: '🎪', name: 'Carnival', cost: 650 },
  { id: 45, emoji: '🏰', name: 'Castle', cost: 700 },
  { id: 46, emoji: '🚀', name: 'Rocket', cost: 750 },
  { id: 47, emoji: '🌌', name: 'Milky Way', cost: 800 },
  { id: 48, emoji: '🎠', name: 'Carousel', cost: 850 },
  { id: 49, emoji: '🎡', name: 'Ferris Wheel', cost: 900 },
  { id: 50, emoji: '🌃', name: 'Night City', cost: 950 },
  { id: 51, emoji: '🎆', name: 'Grand Fireworks', cost: 1000 },
  
  // Elite Premium gifts (1250-3000 coins) - Ultimate luxury
  { id: 52, emoji: '🎰', name: 'Jackpot', cost: 1250 },
  { id: 53, emoji: '🦚', name: 'Peacock', cost: 1500 },
  { id: 54, emoji: '🐉', name: 'Dragon', cost: 1850 },
  { id: 55, emoji: '🗼', name: 'Eiffel Tower', cost: 2000 },
  { id: 56, emoji: '⚜️', name: 'Royal Emblem', cost: 2500 },
  { id: 57, emoji: '🏛️', name: 'Palace', cost: 3000 },
];

export function LiveStreamPage({ personName, personImage, onBack, onOpenProfile, onSendGift, coinBalance = 0, onDeductCoins, isFollowing = false, onToggleFollow, isBroadcasting = false }: LiveStreamPageProps) {
  const [inputValue, setInputValue] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [giftNotifications, setGiftNotifications] = useState<GiftNotification[]>([]);
  const [currentGiftAnimation, setCurrentGiftAnimation] = useState<{ emoji: string; name: string } | null>(null);
  const [viewerCount, setViewerCount] = useState(1); // User viewing counts as 1 viewer

  // Agora streaming state
  const [client, setClient] = useState<IAgoraRTCClient | null>(null);
  const [localVideoTrack, setLocalVideoTrack] = useState<ICameraVideoTrack | null>(null);
  const [localAudioTrack, setLocalAudioTrack] = useState<IMicrophoneAudioTrack | null>(null);
  const [remoteUsers, setRemoteUsers] = useState<IAgoraRTCRemoteUser[]>([]);
  const [isJoined, setIsJoined] = useState(false);
  const localVideoRef = useRef<HTMLDivElement>(null);
  const remoteVideoRef = useRef<HTMLDivElement>(null);

  const handleSendGift = (gift: Gift) => {
    // Check if user has enough coins
    if (coinBalance < gift.cost) {
      alert(`Not enough coins! You need ${gift.cost} coins but only have ${coinBalance}.`);
      return;
    }

    // Deduct coins
    if (onDeductCoins) {
      onDeductCoins(gift.cost);
    }

    // Track transaction
    if (onSendGift) {
      onSendGift(gift.name, gift.cost, personName);
    }

    // Create gift notification
    const notification: GiftNotification = {
      id: Date.now(),
      senderName: 'You',
      giftEmoji: gift.emoji,
      giftName: gift.name,
      cost: gift.cost
    };

    setGiftNotifications(prev => [...prev, notification]);

    // Remove notification after 4 seconds
    setTimeout(() => {
      setGiftNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, 4000);

    // Show center gift animation
    setCurrentGiftAnimation({ emoji: gift.emoji, name: gift.name });

    // Remove animation after 3 seconds
    setTimeout(() => {
      setCurrentGiftAnimation(null);
    }, 3000);

    // Close gift modal
    setShowGiftModal(false);
  };

  // Simulate random viewer joins/leaves (for demo purposes)
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly add or remove viewers
      const change = Math.random() > 0.5 ? 1 : -1;
      setViewerCount(prev => Math.max(1, Math.min(999, prev + change)));
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  // Initialize Agora for live streaming
  useEffect(() => {
    const initAgora = async () => {
      try {
        // Import AgoraRTC dynamically
        const AgoraRTC = (await import('agora-rtc-sdk-ng')).default;
        
        // Create Agora client
        const agoraClient = createLiveStreamClient();
        setClient(agoraClient);

        // Generate channel name from streamer name
        const channelName = generateChannelName(personName);

        // Get token (null for testing without token server)
        const token = await generateTempToken(channelName);

        if (isBroadcasting) {
          // BROADCASTER MODE: Going live yourself
          console.log('🔴 Going live as broadcaster...');
          
          // Set role to host
          await agoraClient.setClientRole('host');

          // Join channel
          await agoraClient.join(AGORA_APP_ID, channelName, token, null);
          setIsJoined(true);

          // Create local camera and microphone tracks
          const [microphoneTrack, cameraTrack] = await AgoraRTC.createMicrophoneAndCameraTracks(
            { AEC: true, ANS: true }, // Audio: Echo cancellation, noise suppression
            { encoderConfig: '720p_2' } // Video: 1280x720
          );

          setLocalAudioTrack(microphoneTrack);
          setLocalVideoTrack(cameraTrack);

          // Publish tracks to broadcast
          await agoraClient.publish([microphoneTrack, cameraTrack]);
          console.log('✅ Broadcasting your stream!');

          // Play local video preview
          if (localVideoRef.current) {
            cameraTrack.play(localVideoRef.current);
          }

        } else {
          // VIEWER MODE: Watching someone else's stream
          console.log('👁️ Joining as viewer...');
          
          // Set role to audience
          await agoraClient.setClientRole('audience');

          // Join channel as viewer
          await agoraClient.join(AGORA_APP_ID, channelName, token, null);
          setIsJoined(true);

          // Listen for remote users (the streamer)
          agoraClient.on('user-published', async (user, mediaType) => {
            // Subscribe to the remote user
            await agoraClient.subscribe(user, mediaType);
            
            // Update viewer count
            const userCount = agoraClient.remoteUsers.length + 1;
            setViewerCount(userCount);

            if (mediaType === 'video') {
              // Play remote video
              if (remoteVideoRef.current) {
                user.videoTrack?.play(remoteVideoRef.current);
              }
            }

            if (mediaType === 'audio') {
              // Play remote audio
              user.audioTrack?.play();
            }

            setRemoteUsers([...agoraClient.remoteUsers]);
          });

          agoraClient.on('user-unpublished', (user, mediaType) => {
            // Update viewer count when user leaves
            const userCount = agoraClient.remoteUsers.length + 1;
            setViewerCount(userCount);
            setRemoteUsers([...agoraClient.remoteUsers]);
          });
        }

      } catch (error: any) {
        console.error('❌ Failed to initialize Agora:', error);
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        
        let errorMessage = '';
        
        // Check for invalid App ID error
        if (error.message?.includes('CAN_NOT_GET_GATEWAY_SERVER') || 
            error.message?.includes('invalid vendor key') ||
            error.message?.includes('can not find appid') ||
            AGORA_APP_ID === 'YOUR_APP_ID_HERE') {
          errorMessage = `⚠️ AGORA APP ID REQUIRED\n\n` +
                        `The Agora App ID is missing or invalid.\n\n` +
                        `TO FIX (takes 2 minutes):\n` +
                        `1. Go to: https://console.agora.io/\n` +
                        `2. Sign up (free)\n` +
                        `3. Create a new project\n` +
                        `4. Copy your App ID\n` +
                        `5. Update /lib/agora.ts with your App ID\n` +
                        `6. Redeploy your app\n\n` +
                        `See /AGORA_SETUP.md for detailed instructions.`;
        } else if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
          errorMessage = 'Camera/microphone permission denied. Please allow access and refresh the page.';
        } else if (error.name === 'NotFoundError' || error.message?.includes('NotFoundError')) {
          errorMessage = 'No camera or microphone found on this device.';
        } else if (error.name === 'NotReadableError' || error.message?.includes('NotReadableError')) {
          errorMessage = 'Camera is being used by another application. Please close other apps and try again.';
        } else if (error.message?.includes('INVALID_OPERATION')) {
          errorMessage = 'Stream already in progress. Please refresh the page and try again.';
        } else {
          errorMessage = `Could not start stream.\n\nError: ${error.message || 'Unknown error'}\n\nCheck browser console (F12) for details.`;
        }
        
        alert(errorMessage);
      }
    };

    initAgora();

    // Cleanup on unmount
    return () => {
      if (localVideoTrack) {
        localVideoTrack.stop();
        localVideoTrack.close();
      }
      if (localAudioTrack) {
        localAudioTrack.stop();
        localAudioTrack.close();
      }
      if (client) {
        client.leave();
        client.removeAllListeners();
      }
    };
  }, [personName, isBroadcasting]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newComment: Comment = {
      id: Date.now(),
      username: 'You',
      message: inputValue
    };

    setComments(prev => {
      const updated = [...prev, newComment];
      // Keep only the last 5 comments
      return updated.slice(-5);
    });

    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col max-w-[430px] mx-auto">
      {/* Live Stream Video Area - Real Agora Video */}
      <div className="absolute inset-0">
        {isBroadcasting ? (
          // When broadcasting: Show YOUR camera
          <>
            <div 
              ref={localVideoRef} 
              className="w-full h-full bg-black"
              style={{ position: 'absolute', inset: 0 }}
            />
            {!isJoined && (
              <div className="absolute inset-0 bg-black flex items-center justify-center">
                <p className="text-white">Starting stream...</p>
              </div>
            )}
          </>
        ) : (
          // When viewing: Show remote streamer's video
          <>
            <div 
              ref={remoteVideoRef} 
              className="w-full h-full bg-black"
              style={{ position: 'absolute', inset: 0 }}
            />
            {!isJoined && (
              <img
                src={personImage}
                alt={personName}
                className="w-full h-full object-cover"
              />
            )}
          </>
        )}

        {/* Top Overlay - Back Button, Profile, and LIVE indicator */}
        <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/60 to-transparent">
          <div className="flex items-center justify-between">
            {/* Left Side - Back Button and Profile */}
            <div className="flex items-center gap-3">
              <button 
                onClick={onBack}
                className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center hover:bg-black/60 transition-colors flex-shrink-0"
              >
                <ArrowLeft 
                  className="w-6 h-6 text-white"
                  style={{
                    filter: 'drop-shadow(0 0 4px rgba(0, 255, 255, 0.6)) drop-shadow(0 0 8px rgba(255, 0, 153, 0.4)) drop-shadow(0 0 12px rgba(138, 43, 226, 0.3))'
                  }}
                />
              </button>

              {/* Streamer Info */}
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenProfile}
                  className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0 hover:scale-110 transition-transform"
                  style={{
                    boxShadow: '0 0 8px rgba(135, 206, 250, 0.8), 0 0 12px rgba(255, 255, 255, 0.7), 0 0 16px rgba(255, 215, 0, 0.5)'
                  }}
                >
                  <img
                    src={personImage}
                    alt={personName}
                    className="w-full h-full object-cover"
                  />
                </button>
                <div>
                  <h3 className="text-white font-bold text-sm drop-shadow-lg">{personName}</h3>
                  <p className="text-white/80 text-xs">Live Now</p>
                </div>
                <button
                  onClick={onToggleFollow}
                  className="ml-1 flex-shrink-0 transition-all hover:scale-110 w-7 h-7 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center"
                  style={{
                    opacity: isFollowing ? 0.6 : 1
                  }}
                >
                  <img
                    src={followIconImage}
                    alt={isFollowing ? "Following" : "Follow"}
                    className="w-7 h-7 object-contain"
                  />
                </button>
              </div>
            </div>

            {/* Right Side - LIVE Indicator and Viewer Count */}
            <div className="flex items-center gap-2">
              {/* Viewer Count */}
              <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-2.5 py-1.5 rounded-full">
                <Eye className="w-4 h-4 text-white" />
                <span className="text-white text-sm font-bold">{viewerCount}</span>
              </div>

              {/* LIVE Indicator */}
              <div className="flex items-center gap-2 bg-red-600/90 backdrop-blur-sm px-3 py-1.5 rounded-full animate-pulse">
                <div className="w-2 h-2 rounded-full bg-white"></div>
                <span className="text-white text-sm font-bold uppercase">Live</span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Comments - Floating from bottom */}
        <div className="absolute bottom-20 left-0 right-0 px-4 space-y-2 pointer-events-none">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="flex items-start animate-slide-up"
            >
              <div 
                className="backdrop-blur-md rounded-2xl px-3 py-1.5 max-w-[70%] border-2 bg-cyan-500/20 border-cyan-400"
                style={{
                  boxShadow: '0 0 4px rgba(0, 255, 255, 0.3), 0 0 6px rgba(0, 255, 255, 0.2)'
                }}
              >
                <p className="text-white/90 text-xs font-bold">{comment.username}</p>
                <p className="text-white text-sm">{comment.message}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Gift Notifications - Top Right */}
        <div className="absolute top-20 right-4 space-y-2 pointer-events-none">
          {giftNotifications.map((notification) => (
            <div
              key={notification.id}
              className="bg-gradient-to-r from-purple-500/90 to-pink-500/90 backdrop-blur-md rounded-2xl px-4 py-2 border-2 border-white/30 animate-slide-in-left"
              style={{
                boxShadow: '0 0 10px rgba(255, 0, 153, 0.6), 0 0 20px rgba(138, 43, 226, 0.4)'
              }}
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl">{notification.giftEmoji}</span>
                <div>
                  <p className="text-white text-xs font-bold">{notification.senderName} sent</p>
                  <p className="text-white text-sm font-bold">{notification.giftName}</p>
                  <p className="text-yellow-300 text-xs font-bold">{notification.cost} coins</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Center Gift Animation */}
        {currentGiftAnimation && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="animate-gift-bounce">
              <div className="text-9xl drop-shadow-2xl" style={{
                filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.8))'
              }}>
                {currentGiftAnimation.emoji}
              </div>
              <p className="text-white text-2xl font-bold text-center mt-4" style={{
                textShadow: '0 0 10px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 0, 153, 0.6)'
              }}>
                {currentGiftAnimation.name}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Controls - Chat Input and Gift Button */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
        <div className="flex items-center gap-2">
          {/* Attachment Icon */}
          <button className="flex-shrink-0">
            <Paperclip 
              className="w-5 h-5"
              style={{
                stroke: 'url(#paperclipGradient)',
                filter: 'drop-shadow(0 0 4px rgba(255, 237, 78, 0.8)) drop-shadow(0 0 6px rgba(255, 230, 109, 0.6))',
                strokeWidth: 2
              }}
            />
          </button>

          {/* SVG Gradient Definition for Paperclip */}
          <svg width="0" height="0" style={{ position: 'absolute' }}>
            <defs>
              <linearGradient id="paperclipGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#FFF176', stopOpacity: 1 }} />
                <stop offset="50%" style={{ stopColor: '#FFE66D', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#FFED4E', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
          </svg>

          {/* Message Input with Neon Outline */}
          <div 
            className="flex-1 rounded-full p-[1px]"
            style={{
              background: 'linear-gradient(135deg, #ff0099 0%, #dd00ff 50%, #00ffff 100%)'
            }}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Say something..."
              className="w-full bg-black/60 backdrop-blur-sm rounded-full px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none"
            />
          </div>

          {/* Gift Box Button */}
          <button 
            onClick={() => setShowGiftModal(true)}
            className="flex-shrink-0 ml-2"
          >
            <img 
              src={giftBoxImage} 
              alt="Send Gift" 
              className="w-9 h-9 object-contain"
              style={{
                filter: 'drop-shadow(0 0 4px rgba(0, 255, 255, 0.6)) drop-shadow(0 0 8px rgba(255, 0, 153, 0.4)) drop-shadow(0 0 12px rgba(138, 43, 226, 0.3))'
              }}
            />
          </button>

          {/* Send Button */}
          <button 
            onClick={handleSendMessage}
            className="flex-shrink-0 -ml-1"
          >
            <img 
              src={sendIconImage} 
              alt="Send" 
              className="w-14 h-14 object-contain"
              style={{
                filter: 'drop-shadow(0 0 6px rgba(0, 255, 255, 0.8)) drop-shadow(0 0 12px rgba(255, 0, 153, 0.6)) drop-shadow(0 0 18px rgba(138, 43, 226, 0.5))'
              }}
            />
          </button>
        </div>
      </div>

      {/* Gift Selection Modal */}
      {showGiftModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end justify-center max-w-[430px] mx-auto">
          <div className="w-full bg-gradient-to-b from-[#1a1a2e] to-[#0a0f23] rounded-t-3xl p-6 max-h-[70vh] overflow-y-auto animate-slide-up">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white text-xl font-bold">Send a Gift</h3>
              <button 
                onClick={() => setShowGiftModal(false)}
                className="text-white/60 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Gift Grid */}
            <div className="grid grid-cols-4 gap-3">
              {giftOptions.map((gift) => (
                <button
                  key={gift.id}
                  onClick={() => handleSendGift(gift)}
                  className="flex flex-col items-center gap-1 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-400/50 transition-all group"
                >
                  <span className="text-3xl group-hover:scale-110 transition-transform">
                    {gift.emoji}
                  </span>
                  <span className="text-white text-[10px] text-center leading-tight font-bold truncate w-full">
                    {gift.name}
                  </span>
                  <span className="text-yellow-400 text-xs font-bold">{gift.cost}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
