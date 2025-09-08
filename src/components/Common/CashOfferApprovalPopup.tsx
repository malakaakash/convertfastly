import React, { useState, useEffect } from 'react';
import { X, DollarSign, CheckCircle, Gift, CreditCard } from 'lucide-react';

interface CashOfferApprovalPopupProps {
  isVisible: boolean;
  onClose: () => void;
  claimData?: {
    amount: string;
    paypalEmail: string;
    processedDate: string;
  };
}

const CashOfferApprovalPopup: React.FC<CashOfferApprovalPopupProps> = ({ 
  isVisible, 
  onClose, 
  claimData 
}) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShowConfetti(true);
      // Auto-hide confetti after animation
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [isVisible]);

  if (!isVisible || !claimData) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full p-8 relative transform transition-all animate-in slide-in-from-bottom-4">
        {/* Confetti Effect */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
            <div className="confetti-animation">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-bounce"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${2 + Math.random() * 2}s`
                  }}
                />
              ))}
            </div>
          </div>
        )}

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 p-4 rounded-full relative">
              <DollarSign className="h-12 w-12 text-green-600" />
              <div className="absolute -top-1 -right-1 bg-yellow-400 rounded-full p-1">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            🎉 Congratulations!
          </h3>
          
          <p className="text-lg text-gray-600 mb-6">
            Your cash offer claim has been <strong className="text-green-600">approved</strong>!
          </p>

          {/* Reward Details */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Gift className="h-8 w-8 text-green-600" />
              <div className="text-3xl font-bold text-green-600">{claimData.amount}</div>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-center space-x-2 text-green-800">
                <CreditCard className="h-4 w-4" />
                <span>Payment sent to: {claimData.paypalEmail}</span>
              </div>
              <div className="text-green-700">
                Processed on: {new Date(claimData.processedDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
          </div>

          {/* Thank You Message */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-blue-900 mb-2">Thank You for Being a Loyal User!</h4>
            <p className="text-blue-800 text-sm">
              Your reward has been processed and should appear in your PayPal account within 24-48 hours. 
              We appreciate your continued use of ConvertFastly!
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
          >
            Awesome, Thanks! 🎉
          </button>

          <div className="text-center mt-4">
            <p className="text-xs text-gray-500">
              Continue using our free tools and tell your friends about ConvertFastly!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashOfferApprovalPopup;