import { ArrowLeft, Settings, Heart, Video, MessageCircle, Share2, Paperclip } from 'lucide-react';
import { Heart, MessageCircle, Share2, Video, Settings, ArrowLeft, Paperclip, Trash2 } from 'lucide-react';
import coinIconImage from 'figma:asset/cc0349f11bd96dedece6b8e3ce0aebe644cfe828.png';
import giftBoxImage from 'figma:asset/bc95fd24c1ce6fceb586e0793b80646fbd2fc942.png';
import sendIconImage from 'figma:asset/1c8916258b4a83432e6ac48d710936cd1915bc21.png';
import followIconImage from 'figma:asset/366dbc4bd913f1b56c65c361701271246db38a83.png';
import { useState, useRef } from 'react';

interface Comment {
  id: number;
  text: string;
  timestamp: string;
  isGift?: boolean;
  giftEmoji?: string;
  giftName?: string;
  giftCost?: number;
}

interface Gift {
  id: number;
  emoji: string;
  name: string;
  cost: number;
}

const giftOptions: Gift[] = [
  // Ultra cheap gifts (1-5 coins)
  { id: 1, emoji: '👋', name: 'Wave', cost: 1 },
  { id: 2, emoji: '😀', name: 'Happy', cost: 1 },
  { id: 3, emoji: '👏', name: 'Clap', cost: 3 },
  { id: 4, emoji: '🙌', name: 'Hands Up', cost: 3 },
  { id: 5, emoji: '💜', name: 'Purple Heart', cost: 5 },
  { id: 6, emoji: '✌️', name: 'Peace', cost: 5 },
  
  // Cheap gifts (10-50 coins)
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
  
  // Medium gifts (60-200 coins)
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
  
  // Premium gifts (250-500 coins)
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
  
  // Ultra Premium gifts (600-1000 coins)
  { id: 43, emoji: '🦄', name: 'Unicorn', cost: 600 },
  { id: 44, emoji: '🎪', name: 'Carnival', cost: 650 },
  { id: 45, emoji: '🏰', name: 'Castle', cost: 700 },
  { id: 46, emoji: '🚀', name: 'Rocket', cost: 750 },
  { id: 47, emoji: '🌌', name: 'Milky Way', cost: 800 },
  { id: 48, emoji: '🎠', name: 'Carousel', cost: 850 },
  { id: 49, emoji: '🎡', name: 'Ferris Wheel', cost: 900 },
  { id: 50, emoji: '🌃', name: 'Night City', cost: 950 },
  { id: 51, emoji: '🎆', name: 'Grand Fireworks', cost: 1000 },
  
  // Elite Premium gifts (1250-3000 coins)
  { id: 52, emoji: '🎰', name: 'Jackpot', cost: 1250 },
  { id: 53, emoji: '🦚', name: 'Peacock', cost: 1500 },
  { id: 54, emoji: '🐉', name: 'Dragon', cost: 1850 },
  { id: 55, emoji: '🗼', name: 'Eiffel Tower', cost: 2000 },
  { id: 56, emoji: '⚜️', name: 'Royal Emblem', cost: 2500 },
  { id: 57, emoji: '🏛️', name: 'Palace', cost: 3000 },
];

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

interface ProfilePageProps {
  personName?: string;
  personImage?: string;
  isOwnProfile?: boolean;
  userName?: string;
  userProfilePicture?: string;
  userBio?: string;
  userGender?: 'male' | 'female' | '';
  userAge?: number | null;
  onBack: () => void;
  onTabChange?: (tab: 'forYou' | 'following' | 'explore' | 'coins' | 'chats' | 'wallet') => void;
  onWalletClick?: () => void;
  onSearchClick?: () => void;
  onSettingsClick?: () => void;
  onCreatePost?: () => void;
  onGoLive?: () => void;
  isFollowing?: boolean;
  onToggleFollow?: () => void;
  userPosts?: UserPost[];
  onUpdatePostLikes?: (postId: number, newLikeCount: number) => void;
  onUpdatePostComments?: (postId: number, newCommentCount: number) => void;
  coinBalance?: number;
  onDeductCoins?: (amount: number) => void;
}

