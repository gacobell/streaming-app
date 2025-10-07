import coinImage from 'figma:asset/cc0349f11bd96dedece6b8e3ce0aebe644cfe828.png';
import stackedCoinsImage from 'figma:asset/e953c682b1a47d65a7d2c562cf19d9266cd826f8.png';
import stackedCoinsImage2 from 'figma:asset/37bca862be5f5b03cce29faea7dbb40519e1a705.png';
import specialCoinImage from 'figma:asset/4b9a97f3f4e4aab3ec1defb90a9e4a57d1171ba1.png';
import stackedCoinsImage3 from 'figma:asset/0110ef606338e6866abc6af4c3fb7490cc6d544c.png';
import stackedCoinsImage4 from 'figma:asset/ec831caa57033f4d8bd330e2577b8721511db32b.png';
import coinBagImage from 'figma:asset/8f3ba4ba2735393aaddff35a66595b3c03c227e2.png';
import largeCoinBagImage from 'figma:asset/24cae14d9b0fcf48fc3f03519b34483b38a1b48d.png';
import treasureChestImage from 'figma:asset/50216c4c0e7337c2c6b637146bcfaf535679dfc6.png';
import treasureChestImage2 from 'figma:asset/6ef32884aa295ccb88ec54cc891c1616b5782f3c.png';
import { useState } from 'react';
import { X, CreditCard, Check, Loader2, AlertCircle, Smartphone } from 'lucide-react';

interface CoinPackage {
  id: number;
  coins: number;
  bonus?: number;
  price: string;
  priceValue: number;
  isMultiCoin?: boolean;
  useStackedImage?: boolean;
  useStackedImage2?: boolean;
  useStackedImage3?: boolean;
  useStackedImage4?: boolean;
  useSpecialCoin?: boolean;
  useCoinBag?: boolean;
  useLargeCoinBag?: boolean;
  useTreasureChest?: boolean;
  useTreasureChest2?: boolean;
}

const coinPackages: CoinPackage[] = [
  { id: 1, coins: 50, bonus: 3, price: '$4.99', priceValue: 4.99, useStackedImage: true },
  { id: 2, coins: 100, bonus: 5, price: '$9.99', priceValue: 9.99, useStackedImage2: true },
  { id: 3, coins: 200, bonus: 15, price: '$19.99', priceValue: 19.99, useStackedImage3: true },
  { id: 4, coins: 250, bonus: 20, price: '$24.99', priceValue: 24.99, useSpecialCoin: true },
  { id: 5, coins: 500, bonus: 50, price: '$49.99', priceValue: 49.99, useCoinBag: true },
  { id: 6, coins: 1000, bonus: 100, price: '$99.99', priceValue: 99.99, useLargeCoinBag: true },
  { id: 7, coins: 3000, bonus: 375, price: '$299.99', priceValue: 299.99, useStackedImage4: true },
  { id: 8, coins: 5000, bonus: 675, price: '$499.99', priceValue: 499.99, useTreasureChest2: true },
  { id: 9, coins: 10000, bonus: 1500, price: '$999.99', priceValue: 999.99, useTreasureChest: true },
];

type PaymentMethod = 'applepay' | 'googlepay' | 'card' | 'paypal' | null;
type PaymentStep = 'method' | 'card-details' | 'processing' | 'success' | 'error';

interface CoinsPageProps {
  coinBalance: number;
  onPurchase: (amount: number) => void;
  onAddBillingTransaction?: (description: string, amount: string, coins: number) => void;
  onAddTransaction?: (description: string, coins: number) => void;
}

