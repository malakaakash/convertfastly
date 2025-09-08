import React, { useState } from 'react';
import { Type, ArrowRightLeft, Copy } from 'lucide-react';

const TextEncoderDecoder: React.FC = () => {
  const [inputText, setInputText] = useState<string>('Hello World!');
  const [outputText, setOutputText] = useState<string>('');
  const [operation, setOperation] = useState<string>('base64-encode');
  const [copied, setCopied] = useState<boolean>(false);

  const operations = [
    { value: 'base64-encode', label: 'Base64 Encode' },
    { value: 'base64-decode', label: 'Base64 Decode' },
    { value: 'url-encode', label: 'URL Encode' },
    { value: 'url-decode', label: 'URL Decode' },
    { value: 'html-encode', label: 'HTML Encode' },
    { value: 'html-decode', label: 'HTML Decode' },
    { value: 'unicode-escape', label: 'Unicode Escape' },
    { value: 'unicode-unescape', label: 'Unicode Unescape' },
  ];

  const performOperation = () => {
    let result = '';

    try {
      switch (operation) {
        case 'base64-encode':
          result = btoa(inputText);
          break;
        case 'base64-decode':
          result = atob(inputText);
          break;
        case 'url-encode':
          result = encodeURIComponent(inputText);
          break;
        case 'url-decode':
          result = decodeURIComponent(inputText);
          break;
        case 'html-encode':
          result = inputText
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
          break;
        case 'html-decode':
          result = inputText
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'");
          break;
        case 'unicode-escape':
          result = inputText.replace(/[\u0080-\uFFFF]/g, (match) => {
            return '\\u' + ('0000' + match.charCodeAt(0).toString(16)).substr(-4);
          });
          break;
        case 'unicode-unescape':
          result = inputText.replace(/\\u[\dA-F]{4}/gi, (match) => {
            return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
          });
          break;
        default:
          result = inputText;
      }
    } catch (error) {
      result = 'Error: Invalid input for this operation';
    }

    setOutputText(result);
  };

  const copyToClipboard = async () => {
    if (outputText) {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const swapTexts = () => {
    setInputText(outputText);
    setOutputText('');
    
    // Auto-detect reverse operation
    if (operation.includes('encode')) {
      setOperation(operation.replace('encode', 'decode'));
    } else if (operation.includes('decode')) {
      setOperation(operation.replace('decode', 'encode'));
    }
  };

  React.useEffect(() => {
    if (inputText) {
      performOperation();
    } else {
      setOutputText('');
    }
  }, [inputText, operation]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center space-x-3 mb-6">
        <Type className="h-8 w-8 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">Text Encoder & Decoder</h2>
      </div>

      <p className="text-gray-600 mb-8">
        Encode and decode text using various methods like Base64, URL encoding, HTML entities, and Unicode escaping.
      </p>

      <div className="space-y-6">
        {/* Operation Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Select Operation
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {operations.map((op) => (
              <button
                key={op.value}
                onClick={() => setOperation(op.value)}
                className={`p-3 text-sm border rounded-lg transition-colors ${
                  operation === op.value
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {op.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">Input</label>
              <span className="text-xs text-gray-500">{inputText.length} characters</span>
            </div>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
              rows={8}
              placeholder="Enter text to encode/decode..."
            />
          </div>

          {/* Output */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">Output</label>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500">{outputText.length} characters</span>
                {outputText && (
                  <button
                    onClick={copyToClipboard}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
            <div className="relative">
              <textarea
                value={outputText}
                readOnly
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 resize-none font-mono text-sm"
                rows={8}
                placeholder="Encoded/decoded text will appear here..."
              />
              {copied && (
                <div className="absolute top-2 right-2 bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                  Copied! ✓
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Swap Button */}
        <div className="text-center">
          <button
            onClick={swapTexts}
            disabled={!outputText}
            className="flex items-center space-x-2 mx-auto px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowRightLeft className="h-5 w-5" />
            <span>Swap Input & Output</span>
          </button>
        </div>

        {/* Examples */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 mb-3">Common Use Cases</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-medium text-gray-800 mb-2">Base64 Encoding</h5>
              <p className="text-gray-600">Encode binary data for email attachments or API transfers</p>
            </div>
            <div>
              <h5 className="font-medium text-gray-800 mb-2">URL Encoding</h5>
              <p className="text-gray-600">Encode special characters for safe URL transmission</p>
            </div>
            <div>
              <h5 className="font-medium text-gray-800 mb-2">HTML Encoding</h5>
              <p className="text-gray-600">Escape HTML characters to display them as text</p>
            </div>
            <div>
              <h5 className="font-medium text-gray-800 mb-2">Unicode Escaping</h5>
              <p className="text-gray-600">Convert non-ASCII characters to Unicode escape sequences</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextEncoderDecoder;