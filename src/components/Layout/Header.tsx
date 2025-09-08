import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Settings, Globe, ChevronDown } from 'lucide-react';
import { getAdminSettings } from '../../lib/supabase';
import { useTranslation, getCurrentLanguage, setCurrentLanguage } from '../../lib/i18n';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [logoUrl, setLogoUrl] = useState('/Convertfastly logo.png');
  const [selectedLanguage, setSelectedLanguageState] = useState('en');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const { t } = useTranslation(selectedLanguage);

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

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = getCurrentLanguage();
    setSelectedLanguageState(savedLanguage);
    
    const loadLogo = async () => {
      try {
        const settings = await getAdminSettings();
        if (settings?.logo_settings?.logo_url) {
          setLogoUrl(settings.logo_settings.logo_url);
        }
      } catch (error) {
        console.warn('Could not load logo settings, using default');
      }
    };
    loadLogo();
  }, []);

  const handleLanguageChange = (languageCode: string) => {
    setSelectedLanguageState(languageCode);
    setCurrentLanguage(languageCode);
    setShowLanguageDropdown(false);
    // Force page reload to apply language changes
    window.location.reload();
  };

  const currentLanguage = languages.find(lang => lang.code === selectedLanguage) || languages[0];
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={onMenuClick}
              className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <Menu className="h-6 w-6" />
            </button>
            
            <Link to="/" className="flex items-center space-x-2 ml-2 md:ml-0">
              <img 
                src={logoUrl} 
                alt="ConvertFastly Logo" 
                className="w-auto object-contain header-logo"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/Convertfastly logo.png';
                }}
              />
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                className="flex items-center space-x-2 px-3 py-2 text-gray-500 hover:text-gray-700 rounded-md transition-colors"
              >
                <Globe className="h-5 w-5" />
                <span className="text-lg">{currentLanguage.flag}</span>
                <span className="hidden sm:inline text-sm font-medium">{currentLanguage.name}</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {showLanguageDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <div className="max-h-64 overflow-y-auto">
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => handleLanguageChange(language.code)}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                          selectedLanguage === language.code ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-lg">{language.flag}</span>
                          <span>{language.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <nav className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              {t('nav.home')}
            </Link>
            <Link 
              to="/blog" 
              className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              {t('nav.blog')}
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              {t('nav.contact')}
            </Link>
            <Link 
              to="/terms" 
              className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              {t('nav.terms')}
            </Link>
            <Link 
              to="/privacy" 
              className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              {t('nav.privacy')}
            </Link>
          </nav>
          </div>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {showLanguageDropdown && (
        <div 
          className="fixed inset-0 z-30" 
          onClick={() => setShowLanguageDropdown(false)}
        />
      )}
    </header>
  );
};

export default Header;