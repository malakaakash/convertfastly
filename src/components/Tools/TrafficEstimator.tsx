import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { BarChart3, TrendingUp, Users, Globe, ExternalLink, Search } from 'lucide-react';
import LoadingSpinner from '../Common/LoadingSpinner';
import { useToolTracking } from '../../hooks/useToolTracking';
import PromotionRequestForm from '../Common/PromotionRequestForm';

interface TrafficData {
  domain: string;
  monthlyVisits: number;
  pageViews: number;
  bounceRate: number;
  avgSessionDuration: string;
  topCountries: { country: string; percentage: number }[];
  trafficSources: { source: string; percentage: number }[];
  topPages: { page: string; visits: number }[];
}

const TrafficEstimator: React.FC = () => {
  useToolTracking('traffic-estimator');

  const [url, setUrl] = useState<string>('');
  const [trafficData, setTrafficData] = useState<TrafficData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  const generateMockTrafficData = (domain: string): TrafficData => {
    const countries = ['United States', 'United Kingdom', 'Canada', 'Germany', 'France'];
    const sources = ['Organic Search', 'Direct', 'Social Media', 'Referrals', 'Paid Search'];
    const pages = ['/', '/about', '/products', '/blog', '/contact'];

    return {
      domain,
      monthlyVisits: Math.floor(Math.random() * 500000) + 10000,
      pageViews: Math.floor(Math.random() * 1000000) + 50000,
      bounceRate: Math.floor(Math.random() * 40) + 30,
      avgSessionDuration: `${Math.floor(Math.random() * 5) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
      topCountries: countries.map(country => ({
        country,
        percentage: Math.floor(Math.random() * 30) + 5
      })).sort((a, b) => b.percentage - a.percentage),
      trafficSources: sources.map(source => ({
        source,
        percentage: Math.floor(Math.random() * 40) + 10
      })).sort((a, b) => b.percentage - a.percentage),
      topPages: pages.map(page => ({
        page,
        visits: Math.floor(Math.random() * 50000) + 1000
      })).sort((a, b) => b.visits - a.visits)
    };
  };

  const analyzeTraffic = async () => {
    if (!url.trim()) return;

    setIsAnalyzing(true);
    
    // Simulate analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const domain = new URL(url.startsWith('http') ? url : `https://${url}`).hostname;
    const mockData = generateMockTrafficData(domain);
    setTrafficData(mockData);
    setIsAnalyzing(false);
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <>
      <Helmet>
        <title>Free Website Traffic Estimator - Analyze Website Traffic | ConvertFastly</title>
        <meta name="description" content="Estimate website traffic, page views, and visitor analytics for any domain. Free traffic analysis tool with geographic and source breakdowns." />
        <meta name="keywords" content="website traffic estimator, traffic analyzer, website analytics, visitor statistics, traffic checker, website traffic tool" />
        <link rel="canonical" href="https://convertfastly.com/traffic-estimator" />
        <meta property="og:title" content="Free Website Traffic Estimator - Analyze Website Traffic" />
        <meta property="og:description" content="Estimate website traffic and analyze visitor patterns for any domain. Free comprehensive traffic analysis." />
        <meta property="og:url" content="https://convertfastly.com/traffic-estimator" />
      </Helmet>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center space-x-3 mb-6">
          <BarChart3 className="h-8 w-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Website Traffic Estimator</h2>
        </div>

        <p className="text-gray-600 mb-8">
          Estimate website traffic, analyze visitor patterns, and get insights into any domain's performance and audience demographics.
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
                onKeyPress={(e) => e.key === 'Enter' && analyzeTraffic()}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com"
              />
              <button
                onClick={analyzeTraffic}
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

          {/* Results */}
          {trafficData && (
            <div className="space-y-6">
              {/* Main Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-blue-50 rounded-lg p-6 text-center">
                  <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-600">{formatNumber(trafficData.monthlyVisits)}</div>
                  <div className="text-sm text-gray-600">Monthly Visits</div>
                </div>

                <div className="bg-green-50 rounded-lg p-6 text-center">
                  <BarChart3 className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600">{formatNumber(trafficData.pageViews)}</div>
                  <div className="text-sm text-gray-600">Page Views</div>
                </div>

                <div className="bg-purple-50 rounded-lg p-6 text-center">
                  <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-600">{trafficData.bounceRate}%</div>
                  <div className="text-sm text-gray-600">Bounce Rate</div>
                </div>

                <div className="bg-orange-50 rounded-lg p-6 text-center">
                  <Globe className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-orange-600">{trafficData.avgSessionDuration}</div>
                  <div className="text-sm text-gray-600">Avg. Session</div>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Top Countries */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Top Countries</h4>
                  <div className="space-y-3">
                    {trafficData.topCountries.slice(0, 5).map((country, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">{country.country}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${country.percentage}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-900">{country.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Traffic Sources */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Traffic Sources</h4>
                  <div className="space-y-3">
                    {trafficData.trafficSources.map((source, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">{source.source}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-600 h-2 rounded-full" 
                              style={{ width: `${source.percentage}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-900">{source.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Pages */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Top Pages</h4>
                  <div className="space-y-3">
                    {trafficData.topPages.map((page, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-700 truncate">{page.page}</span>
                        <span className="text-sm font-medium text-gray-900">{formatNumber(page.visits)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Promotion Request Form */}
          <PromotionRequestForm />
        </div>
      </div>
    </>
  );
};

export default TrafficEstimator;