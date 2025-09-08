import React, { useState, useEffect } from 'react';
import { Shield, Copy, Hash } from 'lucide-react';

const HashGenerator: React.FC = () => {
  const [inputText, setInputText] = useState<string>('Hello World!');
  const [hashes, setHashes] = useState<{ [key: string]: string }>({});
  const [copiedHash, setCopiedHash] = useState<string>('');

  const hashTypes = [
    'MD5',
    'SHA-1',
    'SHA-256',
    'SHA-384',
    'SHA-512'
  ];

  // Simple hash functions for demo - in production, use crypto-js or similar
  const generateHash = async (text: string, algorithm: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    
    let hashAlgorithm: string;
    switch (algorithm) {
      case 'SHA-1':
        hashAlgorithm = 'SHA-1';
        break;
      case 'SHA-256':
        hashAlgorithm = 'SHA-256';
        break;
      case 'SHA-384':
        hashAlgorithm = 'SHA-384';
        break;
      case 'SHA-512':
        hashAlgorithm = 'SHA-512';
        break;
      default:
        // For MD5, we'll use a simple mock since it's not available in Web Crypto API
        return 'MD5 hash simulation: ' + text.length.toString(16).padStart(32, '0');
    }

    try {
      const hashBuffer = await crypto.subtle.digest(hashAlgorithm, data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } catch (error) {
      return 'Error generating hash';
    }
  };

  const generateAllHashes = async () => {
    const newHashes: { [key: string]: string } = {};
    
    for (const hashType of hashTypes) {
      newHashes[hashType] = await generateHash(inputText, hashType);
    }
    
    setHashes(newHashes);
  };

  const copyToClipboard = async (hash: string, type: string) => {
    await navigator.clipboard.writeText(hash);
    setCopiedHash(type);
    setTimeout(() => setCopiedHash(''), 2000);
  };

  const getHashColor = (type: string): string => {
    const colors = {
      'MD5': 'text-red-600',
      'SHA-1': 'text-orange-600',
      'SHA-256': 'text-green-600',
      'SHA-384': 'text-blue-600',
      'SHA-512': 'text-purple-600',
    };
    return colors[type as keyof typeof colors] || 'text-gray-600';
  };

  useEffect(() => {
    if (inputText) {
      generateAllHashes();
    }
  }, [inputText]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center space-x-3 mb-6">
        <Shield className="h-8 w-8 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">Hash Generator</h2>
      </div>

      <p className="text-gray-600 mb-8">
        Generate cryptographic hashes for passwords, data integrity verification, and security applications.
      </p>

      <div className="space-y-6">
        {/* Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Text to Hash
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
            placeholder="Enter text to generate hashes..."
          />
          <div className="text-xs text-gray-500 mt-1">
            {inputText.length} characters
          </div>
        </div>

        {/* Hash Results */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <Hash className="h-5 w-5" />
            <span>Generated Hashes</span>
          </h3>

          <div className="grid grid-cols-1 gap-4">
            {hashTypes.map((hashType) => (
              <div key={hashType} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-bold ${getHashColor(hashType)}`}>
                      {hashType}
                    </span>
                    {hashType === 'MD5' && (
                      <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                        Not recommended for security
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => copyToClipboard(hashes[hashType] || '', hashType)}
                    className="text-gray-400 hover:text-gray-600 p-1"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="bg-gray-50 rounded p-3 font-mono text-sm break-all">
                  {hashes[hashType] || 'Generating...'}
                </div>
                
                {copiedHash === hashType && (
                  <div className="text-xs text-green-600 mt-2">Copied to clipboard! ✓</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Hash Information */}
        <div className="bg-blue-50 rounded-lg p-6">
          <h4 className="font-semibold text-blue-900 mb-3">Hash Algorithm Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-medium text-blue-800 mb-1">SHA-256 (Recommended)</h5>
              <p className="text-blue-700">256-bit hash, widely used for security applications</p>
            </div>
            <div>
              <h5 className="font-medium text-blue-800 mb-1">SHA-512</h5>
              <p className="text-blue-700">512-bit hash, highest security for sensitive data</p>
            </div>
            <div>
              <h5 className="font-medium text-orange-800 mb-1">MD5</h5>
              <p className="text-orange-700">Legacy algorithm, use only for checksums</p>
            </div>
            <div>
              <h5 className="font-medium text-blue-800 mb-1">SHA-1</h5>
              <p className="text-blue-700">Deprecated for security, use SHA-256+ instead</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HashGenerator;