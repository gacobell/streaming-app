import { ArrowLeft, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import coinIconImage from 'figma:asset/cc0349f11bd96dedece6b8e3ce0aebe644cfe828.png';
import plusIconImage from 'figma:asset/366dbc4bd913f1b56c65c361701271246db38a83.png';
import moneyBagImage from 'figma:asset/0634f3d2c0673f10e52fe259f395ff050335e3fe.png';
import penImage from 'figma:asset/72885a5955006c581d98ee9c961893ea2cd62fe8.png';
import walletImage from 'figma:asset/a76df580d4f216c0183d724124891fc71e8720b1.png';

interface WalletPageProps {
  onBack: () => void;
  onBuyCoins: () => void;
  onViewTransactions: () => void;
  onRedeem: () => void;
  coinBalance: number;
  coinsToday: number; // Total coins today (purchases + earnings)
  coinsThisMonth: number; // Total coins this month (purchases + earnings)
  earningsWeekly: { day: string; value: number }[]; // Only earnings (from gifts, calls)
}

const formatCoinBalance = (balance: number): string => {
  if (balance >= 1000000) {
    return (balance / 1000000).toFixed(1) + 'M';
  } else if (balance >= 1000) {
    return (balance / 1000).toFixed(1) + 'K';
  }
  return balance.toLocaleString();
};

export function WalletPage({ onBack, onBuyCoins, onViewTransactions, onRedeem, coinBalance, coinsToday, coinsThisMonth, earningsWeekly }: WalletPageProps) {
  // Calculate stats from weekly earnings (only earned coins, not purchases)
  const totalWeek = earningsWeekly.reduce((sum, day) => sum + day.value, 0);
  const avgDaily = totalWeek > 0 ? Math.round(totalWeek / 7) : 0;
  const maxValue = Math.max(...earningsWeekly.map(d => d.value), 1);
  
  // Calculate growth (comparing this week to previous week - simulated as 0% for new users)
  const growth = totalWeek > 0 ? '+23%' : '0%';
  return (
    <div className="relative z-10 min-h-screen flex flex-col">
      {/* Header */}
      <div className="px-4 py-4 flex items-start gap-4" style={{ background: 'rgba(5, 15, 35, 0.9)' }}>
        <button onClick={onBack} className="text-white/70 hover:text-white mt-1">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex-1">
          <h1 className="text-white text-2xl font-bold">My Wallet</h1>
          <p className="text-white/60 text-sm">Manage your coins and transactions</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 pb-6 pt-4 overflow-y-auto">
        {/* Balance Card - Deep Dark Blue */}
        <div 
          className="rounded-2xl p-3 mb-4 relative overflow-hidden"
          style={{
            background: 'rgba(5, 15, 35, 0.9)'
          }}
        >
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="relative z-10">
            {/* Total Balance Header */}
            <div className="flex items-center gap-2 mb-1">
              <img src={walletImage} alt="Wallet" className="w-9 h-9 object-contain" />
              <div>
                <h2 className="text-white font-bold text-sm">Total Balance</h2>
                <p className="text-white/80 text-xs">Available coins</p>
              </div>
            </div>

            {/* Balance Amount */}
            <div className="flex items-center mb-1">
              <img src={coinIconImage} alt="Coin" className="w-32 h-32 object-contain" />
              <span className="text-white text-4xl font-bold -ml-4 -mt-2">{coinBalance.toLocaleString()}</span>
            </div>
            <p className="text-white/90 text-sm mb-2">Coins</p>

            {/* Stats Row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                <div className="flex items-center gap-1 mb-1">
                  <TrendingUp className="w-4 h-4 text-white" />
                  <span className="text-white/80 text-xs">Today</span>
                </div>
                <p className="text-white text-xl font-bold">{coinsToday > 0 ? '+' : ''}{coinsToday.toLocaleString()}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                <div className="flex items-center gap-1 mb-1">
                  <TrendingUp className="w-4 h-4 text-white" />
                  <span className="text-white/80 text-xs">This Month</span>
                </div>
                <p className="text-white text-xl font-bold">{coinsThisMonth > 0 ? '+' : ''}{coinsThisMonth.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {/* Buy Coins */}
          <button 
            onClick={onBuyCoins}
            className="rounded-xl p-4 flex flex-col items-center justify-between min-h-[120px] relative overflow-hidden"
            style={{
              background: 'rgba(5, 15, 35, 0.9)'
            }}
          >
            <div className="flex-1 flex items-center justify-center">
              <img src={plusIconImage} alt="Add" className="w-14 h-14 object-contain" />
            </div>
            <span className="text-white font-bold text-sm mt-2">Buy Coins</span>
          </button>

          {/* Transactions */}
          <button 
            onClick={onViewTransactions}
            className="rounded-xl p-4 flex flex-col items-center justify-between min-h-[120px]"
            style={{
              background: 'rgba(5, 15, 35, 0.9)'
            }}
          >
            <div className="flex-1 flex items-center justify-center">
              <img 
                src={penImage} 
                alt="Transactions" 
                className="w-12 h-12 object-contain"
              />
            </div>
            <span className="text-white font-bold text-sm mt-2">Transactions</span>
          </button>

          {/* Redeem */}
          <button 
            onClick={onRedeem}
            className="rounded-xl p-4 flex flex-col items-center justify-between min-h-[120px]"
            style={{
              background: 'rgba(5, 15, 35, 0.9)'
            }}
          >
            <div className="flex-1 flex items-center justify-center">
              <img 
                src={moneyBagImage} 
                alt="Redeem" 
                className="w-20 h-20 object-contain"
              />
            </div>
            <span className="text-white font-bold text-sm mt-2">Redeem</span>
          </button>
        </div>

        {/* Earnings Overview - Dark Style (Only shows earned coins from gifts, calls, etc.) */}
        <div className="rounded-2xl p-6" style={{ background: 'rgba(5, 15, 35, 0.9)' }}>
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-sky-400" />
            <h3 className="text-white text-lg font-bold">Earnings Overview</h3>
          </div>
          <p className="text-white/60 text-xs mb-4">💎 Earnings from gifts, 1:1 calls, and tips (excludes purchased coins)</p>

          {/* Bar Chart */}
          <div className="mb-6" style={{ width: '100%', height: '200px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={earningsWeekly} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis 
                  dataKey="day" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#ffffff99', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#ffffff99', fontSize: 12 }}
                  domain={[0, maxValue > 0 ? maxValue : 100]}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {earningsWeekly.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill="#38bdf8" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/10 rounded-xl p-4 text-center flex flex-col justify-between min-h-[80px]">
              <p className="text-white/60 text-sm">Avg Daily</p>
              <p className="text-white text-2xl font-bold mt-2">{avgDaily.toLocaleString()}</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center flex flex-col justify-between min-h-[80px]">
              <p className="text-white/60 text-sm">Total Week</p>
              <p className="text-white text-2xl font-bold mt-2">{totalWeek.toLocaleString()}</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center flex flex-col justify-between min-h-[80px]">
              <p className="text-white/60 text-sm">Growth</p>
              <p className={`text-2xl font-bold mt-2 ${totalWeek > 0 ? 'text-green-400' : 'text-white'}`}>{growth}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
