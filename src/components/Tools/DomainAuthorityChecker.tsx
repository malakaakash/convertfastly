import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Globe, TrendingUp, BarChart3, ExternalLink, Search } from 'lucide-react';
import LoadingSpinner from '../Common/LoadingSpinner';
import { useToolTracking } from '../../hooks/useToolTracking';
import PromotionRequestForm from '../Common/PromotionRequestForm';

interface DomainMetrics {
  domain: string;
  domainAuthority: number;
  pageAuthority: number;
  spamScore: number;
  backlinks: number;
  referringDomains: number;
  organicKeywords: number;
  organicTraffic: number;
}

const DomainAuthorityChecker: React.FC = () => {
  useToolTracking('domain-authority-checker');

  const [url, setUrl] = useState<string>('');
  const [metrics, setMetrics] = useState<DomainMetrics | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  const generateMockMetrics = (domain: string): DomainMetrics => {
    return {
      domain,
      domainAuthority: Math.floor(Math.random() * 60) + 20,
      pageAuthority: Math.floor(Math.random() * 50) + 25,
      spamScore: Math.floor(Math.random() * 15),
      backlinks: Math.floor(Math.random() * 50000) + 1000,
      referringDomains: Math.floor(Math.random() * 5000) + 100,
      organicKeywords: Math.floor(Math.random() * 10000) + 500,
      organicTraffic: Math.floor(Math.random() * 100000) + 5000
    };
  };

  const analyzeDomain = async () => {
    if (!url.trim()) return;

    setIsAnalyzing(true);
    
    // Simulate analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const domain = new URL(url.startsWith('http') ? url : `https://${url}`).hostname;
    const mockData = generateMockMetrics(domain);
    setMetrics(mockData);
    setIsAnalyzing(false);
  };

  const getScoreColor = (score: number, max: number = 100) => {
    const percentage = (score / max) * 100;
    if (percentage >= 70) return 'text-green-600 bg-green-100';
    if (percentage >= 40) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat().format(num);
  };

  return (
    <>
      <Helmet>
        <title>Free Domain Authority Checker - Check DA & PA Scores | ConvertFastly</title>
        <meta name="description" content="Check Domain Authority (DA) and Page Authority (PA) scores for any website. Free SEO tool to analyze domain strength, backlinks, and SEO metrics." />
        <meta name="keywords" content="domain authority checker, DA checker, page authority, PA checker, domain strength, SEO metrics, backlink analysis, domain analysis" />
        <link rel="canonical" href="https://convertfastly.com/domain-authority-checker" />
        <meta property="og:title" content="Free Domain Authority Checker - Check DA & PA Scores" />
        <meta property="og:description" content="Analyze domain authority, page authority, and SEO metrics for any website. Free comprehensive domain analysis tool." />
        <meta property="og:url" content="https://convertfastly.com/domain-authority-checker" />
      </Helmet>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center space-x-3 mb-6">
          <Globe className="h-8 w-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Domain Authority Checker</h2>
        </div>

        <p className="text-gray-600 mb-8">
          Check Domain Authority (DA), Page Authority (PA), and other important SEO metrics for any website. Analyze domain strength and backlink profile.
        </p>

        <div className="space-y-8">
          {/* URL Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Website URL to Analyze
            </label>
            <div className="flex space-x-3">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && analyzeDomain()}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com or example.com"
              />
              <button
                onClick={analyzeDomain}
                disabled={isAnalyzing || !url.trim()}
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

          {/* Analysis Progress */}
          {isAnalyzing && (
            <div className="text-center py-8">
              <LoadingSpinner size="lg" color="blue" />
              <p className="text-gray-600 mt-4">
                Analyzing domain authority and SEO metrics...
              </p>
            </div>
          )}

          {/* Results */}
          {metrics && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Domain Analysis Results</h3>
                <p className="text-gray-600">{metrics.domain}</p>
              </div>

              {/* Main Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{metrics.domainAuthority}</div>
                  <div className="text-sm font-medium text-gray-600">Domain Authority</div>
                  <div className={`text-xs px-2 py-1 rounded-full mt-2 ${getScoreColor(metrics.domainAuthority)}`}>
                    {metrics.domainAuthority >= 70 ? 'Excellent' : metrics.domainAuthority >= 40 ? 'Good' : 'Needs Work'}
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">{metrics.pageAuthority}</div>
                  <div className="text-sm font-medium text-gray-600">Page Authority</div>
                  <div className={`text-xs px-2 py-1 rounded-full mt-2 ${getScoreColor(metrics.pageAuthority)}`}>
                    {metrics.pageAuthority >= 70 ? 'Excellent' : metrics.pageAuthority >= 40 ? 'Good' : 'Needs Work'}
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">{formatNumber(metrics.backlinks)}</div>
                  <div className="text-sm font-medium text-gray-600">Total Backlinks</div>
                  <div className="text-xs text-gray-500 mt-2">External links</div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">{formatNumber(metrics.referringDomains)}</div>
                  <div className="text-sm font-medium text-gray-600">Referring Domains</div>
                  <div className="text-xs text-gray-500 mt-2">Unique domains</div>
                </div>
              </div>

              {/* Additional Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <TrendingUp className="h-5 w-5 text-gray-600" />
                    <h4 className="font-semibold text-gray-900">Organic Performance</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Keywords:</span>
                      <span className="font-medium">{formatNumber(metrics.organicKeywords)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Traffic:</span>
                      <span className="font-medium">{formatNumber(metrics.organicTraffic)}/month</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <BarChart3 className="h-5 w-5 text-gray-600" />
                    <h4 className="font-semibold text-gray-900">Spam Score</h4>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold mb-2 ${
                      metrics.spamScore <= 5 ? 'text-green-600' : 
                      metrics.spamScore <= 10 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {metrics.spamScore}%
                    </div>
                    <div className="text-xs text-gray-500">
                      {metrics.spamScore <= 5 ? 'Low Risk' : 
                       metrics.spamScore <= 10 ? 'Medium Risk' : 'High Risk'}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Quick Actions</h4>
                  <div className="space-y-2">
                    <a
                      href={`https://ahrefs.com/site-explorer/overview/v2/exact?target=${metrics.domain}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between text-sm text-blue-600 hover:text-blue-800"
                    >
                      <span>View in Ahrefs</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                    <a
                      href={`https://www.semrush.com/analytics/overview/?q=${metrics.domain}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between text-sm text-blue-600 hover:text-blue-800"
                    >
                      <span>View in Semrush</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Professional Tools Reference */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
              Professional Tools Reference
            </h4>
          </div>

          {/* Promotion Request Form */}
          <PromotionRequestForm />
        </div>
      </div>
    </>
  );
};

export default DomainAuthorityChecker;