interface Post {
  id: number;
  gradient: string;
  icon: 'camera' | 'laptop' | 'info';
  title: string;
  description: string;
  timestamp: string;
  likes: number;
  comments: number;
  views: string;
  shares: number;
}

const posts: Post[] = [
  {
    id: 1,
    gradient: 'linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #ef4444 100%)',
    icon: 'camera',
    title: 'Abstract Expression',
    description: 'Just finished this abstract piece! What do you think? The interplay of colors here represents the chaos and beauty of creative process. This piece took me about 6 hours to complete, experimenting with different gradients and compositions. I wanted to capture that feeling when inspiration strikes and everything just flows naturally. Let me know your thoughts in the comments below!',
    timestamp: '5 hours ago',
    likes: 0,
    comments: 0,
    views: '0',
    shares: 0
  },
  {
    id: 2,
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
    icon: 'laptop',
    title: 'New Design Project',
    description: 'New design project in the works! Can\'t reveal too much yet but I\'m really excited about this one. Stay tuned for the big reveal next week!',
    timestamp: '1 day ago',
    likes: 0,
    comments: 0,
    views: '0',
    shares: 0
  },
  {
    id: 3,
    gradient: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
    icon: 'info',
    title: 'Collaboration Announcement',
    description: 'Collaboration announcement coming soon! I\'ve been working with some amazing creators on something special. Hint: it involves AR experiences!',
    timestamp: '2 days ago',
    likes: 0,
    comments: 0,
    views: '0',
    shares: 0
  },
  {
    id: 4,
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
    icon: 'camera',
    title: 'Golden Hour Magic',
    description: 'Caught the most incredible sunset today! 🌅 The way the light painted everything in warm tones was absolutely breathtaking. Sometimes nature creates the best art.',
    timestamp: '3 days ago',
    likes: 0,
    comments: 0,
    views: '0',
    shares: 0
  },
  {
    id: 5,
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
    icon: 'laptop',
    title: 'UI Design Tips',
    description: 'Just dropped a new tutorial on modern UI design principles! Check out my latest work on creating immersive user experiences. Link in bio! 💜',
    timestamp: '4 days ago',
    likes: 0,
    comments: 0,
    views: '0',
    shares: 0
  },
  {
    id: 6,
    gradient: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
    icon: 'info',
    title: 'Streaming Schedule',
    description: 'Live stream tonight at 8 PM! We\'ll be doing a Q&A session and showing some behind-the-scenes content. Don\'t miss it! 🎥✨',
    timestamp: '5 days ago',
    likes: 0,
    comments: 0,
    views: '0',
    shares: 0
  },
  {
    id: 7,
    gradient: 'linear-gradient(135deg, #ec4899 0%, #a855f7 100%)',
    icon: 'camera',
    title: 'Creative Journey',
    description: 'Reflecting on my creative journey this year. So grateful for all the support and opportunities! Here\'s to continuing to push boundaries and create amazing content. 💖',
    timestamp: '1 week ago',
    likes: 0,
    comments: 0,
    views: '0',
    shares: 0
  },
  {
    id: 8,
    gradient: 'linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%)',
    icon: 'laptop',
    title: 'New Merch Drop',
    description: 'Limited edition merch is finally here! 🔥 Check out the exclusive designs I\'ve been working on. These won\'t last long!',
    timestamp: '1 week ago',
    likes: 0,
    comments: 0,
    views: '0',
    shares: 0
  },
  {
    id: 9,
    gradient: 'linear-gradient(135deg, #f43f5e 0%, #ec4899 100%)',
    icon: 'info',
    title: 'Thank You!',
    description: 'Just hit 100K followers! 🎉 I can\'t thank you all enough for the incredible support. This community means everything to me. More amazing content coming your way!',
    timestamp: '2 weeks ago',
    likes: 0,
    comments: 0,
    views: '0',
    shares: 0
  }
];

