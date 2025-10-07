import { ArrowLeft, Check, Upload, AlertCircle, Lock, Camera, Image, X } from 'lucide-react';
import coinIconImage from 'figma:asset/cc0349f11bd96dedece6b8e3ce0aebe644cfe828.png';
import { useState } from 'react';

interface RedeemPageProps {
  onBack: () => void;
  coinBalance: number;
  onRedeem: (amount: number) => void;
  onAddBillingTransaction?: (description: string, amount: string, coins: number) => void;
  onAddTransaction?: (description: string, coins: number) => void;
}

type PaymentMethod = 'bank' | 'paypal' | 'venmo' | 'cashapp' | null;
type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7;

interface PaymentMethodInfo {
  id: PaymentMethod;
  name: string;
  fee: string;
  feePercent: number;
  processingTime: string;
  icon: string;
}

const paymentMethods: PaymentMethodInfo[] = [
  {
    id: 'bank',
    name: 'Bank Transfer (ACH)',
    fee: 'Free',
    feePercent: 0,
    processingTime: '3-5 business days',
    icon: '🏦'
  },
  {
    id: 'paypal',
    name: 'PayPal',
    fee: '2.9% + $0.30',
    feePercent: 2.9,
    processingTime: '3-5 business days',
    icon: '💙'
  },
  {
    id: 'venmo',
    name: 'Venmo',
    fee: 'Free (Standard)',
    feePercent: 0,
    processingTime: '3-5 business days',
    icon: '💸'
  },
  {
    id: 'cashapp',
    name: 'Cash App',
    fee: 'Free',
    feePercent: 0,
    processingTime: '3-5 business days',
    icon: '💵'
  }
];

