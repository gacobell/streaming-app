import { ArrowLeft, Receipt } from 'lucide-react';

interface BillingHistoryPageProps {
  onBack: () => void;
  transactions: BillingTransaction[];
}

export interface BillingTransaction {
  id: number;
  date: string;
  type: 'purchase' | 'redemption';
  description: string;
  amount: string;
  coins: number;
  status: 'completed' | 'pending' | 'failed';
}

export function BillingHistoryPage({ onBack, transactions }: BillingHistoryPageProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400';
      case 'pending': return 'text-yellow-400';
      case 'failed': return 'text-red-400';
      default: return 'text-white/60';
    }
  };

  return (
    <div className="relative z-10 min-h-screen flex flex-col" style={{ background: 'rgba(5, 15, 35, 0.9)' }}>
      {/* Header */}
      <div className="px-4 py-4 flex items-center gap-4 border-b border-white/10">
        <button onClick={onBack} className="text-white/70 hover:text-white">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-white text-2xl font-bold">Billing History</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {transactions.length === 0 ? (
          // Empty State
          <div className="flex flex-col items-center justify-center h-full py-20 px-6">
            <div className="w-20 h-20 rounded-full bg-white/5 border-2 border-white/10 flex items-center justify-center mb-6">
              <Receipt className="w-10 h-10 text-white/40" />
            </div>
            <h3 className="text-white text-xl font-bold mb-2">No Billing History</h3>
            <p className="text-white/60 text-center text-sm mb-6">
              Your purchases and redemptions will appear here once you make your first transaction.
            </p>
            <div className="bg-purple-500/10 border border-purple-400/30 rounded-xl p-4 w-full max-w-sm">
              <p className="text-purple-400 text-sm">
                💡 <span className="font-bold">Tip:</span> Purchase coins to start using the app or redeem your earnings anytime!
              </p>
            </div>
          </div>
        ) : (
          // Transactions List
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-white font-bold">{transaction.description}</p>
                      {transaction.type === 'purchase' && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 font-bold">
                          Purchase
                        </span>
                      )}
                      {transaction.type === 'redemption' && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-bold">
                          Redemption
                        </span>
                      )}
                    </div>
                    <p className="text-white/60 text-sm">{transaction.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold">{transaction.amount}</p>
                    <p className={`text-xs font-bold capitalize ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 pt-2 border-t border-white/10">
                  <span className="text-white/40 text-xs">Coins:</span>
                  <span className="text-white/60 text-xs font-bold">
                    {transaction.type === 'purchase' ? '+' : '-'}{transaction.coins.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}