export function ProfilePage({ personName, personImage, isOwnProfile, userName, userProfilePicture, userBio, userGender, userAge, onBack, onTabChange, onWalletClick, onSearchClick, onSettingsClick, onCreatePost, onGoLive, isFollowing = false, onToggleFollow, userPosts = [], onUpdatePostLikes, onUpdatePostComments, coinBalance = 0, onDeductCoins }: ProfilePageProps) {
  const [selectedPost, setSelectedPost] = useState<Post | UserPost | null>(null);
  const [postLikes, setPostLikes] = useState<{ [key: number]: number }>({});
  const [hasLiked, setHasLiked] = useState<{ [key: number]: boolean }>({});
  const [postComments, setPostComments] = useState<{ [key: number]: Comment[] }>({});
  const [commentInput, setCommentInput] = useState('');
  const [showGiftModal, setShowGiftModal] = useState(false);
  const commentInputRef = useRef<HTMLDivElement>(null);

  // For own profile, show user's posts only. For others, show default posts
  const displayPosts = isOwnProfile !== false ? userPosts : posts;
  
  // For own profile, use user's data. For viewing others, use person data
  const displayName = isOwnProfile ? (userName || 'New User') : (personName || 'User');
  const displayImage = isOwnProfile ? userProfilePicture : personImage;
  const displayBio = isOwnProfile ? userBio : '';
  
  // Check if this is a brand new user (no profile data set)
  const isNewUser = isOwnProfile && !userName && !userProfilePicture && !userBio && !userGender && !userAge;
  
  // Use user's gender/age if viewing own profile, otherwise default
  const displayGender = isOwnProfile !== false ? (userGender || 'female') : 'female';
  const displayAge = isOwnProfile !== false ? (userAge || 24) : 24;

  // Handle like toggle
  const handleLikeToggle = (postId: number, currentLikes: number) => {
    const isLiked = hasLiked[postId] || false;
    const newLikeCount = isLiked ? (postLikes[postId] || currentLikes) - 1 : (postLikes[postId] || currentLikes) + 1;
    
    setHasLiked(prev => ({ ...prev, [postId]: !isLiked }));
    setPostLikes(prev => ({ 
      ...prev, 
      [postId]: newLikeCount
    }));

    // Update parent state for user posts
    const isUserPost = userPosts.some(post => post.id === postId);
    if (isUserPost && onUpdatePostLikes) {
      onUpdatePostLikes(postId, newLikeCount);
    }
  };

  // Scroll to comment input
  const scrollToComments = () => {
    commentInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };

  // Get current like count for a post
  const getLikeCount = (postId: number, originalLikes: number) => {
    return postLikes[postId] !== undefined ? postLikes[postId] : originalLikes;
  };

  // Get current comment count for a post
  const getCommentCount = (postId: number, originalComments: number) => {
    const currentComments = postComments[postId]?.length || 0;
    return currentComments > 0 ? currentComments : originalComments;
  };

  // Handle sending comment
  const handleSendComment = () => {
    if (!commentInput.trim() || !selectedPost) return;

    const newComment: Comment = {
      id: Date.now(),
      text: commentInput,
      timestamp: 'Just now'
    };

    setPostComments(prev => ({
      ...prev,
      [selectedPost.id]: [...(prev[selectedPost.id] || []), newComment]
    }));

    // Update comment count
    const newCommentCount = (postComments[selectedPost.id]?.length || 0) + 1;
    const isUserPost = userPosts.some(post => post.id === selectedPost.id);
    if (isUserPost && onUpdatePostComments) {
      onUpdatePostComments(selectedPost.id, newCommentCount);
    }

    setCommentInput('');
  };

  // Handle sending gift
  const handleSendGift = (gift: Gift) => {
    if (!selectedPost) return;

    // Check if user has enough coins
    if (coinBalance < gift.cost) {
      alert(`Not enough coins! You need ${gift.cost} coins but only have ${coinBalance}.`);
      return;
    }

    // Deduct coins
    if (onDeductCoins) {
      onDeductCoins(gift.cost);
    }

    // Create gift comment
    const newComment: Comment = {
      id: Date.now(),
      text: `Sent ${gift.name}`,
      timestamp: 'Just now',
      isGift: true,
      giftEmoji: gift.emoji,
      giftName: gift.name,
      giftCost: gift.cost
    };

    setPostComments(prev => ({
      ...prev,
      [selectedPost.id]: [...(prev[selectedPost.id] || []), newComment]
    }));

    // Update comment count
    const newCommentCount = (postComments[selectedPost.id]?.length || 0) + 1;
    const isUserPost = userPosts.some(post => post.id === selectedPost.id);
    if (isUserPost && onUpdatePostComments) {
      onUpdatePostComments(selectedPost.id, newCommentCount);
    }

    setShowGiftModal(false);
  };

  // Handle deleting comment
  const handleDeleteComment = (commentId: number) => {
    if (!selectedPost) return;

    // Remove comment from state
    setPostComments(prev => ({
      ...prev,
      [selectedPost.id]: (prev[selectedPost.id] || []).filter(comment => comment.id !== commentId)
    }));

    // Update comment count
    const newCommentCount = Math.max(0, (postComments[selectedPost.id]?.length || 0) - 1);
    const isUserPost = userPosts.some(post => post.id === selectedPost.id);
    if (isUserPost && onUpdatePostComments) {
      onUpdatePostComments(selectedPost.id, newCommentCount);
    }
  };
  
  // If a post is selected, show the detail view
  if (selectedPost) {
    return (
      <div className="relative min-h-screen flex flex-col max-w-[430px] mx-auto" style={{ background: 'rgba(5, 15, 35, 0.9)' }}>
        {/* Post Detail View */}
        <div className="flex-1 overflow-y-auto pb-[80px]">
          {/* Post Image/Gradient */}
          <div 
            className="h-[400px] relative flex items-center justify-center rounded-b-3xl"
            style={{ background: selectedPost.gradient }}
          >
            {selectedPost.icon === 'camera' && (
              <svg className="w-24 h-24 text-white/40" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
              </svg>
            )}
            {selectedPost.icon === 'laptop' && (
              <svg className="w-24 h-24 text-white/40" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z"/>
              </svg>
            )}
            {selectedPost.icon === 'info' && (
              <svg className="w-24 h-24 text-white/40" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              </svg>
            )}
            
            {/* Back Button */}
            <button 
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 left-4 w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors"
              style={{ zIndex: 5 }}
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-3 px-4 py-4">
            <button 
              onClick={() => handleLikeToggle(selectedPost.id, selectedPost.likes)}
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-2xl border-2 backdrop-blur-md transition-all ${
                hasLiked[selectedPost.id] 
                  ? 'border-red-500/50 bg-red-500/20' 
                  : 'border-white/20 bg-black/40'
              }`}
            >
              <Heart 
                className={`w-5 h-5 transition-colors ${
                  hasLiked[selectedPost.id] ? 'text-red-500 fill-red-500' : 'text-white'
                }`}
              />
              <span className="text-white font-bold">{getLikeCount(selectedPost.id, selectedPost.likes)}</span>
            </button>
            <button 
              onClick={scrollToComments}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl border-2 border-white/20 bg-black/40 backdrop-blur-md hover:bg-white/10 transition-colors"
            >
              <MessageCircle className="w-5 h-5 text-white" />
              <span className="text-white font-bold">{getCommentCount(selectedPost.id, selectedPost.comments)}</span>
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl border-2 border-white/20 bg-black/40 backdrop-blur-md hover:bg-white/10 transition-colors">
              <Share2 className="w-5 h-5 text-white" />
              <span className="text-white font-bold">Share</span>
            </button>
          </div>

          {/* Profile Section */}
          <div className="px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center"
                style={{
                  boxShadow: '0 0 8px rgba(135, 206, 250, 0.8), 0 0 12px rgba(255, 255, 255, 0.7), 0 0 16px rgba(255, 215, 0, 0.5)'
                }}
              >
                <img 
                  src={displayImage}
                  alt={displayName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-white font-bold">{displayName}</p>
                <p className="text-white/60 text-sm">@{displayName.toLowerCase().replace(' ', '')} • {selectedPost.timestamp}</p>
              </div>
            </div>
            <button
              onClick={() => setIsFollowing(!isFollowing)}
              className="ml-1 flex-shrink-0 transition-all hover:scale-110 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center"
              style={{
                opacity: isFollowing ? 0.6 : 1
              }}
            >
              <img
                src={followIconImage}
                alt={isFollowing ? "Following" : "Follow"}
                className="w-9 h-9 object-contain"
              />
            </button>
          </div>

          {/* Post Content */}
          <div className="px-4 py-4">
            <h2 className="text-white text-2xl font-bold mb-4">{selectedPost.title}</h2>
            <p className="text-white/80 leading-relaxed mb-6">
              {selectedPost.description}
            </p>

            {/* Comments Section */}
            <h3 className="text-white text-xl font-bold mb-4">Comments ({getCommentCount(selectedPost.id, selectedPost.comments)})</h3>
            
            {/* Comments List */}
            {(!postComments[selectedPost.id] || postComments[selectedPost.id].length === 0) ? (
              <div className="text-center py-12">
                <p className="text-white/40 text-sm">No comments yet</p>
                <p className="text-white/30 text-xs mt-2">Be the first to comment!</p>
              </div>
            ) : (
              <div className="space-y-3 mb-6">
                {postComments[selectedPost.id].map((comment) => (
                  <div key={comment.id} className="bg-[#1a1d2e] rounded-2xl p-4 border border-white/10 relative group">
                    {/* Delete Button */}
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className="absolute top-3 right-3 p-1.5 rounded-full bg-red-500/20 border border-red-500/30 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/30"
                      title="Delete comment"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>

                    <div className="flex gap-3">
                      <div 
                        className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0"
                        style={{
                          boxShadow: '0 0 8px rgba(135, 206, 250, 0.8), 0 0 12px rgba(255, 255, 255, 0.7), 0 0 16px rgba(255, 215, 0, 0.5)'
                        }}
                      >
                        <img
                          src={displayImage}
                          alt="You"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-white font-bold">You</p>
                        </div>
                        <p className="text-white/60 text-xs mb-2">{comment.timestamp}</p>
                        {comment.isGift ? (
                          <div className="flex items-center gap-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-xl p-3">
                            <span className="text-4xl">{comment.giftEmoji}</span>
                            <div>
                              <p className="text-white font-bold">{comment.text}</p>
                              <p className="text-yellow-400 text-sm font-bold">{comment.giftCost} coins</p>
                            </div>
                          </div>
                        ) : (
                          <p className="text-white/90 text-sm">{comment.text}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>

        {/* Fixed Comment Input Bar at Bottom */}
        <div 
          ref={commentInputRef} 
          className="absolute bottom-0 left-0 right-0 px-4 py-3 border-t border-white/10" 
          style={{ background: 'rgba(5, 15, 35, 0.95)', backdropFilter: 'blur(10px)' }}
        >
          {/* SVG Gradient Definition for Paperclip */}
          <svg width="0" height="0" style={{ position: 'absolute' }}>
            <defs>
              <linearGradient id="paperclipGradientComment" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#FFF176', stopOpacity: 1 }} />
                <stop offset="50%" style={{ stopColor: '#FFE66D', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#FFED4E', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
          </svg>
          
          <div className="flex items-center gap-2">
            {/* Attachment Icon with Light Gold Neon Gradient */}
            <button className="flex-shrink-0">
              <Paperclip 
                className="w-5 h-5"
                style={{
                  stroke: 'url(#paperclipGradientComment)',
                  filter: 'drop-shadow(0 0 4px rgba(255, 237, 78, 0.8)) drop-shadow(0 0 6px rgba(255, 230, 109, 0.6))',
                  strokeWidth: 2
                }}
              />
            </button>

            {/* Input Field with Neon Outline */}
            <div 
              className="flex-1 rounded-full p-[1px]"
              style={{
                background: 'linear-gradient(135deg, #ff0099 0%, #dd00ff 50%, #00ffff 100%)'
              }}
            >
              <input
                type="text"
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendComment()}
                placeholder="Add a comment..."
                className="w-full bg-white/10 rounded-full px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none"
                style={{
                  background: 'rgba(5, 15, 35, 0.9)'
                }}
              />
            </div>

            {/* Neon Gift Box Image */}
            <button 
              onClick={() => setShowGiftModal(true)}
              className="flex-shrink-0 ml-2"
            >
              <img 
                src={giftBoxImage} 
                alt="Gift" 
                className="w-9 h-9 object-contain"
                style={{
                  filter: 'drop-shadow(0 0 4px rgba(0, 255, 255, 0.6)) drop-shadow(0 0 8px rgba(255, 0, 153, 0.4)) drop-shadow(0 0 12px rgba(138, 43, 226, 0.3))'
                }}
              />
            </button>

            {/* Send Button */}
            <button 
              onClick={handleSendComment}
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
  
  return (
    <div className="relative min-h-screen flex flex-col overflow-y-auto">
      {/* Neon Casino Background - Bottom Layer - Fixed */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-black to-cyan-900" style={{ zIndex: -1 }}>
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

      {/* Content Container - Scrollable */}
      <div className="relative -mx-0">
        {/* Large Profile Image Background */}
        <div className="relative h-[65vh] -mt-0 overflow-hidden">
          {displayImage ? (
            <img
              src={displayImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            // Placeholder for new users with no profile picture
            <div className="w-full h-full bg-gradient-to-br from-purple-900/50 via-black to-cyan-900/50 flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                  <svg className="w-16 h-16 text-white/40" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <p className="text-white/60 text-sm">No profile picture</p>
              </div>
            </div>
          )}
          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80"></div>
          
          {/* Top Header with Back and Settings - Fixed Position */}
          <div className="fixed top-0 left-0 right-0 p-4 z-50 max-w-[430px] mx-auto pointer-events-none">
            <div className="flex items-center justify-between pointer-events-auto">
              <button 
                onClick={onBack}
                className="w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              {isOwnProfile !== false && (
                <button 
                  onClick={onSettingsClick}
                  className="w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors cursor-pointer"
                >
                  <Settings className="w-6 h-6" />
                </button>
              )}
            </div>
          </div>
        
          {/* Bottom Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 pb-10 z-10">
            {/* Name and Gender/Age Badge */}
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-white text-xl font-bold">{displayName}</h2>
              {displayGender && displayAge && (
                <div className={`rounded-full px-1.5 py-0.5 flex items-center gap-0.5 ${
                  displayGender === 'female' ? 'bg-pink-500' : 'bg-blue-500'
                }`}>
                  <span 
                    className="text-white text-[10px]"
                    style={{
                      textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white',
                      WebkitTextStroke: '0.5px white'
                    }}
                  >
                    {displayGender === 'female' ? '♀' : '♂'}
                  </span>
                  <span 
                    className="text-white text-[10px]"
                    style={{
                      WebkitTextStroke: '0.5px white'
                    }}
                  >
                    {displayAge}
                  </span>
                </div>
              )}
            </div>

            {/* Bio */}
            {displayBio ? (
              <p className="text-white text-sm mb-4 line-clamp-2">
                {displayBio}
              </p>
            ) : isNewUser ? (
              <p className="text-white/40 text-sm mb-4 italic">
                Add a bio to tell others about yourself...
              </p>
            ) : isOwnProfile ? (
              <p className="text-white/40 text-sm mb-4 italic">
                Add a bio to tell others about yourself...
              </p>
            ) : (
              <p className="text-white text-sm mb-4 line-clamp-2">
                ✨ Professional streamer & content creator 🎮 Living my best life one stream at a time! 💜
              </p>
            )}

            {/* Action Buttons Row */}
            {isOwnProfile !== false ? (
              // Own Profile - Show Create Post and Go Live
              <div className="flex items-center gap-3">
                {/* Create Post Button */}
                <button 
                  onClick={onCreatePost}
                  className="flex-1 flex items-center justify-center gap-2 text-white font-bold px-4 py-3 rounded-lg transition-all hover:scale-105 h-11"
                  style={{
                    background: 'linear-gradient(135deg, #ff0099 0%, #dd00ff 50%, #00ffff 100%)',
                    boxShadow: '0 0 15px rgba(255, 0, 153, 0.6)'
                  }}
                >
                  <span className="text-2xl leading-none">+</span>
                  <span className="text-center">Post</span>
                </button>

                {/* Go Live Button */}
                <button 
                  onClick={onGoLive}
                  className="flex-1 flex items-center justify-center gap-2 text-white font-bold px-4 py-3 rounded-lg transition-all hover:scale-105 h-11"
                  style={{
                    background: 'linear-gradient(135deg, #00b4d8 0%, #0096c7 100%)',
                    boxShadow: '0 0 15px rgba(0, 180, 216, 0.6)'
                  }}
                >
                  <Video className="w-4 h-4" />
                  <span className="text-center">Go Live</span>
                </button>
              </div>
            ) : (
              // Other User's Profile - Show Follow Button
              <div className="flex items-center gap-3">
                <button 
                  onClick={onToggleFollow}
                  className="flex-1 flex items-center justify-center gap-2 text-white font-bold px-4 py-3 rounded-lg transition-all hover:scale-105 h-11"
                  style={{
                    background: isFollowing 
                      ? 'rgba(255, 255, 255, 0.1)'
                      : 'linear-gradient(135deg, #ff0099 0%, #dd00ff 50%, #00ffff 100%)',
                    boxShadow: isFollowing 
                      ? 'none'
                      : '0 0 15px rgba(255, 0, 153, 0.6)',
                    border: isFollowing ? '2px solid rgba(255, 255, 255, 0.3)' : 'none'
                  }}
                >
                  <img
                    src={followIconImage}
                    alt={isFollowing ? "Following" : "Follow"}
                    className="w-5 h-5 object-contain"
                  />
                  <span className="text-center">{isFollowing ? 'Following' : 'Follow'}</span>
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Recent Posts Section */}
        <div className="relative px-4 py-6">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white text-2xl font-bold">Recent Posts</h2>
          </div>

          {/* Posts Carousel or Empty State */}
          {displayPosts.length === 0 ? (
            // Empty state for new users
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                <svg className="w-12 h-12 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-white/60 text-lg mb-2">No posts yet</p>
              <p className="text-white/40 text-sm mb-6">Share your first post to get started!</p>
              {isOwnProfile && (
                <button 
                  onClick={onCreatePost}
                  className="inline-flex items-center justify-center gap-2 text-white font-bold px-6 py-3 rounded-lg transition-all hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #ff0099 0%, #dd00ff 50%, #00ffff 100%)',
                    boxShadow: '0 0 15px rgba(255, 0, 153, 0.6)'
                  }}
                >
                  <span className="text-xl leading-none">+</span>
                  <span>Create Your First Post</span>
                </button>
              )}
            </div>
          ) : (
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {displayPosts.map((post) => (
              <button
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="flex-shrink-0 w-[280px] rounded-xl overflow-hidden hover:scale-105 transition-transform"
              >
                <div 
                  className="h-[320px] relative flex items-center justify-center overflow-hidden"
                  style={{ background: post.gradient }}
                >
                  {'mediaUrl' in post && post.mediaUrl ? (
                    post.mediaType === 'video' ? (
                      <video 
                        src={post.mediaUrl}
                        className="w-full h-full object-cover"
                        muted
                        playsInline
                      />
                    ) : (
                      <img 
                        src={post.mediaUrl}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    )
                  ) : (
                    <>
                      {post.icon === 'camera' && (
                        <svg className="w-20 h-20 text-white/40" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
                        </svg>
                      )}
                      {post.icon === 'laptop' && (
                        <svg className="w-20 h-20 text-white/40" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z"/>
                        </svg>
                      )}
                      {post.icon === 'info' && (
                        <svg className="w-20 h-20 text-white/40" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                        </svg>
                      )}
                    </>
                  )}
                </div>
                <div className="bg-[#1a1d2e] p-4 text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <div 
                      className="w-8 h-8 rounded-full overflow-hidden bg-white/10 flex items-center justify-center"
                      style={{
                        boxShadow: '0 0 8px rgba(135, 206, 250, 0.8), 0 0 12px rgba(255, 255, 255, 0.7), 0 0 16px rgba(255, 215, 0, 0.5)'
                      }}
                    >
                      {displayImage ? (
                        <img
                          src={displayImage}
                          alt={displayName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <svg className="w-4 h-4 text-white/40" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                      )}
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">{displayName}</p>
                      <p className="text-white/60 text-xs">{post.timestamp}</p>
                    </div>
                  </div>
                  <p className="text-white/80 text-sm line-clamp-3">
                    {post.description}
                  </p>
                </div>
              </button>
              ))}
            </div>
          )}

          {/* Add spacing for scrolling */}
          <div className="h-32"></div>
        </div>
      </div>

      {/* Floating Header - Overlaid on top - Below main header */}
      <div className="absolute top-0 left-0 right-0 px-4 py-4 flex items-center justify-between" style={{ zIndex: 5 }}>
        <button onClick={onBack} className="w-10 h-10 bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-colors shadow-lg">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <button className="w-10 h-10 bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-colors shadow-lg">
          <Settings className="w-6 h-6" />
        </button>
      </div>

      {/* Gift Modal */}
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