export function RedeemPage({ onBack, coinBalance, onRedeem, onAddBillingTransaction, onAddTransaction }: RedeemPageProps) {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [isRedeemFlowActive, setIsRedeemFlowActive] = useState(false);
  
  // Form state
  const [coinsToRedeem, setCoinsToRedeem] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(null);
  
  // Bank details
  const [accountHolderName, setAccountHolderName] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountType, setAccountType] = useState('checking');
  const [routingNumber, setRoutingNumber] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [confirmAccountNumber, setConfirmAccountNumber] = useState('');
  
  // PayPal/Venmo/CashApp
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  
  // Identity verification
  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [idUploaded, setIdUploaded] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  
  // Security
  const [password, setPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');
  
  // Legal agreements
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePolicy, setAgreePolicy] = useState(false);
  const [agreeAge, setAgreeAge] = useState(false);
  
  // Constants
  const CONVERSION_RATE = 15; // 15 coins = $1
  const MIN_COINS = 750; // $50 minimum
  const MAX_COINS = 7500; // $500 maximum
  const AVAILABLE_COINS = coinBalance;
  const IS_FIRST_TIME = true; // For demo, set to true to show ID upload
  
  const calculateUSD = (coins: number) => {
    return (coins / CONVERSION_RATE).toFixed(2);
  };
  
  const calculateFee = (usd: number, method: PaymentMethod) => {
    const methodInfo = paymentMethods.find(m => m.id === method);
    if (!methodInfo) return 0;
    
    if (method === 'paypal') {
      return usd * (methodInfo.feePercent / 100) + 0.30;
    }
    return usd * (methodInfo.feePercent / 100);
  };
  
  const getFinalAmount = () => {
    const usd = parseFloat(calculateUSD(parseInt(coinsToRedeem) || 0));
    const fee = calculateFee(usd, selectedMethod);
    return (usd - fee).toFixed(2);
  };

  const startRedeemFlow = () => {
    setIsRedeemFlowActive(true);
    setCurrentStep(1);
  };

  const goToNextStep = () => {
    if (currentStep < 7) {
      setCurrentStep((currentStep + 1) as Step);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as Step);
    }
  };

  const handleFinalSubmit = () => {
    // Deduct coins from balance
    const coins = parseInt(coinsToRedeem) || 0;
    onRedeem(coins);
    
    // Add to billing history
    if (onAddBillingTransaction) {
      const usdAmount = getFinalAmount();
      const methodName = paymentMethods.find(m => m.id === selectedMethod)?.name || 'Unknown';
      const description = `Redeem to ${methodName}`;
      onAddBillingTransaction(description, `${usdAmount}`, coins);
    }
    
    // Add to transaction history
    if (onAddTransaction) {
      const methodName = paymentMethods.find(m => m.id === selectedMethod)?.name || 'Unknown';
      const description = `Redemption via ${methodName}`;
      onAddTransaction(description, -coins); // negative because spending coins
    }
    
    // Move to next step (completion screen)
    goToNextStep();
  };

  const resetFlow = () => {
    setIsRedeemFlowActive(false);
    setCurrentStep(1);
    // Reset all form fields
    setCoinsToRedeem('');
    setSelectedMethod(null);
    setEmail('');
    setConfirmEmail('');
    setAccountHolderName('');
    setBankName('');
    setRoutingNumber('');
    setAccountNumber('');
    setConfirmAccountNumber('');
    setFullName('');
    setDateOfBirth('');
    setAddress('');
    setCity('');
    setState('');
    setZipCode('');
    setPhoneNumber('');
    setIdUploaded(false);
    setPassword('');
    setOtpCode('');
    setAgreeTerms(false);
    setAgreePolicy(false);
    setAgreeAge(false);
  };

  // Main landing page (before starting redeem flow)
  if (!isRedeemFlowActive) {
    return (
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="px-4 py-4 flex items-start gap-4 border-b border-white/10" style={{ background: 'rgba(5, 15, 35, 0.9)' }}>
          <button onClick={onBack} className="text-white/70 hover:text-white mt-1">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="text-white text-2xl font-bold">Redeem Coins</h1>
            <p className="text-white/60 text-sm">Convert your coins to cash</p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 px-4 py-6 overflow-y-auto">
          {/* Balance Card */}
          <div 
            className="rounded-2xl p-6 mb-6 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #ff0099 0%, #dd00ff 50%, #9333ea 100%)'
            }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
            
            <div className="relative z-10">
              <p className="text-white/80 text-sm mb-2">Available Balance</p>
              <div className="flex items-center gap-3 mb-4">
                <img src={coinIconImage} alt="Coin" className="w-20 h-20 object-contain" />
                <div>
                  <span className="text-white text-4xl font-bold">{AVAILABLE_COINS.toLocaleString()}</span>
                  <p className="text-white/90 text-sm">≈ ${calculateUSD(AVAILABLE_COINS)} USD</p>
                </div>
              </div>
              <div className="bg-white/20 rounded-lg p-3">
                <p className="text-white text-sm font-bold">Conversion Rate: 15 Coins = $1 USD</p>
              </div>
            </div>
          </div>

          {/* Limits Info */}
          <div className="rounded-xl p-5 mb-6" style={{ background: 'rgba(5, 15, 35, 0.9)' }}>
            <h3 className="text-white font-bold mb-3">Redemption Limits</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Minimum per transaction:</span>
                <span className="text-white font-bold">750 coins ($50)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Maximum per transaction:</span>
                <span className="text-white font-bold">7,500 coins ($500)</span>
              </div>
              <div className="border-t border-white/10 my-3"></div>
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Daily limit:</span>
                <span className="text-cyan-400 font-bold">$500</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Weekly limit:</span>
                <span className="text-cyan-400 font-bold">$5,000</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Monthly limit:</span>
                <span className="text-cyan-400 font-bold">$20,000</span>
              </div>
            </div>
          </div>

          {/* Payment Methods Preview */}
          <div className="rounded-xl p-5 mb-6" style={{ background: 'rgba(5, 15, 35, 0.9)' }}>
            <h3 className="text-white font-bold mb-3">Available Payment Methods</h3>
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{method.icon}</span>
                    <div>
                      <p className="text-white font-bold text-sm">{method.name}</p>
                      <p className="text-white/60 text-xs">{method.processingTime}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 text-sm font-bold">{method.fee}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Redeem Now Button */}
          <button
            onClick={startRedeemFlow}
            className="w-full py-4 rounded-2xl font-bold text-lg text-white transition-all hover:scale-105 mb-6 text-center"
            style={{
              background: 'linear-gradient(135deg, #ff0099 0%, #dd00ff 50%, #00ffff 100%)',
              boxShadow: '0 0 20px rgba(255, 0, 153, 0.6)'
            }}
          >
            Redeem Now
          </button>

          {/* Important Info */}
          <div className="rounded-xl p-4" style={{ background: 'rgba(5, 15, 35, 0.9)' }}>
            <div className="flex gap-2 mb-2">
              <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-yellow-400 font-bold text-sm mb-1">Important Information</p>
                <ul className="text-white/60 text-xs space-y-1">
                  <li>• You must be 18+ years old to redeem</li>
                  <li>• First-time redemptions require ID verification</li>
                  <li>• Processing time: 3-5 business days</li>
                  <li>• Account must be in good standing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Multi-step redemption flow
  return (
    <div className="relative z-10 min-h-screen flex flex-col">
      {/* Header with Progress */}
      <div className="px-4 py-4 border-b border-white/10" style={{ background: 'rgba(5, 15, 35, 0.9)' }}>
        <div className="flex items-center gap-4 mb-4">
          <button onClick={currentStep === 1 ? resetFlow : goToPreviousStep} className="text-white/70 hover:text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="text-white text-xl font-bold">Redeem Coins</h1>
            <p className="text-white/60 text-sm">Step {currentStep} of 7</p>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full transition-all duration-300"
            style={{
              width: `${(currentStep / 7) * 100}%`,
              background: 'linear-gradient(90deg, #ff0099 0%, #dd00ff 50%, #00ffff 100%)'
            }}
          ></div>
        </div>
      </div>

      {/* Content - Steps */}
      <div className="flex-1 px-4 py-6 overflow-y-auto">
        {/* Step 1: Redemption Amount */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-white text-2xl font-bold mb-2">How many coins?</h2>
              <p className="text-white/60 text-sm">Enter the amount of coins you want to redeem</p>
            </div>

            {/* Balance Display */}
            <div className="bg-white/5 rounded-xl p-4">
              <p className="text-white/60 text-sm mb-1">Available Balance</p>
              <div className="flex items-center gap-2">
                <img src={coinIconImage} alt="Coin" className="w-8 h-8 object-contain" />
                <span className="text-white text-2xl font-bold">{AVAILABLE_COINS.toLocaleString()}</span>
              </div>
            </div>

            {/* Coin Input */}
            <div>
              <label className="text-white text-sm font-bold mb-2 block">Coins to Redeem</label>
              <div 
                className="rounded-full p-[2px]"
                style={{
                  background: 'linear-gradient(135deg, #ff0099 0%, #dd00ff 50%, #00ffff 100%)'
                }}
              >
                <input
                  type="number"
                  value={coinsToRedeem}
                  onChange={(e) => setCoinsToRedeem(e.target.value)}
                  placeholder={`Min: ${MIN_COINS} | Max: ${MAX_COINS}`}
                  className="w-full px-6 py-3 rounded-full bg-[#0a0f23] text-white placeholder:text-white/40 focus:outline-none text-center text-xl font-bold"
                />
              </div>
              
              {parseInt(coinsToRedeem) > 0 && (
                <div className="mt-3 text-center">
                  <p className="text-white/60 text-sm">You will receive approximately</p>
                  <p className="text-green-400 text-3xl font-bold">${calculateUSD(parseInt(coinsToRedeem))}</p>
                  <p className="text-white/60 text-xs mt-1">(before fees)</p>
                </div>
              )}

              {/* Validation Messages */}
              {parseInt(coinsToRedeem) > 0 && parseInt(coinsToRedeem) < MIN_COINS && (
                <p className="text-red-400 text-sm mt-2">⚠️ Minimum redemption is {MIN_COINS} coins</p>
              )}
              {parseInt(coinsToRedeem) > MAX_COINS && (
                <p className="text-red-400 text-sm mt-2">⚠️ Maximum per transaction is {MAX_COINS} coins</p>
              )}
              {parseInt(coinsToRedeem) > AVAILABLE_COINS && (
                <p className="text-red-400 text-sm mt-2">⚠️ Insufficient balance</p>
              )}
            </div>

            {/* Quick Select */}
            <div>
              <p className="text-white text-sm font-bold mb-2">Quick Select</p>
              <div className="grid grid-cols-3 gap-2">
                {[MIN_COINS, 1500, 3000, 4500, 6000, MAX_COINS].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setCoinsToRedeem(amount.toString())}
                    className="bg-white/10 hover:bg-white/20 rounded-lg p-3 transition-colors"
                  >
                    <p className="text-white font-bold text-sm">{amount}</p>
                    <p className="text-white/60 text-xs">${calculateUSD(amount)}</p>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={goToNextStep}
              disabled={
                !coinsToRedeem || 
                parseInt(coinsToRedeem) < MIN_COINS || 
                parseInt(coinsToRedeem) > MAX_COINS ||
                parseInt(coinsToRedeem) > AVAILABLE_COINS
              }
              className="w-full py-4 rounded-2xl font-bold text-white disabled:opacity-50 disabled:cursor-not-allowed text-center"
              style={{
                background: 'linear-gradient(135deg, #ff0099 0%, #dd00ff 50%, #00ffff 100%)'
              }}
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 2: Payment Method */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-white text-2xl font-bold mb-2">Choose Payment Method</h2>
              <p className="text-white/60 text-sm">Select how you'd like to receive your money</p>
            </div>

            {/* Amount Summary */}
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-4 border border-purple-400/30">
              <p className="text-white/60 text-sm">Redeeming</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src={coinIconImage} alt="Coin" className="w-6 h-6 object-contain" />
                  <span className="text-white text-xl font-bold">{parseInt(coinsToRedeem || '0').toLocaleString()} coins</span>
                </div>
                <span className="text-green-400 text-xl font-bold">≈ ${calculateUSD(parseInt(coinsToRedeem || '0'))}</span>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="space-y-3">
              {paymentMethods.map((method) => {
                const isSelected = selectedMethod === method.id;
                return (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`w-full p-4 rounded-xl transition-all ${
                      isSelected 
                        ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 border-2 border-purple-400' 
                        : 'bg-white/5 border-2 border-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl">{method.icon}</span>
                      <div className="flex-1 text-left">
                        <p className="text-white font-bold">{method.name}</p>
                        <p className="text-white/60 text-xs">{method.processingTime}</p>
                      </div>
                      {isSelected && <Check className="w-6 h-6 text-green-400" />}
                    </div>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/10">
                      <span className="text-white/60 text-sm">Processing Fee:</span>
                      <span className="text-green-400 font-bold">{method.fee}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              onClick={goToNextStep}
              disabled={!selectedMethod}
              className="w-full py-4 rounded-2xl font-bold text-white disabled:opacity-50 disabled:cursor-not-allowed text-center"
              style={{
                background: 'linear-gradient(135deg, #ff0099 0%, #dd00ff 50%, #00ffff 100%)'
              }}
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 3: Payment Details */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-white text-2xl font-bold mb-2">Payment Details</h2>
              <p className="text-white/60 text-sm">
                {selectedMethod === 'bank' && 'Enter your bank account information'}
                {selectedMethod === 'paypal' && 'Enter your PayPal email address'}
                {selectedMethod === 'venmo' && 'Enter your Venmo email or username'}
                {selectedMethod === 'cashapp' && 'Enter your Cash App email or $Cashtag'}
              </p>
            </div>

            {selectedMethod === 'bank' ? (
              // Bank Transfer Form
              <div className="space-y-4">
                <div>
                  <label className="text-white text-sm font-bold mb-2 block">Account Holder Name</label>
                  <input
                    type="text"
                    value={accountHolderName}
                    onChange={(e) => setAccountHolderName(e.target.value)}
                    placeholder="Full legal name"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 placeholder:text-white/40 focus:outline-none focus:border-purple-400"
                  />
                </div>

                <div>
                  <label className="text-white text-sm font-bold mb-2 block">Bank Name</label>
                  <input
                    type="text"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    placeholder="e.g., Chase, Bank of America"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 placeholder:text-white/40 focus:outline-none focus:border-purple-400"
                  />
                </div>

                <div>
                  <label className="text-white text-sm font-bold mb-2 block">Account Type</label>
                  <select
                    value={accountType}
                    onChange={(e) => setAccountType(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 focus:outline-none focus:border-purple-400"
                  >
                    <option value="checking">Checking</option>
                    <option value="savings">Savings</option>
                  </select>
                </div>

                <div>
                  <label className="text-white text-sm font-bold mb-2 block">Routing Number</label>
                  <input
                    type="text"
                    value={routingNumber}
                    onChange={(e) => setRoutingNumber(e.target.value)}
                    placeholder="9 digits"
                    maxLength={9}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 placeholder:text-white/40 focus:outline-none focus:border-purple-400"
                  />
                </div>

                <div>
                  <label className="text-white text-sm font-bold mb-2 block">Account Number</label>
                  <input
                    type="text"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    placeholder="Enter account number"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 placeholder:text-white/40 focus:outline-none focus:border-purple-400"
                  />
                </div>

                <div>
                  <label className="text-white text-sm font-bold mb-2 block">Confirm Account Number</label>
                  <input
                    type="text"
                    value={confirmAccountNumber}
                    onChange={(e) => setConfirmAccountNumber(e.target.value)}
                    placeholder="Re-enter account number"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 placeholder:text-white/40 focus:outline-none focus:border-purple-400"
                  />
                  {accountNumber && confirmAccountNumber && accountNumber !== confirmAccountNumber && (
                    <p className="text-red-400 text-sm mt-1">⚠️ Account numbers do not match</p>
                  )}
                </div>
              </div>
            ) : (
              // Email-based methods (PayPal, Venmo, Cash App)
              <div className="space-y-4">
                <div>
                  <label className="text-white text-sm font-bold mb-2 block">
                    {selectedMethod === 'paypal' && 'PayPal Email Address'}
                    {selectedMethod === 'venmo' && 'Venmo Email or Username'}
                    {selectedMethod === 'cashapp' && 'Cash App Email or $Cashtag'}
                  </label>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={
                      selectedMethod === 'paypal' ? 'your@email.com' :
                      selectedMethod === 'venmo' ? '@username or email' :
                      '$CashTag or email'
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 placeholder:text-white/40 focus:outline-none focus:border-purple-400"
                  />
                </div>

                <div>
                  <label className="text-white text-sm font-bold mb-2 block">Confirm {selectedMethod === 'paypal' ? 'Email' : selectedMethod === 'venmo' ? 'Username/Email' : 'Cashtag/Email'}</label>
                  <input
                    type="text"
                    value={confirmEmail}
                    onChange={(e) => setConfirmEmail(e.target.value)}
                    placeholder="Re-enter to confirm"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 placeholder:text-white/40 focus:outline-none focus:border-purple-400"
                  />
                  {email && confirmEmail && email !== confirmEmail && (
                    <p className="text-red-400 text-sm mt-1">⚠️ Does not match</p>
                  )}
                </div>
              </div>
            )}

            <button
              onClick={goToNextStep}
              disabled={
                selectedMethod === 'bank' 
                  ? !accountHolderName || !bankName || !routingNumber || !accountNumber || accountNumber !== confirmAccountNumber
                  : !email || email !== confirmEmail
              }
              className="w-full py-4 rounded-2xl font-bold text-white disabled:opacity-50 disabled:cursor-not-allowed text-center"
              style={{
                background: 'linear-gradient(135deg, #ff0099 0%, #dd00ff 50%, #00ffff 100%)'
              }}
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 4: Identity Verification */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-white text-2xl font-bold mb-2">Identity Verification</h2>
              <p className="text-white/60 text-sm">We need to verify your identity for security purposes</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-white text-sm font-bold mb-2 block">Full Legal Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="First and Last Name"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 placeholder:text-white/40 focus:outline-none focus:border-purple-400"
                />
              </div>

              <div>
                <label className="text-white text-sm font-bold mb-2 block">Date of Birth</label>
                <input
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 focus:outline-none focus:border-purple-400"
                />
              </div>

              <div>
                <label className="text-white text-sm font-bold mb-2 block">Street Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="123 Main Street"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 placeholder:text-white/40 focus:outline-none focus:border-purple-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-white text-sm font-bold mb-2 block">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 placeholder:text-white/40 focus:outline-none focus:border-purple-400"
                  />
                </div>
                <div>
                  <label className="text-white text-sm font-bold mb-2 block">State</label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="State"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 placeholder:text-white/40 focus:outline-none focus:border-purple-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-white text-sm font-bold mb-2 block">ZIP Code</label>
                <input
                  type="text"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  placeholder="12345"
                  maxLength={5}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 placeholder:text-white/40 focus:outline-none focus:border-purple-400"
                />
              </div>

              <div>
                <label className="text-white text-sm font-bold mb-2 block">Phone Number</label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="(555) 123-4567"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 placeholder:text-white/40 focus:outline-none focus:border-purple-400"
                />
              </div>

              {/* ID Upload (First Time Only) */}
              {IS_FIRST_TIME && (
                <div>
                  <label className="text-white text-sm font-bold mb-2 block">Government ID Upload</label>
                  <p className="text-white/60 text-xs mb-3">Required for first-time redemptions. Upload a photo of your Driver's License, Passport, or State ID.</p>
                  
                  <div 
                    onClick={() => {
                      if (idUploaded) {
                        setIdUploaded(false);
                      } else {
                        setShowUploadModal(true);
                      }
                    }}
                    className={`border-2 border-dashed rounded-xl p-6 cursor-pointer transition-colors ${
                      idUploaded ? 'border-green-400 bg-green-500/10' : 'border-white/30 bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    {idUploaded ? (
                      <div className="text-center">
                        <Check className="w-12 h-12 text-green-400 mx-auto mb-2" />
                        <p className="text-green-400 font-bold">ID Uploaded Successfully</p>
                        <p className="text-white/60 text-xs mt-1">Click to remove and upload again</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Upload className="w-12 h-12 text-white/40 mx-auto mb-2" />
                        <p className="text-white font-bold">Upload Government ID</p>
                        <p className="text-white/60 text-xs mt-1">Click to select a file</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={goToNextStep}
              disabled={
                !fullName || !dateOfBirth || !address || !city || !state || !zipCode || !phoneNumber || (IS_FIRST_TIME && !idUploaded)
              }
              className="w-full py-4 rounded-2xl font-bold text-white disabled:opacity-50 disabled:cursor-not-allowed text-center"
              style={{
                background: 'linear-gradient(135deg, #ff0099 0%, #dd00ff 50%, #00ffff 100%)'
              }}
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 5: Review & Confirm */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-white text-2xl font-bold mb-2">Review & Confirm</h2>
              <p className="text-white/60 text-sm">Please review all details before submitting</p>
            </div>

            {/* Summary Card */}
            <div className="rounded-xl p-5 space-y-4" style={{ background: 'rgba(5, 15, 35, 0.9)' }}>
              <div className="border-b border-white/10 pb-4">
                <p className="text-white/60 text-sm mb-1">Redemption Amount</p>
                <div className="flex items-center gap-2">
                  <img src={coinIconImage} alt="Coin" className="w-6 h-6 object-contain" />
                  <span className="text-white text-xl font-bold">{parseInt(coinsToRedeem).toLocaleString()} coins</span>
                </div>
              </div>

              <div className="border-b border-white/10 pb-4">
                <p className="text-white/60 text-sm mb-2">Payment Method</p>
                <p className="text-white font-bold">{paymentMethods.find(m => m.id === selectedMethod)?.name}</p>
                <p className="text-white/60 text-sm mt-1">
                  {selectedMethod === 'bank' ? `${accountHolderName} - ${bankName}` : email}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-white/60">Conversion</span>
                  <span className="text-white font-bold">${calculateUSD(parseInt(coinsToRedeem))}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Processing Fee</span>
                  <span className="text-white font-bold">
                    {selectedMethod === 'bank' || selectedMethod === 'venmo' || selectedMethod === 'cashapp' 
                      ? 'Free' 
                      : `-$${calculateFee(parseFloat(calculateUSD(parseInt(coinsToRedeem))), selectedMethod).toFixed(2)}`
                    }
                  </span>
                </div>
                <div className="border-t border-white/10 pt-2 flex justify-between">
                  <span className="text-white font-bold">You'll Receive</span>
                  <span className="text-green-400 text-xl font-bold">${getFinalAmount()}</span>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-3">
                <p className="text-blue-400 text-xs">
                  <Lock className="w-4 h-4 inline mr-1" />
                  Estimated processing time: 3-5 business days
                </p>
              </div>
            </div>

            {/* Legal Agreements */}
            <div className="space-y-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-white/30 bg-white/10"
                />
                <span className="text-white/80 text-sm">
                  I agree to the <span className="text-purple-400 underline">Terms of Service</span> and <span className="text-purple-400 underline">Redemption Policy</span>
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreePolicy}
                  onChange={(e) => setAgreePolicy(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-white/30 bg-white/10"
                />
                <span className="text-white/80 text-sm">
                  I acknowledge the <span className="text-purple-400 underline">Privacy Policy</span> and consent to data processing
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeAge}
                  onChange={(e) => setAgreeAge(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-white/30 bg-white/10"
                />
                <span className="text-white/80 text-sm">
                  I confirm that I am 18 years of age or older
                </span>
              </label>
            </div>

            <button
              onClick={goToNextStep}
              disabled={!agreeTerms || !agreePolicy || !agreeAge}
              className="w-full py-4 rounded-2xl font-bold text-white disabled:opacity-50 disabled:cursor-not-allowed text-center"
              style={{
                background: 'linear-gradient(135deg, #ff0099 0%, #dd00ff 50%, #00ffff 100%)'
              }}
            >
              Continue to Security Verification
            </button>
          </div>
        )}

        {/* Step 6: Security Verification */}
        {currentStep === 6 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-white text-2xl font-bold mb-2">Security Verification</h2>
              <p className="text-white/60 text-sm">Confirm your identity to complete the redemption</p>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-400/30 rounded-xl p-4 flex gap-3">
              <Lock className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-yellow-400 font-bold text-sm">Security Check</p>
                <p className="text-white/60 text-xs mt-1">We've sent a verification code to your email and phone number</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-white text-sm font-bold mb-2 block">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your account password"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 placeholder:text-white/40 focus:outline-none focus:border-purple-400"
                />
              </div>

              <div>
                <label className="text-white text-sm font-bold mb-2 block">Verification Code</label>
                <input
                  type="text"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 placeholder:text-white/40 focus:outline-none focus:border-purple-400 text-center text-2xl tracking-widest"
                />
                <button className="text-purple-400 text-sm mt-2 hover:underline">
                  Didn't receive code? Resend
                </button>
              </div>
            </div>

            <button
              onClick={handleFinalSubmit}
              disabled={!password || otpCode.length !== 6}
              className="w-full py-4 rounded-2xl font-bold text-white disabled:opacity-50 disabled:cursor-not-allowed text-center"
              style={{
                background: 'linear-gradient(135deg, #ff0099 0%, #dd00ff 50%, #00ffff 100%)'
              }}
            >
              Verify & Submit Redemption
            </button>
          </div>
        )}

        {/* Step 7: Success Confirmation */}
        {currentStep === 7 && (
          <div className="space-y-6 text-center py-8">
            <div className="w-24 h-24 rounded-full bg-green-500/20 border-4 border-green-400 flex items-center justify-center mx-auto">
              <Check className="w-12 h-12 text-green-400" />
            </div>

            <div>
              <h2 className="text-white text-3xl font-bold mb-3">Redemption Submitted!</h2>
              <p className="text-white/60">Your request has been successfully submitted and is being processed</p>
            </div>

            {/* Transaction Details */}
            <div className="rounded-xl p-6 text-left" style={{ background: 'rgba(5, 15, 35, 0.9)' }}>
              <div className="space-y-3">
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-white/60">Transaction ID</span>
                  <span className="text-white font-mono font-bold">TXN-{Date.now().toString().slice(-8)}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-white/60">Amount</span>
                  <span className="text-green-400 font-bold">${getFinalAmount()}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-white/60">Payment Method</span>
                  <span className="text-white font-bold">{paymentMethods.find(m => m.id === selectedMethod)?.name}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-white/60">Status</span>
                  <span className="text-yellow-400 font-bold">Pending</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Estimated Arrival</span>
                  <span className="text-white font-bold">
                    {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-blue-500/10 border border-blue-400/30 rounded-xl p-4 text-left">
              <p className="text-blue-400 font-bold mb-2">What's Next?</p>
              <ul className="text-white/60 text-sm space-y-1">
                <li>✓ Confirmation email sent to your inbox</li>
                <li>✓ Track status in Transaction History</li>
                <li>✓ Funds will arrive in 3-5 business days</li>
                <li>✓ You'll receive a notification when completed</li>
              </ul>
            </div>

            <button
              onClick={resetFlow}
              className="w-full py-4 rounded-2xl font-bold text-white text-center"
              style={{
                background: 'linear-gradient(135deg, #ff0099 0%, #dd00ff 50%, #00ffff 100%)'
              }}
            >
              Back to Wallet
            </button>
          </div>
        )}
      </div>

      {/* Upload ID Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end justify-center max-w-[430px] mx-auto">
          <div className="w-full bg-gradient-to-b from-[#1a1a2e] to-[#0a0f23] rounded-t-3xl p-6 animate-slide-up">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white text-xl font-bold">Upload Government ID</h3>
              <button 
                onClick={() => setShowUploadModal(false)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Upload Options */}
            <div className="space-y-3 mb-4">
              {/* Take a Photo */}
              <button
                onClick={() => {
                  setIdUploaded(true);
                  setShowUploadModal(false);
                }}
                className="w-full p-5 rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-400/50 hover:border-purple-400 transition-all flex items-center gap-4 group"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Camera className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-white font-bold text-lg">Take a Photo</p>
                  <p className="text-white/60 text-sm">Use your camera to capture ID</p>
                </div>
              </button>

              {/* Choose from Library */}
              <button
                onClick={() => {
                  setIdUploaded(true);
                  setShowUploadModal(false);
                }}
                className="w-full p-5 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-2 border-cyan-400/50 hover:border-cyan-400 transition-all flex items-center gap-4 group"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Image className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-white font-bold text-lg">Choose from Library</p>
                  <p className="text-white/60 text-sm">Select an existing photo</p>
                </div>
              </button>
            </div>

            {/* Info */}
            <div className="bg-yellow-500/10 border border-yellow-400/30 rounded-xl p-3 flex gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <p className="text-yellow-400 text-xs">
                Make sure your ID is clearly visible and all text is readable. Accepted: Driver's License, Passport, or State ID.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
