import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Settings, Github, Twitter, Mail } from 'lucide-react';
import { getAdminSettings } from '../../lib/supabase';

const Footer: React.FC = () => {
  const [logoUrl, setLogoUrl] = useState('/Convertfastly logo.png');

  useEffect(() => {
    const loadLogo = async () => {
      const settings = await getAdminSettings();
      if (settings?.logo_settings?.logo_url) {
        setLogoUrl(settings.logo_settings.logo_url);
      }
    };
    loadLogo();
  }, []);

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src={logoUrl} 
                alt="ConvertFastly Logo" 
                className="w-auto object-contain footer-logo"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/Convertfastly logo.png';
                }}
              />
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Your go-to platform for fast, secure, and free online conversion tools. 
              Convert files, generate passwords, compress images, and much more.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="mailto:support@convertfastly.com" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
              <li><a href="#password-generator" className="text-gray-300 hover:text-white transition-colors">Password Generator</a></li>
              <li><a href="#file-converter" className="text-gray-300 hover:text-white transition-colors">File Converter</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8">
          <p className="text-center text-gray-400 text-sm">
            © 2025 ConvertFastly. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;