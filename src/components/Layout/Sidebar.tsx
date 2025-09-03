import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FileText, 
  FileImage, 
  Download, 
  Minimize2, 
  Maximize2, 
  Key, 
  Palette, 
  DollarSign, 
  Calculator,
  X
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  const tools = [
    { name: 'PDF to Word', path: '/tools/pdf-to-word', icon: FileText },
    { name: 'Word to PDF', path: '/tools/word-to-pdf', icon: FileText },
    { name: 'File Converter', path: '/tools/file-converter', icon: Download },
    { name: 'Image Compressor', path: '/tools/image-compressor', icon: Minimize2 },
    { name: 'Image Resizer', path: '/tools/image-resizer', icon: Maximize2 },
    { name: 'Password Generator', path: '/tools/password-generator', icon: Key },
    { name: 'Color Palette', path: '/tools/color-palette-generator', icon: Palette },
    { name: 'Currency Converter', path: '/tools/currency-converter', icon: DollarSign },
    { name: 'EMI Calculator', path: '/tools/emi-calculator', icon: Calculator },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:z-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between p-4 border-b lg:hidden">
          <h2 className="text-lg font-semibold text-gray-900">Tools</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Partner Site Banner - Large screens only */}
        <div className="hidden lg:block p-4 bg-gradient-to-r from-blue-500 to-green-500 text-white">
          <h3 className="font-semibold mb-2">Explore More Tools</h3>
          <p className="text-sm mb-3">Discover powerful tools on our partner site</p>
          <a
            href="https://toolboxpro.co.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-blue-600 px-3 py-1 rounded text-sm font-medium hover:bg-gray-100 transition-colors"
          >
            Visit Partner Site →
          </a>
        </div>

        {/* Ad Space Placeholder - Sidebar */}
        <div className="hidden lg:block bg-yellow-50 border border-yellow-200 p-4 text-center text-xs text-gray-600 mx-4 my-4">
          {/* Ad Space Placeholder - Sidebar Banner */}
          Sidebar Ad Space
        </div>

        <nav className="p-4">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Conversion Tools
          </h3>
          <ul className="space-y-2">
            {tools.map((tool) => {
              const Icon = tool.icon;
              const isActive = location.pathname === tool.path;
              
              return (
                <li key={tool.path}>
                  <Link
                    to={tool.path}
                    onClick={onClose}
                    className={`
                      flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors
                      ${isActive 
                        ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-500' 
                        : 'text-gray-700 hover:bg-gray-100'
                      }
                    `}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-sm font-medium">{tool.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;