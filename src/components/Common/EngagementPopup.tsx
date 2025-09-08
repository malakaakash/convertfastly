import React, { useState, useEffect } from 'react';
import { X, Star, Gift } from 'lucide-react';

interface EngagementPopupProps {
  onClose: () => void;
  isVisible: boolean;
}

const EngagementPopup: React.FC<EngagementPopupProps> = ({ onClose, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative transform transition-all">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Gift className="h-12 w-12 text-blue-600" />
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Enjoying ConvertFastly?
          </h3>
          
          <p className="text-gray-600 mb-4">
            Help us improve by rating your experience and sharing feedback!
          </p>
          
          <div className="flex justify-center space-x-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex-1"
            >
              Rate Us ⭐
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex-1"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngagementPopup;