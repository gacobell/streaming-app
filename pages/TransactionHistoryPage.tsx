import { ArrowLeft, ArrowDownLeft, ArrowUpRight, Plus, Receipt, Gift, PhoneCall } from 'lucide-react';

interface TransactionHistoryPageProps {
  onBack: () => void;
  transactions: Transaction[];
}

export interface Transaction {
  id: number;
  type: 'purchase' | 'redemption' | 'gift' | 'call';
  description: string;
  date: string;
  time: string;
  coins: number; // positive for purchases, negative for spending
  recipientName?: string; // For gifts and calls
}

export function TransactionHistoryPage({ onBack, transactions }: TransactionHistoryPageProps) {
  const getTransactionIcon = (type: string, coins: number) => {
    if (type === 'purchase') {
      return (
        <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
        }}>
          <Plus className="w-6 h-6 text-white" />
        </div>
      );
    } else if (type === 'gift') {
      return (
        <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{
          background: 'linear-gradient(135deg, #ff0099 0%, #dd00ff 100%)'
        }}>
          <Gift className="w-6 h-6 text-white" />
        </div>
      );
    } else if (type === 'call') {
      return (
        <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{
          background: 'linear-gradient(135deg, #00ffff 0%, #0099ff 100%)'
        }}>
          <PhoneCall className="w-6 h-6 text-white" />
        </div>
      );
    } else if (type === 'redemption') {
      return (
        <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{
          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
        }}>
          <ArrowUpRight className="w-6 h-6 text-white" />
        </div>
      );
    } else {
      return (
        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
          <ArrowDownLeft className="w-6 h-6 text-white/60" />
        </div>
      );
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'purchase': return 'Purchase';
      case 'redemption': return 'Redemption';
      case 'gift': return 'Gift Sent';
      case 'call': return 'Video Call';
      default: return type;
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'purchase': return 'bg-green-500/20 text-green-400';
      case 'redemption': return 'bg-orange-500/20 text-orange-400';
      case 'gift': return 'bg-pink-500/20 text-pink-400';
      case 'call': return 'bg-cyan-500/20 text-cyan-400';
      default: return 'bg-white/10 text-white/60';
    }
  };

  return (
    <div className="relative z-10 min-h-screen flex flex-col">
      {/* Header - Deep Dark Blue */}
      <div className="px-4 py-4 flex items-start gap-4 border-b border-white/10" style={{ background: 'rgba(5, 15, 35, 0.9)' }}>
        <button onClick={onBack} className="text-white/70 hover:text-white mt-1">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex-1">
          <h1 className="text-white text-2xl font-bold">Transaction History</h1>
          <p className="text-white/60 text-sm">View all your coin transactions</p>
        </div>
      </div>

      {/* Content - Neon Gradient Background */}
      <div className="flex-1 px-4 py-6 overflow-y-auto">
        {transactions.length === 0 ? (
          // Empty State
          <div className="flex flex-col items-center justify-center py-20 px-6">
            <div className="w-24 h-24 rounded-full bg-white/5 border-2 border-white/10 flex items-center justify-center mb-6">
              <Receipt className="w-12 h-12 text-white/40" />
            </div>
            <h3 className="text-white text-xl font-bold mb-2">No Transactions Yet</h3>
            <p className="text-white/60 text-center text-sm mb-6">
              Your coin purchases, gifts, calls, and redemptions will appear here
            </p>
            <div className="bg-purple-500/10 border border-purple-400/30 rounded-xl p-4 w-full max-w-sm">
              <p className="text-purple-400 text-sm text-center">
                💡 <span className="font-bold">Tip:</span> Purchase coins to start interacting with streamers!
              </p>
            </div>
          </div>
        ) : (
          // All Transactions Section
          <div className="rounded-2xl p-6 shadow-sm" style={{ background: 'rgba(5, 15, 35, 0.9)' }}>
            <h2 className="text-white text-lg font-bold mb-4">All Transactions</h2>

            {/* Transaction List */}
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center gap-4 p-4 bg-white/10 rounded-xl hover:bg-white/15 transition-colors"
                >
                  {/* Icon */}
                  {getTransactionIcon(transaction.type, transaction.coins)}

                  {/* Description and Date */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-white font-bold truncate">{transaction.description}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${getTypeBadgeColor(transaction.type)}`}>
                        {getTypeLabel(transaction.type)}
                      </span>
                    </div>
                    <p className="text-white/60 text-sm">
                      {transaction.date} • {transaction.time}
                    </p>
                    {transaction.recipientName && (
                      <p className="text-white/40 text-xs">
                        {transaction.type === 'gift' ? 'To: ' : 'With: '}{transaction.recipientName}
                      </p>
                    )}
                  </div>

                  {/* Amount */}
                  <div className="text-right">
                    <p className={`text-lg font-bold ${
                      transaction.coins > 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {transaction.coins > 0 ? '+' : ''}{transaction.coins}
                    </p>
                    <p className="text-white/60 text-xs">coins</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
