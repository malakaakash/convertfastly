import React from 'react';
import { Link } from 'react-router-dom';
import { X, Palette, Image, Lock, Calculator, FileType, DollarSign, FileText, Compass as Compress, Download, QrCode, Type, Hash, Ruler, Shield, Wand2, Volume2, Mic, Languages, Merge, Scissors, Edit, Calendar, Search, Globe, Link as LinkIcon, BarChart3, Zap, Target, Edit3 } from 'lucide-react';
import { Youtube } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const tools = [
    { name: 'Color Palette Generator', icon: Palette, href: '/color-palette-generator' },
    { name: 'Image Resizer', icon: Image, href: '/image-resizer' },
    { name: 'Password Generator', icon: Lock, href: '/password-generator' },
    { name: 'QR Code Generator', icon: QrCode, href: '/qr-code-generator' },
    { name: 'Text Encoder/Decoder', icon: Type, href: '/text-encoder-decoder' },
    { name: 'JSON Formatter', icon: FileText, href: '/json-formatter' },
    { name: 'Unit Converter', icon: Ruler, href: '/unit-converter' },
    { name: 'Hash Generator', icon: Shield, href: '/hash-generator' },
    { name: 'Lorem Ipsum Generator', icon: Type, href: '/lorem-ipsum-generator' },
    { name: 'Color Format Converter', icon: Palette, href: '/color-format-converter' },
    { name: 'EMI Calculator', icon: Calculator, href: '/emi-calculator' },
    { name: 'File Converter', icon: FileType, href: '/file-converter' },
    { name: 'Currency Converter', icon: DollarSign, href: '/currency-converter' },
    { name: 'PDF to Word', icon: FileText, href: '/pdf-to-word' },
    { name: 'Word to PDF', icon: Download, href: '/word-to-pdf' },
    { name: 'Image Compressor', icon: Compress, href: '/image-compressor' },
    { name: 'AI Text Summarizer', icon: FileText, href: '/ai-text-summarizer' },
    { name: 'AI Grammar Rewriter', icon: Type, href: '/ai-grammar-rewriter' },
    { name: 'AI Image Generator', icon: Wand2, href: '/ai-image-generator' },
    { name: 'Text to Speech', icon: Volume2, href: '/text-to-speech' },
    { name: 'Speech to Text', icon: Mic, href: '/speech-to-text' },
    { name: 'Language Translator', icon: Languages, href: '/language-translator' },
    { name: 'PDF Merger', icon: Merge, href: '/pdf-merger' },
    { name: 'PDF Splitter', icon: Scissors, href: '/pdf-splitter' },
    { name: 'Word Editor', icon: Edit, href: '/word-editor' },
    { name: 'PDF Editor', icon: FileText, href: '/pdf-editor' },
    { name: 'Age Calculator', icon: Calendar, href: '/age-calculator' },
    { name: 'Keyword Research', icon: Search, href: '/keyword-research' },
    { name: 'Website Audit', icon: Globe, href: '/website-audit' },
    { name: 'Domain Authority Checker', icon: Globe, href: '/domain-authority-checker' },
    { name: 'Backlink Checker', icon: LinkIcon, href: '/backlink-checker' },
    { name: 'Plagiarism Checker', icon: Shield, href: '/plagiarism-checker' },
    { name: 'Traffic Estimator', icon: BarChart3, href: '/traffic-estimator' },
    { name: 'Meta Tag Generator', icon: Hash, href: '/meta-tag-generator' },
    { name: 'Robots.txt Generator', icon: FileText, href: '/robots-txt-generator' },
    { name: 'Sitemap Generator', icon: Globe, href: '/sitemap-generator' },
    { name: 'Broken Link Checker', icon: LinkIcon, href: '/broken-link-checker' },
    { name: 'PageSpeed Checker', icon: Zap, href: '/pagespeed-checker' },
    { name: 'Keyword Density Checker', icon: BarChart3, href: '/keyword-density-checker' },
    { name: 'Content SEO Optimizer', icon: Target, href: '/content-optimizer' },
    { name: 'AI Content Writer', icon: Edit3, href: '/ai-content-writer' },
    { name: 'YouTube Downloader', icon: Youtube, href: '/youtube-downloader' },
    { name: 'YouTube Thumbnail Downloader', icon: Image, href: '/youtube-thumbnail-downloader' },
    { name: 'Instagram Reel Downloader', icon: Image, href: '/instagram-reel-downloader' },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" 
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out overflow-y-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200 md:hidden">
          <h2 className="text-lg font-semibold text-gray-900">Tools</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="p-4">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4 hidden md:block">
            Available Tools
          </h3>
          
          <div className="mb-6 md:hidden">
            <Link
              to="/blog"
              className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors group"
              onClick={onClose}
            >
              <FileText className="h-4 w-4 text-gray-400 group-hover:text-blue-600 flex-shrink-0" />
              <span className="text-sm font-medium">Blog & Articles</span>
            </Link>
          </div>
          
          <div className="space-y-1">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.name}
                  to={tool.href}
                  className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors group"
                  onClick={onClose}
                >
                  <Icon className="h-4 w-4 text-gray-400 group-hover:text-blue-600 flex-shrink-0" />
                  <span className="text-sm font-medium">{tool.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;