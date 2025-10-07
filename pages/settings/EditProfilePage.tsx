import { ArrowLeft, Camera, X, Image as ImageIcon } from 'lucide-react';
import { useState, useRef } from 'react';

interface EditProfilePageProps {
  onBack: () => void;
  userGender: 'male' | 'female' | '';
  userAge: number | null;
  userCoinRate: number | null;
  onUpdateProfile: (gender: 'male' | 'female', age: number, coinRate: number) => void;
}

interface Location {
  code: string;
  name: string;
  flag: string;
}

const locations: Location[] = [
  { code: 'us', name: 'United States', flag: '🇺🇸' },
  { code: 'gb', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'ca', name: 'Canada', flag: '🇨🇦' },
  { code: 'au', name: 'Australia', flag: '🇦🇺' },
  { code: 'es', name: 'Spain', flag: '🇪🇸' },
  { code: 'mx', name: 'Mexico', flag: '🇲🇽' },
  { code: 'ar', name: 'Argentina', flag: '🇦🇷' },
  { code: 'co', name: 'Colombia', flag: '🇨🇴' },
  { code: 'fr', name: 'France', flag: '🇫🇷' },
  { code: 'de', name: 'Germany', flag: '🇩🇪' },
  { code: 'it', name: 'Italy', flag: '🇮🇹' },
  { code: 'pt', name: 'Portugal', flag: '🇵🇹' },
  { code: 'br', name: 'Brazil', flag: '🇧🇷' },
  { code: 'ru', name: 'Russia', flag: '🇷🇺' },
  { code: 'jp', name: 'Japan', flag: '🇯🇵' },
  { code: 'kr', name: 'South Korea', flag: '🇰🇷' },
  { code: 'cn', name: 'China', flag: '🇨🇳' },
  { code: 'tw', name: 'Taiwan', flag: '🇹🇼' },
  { code: 'hk', name: 'Hong Kong', flag: '🇭🇰' },
  { code: 'sa', name: 'Saudi Arabia', flag: '🇸🇦' },
  { code: 'ae', name: 'United Arab Emirates', flag: '🇦🇪' },
  { code: 'in', name: 'India', flag: '🇮🇳' },
  { code: 'bd', name: 'Bangladesh', flag: '🇧🇩' },
  { code: 'pk', name: 'Pakistan', flag: '🇵🇰' },
  { code: 'tr', name: 'Turkey', flag: '🇹🇷' },
  { code: 'pl', name: 'Poland', flag: '🇵🇱' },
  { code: 'ua', name: 'Ukraine', flag: '🇺🇦' },
  { code: 'nl', name: 'Netherlands', flag: '🇳🇱' },
  { code: 'se', name: 'Sweden', flag: '🇸🇪' },
  { code: 'no', name: 'Norway', flag: '🇳🇴' },
  { code: 'dk', name: 'Denmark', flag: '🇩🇰' },
  { code: 'fi', name: 'Finland', flag: '🇫🇮' },
  { code: 'gr', name: 'Greece', flag: '🇬🇷' },
  { code: 'cz', name: 'Czech Republic', flag: '🇨🇿' },
  { code: 'ro', name: 'Romania', flag: '🇷🇴' },
  { code: 'hu', name: 'Hungary', flag: '🇭🇺' },
  { code: 'th', name: 'Thailand', flag: '🇹🇭' },
  { code: 'vn', name: 'Vietnam', flag: '🇻🇳' },
  { code: 'id', name: 'Indonesia', flag: '🇮🇩' },
  { code: 'my', name: 'Malaysia', flag: '🇲🇾' },
  { code: 'sg', name: 'Singapore', flag: '🇸🇬' },
  { code: 'ph', name: 'Philippines', flag: '🇵🇭' },
  { code: 'il', name: 'Israel', flag: '🇮🇱' },
  { code: 'ir', name: 'Iran', flag: '🇮🇷' },
  { code: 'za', name: 'South Africa', flag: '🇿🇦' },
  { code: 'ke', name: 'Kenya', flag: '🇰🇪' },
  { code: 'ng', name: 'Nigeria', flag: '🇳🇬' },
  { code: 'al', name: 'Albania', flag: '🇦🇱' },
  { code: 'bg', name: 'Bulgaria', flag: '🇧🇬' },
  { code: 'hr', name: 'Croatia', flag: '🇭🇷' },
  { code: 'rs', name: 'Serbia', flag: '🇷🇸' },
  { code: 'sk', name: 'Slovakia', flag: '🇸🇰' },
  { code: 'si', name: 'Slovenia', flag: '🇸🇮' },
  { code: 'ee', name: 'Estonia', flag: '🇪🇪' },
  { code: 'lv', name: 'Latvia', flag: '🇱🇻' },
  { code: 'lt', name: 'Lithuania', flag: '🇱🇹' },
  { code: 'ie', name: 'Ireland', flag: '🇮🇪' },
  { code: 'nz', name: 'New Zealand', flag: '🇳🇿' },
  { code: 'cl', name: 'Chile', flag: '🇨🇱' },
  { code: 've', name: 'Venezuela', flag: '🇻🇪' },
  { code: 'pe', name: 'Peru', flag: '🇵🇪' }
];

