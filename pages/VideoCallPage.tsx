import { ArrowLeft, Phone, Mic, MicOff, Video, VideoOff, MessageCircle, Paperclip, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import sendIconImage from 'figma:asset/1c8916258b4a83432e6ac48d710936cd1915bc21.png';
import coinIconImage from 'figma:asset/cc0349f11bd96dedece6b8e3ce0aebe644cfe828.png';
import { 
  createVideoCallClient, 
  AGORA_APP_ID, 
  generateChannelName, 
  generateTempToken,
  type IAgoraRTCClient,
  type ICameraVideoTrack,
  type IMicrophoneAudioTrack
} from '../lib/agora';

interface VideoCallPageProps {
  personName: string;
  personImage: string;
  coinRate: number;
  onBack: () => void;
  onEndCall: () => void;
  coinBalance: number;
  onDeductCoins: (amount: number) => void;
  onEarnCoins?: (amount: number) => void;
  isOwnCall: boolean;
  onCallEnd?: (totalCost: number, duration: number, recipientName: string) => void;
}

interface Message {
  id: number;
  text: string;
  isOwn: boolean;
  timestamp: string;
}

export function VideoCallPage({ 
  personName, 
  personImage, 
  coinRate, 
  onBack, 
  onEndCall, 
  coinBalance,
  onDeductCoins,
  onEarnCoins,
  isOwnCall,
  onCallEnd
}: VideoCallPageProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [unreadCount, setUnreadCount] = useState(0);
  const [callDuration, setCallDuration] = useState(0);
  const [totalCoinsSpent, setTotalCoinsSpent] = useState(0);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  
  // Agora video call state
  const [client, setClient] = useState<IAgoraRTCClient | null>(null);
  const [localVideoTrack, setLocalVideoTrack] = useState<ICameraVideoTrack | null>(null);
  const [localAudioTrack, setLocalAudioTrack] = useState<IMicrophoneAudioTrack | null>(null);
  const [isJoined, setIsJoined] = useState(false);
  
  const localVideoRef = useRef<HTMLDivElement>(null);
  const remoteVideoRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Agora for 1:1 video call
  useEffect(() => {
    const initAgora = async () => {
      try {
        // Import AgoraRTC dynamically
        const AgoraRTC = (await import('agora-rtc-sdk-ng')).default;
        
        // Create Agora client for video call
        const agoraClient = createVideoCallClient();
        setClient(agoraClient);

        // Generate unique channel name for this call
        const channelName = generateChannelName(`call_${personName}_${Date.now()}`);

        // Get token
        const token = await generateTempToken(channelName);

        // Join channel
        await agoraClient.join(AGORA_APP_ID, channelName, token, null);
        setIsJoined(true);

        // Create local tracks (camera and microphone)
        const [microphoneTrack, cameraTrack] = await AgoraRTC.createMicrophoneAndCameraTracks(
          { AEC: true, ANS: true }, // Audio: Echo cancellation and noise suppression
          { encoderConfig: '480p_1' } // Video: 640x480
        );

        setLocalAudioTrack(microphoneTrack);
        setLocalVideoTrack(cameraTrack);

        // Publish local tracks
        await agoraClient.publish([microphoneTrack, cameraTrack]);

        // Play local video
        if (localVideoRef.current) {
          cameraTrack.play(localVideoRef.current);
        }

        // Subscribe to remote user (the other person in call)
        agoraClient.on('user-published', async (user, mediaType) => {
          await agoraClient.subscribe(user, mediaType);

          if (mediaType === 'video' && remoteVideoRef.current) {
            user.videoTrack?.play(remoteVideoRef.current);
          }

          if (mediaType === 'audio') {
            user.audioTrack?.play();
          }
        });

        agoraClient.on('user-unpublished', (user, mediaType) => {
          if (mediaType === 'video') {
            // Remote user stopped video
          }
        });

      } catch (error) {
        console.error('Failed to initialize Agora:', error);
        setCameraError('Failed to connect video call');
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
  }, [personName]);

  const startLocalCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 640 },
          height: { ideal: 480 }
        },
        audio: true
      });
      setLocalStream(stream);
      setCameraError(null);
    } catch (error: any) {
      // Suppress console error for permission denied (expected when user denies)
      if (error.name !== 'NotAllowedError' && error.name !== 'PermissionDeniedError') {
        console.error('Error accessing camera:', error);
      }
      setCameraError('Camera access denied');
      // Continue with call even if camera fails
    }
  };

  // Call duration timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Coin deduction/earning per minute
  useEffect(() => {
    const coinTimer = setInterval(() => {
      if (isOwnCall) {
        // Earn coins when receiving a call
        if (onEarnCoins) {
          onEarnCoins(coinRate);
        }
      } else {
        // Deduct coins when making a call
        if (coinBalance >= coinRate) {
          onDeductCoins(coinRate);
        } else {
          // End call if out of coins
          alert('Out of coins! Call ending...');
          onEndCall();
        }
      }
    }, 60000); // Every 60 seconds

    return () => clearInterval(coinTimer);
  }, [coinBalance, coinRate, isOwnCall, onEarnCoins]);

  // Warning for low balance
  useEffect(() => {
    if (!isOwnCall && coinBalance < coinRate * 2 && coinBalance >= coinRate) {
      alert(`Low balance warning! You have ${coinBalance} coins remaining.`);
    }
  }, [coinBalance, coinRate, isOwnCall]);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleMute = async () => {
    if (localAudioTrack) {
      await localAudioTrack.setEnabled(!isMuted);
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = async () => {
    if (localVideoTrack) {
      await localVideoTrack.setEnabled(!isVideoOn);
      setIsVideoOn(!isVideoOn);
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      text: inputValue,
      isOwn: true,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');

    // Simulate response from other person (for demo)
    setTimeout(() => {
      const response: Message = {
        id: Date.now() + 1,
        text: 'Thanks for your message!',
        isOwn: false,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, response]);
      if (!showChat) {
        setUnreadCount(prev => prev + 1);
      }
    }, 1000);
  };

  const toggleChat = () => {
    setShowChat(!showChat);
    if (!showChat) {
      setUnreadCount(0);
    }
  };

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="relative z-10 min-h-screen flex flex-col bg-black">
      {/* Main Video - Other Person (Real Agora Video) */}
      <div className="flex-1 relative bg-gradient-to-br from-purple-900/50 via-black to-cyan-900/50 flex items-center justify-center">
        {/* Remote video container */}
        <div 
          ref={remoteVideoRef} 
          className="w-full h-full bg-black"
          style={{ position: 'absolute', inset: 0 }}
        />
        
        {/* Fallback to profile image if not connected */}
        {!isJoined && (
          <img 
            src={personImage}
            alt={personName}
            className="w-full h-full object-cover"
          />
        )}
        
        {/* Top Bar - Overlay */}
        <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button 
                onClick={onBack}
                className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center hover:bg-black/60 transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-white" />
              </button>
              
              <div>
                <h3 className="text-white font-bold">{personName}</h3>
                <p className="text-white/80 text-sm">{formatTime(callDuration)}</p>
              </div>
            </div>

            {/* Coin Balance (if paying for call) */}
            {!isOwnCall && (
              <div className="flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1.5">
                <img src={coinIconImage} alt="Coins" className="w-4 h-4" />
                <span className="text-white text-sm font-bold">{coinBalance}</span>
              </div>
            )}
          </div>
        </div>

        {/* Local Video - Picture in Picture (Bottom Right) */}
        {isVideoOn && isJoined ? (
          <div className="absolute bottom-24 right-4 w-28 h-36 rounded-xl overflow-hidden border-2 border-white/30 shadow-lg">
            <div 
              ref={localVideoRef}
              className="w-full h-full bg-black"
              muted
              className="w-full h-full object-cover scale-x-[-1]"
            />
          </div>
        ) : null}

        {/* Controls - Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex items-center justify-center gap-6">
            {/* Mute Button */}
            <button
              onClick={toggleMute}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all hover:scale-110 ${
                isMuted ? 'bg-red-500' : 'bg-white/20 backdrop-blur-md'
              }`}
            >
              {isMuted ? (
                <MicOff className="w-6 h-6 text-white" />
              ) : (
                <Mic className="w-6 h-6 text-white" />
              )}
            </button>

            {/* End Call Button */}
            <button
              onClick={onEndCall}
              className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-all hover:scale-110"
              style={{
                boxShadow: '0 0 20px rgba(239, 68, 68, 0.6)'
              }}
            >
              <Phone className="w-8 h-8 text-white rotate-[135deg]" />
            </button>

            {/* Video Toggle Button */}
            <button
              onClick={toggleVideo}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all hover:scale-110 ${
                !isVideoOn ? 'bg-red-500' : 'bg-white/20 backdrop-blur-md'
              }`}
            >
              {isVideoOn ? (
                <Video className="w-6 h-6 text-white" />
              ) : (
                <VideoOff className="w-6 h-6 text-white" />
              )}
            </button>

            {/* Chat Button */}
            <button
              onClick={toggleChat}
              className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center transition-all hover:scale-110 relative"
            >
              <MessageCircle className="w-6 h-6 text-white" />
              {unreadCount > 0 && (
                <div className="absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{unreadCount}</span>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Chat Overlay */}
      {showChat && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end">
          <div className="w-full bg-[rgba(5,15,35,0.95)] rounded-t-3xl max-h-[70vh] flex flex-col animate-slide-up">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h3 className="text-white font-bold">Messages</h3>
              <button onClick={toggleChat} className="text-white/60 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 ? (
                <p className="text-white/40 text-center text-sm">No messages yet</p>
              ) : (
                messages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                        msg.isOwn
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-500'
                          : 'bg-white/10'
                      }`}
                    >
                      <p className="text-white text-sm">{msg.text}</p>
                      <p className="text-white/60 text-xs mt-1">{msg.timestamp}</p>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-white/10">
              {/* SVG Gradient Definitions */}
              <svg width="0" height="0">
                <defs>
                  <linearGradient id="paperclipGradientCall" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#ffd700', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#ffed6e', stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
              </svg>

              <div className="flex items-center gap-2">
                {/* Attachment Icon */}
                <button className="flex-shrink-0">
                  <Paperclip 
                    className="w-5 h-5"
                    style={{
                      stroke: 'url(#paperclipGradientCall)',
                      filter: 'drop-shadow(0 0 4px rgba(255, 237, 78, 0.8)) drop-shadow(0 0 6px rgba(255, 230, 109, 0.6))',
                      strokeWidth: 2
                    }}
                  />
                </button>

                {/* Input Field */}
                <div 
                  className="flex-1 rounded-full p-[2px]"
                  style={{
                    background: 'linear-gradient(135deg, #ff0099 0%, #dd00ff 50%, #00ffff 100%)'
                  }}
                >
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type a message..."
                    className="w-full rounded-full px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none"
                    style={{
                      background: 'rgba(5, 15, 35, 0.9)'
                    }}
                  />
                </div>

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
          </div>
        </div>
      )}
    </div>
  );
}
