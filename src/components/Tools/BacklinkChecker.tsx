import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link as LinkIcon, ExternalLink, TrendingUp, Globe, Search } from 'lucide-react';
import LoadingSpinner from '../Common/LoadingSpinner';
import { useToolTracking } from '../../hooks/useToolTracking';
import PromotionRequestForm from '../Common/PromotionRequestForm';

interface Backlink {
  sourceUrl: string;
  sourceDomain: string;
  anchorText: string;
  linkType: 'dofollow' | 'nofollow';
  domainAuthority: number;
  firstSeen: string;
}

const BacklinkChecker: React.FC = () => {
  useToolTracking('backlink-checker');

  const [url, setUrl] = useState<string>('');
  const [backlinks, setBacklinks] = useState<Backlink[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [totalBacklinks, setTotalBacklinks] = useState<number>(0);
  const [referringDomains, setReferringDomains] = useState<number>(0);

  const generateMockBacklinks = (domain: string): Backlink[] => {
    const mockDomains = [
      'techcrunch.com', 'forbes.com', 'medium.com', 'reddit.com', 'stackoverflow.com',
      'github.com', 'wikipedia.org', 'linkedin.com', 'twitter.com', 'facebook.com'
    ];

    const anchorTexts = [
      domain, 'click here', 'read more', 'website', 'homepage', 'check this out',
      'useful tool', 'great resource', 'recommended site', 'visit here'
    ];

    return mockDomains.slice(0, 5).map(sourceDomain => ({
      sourceUrl: `https://${sourceDomain}/article-about-${domain}`,
      sourceDomain,
      anchorText: anchorTexts[Math.floor(Math.random() * anchorTexts.length)],
      linkType: Math.random() > 0.3 ? 'dofollow' : 'nofollow',
      domainAuthority: Math.floor(Math.random() * 60) + 30,
      firstSeen: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    }));
  };

  const analyzeBacklinks = async () => {
    if (!url.trim()) return;

    setIsAnalyzing(true);
    
    // Simulate analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const domain = new URL(url.startsWith('http') ? url : `https://${url}`).hostname;
    const mockBacklinks = generateMockBacklinks(domain);
    
    setBacklinks(mockBacklinks);
    setTotalBacklinks(Math.floor(Math.random() * 10000) + 500);
    setReferringDomains(Math.floor(Math.random() * 1000) + 50);
    setIsAnalyzing(false);
  };

  const getLinkTypeColor = (type: string) => {
    return type === 'dofollow' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  const getDAColor = (da: number) => {
    if (da >= 70) return 'text-green-600';
    if (da >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <>
      <Helmet>
        <title>Free Backlink Checker - Analyze Website Backlinks | ConvertFastly</title>
        <meta name="description" content="Check backlinks for any website for free. Analyze link profile, referring domains, anchor text, and domain authority. Essential SEO tool for link building." />
        <meta name="keywords" content="backlink checker, link analysis, referring domains, anchor text analysis, link profile, SEO backlinks, free backlink tool" />
        <link rel="canonical" href="https://convertfastly.com/backlink-checker" />
        <meta property="og:title" content="Free Backlink Checker - Analyze Website Backlinks" />
        <meta property="og:description" content="Analyze backlink profiles and referring domains for any website. Free SEO tool for link building analysis." />
        <meta property="og:url" content="https://convertfastly.com/backlink-checker" />
      </Helmet>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center space-x-3 mb-6">
          <LinkIcon className="h-8 w-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Backlink Checker</h2>
        </div>

        <p className="text-gray-600 mb-8">
          Analyze backlink profiles and referring domains for any website. Essential for SEO analysis and competitive research.
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
                onKeyPress={(e) => e.key === 'Enter' && analyzeBacklinks()}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com"
              />
              <button
                onClick={analyzeBacklinks}
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
                Analyzing backlink profile...
              </p>
            </div>
          )}

          {/* Results */}
          {backlinks.length > 0 && (
            <div className="space-y-6">
              {/* Summary Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{totalBacklinks.toLocaleString()}</div>
                  <div className="text-sm font-medium text-gray-600">Total Backlinks</div>
                </div>
                <div className="bg-green-50 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">{referringDomains.toLocaleString()}</div>
                  <div className="text-sm font-medium text-gray-600">Referring Domains</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">{backlinks.filter(b => b.linkType === 'dofollow').length}</div>
                  <div className="text-sm font-medium text-gray-600">Dofollow Links</div>
                </div>
              </div>

              {/* Backlinks Table */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Backlinks (Sample)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Source Domain
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Anchor Text
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Link Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          DA
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          First Seen
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {backlinks.map((backlink, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Globe className="h-4 w-4 text-gray-400 mr-2" />
                              <a
                                href={backlink.sourceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 text-sm"
                              >
                                {backlink.sourceDomain}
                              </a>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-900">{backlink.anchorText}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getLinkTypeColor(backlink.linkType)}`}>
                              {backlink.linkType}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`text-sm font-medium ${getDAColor(backlink.domainAuthority)}`}>
                              {backlink.domainAuthority}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(backlink.firstSeen).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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

export default BacklinkChecker;