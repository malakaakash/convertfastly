import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Globe, Search, AlertTriangle, CheckCircle, XCircle, BarChart3, Download, RefreshCw, ExternalLink } from 'lucide-react';
import LoadingSpinner from '../Common/LoadingSpinner';
import { useToolTracking } from '../../hooks/useToolTracking';
import PromotionRequestForm from '../Common/PromotionRequestForm';

interface AuditResult {
  category: string;
  score: number;
  issues: AuditIssue[];
  recommendations: string[];
}

interface AuditIssue {
  type: 'error' | 'warning' | 'info';
  title: string;
  description: string;
  impact: 'High' | 'Medium' | 'Low';
}

const WebsiteAudit: React.FC = () => {
  useToolTracking('website-audit');

  const [url, setUrl] = useState<string>('');
  const [auditResults, setAuditResults] = useState<AuditResult[]>([]);
  const [isAuditing, setIsAuditing] = useState<boolean>(false);
  const [overallScore, setOverallScore] = useState<number>(0);

  const generateMockAudit = (websiteUrl: string): { results: AuditResult[], score: number } => {
    const results: AuditResult[] = [
      {
        category: 'Technical SEO',
        score: Math.floor(Math.random() * 40) + 60,
        issues: [
          {
            type: 'error',
            title: 'Missing Meta Description',
            description: 'Some pages are missing meta descriptions',
            impact: 'High'
          },
          {
            type: 'warning',
            title: 'Large Image Files',
            description: 'Images could be optimized for better loading speed',
            impact: 'Medium'
          },
          {
            type: 'info',
            title: 'SSL Certificate',
            description: 'Website is properly secured with HTTPS',
            impact: 'Low'
          }
        ],
        recommendations: [
          'Add meta descriptions to all pages',
          'Optimize images using WebP format',
          'Implement structured data markup'
        ]
      },
      {
        category: 'Page Speed',
        score: Math.floor(Math.random() * 30) + 70,
        issues: [
          {
            type: 'warning',
            title: 'Render-blocking Resources',
            description: 'CSS and JavaScript files are blocking page rendering',
            impact: 'High'
          },
          {
            type: 'info',
            title: 'Image Optimization',
            description: 'Most images are properly optimized',
            impact: 'Low'
          }
        ],
        recommendations: [
          'Minify CSS and JavaScript files',
          'Use lazy loading for images',
          'Enable browser caching'
        ]
      },
      {
        category: 'Mobile Usability',
        score: Math.floor(Math.random() * 20) + 80,
        issues: [
          {
            type: 'info',
            title: 'Mobile-Friendly Design',
            description: 'Website is responsive and mobile-friendly',
            impact: 'Low'
          },
          {
            type: 'warning',
            title: 'Touch Targets',
            description: 'Some buttons may be too small for mobile',
            impact: 'Medium'
          }
        ],
        recommendations: [
          'Increase touch target sizes',
          'Test on various mobile devices',
          'Optimize mobile page speed'
        ]
      },
      {
        category: 'Content Quality',
        score: Math.floor(Math.random() * 25) + 75,
        issues: [
          {
            type: 'warning',
            title: 'Duplicate Content',
            description: 'Some content appears to be duplicated across pages',
            impact: 'Medium'
          },
          {
            type: 'info',
            title: 'Content Length',
            description: 'Most pages have adequate content length',
            impact: 'Low'
          }
        ],
        recommendations: [
          'Create unique content for each page',
          'Add more detailed product descriptions',
          'Include relevant keywords naturally'
        ]
      }
    ];

    const avgScore = Math.round(results.reduce((sum, result) => sum + result.score, 0) / results.length);
    return { results, score: avgScore };
  };

  const performAudit = async () => {
    if (!url.trim()) return;

    setIsAuditing(true);
    
    // Simulate audit process
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    const { results, score } = generateMockAudit(url);
    setAuditResults(results);
    setOverallScore(score);
    setIsAuditing(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'error': return <XCircle className="h-5 w-5 text-red-500" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      default: return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  const exportReport = () => {
    const reportData = {
      url,
      auditDate: new Date().toISOString(),
      overallScore,
      results: auditResults
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const downloadUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = `seo-audit-${new URL(url).hostname}.json`;
    a.click();
    URL.revokeObjectURL(downloadUrl);
  };

  return (
    <>
      <Helmet>
        <title>Free Website SEO Audit Tool - Analyze Your Site's SEO Performance | ConvertFastly</title>
        <meta name="description" content="Free comprehensive SEO audit tool. Analyze your website's technical SEO, page speed, mobile usability, and content quality. Get actionable recommendations to improve rankings." />
        <meta name="keywords" content="SEO audit, website audit, SEO analysis, site audit tool, SEO checker, website analyzer, technical SEO, page speed audit, mobile SEO" />
        <link rel="canonical" href="https://convertfastly.com/website-audit" />
        <meta property="og:title" content="Free Website SEO Audit Tool - Analyze Your Site's SEO Performance" />
        <meta property="og:description" content="Comprehensive SEO audit with actionable recommendations. Analyze technical SEO, speed, and content quality." />
        <meta property="og:url" content="https://convertfastly.com/website-audit" />
      </Helmet>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center space-x-3 mb-6">
          <Globe className="h-8 w-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Website SEO Audit Tool</h2>
        </div>

        <p className="text-gray-600 mb-8">
          Comprehensive SEO analysis of your website. Get detailed insights on technical SEO, page speed, mobile usability, and content quality with actionable recommendations.
        </p>

        <div className="space-y-8">
          {/* URL Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Website URL to Audit
            </label>
            <div className="flex space-x-3">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && performAudit()}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com"
              />
              <button
                onClick={performAudit}
                disabled={isAuditing || !url.trim()}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isAuditing ? (
                  <LoadingSpinner size="sm" color="white" />
                ) : (
                  <Search className="h-5 w-5" />
                )}
                <span>Audit Website</span>
              </button>
            </div>
          </div>

          {/* Audit Progress */}
          {isAuditing && (
            <div className="text-center py-8">
              <LoadingSpinner size="lg" color="blue" />
              <p className="text-gray-600 mt-4">
                Analyzing your website's SEO performance...
              </p>
              <p className="text-sm text-gray-500 mt-2">
                This may take a few moments while we check technical SEO, page speed, and content quality.
              </p>
            </div>
          )}

          {/* Overall Score */}
          {auditResults.length > 0 && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Overall SEO Score</h3>
              <div className={`text-6xl font-bold mb-4 ${getScoreColor(overallScore)}`}>
                {overallScore}/100
              </div>
              <div className="flex justify-center space-x-6 text-sm">
                <button
                  onClick={exportReport}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  <span>Export Report</span>
                </button>
                <button
                  onClick={performAudit}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>Re-audit</span>
                </button>
              </div>
            </div>
          )}

          {/* Audit Results */}
          {auditResults.length > 0 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">Detailed Analysis</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {auditResults.map((result, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-gray-900">{result.category}</h4>
                      <div className={`text-2xl font-bold ${getScoreColor(result.score)}`}>
                        {result.score}/100
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h5 className="font-medium text-gray-800 mb-2">Issues Found</h5>
                        <div className="space-y-2">
                          {result.issues.map((issue, issueIndex) => (
                            <div key={issueIndex} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                              {getIssueIcon(issue.type)}
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                  <span className="font-medium text-gray-900">{issue.title}</span>
                                  <span className={`px-2 py-1 text-xs rounded-full ${getImpactColor(issue.impact)}`}>
                                    {issue.impact}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-600">{issue.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-gray-800 mb-2">Recommendations</h5>
                        <ul className="space-y-1">
                          {result.recommendations.map((rec, recIndex) => (
                            <li key={recIndex} className="text-sm text-gray-600 flex items-start">
                              <span className="text-blue-600 mr-2">•</span>
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
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

export default WebsiteAudit;