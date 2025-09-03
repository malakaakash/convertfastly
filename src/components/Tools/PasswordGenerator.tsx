import React, { useState } from 'react';
import { Key, Copy, RefreshCw, Check } from 'lucide-react';
import EngagementPopup from '../Common/EngagementPopup';

const PasswordGenerator: React.FC = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    excludeSimilar: false
  });
  const [copied, setCopied] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [strength, setStrength] = useState({ score: 0, text: '', color: '' });

  const generatePassword = () => {
    let charset = '';
    
    if (options.lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (options.uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (options.numbers) charset += '0123456789';
    if (options.symbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    if (options.excludeSimilar) {
      charset = charset.replace(/[il1Lo0O]/g, '');
    }

    if (!charset) {
      alert('Please select at least one character type.');
      return;
    }

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    
    setPassword(newPassword);
    calculateStrength(newPassword);
    setCopied(false);
    
    // Show popup after generating a few passwords
    if (Math.random() > 0.7) {
      setShowPopup(true);
    }
  };

  const calculateStrength = (pwd: string) => {
    let score = 0;
    
    // Length bonus
    if (pwd.length >= 8) score += 1;
    if (pwd.length >= 12) score += 1;
    if (pwd.length >= 16) score += 1;
    
    // Character variety
    if (/[a-z]/.test(pwd)) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;
    
    let strengthData = { score: 0, text: '', color: '' };
    
    if (score <= 2) {
      strengthData = { score: 1, text: 'Weak', color: 'text-red-600' };
    } else if (score <= 4) {
      strengthData = { score: 2, text: 'Fair', color: 'text-yellow-600' };
    } else if (score <= 6) {
      strengthData = { score: 3, text: 'Good', color: 'text-blue-600' };
    } else {
      strengthData = { score: 4, text: 'Strong', color: 'text-green-600' };
    }
    
    setStrength(strengthData);
  };

  const copyToClipboard = async () => {
    if (!password) return;
    
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy password:', err);
    }
  };

  const handleOptionChange = (option: keyof typeof options) => {
    setOptions(prev => ({ ...prev, [option]: !prev[option] }));
  };

  React.useEffect(() => {
    document.title = 'Password Generator - ConvertFastly';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Generate secure passwords online. Customize length and character types for maximum security.');
    }
    
    // Generate initial password
    generatePassword();
  }, []);

  React.useEffect(() => {
    if (password) {
      calculateStrength(password);
    }
  }, [password, options, length]);

  const strengthBars = Array.from({ length: 4 }, (_, i) => (
    <div
      key={i}
      className={`h-2 rounded-full ${
        i < strength.score 
          ? strength.score === 1 ? 'bg-red-500' 
            : strength.score === 2 ? 'bg-yellow-500'
            : strength.score === 3 ? 'bg-blue-500'
            : 'bg-green-500'
          : 'bg-gray-200'
      }`}
    />
  ));

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Key className="h-8 w-8 text-indigo-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Password Generator</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Generate secure, random passwords with customizable options. Keep your accounts safe with strong passwords.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border p-8">
        {/* Generated Password Display */}
        <div className="mb-8">
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between">
              <input
                type="text"
                value={password}
                readOnly
                className="flex-1 bg-transparent text-lg font-mono text-gray-900 outline-none"
                placeholder="Click generate to create a password"
              />
              <button
                onClick={copyToClipboard}
                className="ml-4 p-2 text-gray-500 hover:text-indigo-600 transition-colors"
                title="Copy to clipboard"
              >
                {copied ? <Check className="h-5 w-5 text-green-600" /> : <Copy className="h-5 w-5" />}
              </button>
            </div>
          </div>
          
          {password && (
            <div className="flex items-center justify-between">
              <div className="flex space-x-1 flex-1 mr-4">
                {strengthBars}
              </div>
              <span className={`text-sm font-medium ${strength.color}`}>
                {strength.text}
              </span>
            </div>
          )}
        </div>

        {/* Password Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Password Length</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Length: {length} characters
                </label>
                <input
                  type="range"
                  min="4"
                  max="50"
                  value={length}
                  onChange={(e) => setLength(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>4</span>
                  <span>50</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Character Types</h3>
            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={options.uppercase}
                  onChange={() => handleOptionChange('uppercase')}
                  className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-700">Uppercase Letters (A-Z)</span>
              </label>
              
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={options.lowercase}
                  onChange={() => handleOptionChange('lowercase')}
                  className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-700">Lowercase Letters (a-z)</span>
              </label>
              
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={options.numbers}
                  onChange={() => handleOptionChange('numbers')}
                  className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-700">Numbers (0-9)</span>
              </label>
              
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={options.symbols}
                  onChange={() => handleOptionChange('symbols')}
                  className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-700">Symbols (!@#$%^&*)</span>
              </label>
              
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={options.excludeSimilar}
                  onChange={() => handleOptionChange('excludeSimilar')}
                  className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-700">Exclude Similar Characters (i, l, 1, L, o, 0, O)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <div className="text-center mt-8">
          <button
            onClick={generatePassword}
            className="inline-flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            <RefreshCw className="h-5 w-5" />
            <span>Generate New Password</span>
          </button>
        </div>

        {/* Security Tips */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h4 className="font-semibold text-blue-900 mb-3">Password Security Tips:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Use a unique password for each account</li>
            <li>• Include a mix of uppercase, lowercase, numbers, and symbols</li>
            <li>• Avoid using personal information in passwords</li>
            <li>• Consider using a password manager to store your passwords securely</li>
            <li>• Change passwords regularly, especially for important accounts</li>
          </ul>
        </div>
      </div>

      <EngagementPopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        type="email"
      />
    </div>
  );
};

export default PasswordGenerator;