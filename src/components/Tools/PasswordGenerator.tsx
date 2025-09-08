import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Lock, Copy, RefreshCw, Shield, Eye, EyeOff } from 'lucide-react';
import { useToolTracking } from '../../hooks/useToolTracking';
import SuccessAdModal from '../Common/SuccessAdModal';
import ToolDisruptionNotice from '../Common/ToolDisruptionNotice';

const PasswordGenerator: React.FC = () => {
  useToolTracking('password-generator');

  const [password, setPassword] = useState<string>('');
  const [length, setLength] = useState<number>(16);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [showSuccessAd, setShowSuccessAd] = useState<boolean>(false);
  const [showDisruption, setShowDisruption] = useState<boolean>(true);

  const generatePassword = () => {
    let charset = '';
    
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (charset === '') {
      alert('Please select at least one character type');
      return;
    }

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    setPassword(newPassword);
    setShowSuccessAd(true);
  };

  const copyToClipboard = async () => {
    if (password) {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getPasswordStrength = (): { level: string; color: string; score: number } => {
    let score = 0;
    if (length >= 8) score++;
    if (length >= 12) score++;
    if (includeUppercase) score++;
    if (includeLowercase) score++;
    if (includeNumbers) score++;
    if (includeSymbols) score++;

    if (score <= 2) return { level: 'Weak', color: 'text-red-600', score };
    if (score <= 4) return { level: 'Medium', color: 'text-yellow-600', score };
    return { level: 'Strong', color: 'text-green-600', score };
  };

  React.useEffect(() => {
    generatePassword();
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  const strength = getPasswordStrength();

  return (
    <>
      <Helmet>
        <title>Free Password Generator - Create Secure Passwords Online | ConvertFastly</title>
        <meta name="description" content="Generate strong, secure passwords with our free online password generator. Customize length, characters, and complexity. No registration required. Create passwords instantly." />
        <meta name="keywords" content="password generator, secure password, strong password, random password, password creator, online password generator, free password tool" />
        <link rel="canonical" href="https://convertfastly.com/password-generator" />
        <meta property="og:title" content="Free Password Generator - Create Secure Passwords Online" />
        <meta property="og:description" content="Generate strong, secure passwords with customizable options. Free online tool with no registration required." />
        <meta property="og:url" content="https://convertfastly.com/password-generator" />
      </Helmet>
    <div className="bg-white rounded-xl shadow-lg p-8">
      {showDisruption && (
        <ToolDisruptionNotice 
          toolName="Password Generator"
          onDismiss={() => setShowDisruption(false)}
        />
      )}
      
      <div className="flex items-center space-x-3 mb-6">
        <Lock className="h-8 w-8 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">Password Generator</h2>
      </div>

      <p className="text-gray-600 mb-6">
        Generate secure passwords with customizable options. Keep your accounts safe with strong, unique passwords.
      </p>

      <div className="space-y-6">
        {/* Generated Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Generated Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              readOnly
              className="w-full px-4 py-3 pr-24 border border-gray-300 rounded-lg bg-gray-50 font-mono text-sm"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-2">
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
              <button
                onClick={copyToClipboard}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <Copy className="h-5 w-5" />
              </button>
            </div>
          </div>
          {copied && (
            <p className="text-sm text-green-600 mt-1">Password copied to clipboard! ✓</p>
          )}
        </div>

        {/* Password Strength */}
        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
          <Shield className={`h-6 w-6 ${strength.color}`} />
          <div>
            <span className="text-sm font-medium text-gray-700">Password Strength: </span>
            <span className={`font-bold ${strength.color}`}>{strength.level}</span>
          </div>
          <div className="flex-1 ml-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  strength.level === 'Weak' ? 'bg-red-500' :
                  strength.level === 'Medium' ? 'bg-yellow-500' :
                  'bg-green-500'
                }`}
                style={{ width: `${(strength.score / 6) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Length Setting */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password Length: {length}
          </label>
          <input
            type="range"
            min="4"
            max="50"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>4</span>
            <span>50</span>
          </div>
        </div>

        {/* Character Type Options */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Include Characters
          </label>
          <div className="space-y-3">
            {[
              { id: 'uppercase', label: 'Uppercase Letters (A-Z)', checked: includeUppercase, onChange: setIncludeUppercase },
              { id: 'lowercase', label: 'Lowercase Letters (a-z)', checked: includeLowercase, onChange: setIncludeLowercase },
              { id: 'numbers', label: 'Numbers (0-9)', checked: includeNumbers, onChange: setIncludeNumbers },
              { id: 'symbols', label: 'Symbols (!@#$%^&*)', checked: includeSymbols, onChange: setIncludeSymbols },
            ].map((option) => (
              <div key={option.id} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id={option.id}
                  checked={option.checked}
                  onChange={(e) => option.onChange(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor={option.id} className="text-sm text-gray-700">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={generatePassword}
          className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <RefreshCw className="h-5 w-5" />
          <span>Generate New Password</span>
        </button>
      </div>
      
      <SuccessAdModal 
        isOpen={showSuccessAd}
        onClose={() => setShowSuccessAd(false)}
        toolName="Password Generator"
      />
    </div>
    </>
  );
};

export default PasswordGenerator;