import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, TrendingUp, BarChart3, Globe, Download, Copy, Star } from 'lucide-react';
import LoadingSpinner from '../Common/LoadingSpinner';
import { useToolTracking } from '../../hooks/useToolTracking';
import PromotionRequestForm from '../Common/PromotionRequestForm';

interface KeywordData {
  keyword: string;
  searchVolume: number;
  difficulty: number;
  cpc: number;
  competition: 'Low' | 'Medium' | 'High';
  trend: 'up' | 'down' | 'stable';
}

const KeywordResearch: React.FC = () => {
  useToolTracking('keyword-research');

  const [seedKeyword, setSeedKeyword] = useState<string>('');
  const [keywords, setKeywords] = useState<KeywordData[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<string>('US');
  const [language, setLanguage] = useState<string>('en');
  const [copied, setCopied] = useState<boolean>(false);

  const countries = [
    { code: 'US', name: 'United States' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'CA', name: 'Canada' },
    { code: 'AU', name: 'Australia' },
    { code: 'DE', name: 'Germany' },
    { code: 'FR', name: 'France' },
    { code: 'ES', name: 'Spain' },
    { code: 'IT', name: 'Italy' },
    { code: 'IN', name: 'India' },
    { code: 'BR', name: 'Brazil' }
  ];

  const generateMockKeywords = (seed: string): KeywordData[] => {
    const variations = [
      `${seed}`,
      `${seed} tool`,
      `${seed} online`,
      `free ${seed}`,
      `${seed} generator`,
      `best ${seed}`,
      `${seed} software`,
      `${seed} app`,
      `${seed} website`,
      `how to ${seed}`,
      `${seed} tutorial`,
      `${seed} guide`,
      `${seed} tips`,
      `${seed} examples`,
      `${seed} free online`
    ];

    return variations.map(keyword => ({
      keyword,
      searchVolume: Math.floor(Math.random() * 50000) + 100,
      difficulty: Math.floor(Math.random() * 100),
      cpc: Math.random() * 5 + 0.1,
      competition: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)] as 'Low' | 'Medium' | 'High',
      trend: ['up', 'down', 'stable'][Math.floor(Math.random() * 3)] as 'up' | 'down' | 'stable'
    }));
  };

  const analyzeKeywords = async () => {
    if (!seedKeyword.trim()) return;

    setIsAnalyzing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const mockData = generateMockKeywords(seedKeyword);
    setKeywords(mockData);
    setIsAnalyzing(false);
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty < 30) return 'text-green-600 bg-green-100';
    if (difficulty < 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getCompetitionColor = (competition: string) => {
    switch (competition) {
      case 'Low': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'High': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      default: return '➡️';
    }
  };

  const exportKeywords = () => {
    const csvContent = [
      'Keyword,Search Volume,Difficulty,CPC,Competition,Trend',
      ...keywords.map(k => `"${k.keyword}",${k.searchVolume},${k.difficulty},$${k.cpc.toFixed(2)},${k.competition},${k.trend}`)
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `keyword-research-${seedKeyword}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyAllKeywords = async () => {
    const keywordList = keywords.map(k => k.keyword).join('\n');
    await navigator.clipboard.writeText(keywordList);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Helmet>
        <title>Free SEO Keyword Research Tool - Find Keywords & Search Volume | ConvertFastly</title>
        <meta name="description" content="Free SEO keyword research tool. Find high-volume, low-competition keywords for your content strategy. Get search volume, difficulty scores, and keyword suggestions." />
        <meta name="keywords" content="keyword research, SEO keywords, search volume, keyword difficulty, keyword planner, SEO tool, keyword finder, content strategy" />
        <link rel="canonical" href="https://convertfastly.com/keyword-research" />
        <meta property="og:title" content="Free SEO Keyword Research Tool - Find Keywords & Search Volume" />
        <meta property="og:description" content="Discover high-value keywords for your SEO strategy. Free keyword research with search volume and competition data." />
        <meta property="og:url" content="https://convertfastly.com/keyword-research" />
      </Helmet>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center space-x-3 mb-6">
          <Search className="h-8 w-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">SEO Keyword Research Tool</h2>
        </div>

        <p className="text-gray-600 mb-8">
          Discover high-value keywords for your SEO strategy. Get search volume, competition data, and keyword suggestions to boost your content performance.
        </p>

        <div className="space-y-8">
          {/* Input Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Seed Keyword
              </label>
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={seedKeyword}
                  onChange={(e) => setSeedKeyword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && analyzeKeywords()}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your main keyword (e.g., 'password generator')"
                />
                <button
                  onClick={analyzeKeywords}
                  disabled={isAnalyzing || !seedKeyword.trim()}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isAnalyzing ? (
                    <LoadingSpinner size="sm" color="white" />
                  ) : (
                    <Search className="h-5 w-5" />
                  )}
                  <span>Analyze</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {countries.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results */}
          {keywords.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">
                  Keyword Suggestions ({keywords.length})
                </h3>
                <div className="flex space-x-3">
                  <button
                    onClick={copyAllKeywords}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Copy className="h-4 w-4" />
                    <span>Copy All</span>
                  </button>
                  <button
                    onClick={exportKeywords}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              {copied && (
                <div className="text-center text-green-600 font-medium">
                  All keywords copied to clipboard! ✓
                </div>
              )}

              {/* Keywords Table */}
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Keyword
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Search Volume
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Difficulty
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        CPC
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Competition
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Trend
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {keywords.map((keyword, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="text-sm font-medium text-gray-900">{keyword.keyword}</span>
                            <button
                              onClick={() => navigator.clipboard.writeText(keyword.keyword)}
                              className="ml-2 text-gray-400 hover:text-gray-600"
                            >
                              <Copy className="h-3 w-3" />
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-900">
                            {keyword.searchVolume.toLocaleString()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getDifficultyColor(keyword.difficulty)}`}>
                            {keyword.difficulty}%
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${keyword.cpc.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCompetitionColor(keyword.competition)}`}>
                            {keyword.competition}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {getTrendIcon(keyword.trend)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                What You Get
              </h4>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>• Monthly search volume data</li>
                <li>• Keyword difficulty scores</li>
                <li>• Cost-per-click estimates</li>
                <li>• Competition analysis</li>
                <li>• Search trend indicators</li>
                <li>• Related keyword suggestions</li>
              </ul>
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <h4 className="font-semibold text-green-900 mb-3">Perfect For</h4>
              <ul className="space-y-2 text-sm text-green-800">
                <li>• Content creators and bloggers</li>
                <li>• SEO professionals and agencies</li>
                <li>• Digital marketers</li>
                <li>• E-commerce businesses</li>
                <li>• Website owners and developers</li>
                <li>• PPC campaign planning</li>
              </ul>
            </div>
          </div>

          {/* Promotion Request Form */}
          <PromotionRequestForm />
        </div>
      </div>
    </>
  );
};

export default KeywordResearch;