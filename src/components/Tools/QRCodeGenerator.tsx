import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { QrCode, Download, Copy, Smartphone, RefreshCw } from 'lucide-react';
import { useToolTracking } from '../../hooks/useToolTracking';
import SuccessAdModal from '../Common/SuccessAdModal';
import ToolDisruptionNotice from '../Common/ToolDisruptionNotice';

const QRCodeGenerator: React.FC = () => {
  useToolTracking('qr-code-generator');

  const [inputText, setInputText] = useState<string>('https://convertfastly.com');
  const [qrSize, setQrSize] = useState<number>(256);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [showSuccessAd, setShowSuccessAd] = useState<boolean>(false);
  const [showDisruption, setShowDisruption] = useState<boolean>(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateQRCode = async () => {
    if (!inputText.trim()) return;

    // Using QR Server API for demo - in production, consider using a QR library
    const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(inputText)}`;
    setQrCodeUrl(apiUrl);
    setShowSuccessAd(true);
  };

  const downloadQRCode = async () => {
    if (!qrCodeUrl) return;

    try {
      const response = await fetch(qrCodeUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = 'qr-code.png';
      a.click();
      
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download QR code:', error);
    }
  };

  const copyToClipboard = async () => {
    if (inputText) {
      await navigator.clipboard.writeText(inputText);
    }
  };

  React.useEffect(() => {
    generateQRCode();
  }, [inputText, qrSize]);

  const qrTypes = [
    { label: 'Website URL', example: 'https://example.com' },
    { label: 'Email', example: 'mailto:contact@example.com' },
    { label: 'Phone', example: 'tel:+1234567890' },
    { label: 'SMS', example: 'sms:+1234567890' },
    { label: 'WiFi', example: 'WIFI:T:WPA;S:MyNetwork;P:password;;' },
  ];

  return (
    <>
      <Helmet>
        <title>Free QR Code Generator - Create QR Codes Online | ConvertFastly</title>
        <meta name="description" content="Generate QR codes for free. Create QR codes for URLs, text, email, phone numbers, WiFi, and more. Download as PNG. No registration required." />
        <meta name="keywords" content="QR code generator, create QR code, QR code maker, free QR generator, QR code creator, online QR tool" />
        <link rel="canonical" href="https://convertfastly.com/qr-code-generator" />
        <meta property="og:title" content="Free QR Code Generator - Create QR Codes Online" />
        <meta property="og:description" content="Generate QR codes for URLs, text, email, and more. Free online tool with instant download." />
        <meta property="og:url" content="https://convertfastly.com/qr-code-generator" />
      </Helmet>
    <div className="bg-white rounded-xl shadow-lg p-8">
      {showDisruption && (
        <ToolDisruptionNotice 
          toolName="QR Code Generator"
          onDismiss={() => setShowDisruption(false)}
        />
      )}
      
      <div className="flex items-center space-x-3 mb-6">
        <QrCode className="h-8 w-8 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">QR Code Generator</h2>
      </div>

      <p className="text-gray-600 mb-8">
        Generate QR codes for URLs, text, email, phone numbers, and more. Perfect for sharing information quickly.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Text or URL to encode
            </label>
            <div className="relative">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={4}
                placeholder="Enter text, URL, email, phone number..."
              />
              <button
                onClick={copyToClipboard}
                className="absolute top-2 right-2 p-2 text-gray-400 hover:text-gray-600"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Size: {qrSize}x{qrSize}px
            </label>
            <input
              type="range"
              min="128"
              max="512"
              step="64"
              value={qrSize}
              onChange={(e) => setQrSize(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>128px</span>
              <span>512px</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Quick Templates
            </label>
            <div className="grid grid-cols-1 gap-2">
              {qrTypes.map((type, index) => (
                <button
                  key={index}
                  onClick={() => setInputText(type.example)}
                  className="text-left p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                >
                  <div className="font-medium text-gray-900">{type.label}</div>
                  <div className="text-sm text-gray-500">{type.example}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* QR Code Display */}
        <div className="space-y-6">
          <div className="text-center">
            {qrCodeUrl ? (
              <div className="inline-block p-4 bg-white border-2 border-gray-200 rounded-xl">
                <img
                  src={qrCodeUrl}
                  alt="Generated QR Code"
                  className="mx-auto"
                  style={{ width: qrSize, height: qrSize }}
                />
              </div>
            ) : (
              <div 
                className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-xl"
                style={{ width: qrSize, height: qrSize, margin: '0 auto' }}
              >
                <div className="text-center text-gray-400">
                  <QrCode className="h-12 w-12 mx-auto mb-2" />
                  <p>QR Code will appear here</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={downloadQRCode}
              disabled={!qrCodeUrl}
              className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="h-5 w-5" />
              <span>Download PNG</span>
            </button>
            
            <button
              onClick={generateQRCode}
              className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <RefreshCw className="h-5 w-5" />
              <span>Regenerate</span>
            </button>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Smartphone className="h-5 w-5 text-blue-600" />
              <span className="font-medium text-blue-900">How to use</span>
            </div>
            <p className="text-sm text-blue-800">
              Use your smartphone's camera or QR code scanner app to scan the generated code. 
              Most modern phones can scan QR codes directly from the camera app.
            </p>
          </div>
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />
      
      <SuccessAdModal 
        isOpen={showSuccessAd}
        onClose={() => setShowSuccessAd(false)}
        toolName="QR Code Generator"
      />
    </div>
    </>
  );
};

export default QRCodeGenerator;