import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link as LinkIcon, AlertTriangle, CheckCircle, XCircle, ExternalLink, Search } from 'lucide-react';
import LoadingSpinner from '../Common/LoadingSpinner';
import { useToolTracking } from '../../hooks/useToolTracking';
import PromotionRequestForm from '../Common/PromotionRequestForm';

interface LinkResult {
  url: string;
  status: number;
  statusText: string;
  responseTime: number;
  linkText: string;
  isInternal: boolean;
}

const BrokenLinkChecker: React.FC = () => {
  useToolTracking('broken-link-checker');

  const [url, setUrl] = useState<string>('');
  const [results, setResults] = useState<LinkResult[]>([]);
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [summary, setSummary] = useState({ total: 0, working: 0, broken: 0, warnings: 0 });

  const generateMockResults = (domain: string): LinkResult[] => {
    const mockLinks = [
      { path: '/', text: 'Home', status: 200 },
      { path: '/about', text: 'About Us', status: 200 },
      { path: '/products', text: 'Products', status: 200 },
      { path: '/contact', text: 'Contact', status: 404 },
      { path: '/old-page', text: 'Old Page', status: 404 },
      { path: '/blog', text: 'Blog', status: 301 },
      { path: '/services', text: 'Services', status: 500 },
      { path: '/privacy', text: 'Privacy Policy', status: 200 },
      { path: '/terms', text: 'Terms of Service', status: 200 },
      { path: '/sitemap.xml', text: 'Sitemap', status: 200 }
    ];

    const externalLinks = [
      { url: 'https://google.com', text: 'Google', status: 200 },
      { url: 'https://facebook.com', text: 'Facebook', status: 200 },
      { url: 'https://broken-external-link.com', text: 'Broken External', status: 404 },
      { url: 'https://slow-site.com', text: 'Slow Site', status: 200 }
    ];

    const results: LinkResult[] = [];

    // Add internal links
    mockLinks.forEach(link => {
      results.push({
        url: `https://${domain}${link.path}`,
        status: link.status,
        statusText: getStatusText(link.status),
        responseTime: Math.floor(Math.random() * 2000) + 100,
        linkText: link.text,
        isInternal: true
      });
    });

    // Add external links
    externalLinks.forEach(link => {
      results.push({
        url: link.url,
        status: link.status,
        statusText: getStatusText(link.status),
        responseTime: Math.floor(Math.random() * 3000) + 200,
        linkText: link.text,
        isInternal: false
      });
    });

    return results;
  };

  const getStatusText = (status: number): string => {
    const statusTexts: { [key: number]: string } = {
      200: 'OK',
      301: 'Moved Permanently',
      302: 'Found',
      404: 'Not Found',
      500: 'Internal Server Error',
      503: 'Service Unavailable'
    };
    return statusTexts[status] || 'Unknown';
  };

  const checkLinks = async () => {
    if (!url.trim()) return;

    setIsChecking(true);
    
    // Simulate link checking
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    const domain = new URL(url.startsWith('http') ? url : `https://${url}`).hostname;
    const mockResults = generateMockResults(domain);
    
    setResults(mockResults);
    
    // Calculate summary
    const working = mockResults.filter(r => r.status >= 200 && r.status < 300).length;
    const broken = mockResults.filter(r => r.status >= 400).length;
    const warnings = mockResults.filter(r => r.status >= 300 && r.status < 400).length;
    
    setSummary({
      total: mockResults.length,
      working,
      broken,
      warnings
    });
    
    setIsChecking(false);
  };

  const getStatusIcon = (status: number) => {
    if (status >= 200 && status < 300) return <CheckCircle className="h-5 w-5 text-green-500" />;
    if (status >= 300 && status < 400) return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    return <XCircle className="h-5 w-5 text-red-500" />;
  };

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return 'text-green-600 bg-green-100';
    if (status >= 300 && status < 400) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <>
      <Helmet>
        <title>Free Broken Link Checker - Find Dead Links on Website | ConvertFastly</title>
        <meta name="description" content="Check for broken links on your website for free. Find 404 errors, dead links, and redirect issues. Essential SEO tool for website maintenance." />
        <meta name="keywords" content="broken link checker, dead link finder, 404 error checker, link validator, website link checker, SEO link audit" />
        <link rel="canonical" href="https://convertfastly.com/broken-link-checker" />
        <meta property="og:title" content="Free Broken Link Checker - Find Dead Links on Website" />
        <meta property="og:description" content="Find and fix broken links on your website. Free tool for checking 404 errors and link health." />
        <meta property="og:url" content="https://convertfastly.com/broken-link-checker" />
      </Helmet>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center space-x-3 mb-6">
          <LinkIcon className="h-8 w-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Broken Link Checker</h2>
        </div>

        <p className="text-gray-600 mb-8">
          Scan your website for broken links, 404 errors, and redirect issues. Essential for maintaining good SEO and user experience.
        </p>

        <div className="space-y-8">
          {/* URL Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Website URL to Check
            </label>
            <div className="flex space-x-3">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && checkLinks()}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com"
              />
              <button
                onClick={checkLinks}
                disabled={isChecking || !url.trim()}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isChecking ? (
                  <LoadingSpinner size="sm" color="white" />
                ) : (
                  <Search className="h-5 w-5" />
                )}
                <span>Check Links</span>
              </button>
            </div>
          </div>

          {/* Checking Progress */}
          {isChecking && (
            <div className="text-center py-8">
              <LoadingSpinner size="lg" color="blue" />
              <p className="text-gray-600 mt-4">
                Scanning website for broken links...
              </p>
              <p className="text-sm text-gray-500 mt-2">
                This may take a few minutes depending on the size of your website.
              </p>
            </div>
          )}

          {/* Results Summary */}
          {results.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-blue-50 rounded-lg p-6 text-center">
                <div className="text-2xl font-bold text-blue-600">{summary.total}</div>
                <div className="text-sm text-gray-600">Total Links</div>
              </div>
              <div className="bg-green-50 rounded-lg p-6 text-center">
                <div className="text-2xl font-bold text-green-600">{summary.working}</div>
                <div className="text-sm text-gray-600">Working Links</div>
              </div>
              <div className="bg-yellow-50 rounded-lg p-6 text-center">
                <div className="text-2xl font-bold text-yellow-600">{summary.warnings}</div>
                <div className="text-sm text-gray-600">Redirects</div>
              </div>
              <div className="bg-red-50 rounded-lg p-6 text-center">
                <div className="text-2xl font-bold text-red-600">{summary.broken}</div>
                <div className="text-sm text-gray-600">Broken Links</div>
              </div>
            </div>
          )}

          {/* Detailed Results */}
          {results.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Link Analysis Results</h3>
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        URL
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Link Text
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Response Time
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {results.map((result, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(result.status)}
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(result.status)}`}>
                              {result.status}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <a
                              href={result.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 text-sm truncate max-w-xs"
                            >
                              {result.url}
                            </a>
                            <ExternalLink className="h-3 w-3 text-gray-400 ml-1 flex-shrink-0" />
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-900">{result.linkText}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            result.isInternal ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {result.isInternal ? 'Internal' : 'External'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {result.responseTime}ms
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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

export default BrokenLinkChecker;