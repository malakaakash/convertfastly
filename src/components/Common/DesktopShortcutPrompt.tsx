import React, { useState, useEffect } from 'react';
import { X, Download, Smartphone, Monitor, Plus } from 'lucide-react';

interface DesktopShortcutPromptProps {
  isVisible: boolean;
  onClose: () => void;
}

const DesktopShortcutPrompt: React.FC<DesktopShortcutPromptProps> = ({ isVisible, onClose }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [deviceType, setDeviceType] = useState<'mobile' | 'desktop'>('desktop');

  useEffect(() => {
    // Detect device type
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    setDeviceType(isMobile ? 'mobile' : 'desktop');

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      }
      
      setDeferredPrompt(null);
      setIsInstallable(false);
      onClose();
    }
  };

  const getInstallInstructions = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    
    if (deviceType === 'mobile') {
      if (userAgent.includes('safari') && !userAgent.includes('chrome')) {
        return {
          browser: 'Safari (iOS)',
          icon: <Smartphone className="h-6 w-6" />,
          steps: [
            'Tap the Share button (📤) at the bottom of the screen',
            'Scroll down and tap "Add to Home Screen"',
            'Tap "Add" in the top right corner',
            'The ConvertFastly app will appear on your home screen'
          ]
        };
      } else if (userAgent.includes('chrome')) {
        return {
          browser: 'Chrome (Android)',
          icon: <Smartphone className="h-6 w-6" />,
          steps: [
            'Tap the three dots menu (⋮) in the top right',
            'Select "Add to Home screen" or "Install app"',
            'Tap "Add" or "Install" to confirm',
            'The app will be added to your home screen'
          ]
        };
      } else {
        return {
          browser: 'Mobile Browser',
          icon: <Smartphone className="h-6 w-6" />,
          steps: [
            'Look for "Add to Home Screen" in your browser menu',
            'Follow the prompts to install the app',
            'The app will appear on your home screen for quick access'
          ]
        };
      }
    } else {
      if (userAgent.includes('chrome') || userAgent.includes('edge')) {
        return {
          browser: 'Chrome/Edge',
          icon: <Monitor className="h-6 w-6" />,
          steps: [
            'Click the install icon (⬇️) in the address bar, or',
            'Click the three dots menu (⋮) in the top right',
            'Select "Install ConvertFastly..." or "Add to desktop"',
            'Click "Install" in the popup dialog'
          ]
        };
      } else if (userAgent.includes('firefox')) {
        return {
          browser: 'Firefox',
          icon: <Monitor className="h-6 w-6" />,
          steps: [
            'Click the three lines menu (☰) in the top right',
            'Select "Install this site as an app"',
            'Click "Install" to add to desktop',
            'The app will appear in your applications folder'
          ]
        };
      } else {
        return {
          browser: 'Desktop Browser',
          icon: <Monitor className="h-6 w-6" />,
          steps: [
            'Look for an "Install" or "Add to Desktop" option in your browser menu',
            'Follow the prompts to install the app',
            'The app will be added to your desktop or applications'
          ]
        };
      }
    }
  };

  if (!isVisible) return null;

  const instructions = getInstallInstructions();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-lg w-full p-6 relative transform transition-all animate-in slide-in-from-bottom-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 p-4 rounded-full">
              {instructions.icon}
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            📱 Install ConvertFastly App
          </h3>
          
          <p className="text-gray-600 mb-4">
            Add ConvertFastly to your {deviceType === 'mobile' ? 'home screen' : 'desktop'} for instant access to all tools!
          </p>

          {/* Benefits */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-gray-900 mb-2">Why install?</h4>
            <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
              <div className="flex items-center space-x-2">
                <span className="text-green-500">⚡</span>
                <span>Faster loading</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-blue-500">🔒</span>
                <span>Works offline</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-purple-500">📱</span>
                <span>Native app feel</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-orange-500">🚀</span>
                <span>Quick access</span>
              </div>
            </div>
          </div>
        </div>

        {/* Installation Instructions */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
            {instructions.icon}
            <span className="ml-2">How to install on {instructions.browser}:</span>
          </h4>
          <ol className="space-y-3 text-sm text-gray-700">
            {instructions.steps.map((step, index) => (
              <li key={index} className="flex items-start">
                <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">
                  {index + 1}
                </span>
                <span className="leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {isInstallable && deferredPrompt ? (
            <button
              onClick={handleInstallClick}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-semibold flex items-center justify-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Install Now</span>
            </button>
          ) : (
            <div className="text-center bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-2">
                Use your browser's menu to install this app
              </p>
              <p className="text-xs text-gray-500">
                Look for "Install", "Add to {deviceType === 'mobile' ? 'Home Screen' : 'Desktop'}", or app icon in the address bar
              </p>
            </div>
          )}
          
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Maybe Later
            </button>
            <button
              onClick={() => {
                localStorage.setItem('hideInstallPrompt', 'true');
                onClose();
              }}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Don't Show Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopShortcutPrompt;