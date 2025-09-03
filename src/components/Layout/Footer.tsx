import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Zap className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold">
                Convert<span className="text-blue-400">Fastly</span>
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              Free online tools for PDF conversion, image compression, password generation, and more. 
              Fast, secure, and easy to use.
            </p>
            
            {/* Partner Site Promotion */}
            <div className="bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Need More Tools?</h4>
              <p className="text-sm text-gray-400 mb-3">
                Explore our partner site for advanced tools and features.
              </p>
              <a
                href="https://toolboxpro.co.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm font-medium transition-colors"
              >
                <span>Visit Partner Site</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/tools/pdf-to-word" className="text-gray-400 hover:text-white transition-colors">
                  PDF to Word
                </Link>
              </li>
              <li>
                <Link to="/tools/image-compressor" className="text-gray-400 hover:text-white transition-colors">
                  Image Compressor
                </Link>
              </li>
              <li>
                <Link to="/tools/password-generator" className="text-gray-400 hover:text-white transition-colors">
                  Password Generator
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 ConvertFastly. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;