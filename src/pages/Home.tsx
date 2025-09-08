import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Palette, Image, Lock, Calculator, FileType, DollarSign, FileText, Compass as Compress, Download, QrCode, Type, Hash, Ruler, Shield, ArrowRight, Star, Users, Zap, Wand2, Volume2, Mic, Languages, Merge, Scissors, Edit, Calendar, Search, Globe, Target, Edit3 } from 'lucide-react';
import { Link as LinkIcon, BarChart3 } from 'lucide-react';
import { Youtube } from 'lucide-react';
import { getAdminSettings } from '../lib/supabase';
import SearchBar from '../components/Common/SearchBar';
import FAQSection from '../components/Common/FAQSection';
import { getFeaturedArticles, Article } from '../lib/supabase';
import { useTranslation, getCurrentLanguage } from '../lib/i18n';

const Home: React.FC = () => {
  const { t } = useTranslation(getCurrentLanguage());
  const [visibleTools, setVisibleTools] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTools, setFilteredTools] = useState<any[]>([]);
  const [logoUrl, setLogoUrl] = useState('/Convertfastly logo.png');
  const [featuredArticles, setFeaturedArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetchToolVisibility();
  }, []);

  useEffect(() => {
    // Filter tools based on search query
    if (searchQuery.trim() === '') {
      setFilteredTools(tools);
    } else {
      const filtered = tools.filter(tool =>
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTools(filtered);
    }
  }, [searchQuery]);
  const fetchToolVisibility = async () => {
    try {
      const [settings, articles] = await Promise.all([
        getAdminSettings(),
        getFeaturedArticles(3)
      ]);
      
      setVisibleTools(settings?.tools_visibility || {});
      if (settings?.logo_settings?.logo_url) {
        setLogoUrl(settings.logo_settings.logo_url);
      }
      setFeaturedArticles(articles);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setFilteredTools(tools);
    setLoading(false);
  };

  const tools = [
    {
      name: 'Color Palette Generator',
      description: 'Generate beautiful color palettes for your designs',
      icon: Palette,
      path: '/color-palette-generator',
      category: 'Design'
    },
    {
      name: 'Image Resizer',
      description: 'Resize images to any dimension while maintaining quality',
      icon: Image,
      path: '/image-resizer',
      category: 'Image'
    },
    {
      name: 'Password Generator',
      description: 'Generate secure passwords with customizable options',
      icon: Lock,
      path: '/password-generator',
      category: 'Security'
    },
    {
      name: 'QR Code Generator',
      description: 'Create QR codes for URLs, text, and more',
      icon: QrCode,
      path: '/qr-code-generator',
      category: 'Utility'
    },
    {
      name: 'Text Encoder/Decoder',
      description: 'Encode and decode text using various methods',
      icon: Type,
      path: '/text-encoder-decoder',
      category: 'Text'
    },
    {
      name: 'JSON Formatter',
      description: 'Format, validate, and minify JSON data',
      icon: FileText,
      path: '/json-formatter',
      category: 'Developer'
    },
    {
      name: 'Unit Converter',
      description: 'Convert between different units of measurement',
      icon: Ruler,
      path: '/unit-converter',
      category: 'Calculator'
    },
    {
      name: 'Hash Generator',
      description: 'Generate cryptographic hashes for security',
      icon: Shield,
      path: '/hash-generator',
      category: 'Security'
    },
    {
      name: 'Lorem Ipsum Generator',
      description: 'Generate placeholder text for designs',
      icon: Type,
      path: '/lorem-ipsum-generator',
      category: 'Text'
    },
    {
      name: 'Color Format Converter',
      description: 'Convert colors between HEX, RGB, HSL formats',
      icon: Palette,
      path: '/color-format-converter',
      category: 'Design'
    },
    {
      name: 'EMI Calculator',
      description: 'Calculate loan EMI with detailed breakdown',
      icon: Calculator,
      path: '/emi-calculator',
      category: 'Calculator'
    },
    {
      name: 'File Converter',
      description: 'Convert files between different formats',
      icon: FileType,
      path: '/file-converter',
      category: 'File'
    },
    {
      name: 'Currency Converter',
      description: 'Convert between different currencies',
      icon: DollarSign,
      path: '/currency-converter',
      category: 'Calculator'
    },
    {
      name: 'PDF to Word',
      description: 'Convert PDF documents to editable Word format',
      icon: FileText,
      path: '/pdf-to-word',
      category: 'File'
    },
    {
      name: 'Word to PDF',
      description: 'Convert Word documents to PDF format',
      icon: Download,
      path: '/word-to-pdf',
      category: 'File'
    },
    {
      name: 'Image Compressor',
      description: 'Reduce image file size while maintaining quality',
      icon: Compress,
      path: '/image-compressor',
      category: 'Image'
    },
    {
      name: 'AI Text Summarizer',
      description: 'Summarize long articles and documents with AI',
      icon: FileText,
      path: '/ai-text-summarizer',
      category: 'AI Tools'
    },
    {
      name: 'AI Grammar Rewriter',
      description: 'Fix grammar and improve writing with AI',
      icon: Type,
      path: '/ai-grammar-rewriter',
      category: 'AI Tools'
    },
    {
      name: 'AI Image Generator',
      description: 'Create stunning images from text descriptions',
      icon: Wand2,
      path: '/ai-image-generator',
      category: 'AI Tools'
    },
    {
      name: 'Text to Speech',
      description: 'Convert text to natural-sounding speech',
      icon: Volume2,
      path: '/text-to-speech',
      category: 'Audio'
    },
    {
      name: 'Speech to Text',
      description: 'Convert speech to text with voice recognition',
      icon: Mic,
      path: '/speech-to-text',
      category: 'Audio'
    },
    {
      name: 'Language Translator',
      description: 'Translate text between 100+ languages',
      icon: Languages,
      path: '/language-translator',
      category: 'Text'
    },
    {
      name: 'PDF Merger',
      description: 'Combine multiple PDF files into one',
      icon: Merge,
      path: '/pdf-merger',
      category: 'File'
    },
    {
      name: 'PDF Splitter',
      description: 'Extract specific pages from PDF documents',
      icon: Scissors,
      path: '/pdf-splitter',
      category: 'File'
    },
    {
      name: 'Word Editor',
      description: 'Create and edit documents with rich text formatting',
      icon: Edit,
      path: '/word-editor',
      category: 'Document'
    },
    {
      name: 'PDF Editor',
      description: 'Edit PDF files - rotate, split, merge, add text',
      icon: FileText,
      path: '/pdf-editor',
      category: 'Document'
    },
    {
      name: 'Age Calculator',
      description: 'Calculate exact age and time until next birthday',
      icon: Calendar,
      path: '/age-calculator',
      category: 'Calculator'
    },
    {
      name: 'Keyword Research',
      description: 'Find high-value SEO keywords and search volume data',
      icon: Search,
      path: '/keyword-research',
      category: 'SEO'
    },
    {
      name: 'Website Audit',
      description: 'Comprehensive SEO analysis and performance audit',
      icon: Globe,
      path: '/website-audit',
      category: 'SEO'
    },
    {
      name: 'Domain Authority Checker',
      description: 'Check DA, PA scores and domain strength metrics',
      icon: Globe,
      path: '/domain-authority-checker',
      category: 'SEO'
    },
    {
      name: 'Backlink Checker',
      description: 'Analyze backlink profile and referring domains',
      icon: LinkIcon,
      path: '/backlink-checker',
      category: 'SEO'
    },
    {
      name: 'Plagiarism Checker',
      description: 'Detect copied content and ensure originality',
      icon: Shield,
      path: '/plagiarism-checker',
      category: 'SEO'
    },
    {
      name: 'Traffic Estimator',
      description: 'Estimate website traffic and visitor analytics',
      icon: BarChart3,
      path: '/traffic-estimator',
      category: 'SEO'
    },
    {
      name: 'Meta Tag Generator',
      description: 'Generate SEO meta tags and Open Graph tags',
      icon: Hash,
      path: '/meta-tag-generator',
      category: 'SEO'
    },
    {
      name: 'Robots.txt Generator',
      description: 'Create robots.txt files for search engine crawling',
      icon: FileText,
      path: '/robots-txt-generator',
      category: 'SEO'
    },
    {
      name: 'Sitemap Generator',
      description: 'Generate XML sitemaps for better SEO indexing',
      icon: Globe,
      path: '/sitemap-generator',
      category: 'SEO'
    },
    {
      name: 'Broken Link Checker',
      description: 'Find and fix broken links on your website',
      icon: LinkIcon,
      path: '/broken-link-checker',
      category: 'SEO'
    },
    {
      name: 'PageSpeed Checker',
      description: 'Test website loading speed and performance',
      icon: Zap,
      path: '/pagespeed-checker',
      category: 'SEO'
    },
    {
      name: 'Keyword Density Checker',
      description: 'Analyze keyword density for content optimization',
      icon: BarChart3,
      path: '/keyword-density-checker',
      category: 'SEO'
    },
    {
      name: 'Content SEO Optimizer',
      description: 'Optimize content for search engines with AI analysis',
      icon: Target,
      path: '/content-optimizer',
      category: 'Content & AI'
    },
    {
      name: 'AI Content Writer',
      description: 'Generate high-quality content with AI assistance',
      icon: Edit3,
      path: '/ai-content-writer',
      category: 'Content & AI'
    },
    {
      name: 'YouTube Downloader',
      description: 'Download YouTube videos and audio in multiple formats',
      icon: Youtube,
      path: '/youtube-downloader',
      category: 'Media'
    },
    {
      name: 'YouTube Thumbnail Downloader',
      description: 'Download YouTube video thumbnails in various sizes',
      icon: Image,
      path: '/youtube-thumbnail-downloader',
      category: 'Media'
    },
    {
      name: 'Instagram Reel Downloader',
      description: 'Download public Instagram Reels with captions',
      icon: Image,
      path: '/instagram-reel-downloader',
      category: 'Media'
    }
  ];

  const categories = [...new Set(tools.map(tool => tool.category))];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>ConvertFastly - 40+ Free Online Tools & Converters | YouTube Downloader, File Converter, Image Resizer, Password Generator</title>
        <meta name="description" content="Access 40+ free online tools: YouTube Downloader, Instagram Downloader, File Converter, Image Resizer, Password Generator, QR Code Generator, JSON Formatter, Currency Converter, PDF Tools, SEO Tools, AI Tools & More. Fast, secure, browser-based tools with no registration required." />
        <meta name="keywords" content="online tools, free converter, YouTube downloader, Instagram downloader, file converter, image resizer, password generator, QR code generator, JSON formatter, text encoder decoder, unit converter, hash generator, lorem ipsum generator, color palette generator, EMI calculator, currency converter, PDF tools, SEO tools, AI tools, online utilities, web tools, conversion tools, free online tools, no registration tools, secure online tools" />
        <link rel="canonical" href="https://convertfastly.com/" />
        <meta property="og:title" content="ConvertFastly - 40+ Free Online Tools & Converters | No Registration Required" />
        <meta property="og:description" content="Access 40+ free online tools: YouTube Downloader, Instagram Downloader, File Converter, Image Resizer, Password Generator, QR Code Generator, JSON Formatter, Currency Converter, PDF Tools, SEO Tools, AI Tools & More. Fast, secure, browser-based tools with no registration required." />
        <meta property="og:url" content="https://convertfastly.com/" />
        <meta property="og:type" content="website" />
      </Helmet>
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl">
        <div className="max-w-4xl mx-auto px-4">
         <div className="flex justify-center mb-8">
           <img 
            src={logoUrl} 
             alt="ConvertFastly Logo" 
             className="w-auto object-contain homepage-logo"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/Convertfastly logo.png';
            }}
           />
         </div>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
            {t('home.subtitle')}
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <Zap className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium">{t('home.lightningFast')}</span>
            </div>
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <Shield className="h-5 w-5 text-blue-500" />
              <span className="text-sm font-medium">{t('home.privacyFirst')}</span>
            </div>
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <Users className="h-5 w-5 text-purple-500" />
              <span className="text-sm font-medium">{t('home.alwaysFree')}</span>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="flex items-center space-x-1 text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
              <span className="ml-2 text-gray-600 font-medium">{t('home.trustedBy')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('home.chooseYourTool')}</h2>
          <p className="text-gray-600 mb-6">Search through our collection of conversion and utility tools</p>
        </div>
        
        <SearchBar
          onSearch={setSearchQuery}
          placeholder={t('home.searchPlaceholder')}
          className="mb-8"
        />
        
        {searchQuery && (
          <div className="text-center mb-8">
            <p className="text-gray-600">
              {filteredTools.length > 0 
                ? `Found ${filteredTools.length} tool${filteredTools.length !== 1 ? 's' : ''} matching "${searchQuery}"`
                : `No tools found matching "${searchQuery}"`
              }
            </p>
          </div>
        )}
      </section>
      {/* Tools Grid */}
      <section className="max-w-7xl mx-auto px-4">
        {!searchQuery && (
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('home.chooseYourTool')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Select from our comprehensive collection of conversion and utility tools. 
              All tools work directly in your browser - no downloads required.
            </p>
          </div>
        )}

        {/* Most Popular Tools Section */}
        {!searchQuery && (
          <div className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center justify-center">
                <Star className="h-6 w-6 text-yellow-500 mr-2" />
                {t('home.mostPopular')}
              </h3>
              <p className="text-gray-600">Our most frequently used tools by the community</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'Password Generator', icon: Lock, path: '/password-generator', users: '50K+' },
                { name: 'QR Code Generator', icon: QrCode, path: '/qr-code-generator', users: '45K+' },
                { name: 'Image Resizer', icon: Image, path: '/image-resizer', users: '40K+' },
                { name: 'JSON Formatter', icon: FileText, path: '/json-formatter', users: '35K+' },
                { name: 'Currency Converter', icon: DollarSign, path: '/currency-converter', users: '30K+' },
                { name: 'Color Palette Generator', icon: Palette, path: '/color-palette-generator', users: '25K+' },
                { name: 'PDF to Word', icon: FileText, path: '/pdf-to-word', users: '20K+' },
                { name: 'Unit Converter', icon: Ruler, path: '/unit-converter', users: '18K+' }
              ]
                .filter(tool => visibleTools[tool.path.substring(1)] !== false)
                .slice(0, 8)
                .map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <Link
                      key={tool.path}
                      to={tool.path}
                      className="group bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border-2 border-blue-100 hover:border-blue-300 relative overflow-hidden"
                    >
                      <div className="absolute top-2 right-2 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-bold">
                        {tool.users}
                      </div>
                      
                      <div className="flex flex-col items-center text-center">
                        <div className="p-3 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors mb-4">
                          <Icon className="h-8 w-8 text-blue-600" />
                        </div>
                        
                        <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-900 transition-colors">
                          {tool.name}
                        </h4>
                        
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <Users className="h-4 w-4" />
                          <span>{tool.users} users</span>
                        </div>
                      </div>
                      
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    </Link>
                  );
                })}
            </div>
          </div>
        )}

        {searchQuery ? (
          /* Search Results */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
            {filteredTools
              .filter(tool => visibleTools[tool.path.substring(1)] !== false)
              .map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link
                    key={tool.path}
                    to={tool.path}
                    className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 border border-gray-100 hover:border-blue-200"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                        <Icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {tool.category}
                      </span>
                      <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors ml-auto" />
                    </div>
                    
                    <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-900 transition-colors">
                      {tool.name}
                    </h4>
                    
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {tool.description}
                    </p>
                  </Link>
                );
              })}
          </div>
        ) : (
          /* Category-based display */
          categories.map(category => (
            <div key={category} className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mr-3">
                  {category}
                </span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {tools
                  .filter(tool => tool.category === category)
                  .filter(tool => visibleTools[tool.path.substring(1)] !== false)
                  .map((tool) => {
                    const Icon = tool.icon;
                    return (
                      <Link
                        key={tool.path}
                        to={tool.path}
                        className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 border border-gray-100 hover:border-blue-200"
                      >
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                            <Icon className="h-6 w-6 text-blue-600" />
                          </div>
                          <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors ml-auto" />
                        </div>
                        
                        <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-900 transition-colors">
                          {tool.name}
                        </h4>
                        
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {tool.description}
                        </p>
                      </Link>
                    );
                  })}
              </div>
            </div>
          ))
        )}
      </section>

      {/* FAQ Section */}
      <section className="max-w-6xl mx-auto px-4">
        <FAQSection />
      </section>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Articles</h2>
            <p className="text-lg text-gray-600">
              Discover helpful tips, tutorials, and insights about online tools and productivity
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {featuredArticles.map((article) => (
              <Link
                key={article.id}
                to={`/blog/${article.slug}`}
                className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
              >
                {article.featured_image && (
                  <img
                    src={article.featured_image}
                    alt={article.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                      {article.category}
                    </span>
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                      Featured
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-4">{article.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{article.author}</span>
                    <ArrowRight className="h-4 w-4 group-hover:text-blue-600 transition-colors" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center">
            <Link
              to="/blog"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <span>View All Articles</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </section>
      )}

      {/* How to Use Section */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('home.howToUse')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Getting started with ConvertFastly is simple and straightforward
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('home.step1')}</h3>
              <p className="text-gray-600">Browse our collection or use the search bar to find the perfect tool for your needs.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('home.step2')}</h3>
              <p className="text-gray-600">Upload your files or enter the data you want to convert, generate, or process.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('home.step3')}</h3>
              <p className="text-gray-600">Download your converted files or copy the generated results. It's that simple!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 rounded-2xl py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('home.whyChoose')}</h2>
            <p className="text-lg text-gray-600">Built with privacy, speed, and simplicity in mind</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('home.privacyFirst')}</h3>
              <p className="text-gray-600">All processing happens in your browser. Your files never leave your device.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('home.lightningFast')}</h3>
              <p className="text-gray-600">Optimized for speed with instant results and no waiting time.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('home.alwaysFree')}</h3>
              <p className="text-gray-600">No registration, no limits, no hidden fees. Just pure functionality.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default Home;