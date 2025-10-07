import { Header } from '../components/Header';
import { ForYouPage } from '../pages/ForYouPage';
import { FollowingPage } from '../pages/FollowingPage';
import { ExplorePage } from '../pages/ExplorePage';
import { SearchPage } from '../pages/SearchPage';
import { CoinsPage } from '../pages/CoinsPage';
import { ChatsPage } from '../pages/ChatsPage';
import { WalletPage } from '../pages/WalletPage';
import { TransactionHistoryPage } from '../pages/TransactionHistoryPage';
import { RedeemPage } from '../pages/RedeemPage';
import { ProfilePage } from '../pages/ProfilePage';
import { LiveStreamPage } from '../pages/LiveStreamPage';
import { SettingsPage } from '../pages/SettingsPage';
import { CreatePostPage } from '../pages/CreatePostPage';
import { GoLivePage } from '../pages/GoLivePage';
import { CallConfirmationPage } from '../pages/CallConfirmationPage';
import { IncomingCallPage } from '../pages/IncomingCallPage';
import { VideoCallPage } from '../pages/VideoCallPage';
import { useState, useEffect } from 'react';

export default function App() {
  // Detect if running in iframe (Figma Make preview)
  const [isInIframe, setIsInIframe] = useState(false);
  const [showIframeWarning, setShowIframeWarning] = useState(true);

  useEffect(() => {
    try {
      setIsInIframe(window.self !== window.top);
    } catch (e) {
      setIsInIframe(true);
    }
  }, []);
  const [currentTab, setCurrentTab] = useState<'forYou' | 'following' | 'explore' | 'coins' | 'chats' | 'wallet'>('forYou');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [isTransactionHistoryOpen, setIsTransactionHistoryOpen] = useState(false);
  const [isRedeemOpen, setIsRedeemOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isGoLiveOpen, setIsGoLiveOpen] = useState(false);
  const [liveStreamPerson, setLiveStreamPerson] = useState<{ name: string; imageUrl: string } | null>(null);
  const [profilePerson, setProfilePerson] = useState<{ name: string; imageUrl: string } | null>(null);
  const [coinBalance, setCoinBalance] = useState(0); // Starting balance for new users - must purchase coins
  
  // Earnings tracking state (only from gifts and calls)
  const [earningsToday, setEarningsToday] = useState(0);
  const [earningsThisMonth, setEarningsThisMonth] = useState(0);
  const [earningsWeekly, setEarningsWeekly] = useState([
    { day: 'Mon', value: 0 },
    { day: 'Tue', value: 0 },
    { day: 'Wed', value: 0 },
    { day: 'Thu', value: 0 },
    { day: 'Fri', value: 0 },
    { day: 'Sat', value: 0 },
    { day: 'Sun', value: 0 }
  ]);
  
  // Purchases tracking state (from buying coins)
  const [purchasesToday, setPurchasesToday] = useState(0);
  const [purchasesThisMonth, setPurchasesThisMonth] = useState(0);
  
  // User profile state
  const [userName, setUserName] = useState('');
  const [userProfilePicture, setUserProfilePicture] = useState('');
  const [userBio, setUserBio] = useState('');
  const [userGender, setUserGender] = useState<'male' | 'female' | ''>('');
  const [userAge, setUserAge] = useState<number | null>(null);
  const [userCoinRate, setUserCoinRate] = useState<number | null>(null); // Coins per minute user earns when receiving 1:1 calls
  
  // Billing history state
  interface BillingTransaction {
    id: number;
    date: string;
    type: 'purchase' | 'redemption';
    description: string;
    amount: string;
    coins: number;
    status: 'completed' | 'pending' | 'failed';
  }
  const [billingHistory, setBillingHistory] = useState<BillingTransaction[]>([]);
  
  // Add billing transaction
  const addBillingTransaction = (type: 'purchase' | 'redemption', description: string, amount: string, coins: number) => {
    const newTransaction: BillingTransaction = {
      id: Date.now(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      type,
      description,
      amount,
      coins,
      status: 'completed'
    };
    setBillingHistory(prev => [newTransaction, ...prev]);
  };

  // Transaction history state (for wallet transaction page)
  interface Transaction {
    id: number;
    type: 'purchase' | 'redemption' | 'gift' | 'call';
    description: string;
    date: string;
    time: string;
    coins: number; // positive for purchases, negative for spending
    recipientName?: string;
  }
  const [transactionHistory, setTransactionHistory] = useState<Transaction[]>([]);

  // Add transaction
  const addTransaction = (
    type: 'purchase' | 'redemption' | 'gift' | 'call',
    description: string,
    coins: number,
    recipientName?: string
  ) => {
    const now = new Date();
    const newTransaction: Transaction = {
      id: Date.now(),
      type,
      description,
      date: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
      coins,
      recipientName
    };
    setTransactionHistory(prev => [newTransaction, ...prev]);
  };

  // Track earnings (when user receives coins from gifts, calls, etc.)
  const addEarnings = (amount: number) => {
    if (amount <= 0) return; // Only track positive earnings

    // Update today's earnings
    setEarningsToday(prev => prev + amount);
    
    // Update this month's earnings
    setEarningsThisMonth(prev => prev + amount);
    
    // Update weekly earnings (add to today's day of week)
    const dayIndex = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const todayName = dayNames[dayIndex];
    
    setEarningsWeekly(prev => prev.map(day => 
      day.day === todayName 
        ? { ...day, value: day.value + amount }
        : day
    ));
  };

  // Track purchases (when user buys coins)
  const addPurchase = (amount: number) => {
    if (amount <= 0) return; // Only track positive purchases

    // Update today's purchases
    setPurchasesToday(prev => prev + amount);
    
    // Update this month's purchases
    setPurchasesThisMonth(prev => prev + amount);
  };
  
  // Follow system
  interface FollowedUser {
    name: string;
    imageUrl: string;
    gender: 'male' | 'female';
    age: number;
    isLive?: boolean;
  }
  const [followedUsers, setFollowedUsers] = useState<FollowedUser[]>([]);

  // User posts state
  interface UserPost {
    id: number;
    title: string;
    description: string;
    mediaUrl?: string;
    mediaType?: 'image' | 'video';
    gradient: string;
    icon: 'camera' | 'laptop' | 'info';
    timestamp: string;
    createdAt: Date;
    likes: number;
    comments: number;
    views: string;
    shares: number;
  }
  const [userPosts, setUserPosts] = useState<UserPost[]>([]);

  // Add new post
  const addPost = (title: string, description: string, mediaUrl?: string, mediaType?: 'image' | 'video') => {
    const gradients = [
      'linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #ef4444 100%)',
      'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
      'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
      'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
      'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
      'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
      'linear-gradient(135deg, #ec4899 0%, #a855f7 100%)'
    ];

    const icons: ('camera' | 'laptop' | 'info')[] = ['camera', 'laptop', 'info'];
    
    const now = new Date();
    const newPost: UserPost = {
      id: Date.now(),
      title,
      description,
      mediaUrl,
      mediaType,
      gradient: gradients[Math.floor(Math.random() * gradients.length)],
      icon: mediaType ? 'camera' : icons[Math.floor(Math.random() * icons.length)],
      timestamp: 'Just now',
      createdAt: now,
      likes: 0,
      comments: 0,
      views: '0',
      shares: 0
    };

    setUserPosts(prev => [newPost, ...prev]); // Add to beginning (newest first)
  };

  // Update post likes
  const updatePostLikes = (postId: number, newLikeCount: number) => {
    setUserPosts(prev => prev.map(post => 
      post.id === postId ? { ...post, likes: newLikeCount } : post
    ));
  };

  // Update post comments count
  const updatePostComments = (postId: number, newCommentCount: number) => {
    setUserPosts(prev => prev.map(post => 
      post.id === postId ? { ...post, comments: newCommentCount } : post
    ));
  };

  // Follow/Unfollow handler
  const handleFollow = (name: string, imageUrl: string, gender: 'male' | 'female', age: number) => {
    setFollowedUsers(prev => {
      const isAlreadyFollowing = prev.some(user => user.name === name);
      if (isAlreadyFollowing) {
        // Unfollow
        return prev.filter(user => user.name !== name);
      } else {
        // Follow
        return [...prev, { name, imageUrl, gender, age, isLive: Math.random() > 0.5 }];
      }
    });
  };

  // Check if user is followed
  const isFollowing = (name: string) => {
    return followedUsers.some(user => user.name === name);
  };

  // Video call states
  const [callConfirmation, setCallConfirmation] = useState<{ name: string; imageUrl: string; coinRate: number; isOnline: boolean; isBusy: boolean } | null>(null);
  const [incomingCall, setIncomingCall] = useState<{ name: string; imageUrl: string } | null>(null);
  const [activeCall, setActiveCall] = useState<{ name: string; imageUrl: string; coinRate: number; isOwnCall: boolean } | null>(null);
  const [busyUsers, setBusyUsers] = useState<Set<string>>(new Set()); // Track users currently in calls

  // Handler for tab changes that also closes any open overlays
  const handleTabChange = (tab: 'forYou' | 'following' | 'explore' | 'coins' | 'chats' | 'wallet') => {
    setCurrentTab(tab);
    setIsProfileOpen(false);
    setIsSearchOpen(false);
    setIsWalletOpen(false);
    setIsTransactionHistoryOpen(false);
    setIsRedeemOpen(false);
    setIsSettingsOpen(false);
    setIsCreatePostOpen(false);
    setIsGoLiveOpen(false);
    setLiveStreamPerson(null);
    setProfilePerson(null);
    setCallConfirmation(null);
    setIncomingCall(null);
    setActiveCall(null);
  };

  // Video call handlers
  const handleVideoCallRequest = (name: string, imageUrl: string, coinRate: number = 10, isOnline: boolean = true) => {
    const isBusy = busyUsers.has(name);
    setCallConfirmation({ name, imageUrl, coinRate, isOnline, isBusy });
  };

  const handleConfirmCall = () => {
    if (callConfirmation) {
      // Add user to busy list
      setBusyUsers(prev => new Set(prev).add(callConfirmation.name));
      
      // Simulate ringing the other person
      // In a real app, this would trigger a notification to the other user
      setTimeout(() => {
        setCallConfirmation(null);
        setActiveCall({
          name: callConfirmation.name,
          imageUrl: callConfirmation.imageUrl,
          coinRate: callConfirmation.coinRate,
          isOwnCall: false
        });
      }, 500);
    }
  };

  const handleEndCall = () => {
    if (activeCall) {
      // Remove user from busy list
      setBusyUsers(prev => {
        const newSet = new Set(prev);
        newSet.delete(activeCall.name);
        return newSet;
      });
    }
    setActiveCall(null);
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {/* Mobile Phone Container */}
      <div className="w-full max-w-[430px] min-h-screen bg-white flex flex-col relative">
        {/* Figma Preview Warning Banner */}
        {isInIframe && showIframeWarning && (
          <div className="sticky top-0 z-50 bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-3 py-2 text-center shadow-lg">
            <div className="flex items-center justify-between gap-2 text-xs">
              <div className="flex-1 font-bold">
                ⚠️ Figma Preview: Camera blocked. Deploy to test camera features →
              </div>
              <button 
                onClick={() => setShowIframeWarning(false)}
                className="text-black/80 hover:text-black font-bold text-lg leading-none"
              >
                ×
              </button>
            </div>
            <p className="text-[10px] mt-1 opacity-90">
              Click "Publish" in Figma Make, then open published URL
            </p>
          </div>
        )}
        
        {/* Fixed Header with Status Bar and Top Navigation - Hide on full-screen pages */}
        {!isProfileOpen && 
         !isSettingsOpen && 
         !liveStreamPerson && 
         !isSearchOpen && 
         !isWalletOpen && 
         !isTransactionHistoryOpen && 
         !isRedeemOpen && 
         !isCreatePostOpen && 
         !isGoLiveOpen &&
         !callConfirmation &&
         !incomingCall &&
         !activeCall && (
          <div className="sticky top-0 z-20">
            <Header 
              currentTab={currentTab} 
              onTabChange={handleTabChange}
              onWalletClick={() => {
                setIsWalletOpen(true);
                setIsProfileOpen(false);
                setIsSearchOpen(false);
              }}
              onProfileClick={() => {
                setProfilePerson(null); // Clear any previous profile person data
                setIsProfileOpen(true);
              }}
            />
          </div>
        )}
        
        {/* Main Content Area with Neon Casino Background */}
        <div className="flex-1 relative">
          {/* Fixed Animated Gradient Background */}
          <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-black to-cyan-900 max-w-[430px] mx-auto" style={{ top: 0, bottom: 0 }}>
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
          
          {/* Content Container */}
          {activeCall ? (
            <VideoCallPage 
              personName={activeCall.name}
              personImage={activeCall.imageUrl}
              coinRate={activeCall.coinRate}
              onBack={handleEndCall}
              onEndCall={handleEndCall}
              coinBalance={coinBalance}
              onDeductCoins={(amount) => setCoinBalance(prev => prev - amount)}
              onEarnCoins={(amount) => {
                setCoinBalance(prev => prev + amount);
                addEarnings(amount);
              }}
              isOwnCall={activeCall.isOwnCall}
            />
          ) : incomingCall ? (
            <IncomingCallPage 
              callerName={incomingCall.name}
              callerImage={incomingCall.imageUrl}
              onAccept={() => {
                setActiveCall({
                  name: incomingCall.name,
                  imageUrl: incomingCall.imageUrl,
                  coinRate: userCoinRate || 10, // Use user's set coin rate, default to 10 if not set
                  isOwnCall: true
                });
                setIncomingCall(null);
              }}
              onDecline={() => setIncomingCall(null)}
              onBlock={() => {
                // In a real app, this would block the user
                console.log('Blocked user:', incomingCall.name);
                setIncomingCall(null);
              }}
            />
          ) : callConfirmation ? (
            <CallConfirmationPage 
              personName={callConfirmation.name}
              personImage={callConfirmation.imageUrl}
              coinRate={callConfirmation.coinRate}
              onBack={() => setCallConfirmation(null)}
              onConfirm={handleConfirmCall}
              coinBalance={coinBalance}
              isOnline={callConfirmation.isOnline}
              isBusy={callConfirmation.isBusy}
            />
          ) : liveStreamPerson ? (
            <LiveStreamPage 
              personName={liveStreamPerson.name}
              personImage={liveStreamPerson.imageUrl}
              onBack={() => setLiveStreamPerson(null)}
              onOpenProfile={() => {
                setProfilePerson({
                  name: liveStreamPerson.name,
                  imageUrl: liveStreamPerson.imageUrl
                });
                setLiveStreamPerson(null);
                setIsProfileOpen(true);
              }}
              onSendGift={(giftName, cost, recipientName) => {
                addTransaction('gift', `${giftName} Gift`, -cost, recipientName);
              }}
              coinBalance={coinBalance}
              onDeductCoins={(amount) => setCoinBalance(prev => prev - amount)}
              isFollowing={isFollowing(liveStreamPerson.name)}
              onToggleFollow={() => handleFollow(liveStreamPerson.name, liveStreamPerson.imageUrl, 'female', 25)}
              isBroadcasting={liveStreamPerson.name === 'Jessica Anderson'} // True if user is going live themselves
            />
          ) : isSearchOpen ? (
            <SearchPage onClose={() => setIsSearchOpen(false)} />
          ) : isSettingsOpen ? (
            <SettingsPage 
              onBack={() => setIsSettingsOpen(false)}
              userGender={userGender}
              userAge={userAge}
              userCoinRate={userCoinRate}
              onUpdateProfile={(gender, age, coinRate) => {
                setUserGender(gender);
                setUserAge(age);
                setUserCoinRate(coinRate);
              }}
              billingHistory={billingHistory}
            />
          ) : isCreatePostOpen ? (
            <CreatePostPage 
              onBack={() => setIsCreatePostOpen(false)}
              onPost={addPost}
            />
          ) : isGoLiveOpen ? (
            <GoLivePage 
              onBack={() => setIsGoLiveOpen(false)}
              onStartLiveStream={() => {
                setIsGoLiveOpen(false);
                // Open livestream with own profile
                setLiveStreamPerson({
                  name: 'Jessica Anderson',
                  imageUrl: 'https://images.unsplash.com/photo-1551929175-f82f676827b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHdvbWFuJTIwcHJvZmlsZXxlbnwxfHx8fDE3NTk0MTY2MTl8MA&ixlib=rb-4.1.0&q=80&w=1080'
                });
              }}
            />
          ) : isProfileOpen ? (
            <ProfilePage 
              personName={profilePerson?.name}
              personImage={profilePerson?.imageUrl}
              isOwnProfile={!profilePerson}
              userName={userName}
              userProfilePicture={userProfilePicture}
              userBio={userBio}
              userGender={userGender}
              userAge={userAge}
              onBack={() => {
                setIsProfileOpen(false);
                setProfilePerson(null);
              }}
              onTabChange={(tab) => {
                setIsProfileOpen(false);
                setProfilePerson(null);
                setCurrentTab(tab);
              }}
              onWalletClick={() => {
                setIsProfileOpen(false);
                setProfilePerson(null);
                setIsWalletOpen(true);
              }}
              onSearchClick={() => {
                setIsProfileOpen(false);
                setProfilePerson(null);
                setIsSearchOpen(true);
              }}
              onSettingsClick={() => {
                setIsProfileOpen(false);
                setProfilePerson(null);
                setIsSettingsOpen(true);
              }}
              onCreatePost={() => {
                setIsProfileOpen(false);
                setProfilePerson(null);
                setIsCreatePostOpen(true);
              }}
              onGoLive={() => {
                setIsProfileOpen(false);
                setProfilePerson(null);
                setIsGoLiveOpen(true);
              }}
              isFollowing={profilePerson ? isFollowing(profilePerson.name) : false}
              onToggleFollow={profilePerson ? () => handleFollow(profilePerson.name, profilePerson.imageUrl, 'female', 25) : undefined}
              userPosts={userPosts}
              onUpdatePostLikes={updatePostLikes}
              onUpdatePostComments={updatePostComments}
              coinBalance={coinBalance}
              onDeductCoins={(amount) => setCoinBalance(prev => prev - amount)}
            />
          ) : isRedeemOpen ? (
            <RedeemPage 
              onBack={() => setIsRedeemOpen(false)}
              coinBalance={coinBalance}
              onRedeem={(amount) => setCoinBalance(prev => prev - amount)}
              onAddBillingTransaction={(description, amount, coins) => 
                addBillingTransaction('redemption', description, amount, coins)
              }
              onAddTransaction={(description, coins) =>
                addTransaction('redemption', description, coins)
              }
            />
          ) : isTransactionHistoryOpen ? (
            <TransactionHistoryPage 
              onBack={() => setIsTransactionHistoryOpen(false)}
              transactions={transactionHistory}
            />
          ) : isWalletOpen ? (
            <WalletPage 
              onBack={() => setIsWalletOpen(false)} 
              onBuyCoins={() => {
                setIsWalletOpen(false);
                setCurrentTab('coins');
                window.scrollTo(0, 0);
              }}
              onViewTransactions={() => setIsTransactionHistoryOpen(true)}
              onRedeem={() => setIsRedeemOpen(true)}
              coinBalance={coinBalance}
              coinsToday={purchasesToday + earningsToday}
              coinsThisMonth={purchasesThisMonth + earningsThisMonth}
              earningsWeekly={earningsWeekly}
            />
          ) : (
            <>
              {currentTab === 'forYou' && (
                <ForYouPage 
                  onOpenLiveStream={setLiveStreamPerson}
                  onVideoCall={handleVideoCallRequest}
                />
              )}
              {currentTab === 'following' && (
                <FollowingPage 
                  followedUsers={followedUsers}
                  onOpenLiveStream={(name, imageUrl) => setLiveStreamPerson({ name, imageUrl })}
                  onOpenProfile={(name, imageUrl) => {
                    setProfilePerson({ name, imageUrl });
                    setIsProfileOpen(true);
                  }}
                />
              )}
              {currentTab === 'explore' && (
                <ExplorePage 
                  onOpenSearch={() => setIsSearchOpen(true)} 
                  followedUsers={followedUsers}
                  onOpenLiveStream={(name, imageUrl) => setLiveStreamPerson({ name, imageUrl })}
                  onOpenProfile={(name, imageUrl) => {
                    setProfilePerson({ name, imageUrl });
                    setIsProfileOpen(true);
                  }}
                />
              )}
              {currentTab === 'coins' && (
                <CoinsPage 
                  coinBalance={coinBalance}
                  onPurchase={(amount) => {
                    setCoinBalance(prev => prev + amount);
                    addPurchase(amount); // Track the purchase
                  }}
                  onAddBillingTransaction={(description, amount, coins) => 
                    addBillingTransaction('purchase', description, amount, coins)
                  }
                  onAddTransaction={(description, coins) =>
                    addTransaction('purchase', description, coins)
                  }
                />
              )}
              {currentTab === 'chats' && (
                <ChatsPage 
                  onVideoCall={handleVideoCallRequest}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