export function EditProfilePage({ onBack, userGender, userAge, userCoinRate, onUpdateProfile }: EditProfilePageProps) {
  const [gender, setGender] = useState<'male' | 'female' | ''>(userGender);
  const [age, setAge] = useState<string>(userAge ? userAge.toString() : '');
  const [coinRate, setCoinRate] = useState<string>(userCoinRate ? userCoinRate.toString() : '');
  const [location, setLocation] = useState<string>('');
  const [fullName, setFullName] = useState('Jessica Anderson');
  const [username, setUsername] = useState('jessicaanderson');
  const [bio, setBio] = useState('✨ Professional streamer & content creator 🎮 Living my best life one stream at a time! 💜');
  const [website, setWebsite] = useState('');
  const [showRequiredWarning, setShowRequiredWarning] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string>('https://images.unsplash.com/photo-1551929175-f82f676827b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHdvbWFuJTIwcHJvZmlsZXxlbnwxfHx8fDE3NTk0MTY2MTl8MA&ixlib=rb-4.1.0&q=80&w=1080');
  const [showPhotoOptions, setShowPhotoOptions] = useState(false);

  const cameraInputRef = useRef<HTMLInputElement>(null);
  const libraryInputRef = useRef<HTMLInputElement>(null);

  const isRequiredFieldsComplete = gender !== '' && age !== '' && parseInt(age) > 0 && coinRate !== '' && parseInt(coinRate) > 0 && location !== '';

  const handleSave = () => {
    if (!isRequiredFieldsComplete) {
      setShowRequiredWarning(true);
      return;
    }

    // Save profile changes
    onUpdateProfile(gender as 'male' | 'female', parseInt(age), parseInt(coinRate));
    console.log('Profile saved', { profilePhoto, location, coinRate });
    onBack();
  };

  const handlePhotoUpload = (source: 'camera' | 'library') => {
    setShowPhotoOptions(false);
    
    if (source === 'camera') {
      cameraInputRef.current?.click();
    } else {
      libraryInputRef.current?.click();
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check if it's an image
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Create object URL for preview
    const url = URL.createObjectURL(file);
    setProfilePhoto(url);

    // Reset the input
    event.target.value = '';
  };

  return (
    <div className="relative z-10 min-h-screen flex flex-col" style={{ background: 'rgba(5, 15, 35, 0.9)' }}>
      {/* Header */}
      <div className="px-4 py-4 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-white/70 hover:text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-white text-2xl font-bold">Edit Profile</h1>
        </div>
        <button
          onClick={handleSave}
          className="px-4 py-2 rounded-full font-bold text-white"
          style={{
            background: 'linear-gradient(135deg, #ff0099 0%, #dd00ff 50%, #00ffff 100%)'
          }}
        >
          Save
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {/* Required Fields Warning */}
        {!isRequiredFieldsComplete && (
          <div className="mb-6 bg-red-500/10 border border-red-400/30 rounded-xl p-4">
            <p className="text-red-400 text-sm font-bold mb-1">⚠️ Required Information</p>
            <p className="text-red-400/80 text-xs">
              Please complete your gender, age, call rate, and location before editing other profile information.
            </p>
          </div>
        )}

        {showRequiredWarning && !isRequiredFieldsComplete && (
          <div className="mb-6 bg-red-500/20 border border-red-400/50 rounded-xl p-4 animate-pulse">
            <p className="text-red-400 text-sm font-bold">
              ❌ Cannot save! Please select your gender, enter your age, set your call rate, and select your location first.
            </p>
          </div>
        )}

        {/* REQUIRED SECTION */}
        <div className="mb-6 pb-6 border-b border-white/20">
          <h2 className="text-white font-bold mb-4 flex items-center gap-2">
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">REQUIRED</span>
            Basic Information
          </h2>

          <div className="space-y-4">
            {/* Gender */}
            <div>
              <label className="text-white text-sm font-bold mb-2 block">
                Gender <span className="text-red-400">*</span>
              </label>
              <select
                value={gender}
                onChange={(e) => {
                  setGender(e.target.value as 'male' | 'female');
                  setShowRequiredWarning(false);
                }}
                className={`w-full px-4 py-3 rounded-xl bg-white/10 text-white border-2 focus:outline-none transition-colors ${
                  gender === '' 
                    ? 'border-red-400 focus:border-red-400' 
                    : 'border-green-400 focus:border-green-400'
                }`}
                style={{
                  colorScheme: 'dark'
                }}
              >
                <option value="" disabled style={{ backgroundColor: '#1a1d2e', color: '#ffffff' }}>Select your gender...</option>
                <option value="female" style={{ backgroundColor: '#1a1d2e', color: '#ffffff' }}>Female ♀</option>
                <option value="male" style={{ backgroundColor: '#1a1d2e', color: '#ffffff' }}>Male ♂</option>
              </select>
              {gender && (
                <p className="text-green-400 text-xs mt-1 flex items-center gap-1">
                  ✓ Gender selected
                </p>
              )}
            </div>

            {/* Age */}
            <div>
              <label className="text-white text-sm font-bold mb-2 block">
                Age <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => {
                  setAge(e.target.value);
                  setShowRequiredWarning(false);
                }}
                min="18"
                max="99"
                placeholder="Enter your age (18+)"
                className={`w-full px-4 py-3 rounded-xl bg-white/10 text-white border-2 placeholder:text-white/40 focus:outline-none transition-colors ${
                  age === '' || parseInt(age) < 18
                    ? 'border-red-400 focus:border-red-400'
                    : 'border-green-400 focus:border-green-400'
                }`}
              />
              {age && parseInt(age) >= 18 && (
                <p className="text-green-400 text-xs mt-1 flex items-center gap-1">
                  ✓ Age entered
                </p>
              )}
              {age && parseInt(age) < 18 && (
                <p className="text-red-400 text-xs mt-1">
                  ⚠️ You must be at least 18 years old
                </p>
              )}
            </div>

            {/* Coin Rate for 1:1 Video Calls */}
            <div>
              <label className="text-white text-sm font-bold mb-2 block">
                1:1 Call Rate (Coins/Minute) <span className="text-red-400">*</span>
              </label>
              <select
                value={coinRate}
                onChange={(e) => {
                  setCoinRate(e.target.value);
                  setShowRequiredWarning(false);
                }}
                className={`w-full px-4 py-3 rounded-xl bg-white/10 text-white border-2 focus:outline-none transition-colors ${
                  coinRate === '' 
                    ? 'border-red-400 focus:border-red-400' 
                    : 'border-green-400 focus:border-green-400'
                }`}
                style={{
                  colorScheme: 'dark'
                }}
              >
                <option value="" disabled style={{ backgroundColor: '#1a1d2e', color: '#ffffff' }}>Select your call rate...</option>
                <option value="5" style={{ backgroundColor: '#1a1d2e', color: '#ffffff' }}>💰 5 coins/min - Budget Friendly</option>
                <option value="10" style={{ backgroundColor: '#1a1d2e', color: '#ffffff' }}>💎 10 coins/min - Standard</option>
                <option value="15" style={{ backgroundColor: '#1a1d2e', color: '#ffffff' }}>⭐ 15 coins/min - Popular</option>
                <option value="20" style={{ backgroundColor: '#1a1d2e', color: '#ffffff' }}>✨ 20 coins/min - Premium</option>
                <option value="25" style={{ backgroundColor: '#1a1d2e', color: '#ffffff' }}>🌟 25 coins/min - Exclusive</option>
                <option value="30" style={{ backgroundColor: '#1a1d2e', color: '#ffffff' }}>💫 30 coins/min - VIP</option>
                <option value="35" style={{ backgroundColor: '#1a1d2e', color: '#ffffff' }}>🔮 35 coins/min - Deluxe</option>
                <option value="40" style={{ backgroundColor: '#1a1d2e', color: '#ffffff' }}>💠 40 coins/min - Prestige</option>
                <option value="45" style={{ backgroundColor: '#1a1d2e', color: '#ffffff' }}>🌌 45 coins/min - Supreme</option>
                <option value="50" style={{ backgroundColor: '#1a1d2e', color: '#ffffff' }}>👑 50 coins/min - Elite (Maximum)</option>
              </select>
              {coinRate && (
                <p className="text-green-400 text-xs mt-1 flex items-center gap-1">
                  ✓ Call rate set to {coinRate} coins per minute
                </p>
              )}
              <p className="text-white/60 text-xs mt-2">
                💡 This is how many coins users will pay per minute for 1:1 video calls with you.
              </p>
            </div>

            {/* Location */}
            <div>
              <label className="text-white text-sm font-bold mb-2 block">
                Location <span className="text-red-400">*</span>
              </label>
              <select
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  setShowRequiredWarning(false);
                }}
                className={`w-full px-4 py-3 rounded-xl bg-white/10 text-white border-2 focus:outline-none transition-colors ${
                  location === '' 
                    ? 'border-red-400 focus:border-red-400' 
                    : 'border-green-400 focus:border-green-400'
                }`}
                style={{
                  colorScheme: 'dark'
                }}
              >
                <option value="" disabled style={{ backgroundColor: '#1a1d2e', color: '#ffffff' }}>Select your location...</option>
                {locations.map((loc) => (
                  <option key={loc.code} value={loc.code} style={{ backgroundColor: '#1a1d2e', color: '#ffffff' }}>
                    {loc.flag} {loc.name}
                  </option>
                ))}
              </select>
              {location && (
                <p className="text-green-400 text-xs mt-1 flex items-center gap-1">
                  ✓ Location selected
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Hidden File Inputs */}
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileSelect}
          className="hidden"
        />
        <input
          ref={libraryInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Profile Photo */}
        <div className={`flex flex-col items-center mb-6 ${!isRequiredFieldsComplete ? 'opacity-50 pointer-events-none' : ''}`}>
          <div className="relative mb-2">
            <div 
              className="w-24 h-24 rounded-full overflow-hidden"
              style={{
                boxShadow: '0 0 8px rgba(135, 206, 250, 0.8), 0 0 12px rgba(255, 255, 255, 0.7), 0 0 16px rgba(255, 215, 0, 0.5)'
              }}
            >
              <img
                src={profilePhoto}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <button 
              onClick={() => !showRequiredWarning && setShowPhotoOptions(true)}
              disabled={!isRequiredFieldsComplete}
              className="absolute bottom-0 right-0 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center border-2 border-white/20 hover:bg-purple-600 transition-colors"
            >
              <Camera className="w-4 h-4 text-white" />
            </button>
          </div>
          <button 
            onClick={() => !showRequiredWarning && setShowPhotoOptions(true)}
            disabled={!isRequiredFieldsComplete}
            className="text-purple-400 text-sm font-bold hover:text-purple-300 transition-colors"
          >
            Change Photo
          </button>
        </div>

        {/* Form Fields */}
        <div className={`space-y-4 ${!isRequiredFieldsComplete ? 'opacity-50 pointer-events-none' : ''}`}>
          <div>
            <label className="text-white text-sm font-bold mb-2 block">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={!isRequiredFieldsComplete}
              className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 focus:outline-none focus:border-purple-400"
            />
          </div>

          <div>
            <label className="text-white text-sm font-bold mb-2 block">Username</label>
            <div className="flex items-center">
              <span className="text-white/60 mr-2">@</span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={!isRequiredFieldsComplete}
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 focus:outline-none focus:border-purple-400"
              />
            </div>
          </div>

          <div>
            <label className="text-white text-sm font-bold mb-2 block">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              maxLength={150}
              disabled={!isRequiredFieldsComplete}
              className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 focus:outline-none focus:border-purple-400 resize-none"
            />
            <p className="text-white/40 text-xs mt-1">{bio.length}/150 characters</p>
          </div>

          <div>
            <label className="text-white text-sm font-bold mb-2 block">Website</label>
            <input
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://yourwebsite.com"
              disabled={!isRequiredFieldsComplete}
              className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 placeholder:text-white/40 focus:outline-none focus:border-purple-400"
            />
          </div>
        </div>

        {!isRequiredFieldsComplete && (
          <div className="mt-6 text-center">
            <p className="text-white/60 text-sm">
              ↑ Complete the required fields above to unlock all profile options
            </p>
          </div>
        )}
      </div>

      {/* Photo Upload Options Modal */}
      {showPhotoOptions && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end max-w-[430px] mx-auto">
          <div className="w-full bg-[rgba(5,15,35,0.95)] rounded-t-3xl p-6 animate-slide-up">
            <h3 className="text-white text-xl font-bold mb-4">Change Profile Photo</h3>
            
            <button
              onClick={() => handlePhotoUpload('camera')}
              className="w-full py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 transition-colors mb-3 flex items-center justify-center gap-3"
            >
              <Camera className="w-6 h-6 text-white" />
              <span className="text-white font-bold">Take Photo</span>
            </button>

            <button
              onClick={() => handlePhotoUpload('library')}
              className="w-full py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 transition-colors mb-3 flex items-center justify-center gap-3"
            >
              <ImageIcon className="w-6 h-6 text-white" />
              <span className="text-white font-bold">Choose from Library</span>
            </button>

            <button
              onClick={() => setShowPhotoOptions(false)}
              className="w-full py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            >
              <span className="text-white/60">Cancel</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
