import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { getAdminSettings } from '../../lib/supabase';

interface SuccessAdModalProps {
  isOpen: boolean;
  onClose: () => void;
  toolName: string;
}

const SuccessAdModal: React.FC<SuccessAdModalProps> = ({ isOpen, onClose, toolName }) => {
  const [adCode, setAdCode] = useState<string>('');
  const [showAds, setShowAds] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(5);

  useEffect(() => {
    fetchAdSettings();
  }, []);

  useEffect(() => {
    if (isOpen && showAds) {
      setCountdown(5);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isOpen, showAds]);

  const fetchAdSettings = async () => {
    const settings = await getAdminSettings();
    if (settings?.ads_settings) {
      setShowAds(settings.ads_settings.show_ads);
      setAdCode(settings.ads_settings.success_ad || '');
    }
  };

  if (!isOpen || !showAds || !adCode) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6 relative">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            🎉 {toolName} completed successfully!
          </h3>
          <button
            onClick={onClose}
            disabled={countdown > 0}
            className={`p-2 rounded-full transition-colors ${
              countdown > 0 
                ? 'text-gray-300 cursor-not-allowed' 
                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
            }`}
          >
            <X className="h-5 w-5" />
            {countdown > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {countdown}
              </span>
            )}
          </button>
        </div>

        <div className="mb-4">
          <div 
            className="ad-container border border-gray-200 rounded-lg p-4 min-h-[200px] flex items-center justify-center"
            dangerouslySetInnerHTML={{ __html: adCode }}
          />
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500 mb-3">
            {countdown > 0 
              ? `You can close this in ${countdown} seconds...`
              : 'You can now close this window'
            }
          </p>
          <button
            onClick={onClose}
            disabled={countdown > 0}
            className={`px-6 py-2 rounded-lg transition-colors ${
              countdown > 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessAdModal;