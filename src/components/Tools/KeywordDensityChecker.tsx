import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { BarChart3, FileText, TrendingUp, Hash, Upload, Globe } from 'lucide-react';
import { useToolTracking } from '../../hooks/useToolTracking';

interface KeywordData {
  keyword: string;
  count: number;
  density: number;
  length: number;
}

const KeywordDensityChecker: React.FC = () => {
  useToolTracking('keyword-density-checker');

  const [inputText, setInputText] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [inputMode, setInputMode] = useState<'text' | 'url'>('text');
  const [keywords, setKeywords] = useState<KeywordData[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [wordCount, setWordCount] = useState<number>(0);
  const [characterCount, setCharacterCount] = useState<number>(0);

  const analyzeKeywordDensity = () => {
    if (!inputText.trim()) return;

    setIsAnalyzing(true);
    
    // Clean and process text
    const cleanText = inputText.toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    
    const words = cleanText.split(' ').filter(word => word.length > 0);
    const totalWords = words.length;
    
    setWordCount(totalWords);
    setCharacterCount(inputText.length);

    // Count keyword occurrences
    const keywordCounts: { [key: string]: number } = {};
    
    // Single words
    words.forEach(word => {
      if (word.length >= 3) { // Only count words with 3+ characters
        keywordCounts[word] = (keywordCounts[word] || 0) + 1;
      }
    });

    // Two-word phrases
    for (let i = 0; i < words.length - 1; i++) {
      const phrase = `${words[i]} ${words[i + 1]}`;
      if (words[i].length >= 3 && words[i + 1].length >= 3) {
        keywordCounts[phrase] = (keywordCounts[phrase] || 0) + 1;
      }
    }

    // Three-word phrases
    for (let i = 0; i < words.length - 2; i++) {
      const phrase = `${words[i]} ${words[i + 1]} ${words[i + 2]}`;
      if (words[i].length >= 3 && words[i + 1].length >= 3 && words[i + 2].length >= 3) {
        keywordCounts[phrase] = (keywordCounts[phrase] || 0) + 1;
      }
    }

    // Convert to array and calculate density
    const keywordData: KeywordData[] = Object.entries(keywordCounts)
      .map(([keyword, count]) => ({
        keyword,
        count,
        density: (count / totalWords) * 100,
        length: keyword.split(' ').length
      }))
      .filter(item => item.count >= 2) // Only show keywords that appear at least twice
      .sort((a, b) => b.density - a.density)
      .slice(0, 50); // Top 50 keywords

    setKeywords(keywordData);
    setIsAnalyzing(false);
  };

  const getDensityColor = (density: number) => {
    if (density > 5) return 'text-red-600 bg-red-100';
    if (density > 2) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  const getDensityStatus = (density: number) => {
    if (density > 5) return 'Too High';
    if (density > 2) return 'Optimal';
    return 'Low';
  };

  const loadSampleText = () => {
    const sampleText = `SEO optimization is crucial for website success. Search engine optimization helps websites rank better in search results. When implementing SEO strategies, focus on keyword research, content optimization, and technical SEO. Good SEO practices include optimizing meta tags, improving page speed, and creating quality content. SEO tools can help analyze your website's performance and identify optimization opportunities. Remember that SEO is a long-term strategy that requires consistent effort and monitoring.`;
    setInputText(sampleText);
  };

  const filterByLength = (length: number) => {
    return keywords.filter(k => k.length === length);
  };

  React.useEffect(() => {
    if (inputText.trim()) {
      const debounceTimer = setTimeout(() => {
        analyzeKeywordDensity();
      }, 500);
      
      return () => clearTimeout(debounceTimer);
    } else {
      setKeywords([]);
      setWordCount(0);
      setCharacterCount(0);
    }
  }, [inputText]);

  return (
    <>
      <Helmet>
        <title>Free Keyword Density Checker - Analyze Content Keywords | ConvertFastly</title>
        <meta name="description" content="Check keyword density in your content for SEO optimization. Analyze single words, phrases, and keyword distribution. Free tool for content optimization." />
        <meta name="keywords" content="keyword density checker, keyword analysis, content optimization, SEO analysis, keyword frequency, content SEO tool" />
        <link rel="canonical" href="https://convertfastly.com/keyword-density-checker" />
        <meta property="og:title" content="Free Keyword Density Checker - Analyze Content Keywords" />
        <meta property="og:description" content="Analyze keyword density and optimize your content for better SEO performance." />
        <meta property="og:url" content="https://convertfastly.com/keyword-density-checker" />
      </Helmet>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center space-x-3 mb-6">
          <BarChart3 className="h-8 w-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Keyword Density Checker</h2>
        </div>

        <p className="text-gray-600 mb-8">
          Analyze keyword density in your content for SEO optimization. Check single words, phrases, and overall keyword distribution.
        </p>

        <div className="space-y-8">
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
                    <label className="text-sm font-medium text-gray-700">Content to Analyze</label>
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
                    placeholder="Paste your content here to analyze keyword density..."
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    {characterCount} characters • {wordCount} words
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Website URL</label>
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/page"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Enter a URL to extract and analyze content
                  </p>
                </div>
              )}

              {/* Content Stats */}
              {wordCount > 0 && (
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-3">Content Statistics</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-800">Total Words:</span>
                      <span className="font-medium">{wordCount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-800">Characters:</span>
                      <span className="font-medium">{characterCount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-800">Unique Keywords:</span>
                      <span className="font-medium">{keywords.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-800">Reading Time:</span>
                      <span className="font-medium">{Math.ceil(wordCount / 200)} min</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              {keywords.length > 0 && (
                <>
                  {/* Keyword Filters */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Filter by Length</label>
                    <div className="flex space-x-2">
                      {[1, 2, 3].map(length => (
                        <button
                          key={length}
                          className="px-3 py-1 text-sm border border-gray-300 rounded hover:border-blue-300 hover:bg-blue-50"
                        >
                          {length} Word{length > 1 ? 's' : ''} ({filterByLength(length).length})
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Top Keywords */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Keyword Density Analysis</h3>
                    <div className="max-h-96 overflow-y-auto">
                      <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                        <thead className="bg-gray-50 sticky top-0">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Keyword
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Count
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Density
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {keywords.slice(0, 30).map((keyword, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="px-4 py-3">
                                <div className="flex items-center">
                                  <Hash className="h-3 w-3 text-gray-400 mr-2" />
                                  <span className="text-sm font-medium text-gray-900">{keyword.keyword}</span>
                                  <span className={`ml-2 px-1 py-0.5 text-xs rounded ${
                                    keyword.length === 1 ? 'bg-blue-100 text-blue-800' :
                                    keyword.length === 2 ? 'bg-green-100 text-green-800' :
                                    'bg-purple-100 text-purple-800'
                                  }`}>
                                    {keyword.length}w
                                  </span>
                                </div>
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-900">
                                {keyword.count}
                              </td>
                              <td className="px-4 py-3 text-sm font-medium">
                                {keyword.density.toFixed(2)}%
                              </td>
                              <td className="px-4 py-3">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getDensityColor(keyword.density)}`}>
                                  {getDensityStatus(keyword.density)}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Density Guidelines */}
                  <div className="bg-green-50 rounded-lg p-6">
                    <h4 className="font-semibold text-green-900 mb-3 flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2" />
                      SEO Guidelines
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-800">
                      <div>
                        <h5 className="font-medium mb-2">Optimal Density Ranges:</h5>
                        <ul className="space-y-1">
                          <li>• Primary keyword: 1-3%</li>
                          <li>• Secondary keywords: 0.5-1%</li>
                          <li>• Long-tail phrases: 0.1-0.5%</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium mb-2">Best Practices:</h5>
                        <ul className="space-y-1">
                          <li>• Use keywords naturally</li>
                          <li>• Focus on user experience</li>
                          <li>• Include semantic variations</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {!keywords.length && !isAnalyzing && inputText && (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <p>No keywords found. Try adding more content to analyze.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default KeywordDensityChecker;