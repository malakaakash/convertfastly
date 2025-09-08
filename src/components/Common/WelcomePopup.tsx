import React, { useState } from 'react';
import { X, Gift, Globe, Download, Star, Users, Zap, Shield } from 'lucide-react';

interface WelcomePopupProps {
  isVisible: boolean;
  onClose: () => void;
  onLanguageSelect: (language: string) => void;
  onInstallPrompt: () => void;
}

const WelcomePopup: React.FC<WelcomePopupProps> = ({ 
  isVisible, 
  onClose, 
  onLanguageSelect,
  onInstallPrompt 
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' }
  ];

  const handleContinue = () => {
    onLanguageSelect(selectedLanguage);
    localStorage.setItem('hasSeenWelcome', 'true');
    localStorage.setItem('preferredLanguage', selectedLanguage);
    onClose();
    
    // Show install prompt after welcome
    setTimeout(() => {
      onInstallPrompt();
    }, 1000);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-8 relative transform transition-all animate-in slide-in-from-bottom-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-full">
              <Gift className="h-12 w-12 text-white" />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to ConvertFastly! 🎉
          </h2>
          
          <p className="text-lg text-gray-600 mb-6">
            Your ultimate toolkit for free online conversions and tools
          </p>

          {/* Features Highlight */}
          <div className="flex justify-center space-x-6 mb-6">
            <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full">
              <Zap className="h-5 w-5 text-blue-500" />
              <span className="text-sm font-medium text-blue-700">40+ Tools</span>
            </div>
            <div className="flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-full">
              <Shield className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium text-green-700">100% Free</span>
            </div>
            <div className="flex items-center space-x-2 bg-purple-50 px-4 py-2 rounded-full">
              <Users className="h-5 w-5 text-purple-500" />
              <span className="text-sm font-medium text-purple-700">No Registration</span>
            </div>
          </div>
        </div>

        {/* Cash Offer Highlight */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-6 border-2 border-green-200">
          <div className="text-center">
            <div className="flex justify-center mb-3">
              <div className="bg-green-100 p-3 rounded-full">
                <Gift className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-green-800 mb-2">
              🎁 Special Loyalty Reward Program
            </h3>
            <p className="text-green-700 mb-3">
              Use our tools <strong>50+ times</strong> and get a <strong>$10 cash reward</strong> sent directly to your PayPal!
            </p>
            <div className="flex justify-center items-center space-x-1 text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
              <span className="ml-2 text-green-700 font-medium text-sm">Trusted by 100,000+ users</span>
            </div>
          </div>
        </div>

        {/* Language Selection */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <Globe className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Choose Your Language</h3>
          </div>
          
          <div className="grid grid-cols-3 md:grid-cols-4 gap-3 max-h-48 overflow-y-auto">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => setSelectedLanguage(language.code)}
                className={`p-3 text-left border rounded-lg transition-colors ${
                  selectedLanguage === language.code
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{language.flag}</span>
                  <span className="text-sm font-medium">{language.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleContinue}
            className="flex-1 flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-semibold text-lg"
          >
            <span>Start Using Tools</span>
            <Zap className="h-5 w-5" />
          </button>
          
          <button
            onClick={onClose}
            className="px-6 py-4 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
          >
            Skip for Now
          </button>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            All tools work in your browser • No data stored • Completely secure
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomePopup;