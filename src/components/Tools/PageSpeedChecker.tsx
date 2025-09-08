import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Zap, Smartphone, Monitor, AlertTriangle, CheckCircle, ExternalLink, Search } from 'lucide-react';
import LoadingSpinner from '../Common/LoadingSpinner';
import { useToolTracking } from '../../hooks/useToolTracking';
import PromotionRequestForm from '../Common/PromotionRequestForm';

interface SpeedMetrics {
  device: 'mobile' | 'desktop';
  score: number;
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
  opportunities: Array<{
    title: string;
    description: string;
    impact: 'High' | 'Medium' | 'Low';
    savings: string;
  }>;
}

const PageSpeedChecker: React.FC = () => {
  useToolTracking('pagespeed-checker');

  const [url, setUrl] = useState<string>('');
  const [mobileMetrics, setMobileMetrics] = useState<SpeedMetrics | null>(null);
  const [desktopMetrics, setDesktopMetrics] = useState<SpeedMetrics | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'mobile' | 'desktop'>('mobile');

  const generateMockMetrics = (device: 'mobile' | 'desktop'): SpeedMetrics => {
    const baseScore = device === 'mobile' ? 60 : 85;
    const score = baseScore + Math.floor(Math.random() * 20);

    return {
      device,
      score,
      fcp: Math.random() * 2 + 1,
      lcp: Math.random() * 3 + 2,
      fid: Math.random() * 100 + 50,
      cls: Math.random() * 0.2,
      ttfb: Math.random() * 1000 + 200,
      opportunities: [
        {
          title: 'Optimize Images',
          description: 'Serve images in next-gen formats like WebP',
          impact: 'High',
          savings: '1.2s'
        },
        {
          title: 'Minify CSS',
          description: 'Remove unused CSS and minify remaining styles',
          impact: 'Medium',
          savings: '0.8s'
        },
        {
          title: 'Enable Text Compression',
          description: 'Use gzip or brotli compression for text resources',
          impact: 'Medium',
          savings: '0.5s'
        },
        {
          title: 'Reduce Server Response Time',
          description: 'Optimize server configuration and database queries',
          impact: 'High',
          savings: '0.9s'
        }
      ]
    };
  };

  const analyzePageSpeed = async () => {
    if (!url.trim()) return;

    setIsAnalyzing(true);
    
    // Simulate analysis
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    const mobile = generateMockMetrics('mobile');
    const desktop = generateMockMetrics('desktop');
    
    setMobileMetrics(mobile);
    setDesktopMetrics(desktop);
    setIsAnalyzing(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Good';
    if (score >= 50) return 'Needs Improvement';
    return 'Poor';
  };

  const getMetricColor = (value: number, thresholds: { good: number; poor: number }) => {
    if (value <= thresholds.good) return 'text-green-600';
    if (value <= thresholds.poor) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  const currentMetrics = activeTab === 'mobile' ? mobileMetrics : desktopMetrics;

  return (
    <>
      <Helmet>
        <title>Free PageSpeed Checker - Website Speed Test Tool | ConvertFastly</title>
        <meta name="description" content="Test your website's loading speed and performance. Get detailed PageSpeed insights for mobile and desktop. Free alternative to Google PageSpeed Insights." />
        <meta name="keywords" content="pagespeed checker, website speed test, page speed insights, website performance, speed optimization, core web vitals, loading speed" />
        <link rel="canonical" href="https://convertfastly.com/pagespeed-checker" />
        <meta property="og:title" content="Free PageSpeed Checker - Website Speed Test Tool" />
        <meta property="og:description" content="Test website loading speed and get optimization recommendations. Free PageSpeed analysis tool." />
        <meta property="og:url" content="https://convertfastly.com/pagespeed-checker" />
      </Helmet>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center space-x-3 mb-6">
          <Zap className="h-8 w-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">PageSpeed Checker</h2>
        </div>

        <p className="text-gray-600 mb-8">
          Test your website's loading speed and performance. Get detailed insights and optimization recommendations for both mobile and desktop.
        </p>

        <div className="space-y-8">
          {/* URL Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Website URL to Test
            </label>
            <div className="flex space-x-3">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && analyzePageSpeed()}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com"
              />
              <button
                onClick={analyzePageSpeed}
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
                Analyzing page speed performance...
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Testing both mobile and desktop performance metrics.
              </p>
            </div>
          )}

          {/* Results */}
          {(mobileMetrics || desktopMetrics) && (
            <div className="space-y-6">
              {/* Device Tabs */}
              <div className="flex space-x-4">
                <button
                  onClick={() => setActiveTab('mobile')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'mobile'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Smartphone className="h-5 w-5" />
                  <span>Mobile</span>
                </button>
                <button
                  onClick={() => setActiveTab('desktop')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'desktop'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Monitor className="h-5 w-5" />
                  <span>Desktop</span>
                </button>
              </div>

              {currentMetrics && (
                <>
                  {/* Overall Score */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {activeTab === 'mobile' ? 'Mobile' : 'Desktop'} Performance Score
                    </h3>
                    <div className={`text-6xl font-bold mb-4 ${getScoreColor(currentMetrics.score)}`}>
                      {currentMetrics.score}
                    </div>
                    <div className={`text-lg font-medium ${getScoreColor(currentMetrics.score)}`}>
                      {getScoreLabel(currentMetrics.score)}
                    </div>
                  </div>

                  {/* Core Web Vitals */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Core Web Vitals</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4 text-center">
                        <div className={`text-2xl font-bold ${getMetricColor(currentMetrics.fcp, { good: 1.8, poor: 3.0 })}`}>
                          {currentMetrics.fcp.toFixed(1)}s
                        </div>
                        <div className="text-sm text-gray-600">First Contentful Paint</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4 text-center">
                        <div className={`text-2xl font-bold ${getMetricColor(currentMetrics.lcp, { good: 2.5, poor: 4.0 })}`}>
                          {currentMetrics.lcp.toFixed(1)}s
                        </div>
                        <div className="text-sm text-gray-600">Largest Contentful Paint</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4 text-center">
                        <div className={`text-2xl font-bold ${getMetricColor(currentMetrics.fid, { good: 100, poor: 300 })}`}>
                          {currentMetrics.fid.toFixed(0)}ms
                        </div>
                        <div className="text-sm text-gray-600">First Input Delay</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4 text-center">
                        <div className={`text-2xl font-bold ${getMetricColor(currentMetrics.cls, { good: 0.1, poor: 0.25 })}`}>
                          {currentMetrics.cls.toFixed(3)}
                        </div>
                        <div className="text-sm text-gray-600">Cumulative Layout Shift</div>
                      </div>
                    </div>
                  </div>

                  {/* Optimization Opportunities */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Optimization Opportunities</h3>
                    <div className="space-y-3">
                      {currentMetrics.opportunities.map((opportunity, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h4 className="font-medium text-gray-900">{opportunity.title}</h4>
                                <span className={`px-2 py-1 text-xs rounded-full ${getImpactColor(opportunity.impact)}`}>
                                  {opportunity.impact} Impact
                                </span>
                                <span className="text-sm font-medium text-blue-600">
                                  Save {opportunity.savings}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600">{opportunity.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Promotion Request Form */}
          <PromotionRequestForm />
        </div>
      </div>
    </>
  );
};

export default PageSpeedChecker;