export function CoinsPage({ coinBalance, onPurchase, onAddBillingTransaction, onAddTransaction }: CoinsPageProps) {
  const [selectedPackage, setSelectedPackage] = useState<CoinPackage | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(null);
  const [paymentStep, setPaymentStep] = useState<PaymentStep>('method');
  
  // Card details
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [cardName, setCardName] = useState('');
  const [zipCode, setZipCode] = useState('');

  const handlePackageClick = (pkg: CoinPackage) => {
    setSelectedPackage(pkg);
    setShowPaymentModal(true);
    setPaymentStep('method');
    setSelectedMethod(null);
    // Reset card details
    setCardNumber('');
    setCardExpiry('');
    setCardCVV('');
    setCardName('');
    setZipCode('');
  };

  const closeModal = () => {
    setShowPaymentModal(false);
    setSelectedPackage(null);
    setSelectedMethod(null);
    setPaymentStep('method');
  };

  const handlePaymentMethodSelect = (method: PaymentMethod) => {
    setSelectedMethod(method);
    
    if (method === 'card') {
      setPaymentStep('card-details');
    } else {
      // For Apple Pay, Google Pay, PayPal - simulate direct payment
      processPayment(method);
    }
  };

  const processPayment = (method: PaymentMethod) => {
    setPaymentStep('processing');
    
    // Simulate payment processing
    setTimeout(() => {
      // 95% success rate simulation
      const success = Math.random() > 0.05;
      
      if (success) {
        // Add coins to balance (regular amount + bonus)
        if (selectedPackage) {
          const totalCoins = selectedPackage.coins + (selectedPackage.bonus || 0);
          onPurchase(totalCoins);
          
          // Add to billing history
          if (onAddBillingTransaction) {
            const description = `${selectedPackage.coins} Coins Purchase${selectedPackage.bonus ? ` (+${selectedPackage.bonus} bonus)` : ''}`;
            onAddBillingTransaction(description, selectedPackage.price, totalCoins);
          }
          
          // Add to transaction history
          if (onAddTransaction) {
            const description = `Coin Package - ${selectedPackage.coins} Coins${selectedPackage.bonus ? ` (+${selectedPackage.bonus} bonus)` : ''}`;
            onAddTransaction(description, totalCoins);
          }
        }
        setPaymentStep('success');
      } else {
        setPaymentStep('error');
      }
    }, 2500);
  };

  const handleCardPayment = () => {
    if (!cardNumber || !cardExpiry || !cardCVV || !cardName || !zipCode) {
      return;
    }
    processPayment('card');
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  // Detect if on iOS or Android
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isAndroid = /Android/.test(navigator.userAgent);

  return (
    <div className="relative z-10 min-h-screen px-4 py-6">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-white text-2xl font-bold">Recharge</h1>
          <button 
            className="rounded-full px-3 py-1 border-2 flex items-center justify-center gap-0"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.5), rgba(218, 165, 32, 0.5))',
              borderColor: '#FFD700',
              boxShadow: '0 0 10px rgba(255, 215, 0, 0.6)'
            }}
          >
            <span className="text-white text-sm leading-none font-bold">My Balance</span>
            <img src={coinImage} alt="Coin" className="w-8 h-8 object-contain -ml-1" style={{ marginTop: '4px' }} />
            <span className="text-white text-sm font-bold leading-none -ml-1">{coinBalance.toLocaleString()}</span>
          </button>
        </div>

        {/* Payment Methods Section */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-white text-lg font-bold">Payment Methods</h2>
            <div className="bg-purple-600/80 rounded-full px-3 py-1">
              <span className="text-white text-xs font-bold">-33%</span>
            </div>
          </div>

          {/* Apple Pay & Credit Card */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 mb-4 flex items-center gap-3">
            <div className="bg-white rounded px-2 py-1 flex items-center justify-center">
              <span className="text-black text-xs font-bold">Pay</span>
            </div>
            <span className="text-white font-bold">Apple Pay & Credit Card</span>
          </div>
        </div>

        {/* Coin Packages Grid */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {coinPackages.map((pkg) => (
            <button
              key={pkg.id}
              onClick={() => handlePackageClick(pkg)}
              className="backdrop-blur-sm border border-white/20 rounded-lg p-1.5 transition-colors flex flex-col items-center justify-between min-h-[125px]"
              style={{
                background: 'rgba(5, 15, 35, 0.9)',
                transition: 'background 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(10, 25, 50, 0.9)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(5, 15, 35, 0.9)';
              }}
            >
              {/* Coin Image */}
              <div className="w-full flex items-end justify-center mb-0.5 min-h-[85px]">
                {pkg.useStackedImage ? (
                  <img src={coinImage} alt="Coin" className="w-[85px] h-[85px] object-contain mt-1" style={{ filter: 'brightness(1.07)' }} />
                ) : pkg.useStackedImage2 ? (
                  <img src={stackedCoinsImage2} alt="Stacked Coins 2" className="w-[80px] h-[80px] object-contain" style={{ filter: 'brightness(1.06)' }} />
                ) : pkg.useStackedImage3 ? (
                  <img src={stackedCoinsImage3} alt="Stacked Coins 3" className="w-[80px] h-[80px] object-contain" style={{ filter: 'brightness(1.09)' }} />
                ) : pkg.useStackedImage4 ? (
                  <img src={stackedCoinsImage4} alt="Stacked Coins 4" className="w-[86px] h-[86px] object-contain" style={{ filter: 'brightness(1.13)' }} />
                ) : pkg.useCoinBag ? (
                  <img src={coinBagImage} alt="Coin Bag" className="w-[95px] h-[95px] object-contain mt-2" style={{ filter: 'brightness(1.03)' }} />
                ) : pkg.useLargeCoinBag ? (
                  <img src={largeCoinBagImage} alt="Large Coin Bag" className="w-[90px] h-[90px] object-contain mt-2" style={{ filter: 'brightness(1.03)' }} />
                ) : pkg.useTreasureChest ? (
                  <img src={treasureChestImage} alt="Treasure Chest" className="w-[80px] h-[80px] object-contain" style={{ filter: 'brightness(1.03)' }} />
                ) : pkg.useTreasureChest2 ? (
                  <img src={treasureChestImage2} alt="Treasure Chest 2" className="w-[80px] h-[80px] object-contain" style={{ filter: 'brightness(1.03)' }} />
                ) : pkg.useSpecialCoin ? (
                  <img src={specialCoinImage} alt="Special Coin" className="w-[80px] h-[80px] object-contain mt-4" style={{ filter: 'brightness(1.06)' }} />
                ) : pkg.isMultiCoin ? (
                  <div className="relative w-10 h-10">
                    <img src={coinImage} alt="Coins" className="absolute top-0 left-0 w-8 h-8 object-contain" />
                    <img src={coinImage} alt="Coins" className="absolute top-1 left-2 w-8 h-8 object-contain" />
                    <img src={coinImage} alt="Coins" className="absolute top-2 left-4 w-8 h-8 object-contain" />
                  </div>
                ) : (
                  <img src={specialCoinImage} alt="Coin" className="w-10 h-10 object-contain" />
                )}
              </div>

              {/* Text content */}
              <div className="w-full text-center">
                <div className="text-white text-xl font-bold leading-tight">{pkg.coins}</div>
                <div className="text-green-400 text-xs font-bold leading-tight min-h-[12px]">
                  {pkg.bonus ? `+${pkg.bonus}` : '\u00A0'}
                </div>
                <div className="text-white/90 text-sm font-bold leading-tight">{pkg.price}</div>
              </div>
            </button>
          ))}
        </div>

        {/* PayPal */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 mb-4 flex items-center gap-3">
          <div className="w-6 h-6 flex items-center justify-center">
            <span className="text-blue-500 text-xl">P</span>
          </div>
          <span className="text-white font-bold">PayPal</span>
        </div>

        {/* Footer Text */}
        <p className="text-white/50 text-xs text-center font-bold">
          If you encounter payment issues, please, <span className="text-white underline font-bold">contact us</span>.
        </p>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedPackage && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-end justify-center max-w-[430px] mx-auto">
          <div className="w-full bg-gradient-to-b from-[#1a1a2e] to-[#0a0f23] rounded-t-3xl animate-slide-up max-h-[85vh] overflow-y-auto">
            {/* Step 1: Payment Method Selection */}
            {paymentStep === 'method' && (
              <div className="p-6">
                {/* Modal Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-white text-xl font-bold">Complete Purchase</h3>
                    <p className="text-white/60 text-sm">Choose your payment method</p>
                  </div>
                  <button 
                    onClick={closeModal}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Package Summary */}
                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-400/50 rounded-2xl p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/60 text-sm mb-1">You're purchasing</p>
                      <div className="flex items-center gap-2">
                        <img src={coinImage} alt="Coin" className="w-8 h-8 object-contain" />
                        <span className="text-white text-2xl font-bold">{selectedPackage.coins}</span>
                        {selectedPackage.bonus && (
                          <span className="text-green-400 font-bold">+{selectedPackage.bonus}</span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white/60 text-sm mb-1">Total</p>
                      <p className="text-white text-2xl font-bold">{selectedPackage.price}</p>
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="space-y-3">
                  {/* Apple Pay (iOS only) */}
                  {isIOS && (
                    <button
                      onClick={() => handlePaymentMethodSelect('applepay')}
                      className="w-full p-4 rounded-2xl bg-white/10 hover:bg-white/15 border-2 border-white/20 hover:border-white/40 transition-all flex items-center gap-4 group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center">
                        <span className="text-white font-bold text-sm">Pay</span>
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-white font-bold">Apple Pay</p>
                        <p className="text-white/60 text-sm">Fast & Secure</p>
                      </div>
                      <div className="text-cyan-400 text-sm font-bold">Recommended</div>
                    </button>
                  )}

                  {/* Google Pay (Android only) */}
                  {isAndroid && (
                    <button
                      onClick={() => handlePaymentMethodSelect('googlepay')}
                      className="w-full p-4 rounded-2xl bg-white/10 hover:bg-white/15 border-2 border-white/20 hover:border-white/40 transition-all flex items-center gap-4 group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center">
                        <span className="text-2xl">G</span>
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-white font-bold">Google Pay</p>
                        <p className="text-white/60 text-sm">Fast & Secure</p>
                      </div>
                      <div className="text-cyan-400 text-sm font-bold">Recommended</div>
                    </button>
                  )}

                  {/* Credit/Debit Card */}
                  <button
                    onClick={() => handlePaymentMethodSelect('card')}
                    className="w-full p-4 rounded-2xl bg-white/10 hover:bg-white/15 border-2 border-white/20 hover:border-white/40 transition-all flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-white font-bold">Credit or Debit Card</p>
                      <p className="text-white/60 text-sm">Visa, Mastercard, Amex</p>
                    </div>
                  </button>

                  {/* PayPal */}
                  <button
                    onClick={() => handlePaymentMethodSelect('paypal')}
                    className="w-full p-4 rounded-2xl bg-white/10 hover:bg-white/15 border-2 border-white/20 hover:border-white/40 transition-all flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center">
                      <span className="text-white font-bold text-xl">P</span>
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-white font-bold">PayPal</p>
                      <p className="text-white/60 text-sm">Pay with PayPal balance</p>
                    </div>
                  </button>
                </div>

                {/* Security Badge */}
                <div className="mt-6 flex items-center justify-center gap-2 text-white/60 text-xs">
                  <div className="w-4 h-4 bg-green-500/20 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  </div>
                  <span>Secure 256-bit SSL Encrypted Payment</span>
                </div>
              </div>
            )}

            {/* Step 2: Card Details Form */}
            {paymentStep === 'card-details' && (
              <div className="p-6">
                {/* Header with Back Button */}
                <div className="flex items-center gap-3 mb-6">
                  <button 
                    onClick={() => setPaymentStep('method')}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                  <div>
                    <h3 className="text-white text-xl font-bold">Card Details</h3>
                    <p className="text-white/60 text-sm">Enter your card information</p>
                  </div>
                </div>

                {/* Amount Summary */}
                <div className="bg-purple-500/10 border border-purple-400/30 rounded-xl p-3 mb-6 flex items-center justify-between">
                  <span className="text-white/60 text-sm">Amount to pay:</span>
                  <span className="text-white text-xl font-bold">{selectedPackage.price}</span>
                </div>

                {/* Card Form */}
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-white text-sm font-bold mb-2 block">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 placeholder:text-white/40 focus:outline-none focus:border-purple-400"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-white text-sm font-bold mb-2 block">Expiry Date</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                        placeholder="MM/YY"
                        maxLength={5}
                        className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 placeholder:text-white/40 focus:outline-none focus:border-purple-400"
                      />
                    </div>
                    <div>
                      <label className="text-white text-sm font-bold mb-2 block">CVV</label>
                      <input
                        type="text"
                        value={cardCVV}
                        onChange={(e) => setCardCVV(e.target.value.replace(/\D/g, '').substring(0, 4))}
                        placeholder="123"
                        maxLength={4}
                        className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 placeholder:text-white/40 focus:outline-none focus:border-purple-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-white text-sm font-bold mb-2 block">Cardholder Name</label>
                    <input
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value.toUpperCase())}
                      placeholder="JOHN DOE"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 placeholder:text-white/40 focus:outline-none focus:border-purple-400"
                    />
                  </div>

                  <div>
                    <label className="text-white text-sm font-bold mb-2 block">ZIP/Postal Code</label>
                    <input
                      type="text"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value.substring(0, 10))}
                      placeholder="12345"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 placeholder:text-white/40 focus:outline-none focus:border-purple-400"
                    />
                  </div>
                </div>

                {/* Pay Button */}
                <button
                  onClick={handleCardPayment}
                  disabled={!cardNumber || !cardExpiry || !cardCVV || !cardName || !zipCode}
                  className="w-full py-4 rounded-2xl font-bold text-white disabled:opacity-50 disabled:cursor-not-allowed text-center"
                  style={{
                    background: 'linear-gradient(135deg, #ff0099 0%, #dd00ff 50%, #00ffff 100%)'
                  }}
                >
                  Pay {selectedPackage.price}
                </button>

                {/* Security Info */}
                <p className="text-white/60 text-xs text-center mt-4">
                  Your payment information is encrypted and secure
                </p>
              </div>
            )}

            {/* Step 3: Processing */}
            {paymentStep === 'processing' && (
              <div className="p-6 py-12 text-center">
                <Loader2 className="w-16 h-16 text-purple-400 mx-auto mb-4 animate-spin" />
                <h3 className="text-white text-xl font-bold mb-2">Processing Payment</h3>
                <p className="text-white/60">Please wait while we process your transaction...</p>
                <p className="text-white/40 text-sm mt-4">This may take a few seconds</p>
              </div>
            )}

            {/* Step 4: Success */}
            {paymentStep === 'success' && (
              <div className="p-6 py-12 text-center">
                <div className="w-20 h-20 rounded-full bg-green-500/20 border-4 border-green-400 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-10 h-10 text-green-400" />
                </div>
                <h3 className="text-white text-2xl font-bold mb-2">Payment Successful!</h3>
                <p className="text-white/60 mb-6">Your coins have been added to your account</p>

                {/* Coins Added */}
                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-green-400/50 rounded-2xl p-6 mb-6">
                  <p className="text-white/60 text-sm mb-2">Coins Added</p>
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <img src={coinImage} alt="Coin" className="w-12 h-12 object-contain" />
                    <span className="text-white text-4xl font-bold">{selectedPackage.coins}</span>
                    {selectedPackage.bonus && (
                      <span className="text-green-400 text-2xl font-bold">+{selectedPackage.bonus}</span>
                    )}
                  </div>
                  <div className="bg-white/5 rounded-lg p-2">
                    <p className="text-white/60 text-xs">New Balance</p>
                    <p className="text-white text-xl font-bold">
                      {(12400 + selectedPackage.coins + (selectedPackage.bonus || 0)).toLocaleString()}
                    </p>
                  </div>
                </div>

                <button
                  onClick={closeModal}
                  className="w-full py-4 rounded-2xl font-bold text-white text-center"
                  style={{
                    background: 'linear-gradient(135deg, #ff0099 0%, #dd00ff 50%, #00ffff 100%)'
                  }}
                >
                  Done
                </button>
              </div>
            )}

            {/* Step 5: Error */}
            {paymentStep === 'error' && (
              <div className="p-6 py-12 text-center">
                <div className="w-20 h-20 rounded-full bg-red-500/20 border-4 border-red-400 flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-10 h-10 text-red-400" />
                </div>
                <h3 className="text-white text-2xl font-bold mb-2">Payment Failed</h3>
                <p className="text-white/60 mb-6">We couldn't process your payment. Please try again.</p>

                {/* Error Reasons */}
                <div className="bg-red-500/10 border border-red-400/30 rounded-xl p-4 mb-6 text-left">
                  <p className="text-red-400 text-sm font-bold mb-2">Common Issues:</p>
                  <ul className="text-white/60 text-sm space-y-1">
                    <li>• Insufficient funds</li>
                    <li>• Incorrect card details</li>
                    <li>• Card expired or blocked</li>
                    <li>• Network connection issue</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => setPaymentStep('method')}
                    className="w-full py-4 rounded-2xl font-bold text-white text-center"
                    style={{
                      background: 'linear-gradient(135deg, #ff0099 0%, #dd00ff 50%, #00ffff 100%)'
                    }}
                  >
                    Try Again
                  </button>
                  <button
                    onClick={closeModal}
                    className="w-full py-4 rounded-2xl font-bold text-white/60 hover:text-white text-center bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
