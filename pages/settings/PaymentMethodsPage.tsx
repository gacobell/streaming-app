import { ArrowLeft, CreditCard, Plus, Trash2, X } from 'lucide-react';
import { useState } from 'react';

interface PaymentMethodsPageProps {
  onBack: () => void;
}

interface PaymentCard {
  id: number;
  type: 'visa' | 'mastercard' | 'amex';
  last4: string;
  expiry: string;
  isDefault: boolean;
  cardholderName?: string;
}

const mockCards: PaymentCard[] = [
  { id: 1, type: 'visa', last4: '4242', expiry: '12/25', isDefault: true, cardholderName: 'Jessica Anderson' },
  { id: 2, type: 'mastercard', last4: '8888', expiry: '08/26', isDefault: false, cardholderName: 'Jessica Anderson' }
];

export function PaymentMethodsPage({ onBack }: PaymentMethodsPageProps) {
  const [cards, setCards] = useState<PaymentCard[]>(mockCards);
  const [showAddCard, setShowAddCard] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleDelete = (cardId: number) => {
    setCards(cards.filter(card => card.id !== cardId));
  };

  const handleSetDefault = (cardId: number) => {
    setCards(cards.map(card => ({
      ...card,
      isDefault: card.id === cardId
    })));
  };

  const getCardIcon = (type: string) => {
    const colors = {
      visa: 'from-blue-500 to-blue-600',
      mastercard: 'from-red-500 to-orange-500',
      amex: 'from-green-500 to-teal-500'
    };
    return colors[type as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  const detectCardType = (number: string): 'visa' | 'mastercard' | 'amex' => {
    const cleaned = number.replace(/\s/g, '');
    if (cleaned.startsWith('4')) return 'visa';
    if (cleaned.startsWith('5') || cleaned.startsWith('2')) return 'mastercard';
    if (cleaned.startsWith('3')) return 'amex';
    return 'visa';
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const matches = cleaned.match(/.{1,4}/g);
    return matches ? matches.join(' ') : cleaned;
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  const handleAddCard = () => {
    const cleanedNumber = cardNumber.replace(/\s/g, '');
    if (cleanedNumber.length >= 15 && cardholderName && expiryDate.length === 5 && cvv.length >= 3) {
      const newCard: PaymentCard = {
        id: Date.now(),
        type: detectCardType(cleanedNumber),
        last4: cleanedNumber.slice(-4),
        expiry: expiryDate,
        isDefault: cards.length === 0,
        cardholderName: cardholderName
      };
      setCards([...cards, newCard]);
      // Reset form
      setCardNumber('');
      setCardholderName('');
      setExpiryDate('');
      setCvv('');
      setShowAddCard(false);
    }
  };

  const isFormValid = 
    cardNumber.replace(/\s/g, '').length >= 15 && 
    cardholderName.length > 0 && 
    expiryDate.length === 5 && 
    cvv.length >= 3;

  return (
    <div className="relative z-10 min-h-screen flex flex-col" style={{ background: 'rgba(5, 15, 35, 0.9)' }}>
      {/* Header */}
      <div className="px-4 py-4 flex items-center gap-4 border-b border-white/10">
        <button onClick={onBack} className="text-white/70 hover:text-white">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-white text-2xl font-bold">Payment Methods</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="space-y-4">
          {cards.map((card) => (
            <div key={card.id} className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${getCardIcon(card.type)} flex items-center justify-center`}>
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-bold capitalize">{card.type}</p>
                    <p className="text-white/60 text-sm">•••• {card.last4}</p>
                    <p className="text-white/60 text-xs">Expires {card.expiry}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(card.id)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              {card.isDefault ? (
                <div className="bg-green-500/20 border border-green-400/30 rounded-lg px-3 py-1.5">
                  <p className="text-green-400 text-sm font-bold">✓ Default Payment Method</p>
                </div>
              ) : (
                <button
                  onClick={() => handleSetDefault(card.id)}
                  className="w-full bg-white/10 hover:bg-white/20 rounded-lg px-3 py-1.5 text-white/60 text-sm font-bold transition-colors"
                >
                  Set as Default
                </button>
              )}
            </div>
          ))}

          {/* Add New Card Button */}
          <button
            onClick={() => setShowAddCard(true)}
            className="w-full py-4 rounded-2xl font-bold text-white text-center border-2 border-dashed border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add New Card
          </button>
        </div>
      </div>

      {/* Add Card Modal */}
      {showAddCard && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center max-w-[430px] mx-auto p-4">
          <div className="bg-gradient-to-b from-[#1a1a2e] to-[#0a0f23] rounded-3xl p-6 w-full max-w-sm max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={() => setShowAddCard(false)}
                className="text-white hover:text-white/80 transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h3 className="text-white text-xl font-bold flex-1">Add New Card</h3>
              <button
                onClick={() => setShowAddCard(false)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Card Preview */}
            <div 
              className={`bg-gradient-to-br ${getCardIcon(detectCardType(cardNumber))} rounded-2xl p-6 mb-6 aspect-[1.586/1] flex flex-col justify-between`}
            >
              <div className="flex justify-between items-start">
                <CreditCard className="w-10 h-10 text-white/80" />
                <p className="text-white/80 text-xs capitalize">{detectCardType(cardNumber)}</p>
              </div>
              <div>
                <p className="text-white text-lg tracking-wider mb-3">
                  {cardNumber || '•••• •••• •••• ••••'}
                </p>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-white/60 text-xs mb-1">Cardholder</p>
                    <p className="text-white text-sm">
                      {cardholderName || 'FULL NAME'}
                    </p>
                  </div>
                  <div>
                    <p className="text-white/60 text-xs mb-1">Expires</p>
                    <p className="text-white text-sm">{expiryDate || 'MM/YY'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="space-y-4">
              {/* Card Number */}
              <div>
                <label className="text-white text-sm font-bold mb-2 block">Card Number</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => {
                    const formatted = formatCardNumber(e.target.value.replace(/\D/g, ''));
                    if (formatted.replace(/\s/g, '').length <= 16) {
                      setCardNumber(formatted);
                    }
                  }}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 placeholder:text-white/40 focus:outline-none focus:border-purple-400"
                />
              </div>

              {/* Cardholder Name */}
              <div>
                <label className="text-white text-sm font-bold mb-2 block">Cardholder Name</label>
                <input
                  type="text"
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value.toUpperCase())}
                  placeholder="FULL NAME"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 placeholder:text-white/40 focus:outline-none focus:border-purple-400"
                />
              </div>

              {/* Expiry and CVV */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-white text-sm font-bold mb-2 block">Expiry Date</label>
                  <input
                    type="text"
                    value={expiryDate}
                    onChange={(e) => {
                      const formatted = formatExpiry(e.target.value);
                      setExpiryDate(formatted);
                    }}
                    placeholder="MM/YY"
                    maxLength={5}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 placeholder:text-white/40 focus:outline-none focus:border-purple-400"
                  />
                </div>
                <div>
                  <label className="text-white text-sm font-bold mb-2 block">CVV</label>
                  <input
                    type="text"
                    value={cvv}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      if (value.length <= 4) {
                        setCvv(value);
                      }
                    }}
                    placeholder="123"
                    maxLength={4}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 placeholder:text-white/40 focus:outline-none focus:border-purple-400"
                  />
                </div>
              </div>

              {/* Info */}
              <div className="bg-blue-500/10 border border-blue-400/30 rounded-xl p-3">
                <p className="text-blue-400 text-xs">
                  🔒 Your payment information is encrypted and secure
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowAddCard(false)}
                  className="flex-1 py-3 rounded-xl bg-white/10 text-white font-bold hover:bg-white/20 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddCard}
                  disabled={!isFormValid}
                  className="flex-1 py-3 rounded-xl font-bold text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: 'linear-gradient(135deg, #ff0099 0%, #dd00ff 50%, #00ffff 100%)'
                  }}
                >
                  Add Card
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}