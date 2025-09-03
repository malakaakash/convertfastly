import React, { useState } from 'react';
import { ExternalLink, X } from 'lucide-react';

const PartnerPromotion: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Show popup after 10 seconds (for demo purposes, reduced time)
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (!dismissed) {
        setShowPopup(true);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [dismissed]);

  const handleDismiss = () => {
    setDismissed(true);
    setShowPopup(false);
  };

  return (
    <>
      {/* Sticky Bottom Bar */}
      {!dismissed && (
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-green-600 text-white p-3 shadow-lg z-40">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium">
                ✨ Try more powerful tools on our partner site
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <a
                href="https://toolboxpro.co.in"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-blue-600 px-4 py-1 rounded text-sm font-medium hover:bg-gray-100 transition-colors inline-flex items-center space-x-1"
              >
                <span>Visit Now</span>
                <ExternalLink className="h-3 w-3" />
              </a>
              <button
                onClick={handleDismiss}
                className="text-white hover:text-gray-200 p-1"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                Discover More Tools! 🚀
              </h3>
              <button
                onClick={() => setShowPopup(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <p className="text-gray-600 mb-6">
              Check out our partner site for advanced tools, premium features, and more conversion options.
            </p>
            
            <div className="flex space-x-3">
              <a
                href="https://toolboxpro.co.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium text-center transition-colors inline-flex items-center justify-center space-x-2"
              >
                <span>Visit Partner Site</span>
                <ExternalLink className="h-4 w-4" />
              </a>
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PartnerPromotion;