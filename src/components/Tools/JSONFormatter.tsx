import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FileText, Check, X, Copy, Download, ArrowRightLeft } from 'lucide-react';
import { useToolTracking } from '../../hooks/useToolTracking';
import ToolDisruptionNotice from '../Common/ToolDisruptionNotice';

const JSONFormatter: React.FC = () => {
  useToolTracking('json-formatter');

  const [inputJSON, setInputJSON] = useState<string>('{"name":"John Doe","age":30,"city":"New York","hobbies":["reading","coding","travel"]}');
  const [formattedJSON, setFormattedJSON] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [indentSize, setIndentSize] = useState<number>(2);
  const [copied, setCopied] = useState<boolean>(false);
  const [showDisruption, setShowDisruption] = useState<boolean>(true);

  const swapTexts = () => {
    if (formattedJSON) {
      setInputJSON(formattedJSON);
      setFormattedJSON('');
    }
  };

  const formatJSON = () => {
    try {
      const parsed = JSON.parse(inputJSON);
      const formatted = JSON.stringify(parsed, null, indentSize);
      setFormattedJSON(formatted);
      setIsValid(true);
      setError('');
    } catch (err) {
      setIsValid(false);
      setError((err as Error).message);
      setFormattedJSON('');
    }
  };

  const minifyJSON = () => {
    try {
      const parsed = JSON.parse(inputJSON);
      const minified = JSON.stringify(parsed);
      setFormattedJSON(minified);
      setIsValid(true);
      setError('');
    } catch (err) {
      setIsValid(false);
      setError((err as Error).message);
      setFormattedJSON('');
    }
  };

  const copyToClipboard = async () => {
    if (formattedJSON) {
      await navigator.clipboard.writeText(formattedJSON);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadJSON = () => {
    if (formattedJSON) {
      const blob = new Blob([formattedJSON], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'formatted.json';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const loadSampleJSON = () => {
    const sampleData = {
      users: [
        {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          address: {
            street: "123 Main St",
            city: "New York",
            zipcode: "10001"
          },
          active: true
        },
        {
          id: 2,
          name: "Jane Smith",
          email: "jane@example.com",
          address: {
            street: "456 Oak Ave",
            city: "Los Angeles",
            zipcode: "90210"
          },
          active: false
        }
      ]
    };
    setInputJSON(JSON.stringify(sampleData));
  };

  React.useEffect(() => {
    if (inputJSON) {
      formatJSON();
    }
  }, [inputJSON, indentSize]);

  return (
    <>
      <Helmet>
        <title>Free JSON Formatter & Validator - Format JSON Online | ConvertFastly</title>
        <meta name="description" content="Free JSON formatter and validator tool. Format, validate, and minify JSON data online. Perfect for developers working with APIs and configuration files." />
        <meta name="keywords" content="JSON formatter, JSON validator, JSON minifier, format JSON, validate JSON, JSON tool, JSON parser, online JSON" />
        <link rel="canonical" href="https://convertfastly.com/json-formatter" />
        <meta property="og:title" content="Free JSON Formatter & Validator - Format JSON Online" />
        <meta property="og:description" content="Free JSON formatter and validator tool. Format, validate, and minify JSON data online. Perfect for developers working with APIs." />
        <meta property="og:url" content="https://convertfastly.com/json-formatter" />
      </Helmet>
    <div className="bg-white rounded-xl shadow-lg p-8">
      {showDisruption && (
        <ToolDisruptionNotice 
          toolName="JSON Formatter"
          onDismiss={() => setShowDisruption(false)}
        />
      )}
      
      <div className="flex items-center space-x-3 mb-6">
        <FileText className="h-8 w-8 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">JSON Formatter & Validator</h2>
      </div>

      <p className="text-gray-600 mb-8">
        Format, validate, and minify JSON data. Perfect for developers working with APIs and configuration files.
      </p>

      <div className="space-y-6">
        {/* Controls */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Indent:</label>
            <select
              value={indentSize}
              onChange={(e) => setIndentSize(parseInt(e.target.value))}
              className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value={2}>2 spaces</option>
              <option value={4}>4 spaces</option>
              <option value={8}>8 spaces</option>
            </select>
          </div>

          <button
            onClick={formatJSON}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            Format
          </button>

          <button
            onClick={minifyJSON}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
          >
            Minify
          </button>

          <button
            onClick={loadSampleJSON}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
          >
            Load Sample
          </button>
        </div>

        {/* Validation Status */}
        <div className={`flex items-center space-x-2 p-3 rounded-lg ${
          isValid ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        }`}>
          {isValid ? <Check className="h-5 w-5" /> : <X className="h-5 w-5" />}
          <span className="font-medium">
            {isValid ? 'Valid JSON' : 'Invalid JSON'}
          </span>
          {error && <span className="text-sm">: {error}</span>}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">Input JSON</label>
              <span className="text-xs text-gray-500">{inputJSON.length} characters</span>
            </div>
            <textarea
              value={inputJSON}
              onChange={(e) => setInputJSON(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
              rows={15}
              placeholder="Paste your JSON here..."
            />
          </div>

          {/* Output */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">Formatted JSON</label>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500">{formattedJSON.length} characters</span>
                {formattedJSON && (
                  <>
                    <button
                      onClick={copyToClipboard}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                    <button
                      onClick={downloadJSON}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className="relative">
              <textarea
                value={formattedJSON}
                readOnly
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 resize-none font-mono text-sm"
                rows={15}
                placeholder="Formatted JSON will appear here..."
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
            disabled={!formattedJSON}
            className="flex items-center space-x-2 mx-auto px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowRightLeft className="h-5 w-5" />
            <span>Use Output as Input</span>
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default JSONFormatter;