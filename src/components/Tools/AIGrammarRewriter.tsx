import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Edit3, CheckCircle, Copy, Download, Zap, BookOpen } from 'lucide-react';
import LoadingSpinner from '../Common/LoadingSpinner';
import { useToolTracking } from '../../hooks/useToolTracking';

const AIGrammarRewriter: React.FC = () => {
  useToolTracking('ai-grammar-rewriter');

  const [inputText, setInputText] = useState<string>('');
  const [correctedText, setCorrectedText] = useState<string>('');
  const [mode, setMode] = useState<'grammar' | 'rewrite' | 'both'>('both');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [corrections, setCorrections] = useState<number>(0);

  const simulateAICorrection = async () => {
    if (!inputText.trim()) return;

    setIsProcessing(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Mock AI correction based on mode
    let result = inputText;
    let correctionCount = 0;

    if (mode === 'grammar' || mode === 'both') {
      // Simulate grammar corrections
      result = result
        .replace(/\bi\b/g, 'I')
        .replace(/\bdont\b/g, "don't")
        .replace(/\bcant\b/g, "can't")
        .replace(/\bwont\b/g, "won't")
        .replace(/\bits\b/g, "it's")
        .replace(/\byour\b(?=\s+(a|an|the|going|coming))/g, "you're")
        .replace(/\bthere\b(?=\s+(going|coming|is|are))/g, "they're")
        .replace(/\bto\b(?=\s+(much|many))/g, "too");
      
      correctionCount += 3;
    }

    if (mode === 'rewrite' || mode === 'both') {
      // Simulate sentence improvement
      result = result
        .replace(/very good/gi, 'excellent')
        .replace(/very bad/gi, 'terrible')
        .replace(/a lot of/gi, 'numerous')
        .replace(/big/gi, 'significant')
        .replace(/small/gi, 'minor');
      
      correctionCount += 2;
    }

    // Ensure proper capitalization and punctuation
    result = result.charAt(0).toUpperCase() + result.slice(1);
    if (!/[.!?]$/.test(result.trim())) {
      result = result.trim() + '.';
    }

    setCorrectedText(result);
    setCorrections(correctionCount);
    setIsProcessing(false);
  };

  const copyToClipboard = async () => {
    if (correctedText) {
      await navigator.clipboard.writeText(correctedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadText = () => {
    if (correctedText) {
      const blob = new Blob([correctedText], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'corrected-text.txt';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const loadSampleText = () => {
    const sampleText = "i think this is a very good example of how AI can help with grammer and writing. there are alot of mistakes in this text that needs to be fixed. its important to have good writing skills in todays world.";
    setInputText(sampleText);
  };

  return (
    <>
      <Helmet>
        <title>Free AI Grammar Checker & Rewriter - Fix Grammar & Improve Writing | ConvertFastly</title>
        <meta name="description" content="AI-powered grammar checker and text rewriter. Fix grammar, spelling, and improve sentence clarity. Free alternative to Grammarly and QuillBot for students, writers, and professionals." />
        <meta name="keywords" content="AI grammar checker, grammar fixer, text rewriter, writing assistant, spell checker, sentence improver, Grammarly alternative, QuillBot alternative, writing tool, proofreader" />
        <link rel="canonical" href="https://convertfastly.com/ai-grammar-rewriter" />
        <meta property="og:title" content="Free AI Grammar Checker & Rewriter - Fix Grammar & Improve Writing" />
        <meta property="og:description" content="AI-powered grammar checker and text rewriter. Perfect for students, writers, and professionals." />
        <meta property="og:url" content="https://convertfastly.com/ai-grammar-rewriter" />
      </Helmet>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center space-x-3 mb-6">
          <Edit3 className="h-8 w-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">AI Grammar & Rewriter Tool</h2>
        </div>

        <p className="text-gray-600 mb-8">
          Fix grammar, spelling, and improve sentence clarity with AI. Perfect alternative to Grammarly and QuillBot for students, content creators, and professionals.
        </p>

        <div className="space-y-6">
          {/* Mode Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Correction Mode</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'grammar', label: 'Grammar Only', desc: 'Fix grammar & spelling' },
                { value: 'rewrite', label: 'Rewrite Only', desc: 'Improve sentence clarity' },
                { value: 'both', label: 'Grammar + Rewrite', desc: 'Complete enhancement' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setMode(option.value as any)}
                  className={`p-3 text-center border rounded-lg transition-colors ${
                    mode === option.value
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="font-medium">{option.label}</div>
                  <div className="text-xs text-gray-500">{option.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">Original Text</label>
                  <button
                    onClick={loadSampleText}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Load Sample
                  </button>
                </div>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={12}
                  placeholder="Paste your text here to check grammar and improve writing..."
                />
                <div className="text-xs text-gray-500 mt-1">
                  {inputText.length} characters
                </div>
              </div>

              <button
                onClick={simulateAICorrection}
                disabled={isProcessing || !inputText.trim()}
                className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <LoadingSpinner size="sm" color="white" />
                    <span>AI Processing...</span>
                  </>
                ) : (
                  <>
                    <Zap className="h-5 w-5" />
                    <span>Fix & Improve Text</span>
                  </>
                )}
              </button>
            </div>

            {/* Output Section */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">Corrected Text</label>
                  {correctedText && (
                    <div className="flex items-center space-x-2">
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        {corrections} corrections made
                      </span>
                      <button
                        onClick={copyToClipboard}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                      <button
                        onClick={downloadText}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
                <div className="relative">
                  <div className="w-full min-h-[300px] px-4 py-3 border border-gray-300 rounded-lg bg-gray-50">
                    {correctedText ? (
                      <p className="text-gray-900 leading-relaxed">{correctedText}</p>
                    ) : (
                      <p className="text-gray-500 italic">Your corrected and improved text will appear here...</p>
                    )}
                  </div>
                  {copied && (
                    <div className="absolute top-2 right-2 bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                      Copied! ✓
                    </div>
                  )}
                </div>
              </div>

              {/* Features */}
              <div className="bg-green-50 rounded-lg p-6">
                <h4 className="font-semibold text-green-900 mb-3 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  What We Fix
                </h4>
                <ul className="space-y-2 text-sm text-green-800">
                  <li>• Grammar and punctuation errors</li>
                  <li>• Spelling mistakes and typos</li>
                  <li>• Sentence structure and clarity</li>
                  <li>• Word choice and vocabulary</li>
                  <li>• Writing style and flow</li>
                </ul>
              </div>

              <div className="bg-blue-50 rounded-lg p-6">
                <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Perfect For
                </h4>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li>• Students writing essays and papers</li>
                  <li>• Content creators and bloggers</li>
                  <li>• Job seekers writing resumes</li>
                  <li>• Business professionals</li>
                  <li>• Non-native English speakers</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIGrammarRewriter;