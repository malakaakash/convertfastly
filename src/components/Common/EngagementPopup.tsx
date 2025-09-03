import React, { useState } from 'react';
import { X, Gift, Mail } from 'lucide-react';

interface EngagementPopupProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'spin' | 'email';
}

const EngagementPopup: React.FC<EngagementPopupProps> = ({ isOpen, onClose, type }) => {
  const [email, setEmail] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);
  const [prize, setPrize] = useState('');

  const prizes = [
    '10% Off Premium Tools',
    'Free File Conversions',
    '30-Day Free Trial',
    'Premium Support',
    'Advanced Features Access'
  ];

  const handleSpin = () => {
    setIsSpinning(true);
    setTimeout(() => {
      const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
      setPrize(randomPrize);
      setIsSpinning(false);
    }, 2000);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save email to localStorage (demo purposes)
    localStorage.setItem('userEmail', email);
    alert('Thank you! Check your email for exclusive offers.');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
            {type === 'spin' ? <Gift className="h-6 w-6 text-yellow-500" /> : <Mail className="h-6 w-6 text-blue-500" />}
            <span>{type === 'spin' ? 'Congratulations!' : 'Get Exclusive Offers'}</span>
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {type === 'spin' ? (
          <div className="text-center">
            <p className="text-gray-600 mb-6">
              Your conversion is complete! Spin the wheel for a special reward.
            </p>
            
            <div className="mb-6">
              <div className={`w-32 h-32 mx-auto rounded-full border-4 border-yellow-400 bg-gradient-to-r from-yellow-400 to-orange-400 flex items-center justify-center ${isSpinning ? 'animate-spin' : ''}`}>
                <div className="text-white font-bold text-center">
                  {prize ? prize : 'SPIN'}
                </div>
              </div>
            </div>
            
            {!prize ? (
              <button
                onClick={handleSpin}
                disabled={isSpinning}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                {isSpinning ? 'Spinning...' : 'Spin the Wheel!'}
              </button>
            ) : (
              <div className="text-center">
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                  You won: <strong>{prize}</strong>
                </div>
                <button
                  onClick={onClose}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Claim Reward
                </button>
              </div>
            )}
          </div>
        ) : (
          <form onSubmit={handleEmailSubmit}>
            <p className="text-gray-600 mb-4">
              Enter your email to unlock exclusive offers and premium features!
            </p>
            
            <div className="mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex space-x-3">
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Get Offers
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Skip
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EngagementPopup;