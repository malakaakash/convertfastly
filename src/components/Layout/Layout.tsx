import React, { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import PartnerPromotion from './PartnerPromotion';
import NotificationBar from '../Common/NotificationBar';
import DesktopShortcutPrompt from '../Common/DesktopShortcutPrompt';
import WelcomePopup from '../Common/WelcomePopup';
import CashOfferPopup from '../Common/CashOfferPopup';
import CashOfferApprovalPopup from '../Common/CashOfferApprovalPopup';
import { useCashOfferNotification } from '../../hooks/useCashOfferNotification';
import { getAdminSettings } from '../../lib/supabase';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const [showCashOffer, setShowCashOffer] = useState(false);
  const { showApprovalPopup, approvedClaim, handleClosePopup } = useCashOfferNotification();
  const location = useLocation();

  useEffect(() => {
    // Scroll to top when route changes (especially for tools)
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    // Check if user should see welcome popup
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    const hasVisitedBefore = localStorage.getItem('hasVisitedBefore');
    
    if (!hasSeenWelcome && !hasVisitedBefore) {
      // Show welcome popup immediately for new users
      const timer = setTimeout(() => {
        setShowWelcomePopup(true);
      }, 1000);
      
      localStorage.setItem('hasVisitedBefore', 'true');
      return () => clearTimeout(timer);
    }
    
    // Load logo settings on app start
    const loadLogoSettings = async () => {
      try {
        const settings = await getAdminSettings();
        if (settings?.logo_settings) {
          const logoSettings = settings.logo_settings;
          document.documentElement.style.setProperty('--header-logo-size', `${logoSettings.header_size || 48}px`);
          document.documentElement.style.setProperty('--footer-logo-size', `${logoSettings.footer_size || 48}px`);
          document.documentElement.style.setProperty('--homepage-logo-size', `${logoSettings.homepage_size || 160}px`);
          // Apply mobile responsive sizes
          document.documentElement.style.setProperty('--header-logo-size-mobile', `${Math.max(40, (logoSettings.header_size || 48) * 0.85)}px`);
          document.documentElement.style.setProperty('--footer-logo-size-mobile', `${Math.max(40, (logoSettings.footer_size || 48) * 0.85)}px`);
          document.documentElement.style.setProperty('--homepage-logo-size-mobile', `${Math.max(120, (logoSettings.homepage_size || 160) * 0.8)}px`);
        }
      } catch (error) {
        // Silently handle the error and use default logo sizes
        console.warn('Could not load logo settings, using defaults');
      }
    };
    
    loadLogoSettings();
    
    // Check for cash offer eligibility
    const checkCashOffer = () => {
      const visitCount = parseInt(localStorage.getItem('visitCount') || '0');
      const hasSeenOffer = localStorage.getItem('hasSeenCashOffer');
      const hasClaimedOffer = localStorage.getItem('hasClaimedCashOffer');
      
      // Increment visit count
      localStorage.setItem('visitCount', (visitCount + 1).toString());
      
      // Show offer if user has visited 50+ times and hasn't seen/claimed it
      if (visitCount >= 50 && !hasSeenOffer && !hasClaimedOffer) {
        setTimeout(() => {
          setShowCashOffer(true);
        }, 2000);
      }
    };
    
    checkCashOffer();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header onMenuClick={() => setIsSidebarOpen(true)} />
      
      <div className="flex flex-1">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        
        <main className="flex-1 overflow-auto">
          <div className="p-6">
          <div className="mb-6">
            <NotificationBar />
          </div>
          {children}
          </div>
        </main>
      </div>
      
      <PartnerPromotion />
      <Footer />
      
      <DesktopShortcutPrompt 
        isVisible={showInstallPrompt}
        onClose={() => setShowInstallPrompt(false)}
      />
      
      <WelcomePopup 
        isVisible={showWelcomePopup}
        onClose={() => setShowWelcomePopup(false)}
        onLanguageSelect={(lang) => {
          console.log('Selected language:', lang);
          // Language selection logic can be implemented here
        }}
        onInstallPrompt={() => {
          setShowInstallPrompt(true);
        }}
      />
      
      <CashOfferPopup 
        isVisible={showCashOffer}
        onClose={() => setShowCashOffer(false)}
      />
      
      <CashOfferApprovalPopup 
        isVisible={showApprovalPopup}
        onClose={handleClosePopup}
        claimData={approvedClaim ? {
          amount: '$10.00',
          paypalEmail: approvedClaim.paypal_email,
          processedDate: approvedClaim.processed_at
        } : undefined}
      />
    </div>
  );
};

export default Layout;
