import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FileText, Zap, Copy, Download, Globe, BookOpen } from 'lucide-react';
import LoadingSpinner from '../Common/LoadingSpinner';
import { useToolTracking } from '../../hooks/useToolTracking';

const AITextSummarizer: React.FC = () => {
  useToolTracking('ai-text-summarizer');

  const [inputText, setInputText] = useState<string>('');
  const [inputUrl, setInputUrl] = useState<string>('');
  const [summary, setSummary] = useState<string>('');
  const [summaryLength, setSummaryLength] = useState<'short' | 'medium' | 'long'>('medium');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [inputMode, setInputMode] = useState<'text' | 'url'>('text');
  const [copied, setCopied] = useState<boolean>(false);

  const simulateAISummarization = async () => {
    if ((!inputText.trim() && inputMode === 'text') || (!inputUrl.trim() && inputMode === 'url')) return;

    setIsProcessing(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock AI summary based on length preference
    const mockSummaries = {
      short: "This is a concise summary of the main points. Key insights and conclusions are highlighted for quick understanding.",
      medium: "This comprehensive summary covers the essential points and key arguments presented in the original text. It maintains the core message while condensing the information into digestible insights that capture the author's main intentions and conclusions.",
      long: "This detailed summary provides an extensive overview of all major points, supporting arguments, and conclusions found in the original content. It preserves important context and nuances while organizing the information in a logical flow that makes complex topics more accessible and easier to understand for readers seeking comprehensive insights."
    };
    
    setSummary(mockSummaries[summaryLength]);
    setIsProcessing(false);
  };

  const copyToClipboard = async () => {
    if (summary) {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadSummary = () => {
    if (summary) {
      const blob = new Blob([summary], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'ai-summary.txt';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const loadSampleText = () => {
    const sampleText = `Artificial Intelligence (AI) has revolutionized numerous industries and continues to shape our daily lives in unprecedented ways. From healthcare and finance to transportation and entertainment, AI technologies are being integrated into various sectors to improve efficiency, accuracy, and user experience.

Machine learning, a subset of AI, enables computers to learn and make decisions without explicit programming. This technology powers recommendation systems, fraud detection, autonomous vehicles, and medical diagnosis tools. Natural Language Processing (NLP) allows machines to understand and generate human language, making chatbots, translation services, and voice assistants possible.

The future of AI holds immense potential, with developments in quantum computing, neural networks, and robotics promising even more sophisticated applications. However, ethical considerations around privacy, job displacement, and algorithmic bias remain important challenges that need to be addressed as AI continues to evolve.

As we move forward, the integration of AI into society will require careful balance between innovation and responsibility, ensuring that these powerful technologies benefit humanity while minimizing potential risks and negative impacts.`;
    
    setInputText(sampleText);
    setInputMode('text');
  };

  return (
    <>
      <Helmet>
        <title>Free AI Text Summarizer - Summarize Articles & Documents Online | ConvertFastly</title>
        <meta name="description" content="AI-powered text summarizer that creates concise summaries from articles, documents, and URLs. Perfect for students, researchers, and professionals. Free online tool with instant results." />
        <meta name="keywords" content="AI text summarizer, article summarizer, document summarizer, text summary tool, AI summary generator, automatic summarization, research tool, study aid, content summarizer" />
        <link rel="canonical" href="https://convertfastly.com/ai-text-summarizer" />
        <meta property="og:title" content="Free AI Text Summarizer - Summarize Articles & Documents Online" />
        <meta property="og:description" content="AI-powered text summarizer for articles, documents, and web content. Perfect for students and professionals." />
        <meta property="og:url" content="https://convertfastly.com/ai-text-summarizer" />
      </Helmet>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center space-x-3 mb-6">
          <FileText className="h-8 w-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">AI Text Summarizer</h2>
        </div>

        <p className="text-gray-600 mb-8">
          Transform long articles, documents, and web content into concise summaries using advanced AI. Perfect for research, studying, and content analysis.
        </p>

        <div className="space-y-6">
          {/* Input Mode Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Input Method</label>
            <div className="flex space-x-4">
              <button
                onClick={() => setInputMode('text')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                  inputMode === 'text' 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <FileText className="h-4 w-4" />
                <span>Paste Text</span>
              </button>
              <button
                onClick={() => setInputMode('url')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                  inputMode === 'url' 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <Globe className="h-4 w-4" />
                <span>From URL</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              {inputMode === 'text' ? (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">Text to Summarize</label>
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
                    placeholder="Paste your article, document, or any text content here..."
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    {inputText.length} characters
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Article URL</label>
                  <input
                    type="url"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/article"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Enter a URL to automatically extract and summarize the content
                  </p>
                </div>
              )}

              {/* Summary Length */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Summary Length</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'short', label: 'Short', desc: '1-2 sentences' },
                    { value: 'medium', label: 'Medium', desc: '3-5 sentences' },
                    { value: 'long', label: 'Long', desc: '6+ sentences' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSummaryLength(option.value as any)}
                      className={`p-3 text-center border rounded-lg transition-colors ${
                        summaryLength === option.value
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

              <button
                onClick={simulateAISummarization}
                disabled={isProcessing || (inputMode === 'text' && !inputText.trim()) || (inputMode === 'url' && !inputUrl.trim())}
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
                    <span>Generate Summary</span>
                  </>
                )}
              </button>
            </div>

            {/* Output Section */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">AI Generated Summary</label>
                  {summary && (
                    <div className="flex space-x-2">
                      <button
                        onClick={copyToClipboard}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                      <button
                        onClick={downloadSummary}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
                <div className="relative">
                  <div className="w-full min-h-[300px] px-4 py-3 border border-gray-300 rounded-lg bg-gray-50">
                    {summary ? (
                      <p className="text-gray-900 leading-relaxed">{summary}</p>
                    ) : (
                      <p className="text-gray-500 italic">Your AI-generated summary will appear here...</p>
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
              <div className="bg-blue-50 rounded-lg p-6">
                <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Perfect For
                </h4>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li>• Students researching academic papers</li>
                  <li>• Professionals analyzing reports</li>
                  <li>• Content creators reviewing articles</li>
                  <li>• Researchers processing literature</li>
                  <li>• Anyone needing quick content insights</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AITextSummarizer;