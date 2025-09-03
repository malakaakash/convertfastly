import React from 'react';
import { Link } from 'react-router-dom';
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
  ArrowRight,
  Zap,
  Shield,
  Clock
} from 'lucide-react';

const Home: React.FC = () => {
  const tools = [
    {
      name: 'PDF to Word',
      description: 'Convert PDF documents to editable Word files',
      path: '/tools/pdf-to-word',
      icon: FileText,
      color: 'bg-red-500'
    },
    {
      name: 'Word to PDF',
      description: 'Convert Word documents to PDF format',
      path: '/tools/word-to-pdf',
      icon: FileText,
      color: 'bg-blue-500'
    },
    {
      name: 'File Converter',
      description: 'Convert between various file formats',
      path: '/tools/file-converter',
      icon: Download,
      color: 'bg-purple-500'
    },
    {
      name: 'Image Compressor',
      description: 'Reduce image file sizes without quality loss',
      path: '/tools/image-compressor',
      icon: Minimize2,
      color: 'bg-green-500'
    },
    {
      name: 'Image Resizer',
      description: 'Resize images to custom dimensions',
      path: '/tools/image-resizer',
      icon: Maximize2,
      color: 'bg-yellow-500'
    },
    {
      name: 'Password Generator',
      description: 'Generate secure passwords with custom options',
      path: '/tools/password-generator',
      icon: Key,
      color: 'bg-indigo-500'
    },
    {
      name: 'Color Palette',
      description: 'Generate beautiful color palettes for design',
      path: '/tools/color-palette-generator',
      icon: Palette,
      color: 'bg-pink-500'
    },
    {
      name: 'Currency Converter',
      description: 'Convert between different currencies',
      path: '/tools/currency-converter',
      icon: DollarSign,
      color: 'bg-emerald-500'
    },
    {
      name: 'EMI Calculator',
      description: 'Calculate loan EMI with detailed breakdown',
      path: '/tools/emi-calculator',
      icon: Calculator,
      color: 'bg-orange-500'
    }
  ];

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Process files and generate results in seconds'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your files are processed locally and never stored'
    },
    {
      icon: Clock,
      title: '24/7 Available',
      description: 'Access all tools anytime, anywhere, on any device'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="text-center py-16 bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Convert<span className="text-blue-600">Fastly</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Free online conversion tools for all your needs. Convert files, compress images, 
          generate passwords, and more - all in your browser.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/tools/pdf-to-word"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center space-x-2"
          >
            <span>Try PDF Converter</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            to="/tools/image-compressor"
            className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Compress Images
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center p-6 bg-white rounded-xl shadow-sm border">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Tools Grid */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          All Tools
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.path}
                to={tool.path}
                className="group bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-all duration-200 hover:-translate-y-1"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`w-12 h-12 ${tool.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {tool.name}
                    </h3>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
                <p className="text-gray-600 text-sm">{tool.description}</p>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Home;