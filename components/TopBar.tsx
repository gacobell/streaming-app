import coinImage from 'figma:asset/cc0349f11bd96dedece6b8e3ce0aebe644cfe828.png';
import compassImage from 'figma:asset/4b91822acc9e540d51e3005b842f2b9f3fa1bf06.png';
import walletImage from 'figma:asset/a76df580d4f216c0183d724124891fc71e8720b1.png';
import homeImage from 'figma:asset/60c59fb773d092291a09878766db96870d03a4ec.png';
import chatImage from 'figma:asset/25f8681b324e9b86bf16e1b730447737cd18a0ee.png';
import followingImage from 'figma:asset/ec64b7ca1cdb04c750d2b759c20502ce03822cf1.png';

interface TopBarProps {
  currentTab: 'forYou' | 'following' | 'explore' | 'coins' | 'chats' | 'wallet';
  onTabChange: (tab: 'forYou' | 'following' | 'explore' | 'coins' | 'chats' | 'wallet') => void;
  onWalletClick?: () => void;
  onProfileClick?: () => void;
}

export function TopBar({ currentTab, onTabChange, onWalletClick, onProfileClick }: TopBarProps) {
  return (
    <div className="w-full border-b border-white/20 h-[104px] flex flex-col">
      {/* Top Row - Wallet and Profile */}
      <div className="flex items-center justify-end gap-2 px-3 py-2 h-[52px] flex-shrink-0">
        {/* Right Section */}
        <div className="flex items-center gap-2 bg-[rgba(0,0,0,0)]">
          {/* Wallet Icon */}
          <button 
            onClick={onWalletClick}
            className="opacity-100 hover:opacity-80 transition-opacity drop-shadow-lg"
          >
            <img src={walletImage} alt="Wallet" className="w-6 h-6 object-contain" />
          </button>

          {/* Profile Avatar */}
          <button 
            onClick={onProfileClick}
            className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center hover:opacity-80 transition-opacity"
            style={{
              boxShadow: '0 0 8px rgba(135, 206, 250, 0.8), 0 0 12px rgba(255, 255, 255, 0.7), 0 0 16px rgba(255, 215, 0, 0.5)'
            }}
          >
            <img 
              src="https://images.unsplash.com/photo-1551929175-f82f676827b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHdvbWFuJTIwcHJvZmlsZXxlbnwxfHx8fDE3NTk0MTY2MTl8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      </div>

      {/* Bottom Row - Navigation Tabs */}
      <div className="flex items-center py-2 h-[52px] flex-shrink-0">
        {/* For You */}
        <button 
          onClick={() => onTabChange('forYou')}
          className={`flex items-center justify-center drop-shadow-lg ${
            currentTab === 'forYou' ? 'opacity-100' : 'opacity-70 hover:opacity-100'
          } transition-opacity`}
          style={{ flex: '1.2' }}
        >
          <img src={homeImage} alt="For You" className="w-[76px] h-[76px] object-contain flex-shrink-0 mt-3" />
        </button>

        {/* Following */}
        <button 
          onClick={() => onTabChange('following')}
          className={`flex items-center justify-center drop-shadow-lg ${
            currentTab === 'following' ? 'opacity-100' : 'opacity-70 hover:opacity-100'
          } transition-opacity`}
          style={{ flex: '0.8' }}
        >
          <img src={followingImage} alt="Following" className="w-[42px] h-[42px] object-contain flex-shrink-0 -ml-3" />
        </button>

        {/* Explore */}
        <button 
          onClick={() => onTabChange('explore')}
          className={`flex items-center justify-center drop-shadow-lg ${
            currentTab === 'explore' ? 'opacity-100' : 'opacity-70 hover:opacity-100'
          } transition-opacity`}
          style={{ flex: '1' }}
        >
          <img src={compassImage} alt="Explore" className="w-[68px] h-[68px] object-contain flex-shrink-0 mt-1" />
        </button>

        {/* Chats */}
        <button 
          onClick={() => onTabChange('chats')}
          className={`flex items-center justify-center drop-shadow-lg ${
            currentTab === 'chats' ? 'opacity-100' : 'opacity-70 hover:opacity-100'
          } transition-opacity`}
          style={{ flex: '0.8' }}
        >
          <img src={chatImage} alt="Chats" className="w-9 h-9 object-contain flex-shrink-0 ml-3" />
        </button>

        {/* Coins */}
        <button 
          onClick={() => onTabChange('coins')}
          className={`flex items-center justify-center drop-shadow-lg ${
            currentTab === 'coins' ? 'opacity-100' : 'opacity-70 hover:opacity-100'
          } transition-opacity`}
          style={{ flex: '1.2' }}
        >
          <img src={coinImage} alt="Coins" className="w-[66px] h-[66px] object-contain flex-shrink-0 mt-1" />
        </button>
      </div>
    </div>
  );
}
