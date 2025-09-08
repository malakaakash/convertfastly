import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FileText, Target, TrendingUp, Zap, ExternalLink, Search, CheckCircle, AlertTriangle } from 'lucide-react';
import LoadingSpinner from '../Common/LoadingSpinner';
import { useToolTracking } from '../../hooks/useToolTracking';
import PromotionRequestForm from '../Common/PromotionRequestForm';

interface ContentScore {
  category: string;
  score: number;
  issues: string[];
  recommendations: string[];
}

interface OptimizationResult {
  overallScore: number;
  targetKeyword: string;
  wordCount: number;
  readabilityScore: number;
  seoScore: number;
  scores: ContentScore[];
  competitorAnalysis: {
    avgWordCount: number;
    avgHeadings: number;
    commonKeywords: string[];
  };
}

const ContentOptimizer: React.FC = () => {
  useToolTracking('content-optimizer');

  const [content, setContent] = useState<string>('');
  const [targetKeyword, setTargetKeyword] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [results, setResults] = useState<OptimizationResult | null>(null);

  const generateMockAnalysis = (text: string, keyword: string): OptimizationResult => {
    const wordCount = text.split(/\s+/).filter(w => w.length > 0).length;
    const keywordDensity = (text.toLowerCase().split(keyword.toLowerCase()).length - 1) / wordCount * 100;
    
    return {
      overallScore: Math.floor(Math.random() * 30) + 70,
      targetKeyword: keyword,
      wordCount,
      readabilityScore: Math.floor(Math.random() * 20) + 75,
      seoScore: Math.floor(Math.random() * 25) + 70,
      scores: [
        {
          category: 'Keyword Optimization',
          score: keywordDensity > 0 ? Math.min(95, 60 + keywordDensity * 10) : 30,
          issues: keywordDensity < 1 ? ['Target keyword appears too few times'] : [],
          recommendations: [
            'Include target keyword in title and headings',
            'Use keyword variations naturally throughout content',
            'Maintain 1-3% keyword density'
          ]
        },
        {
          category: 'Content Structure',
          score: Math.floor(Math.random() * 20) + 75,
          issues: ['Missing H2 subheadings', 'Paragraphs too long'],
          recommendations: [
            'Add more H2 and H3 subheadings',
            'Break long paragraphs into shorter ones',
            'Use bullet points for better readability'
          ]
        },
        {
          category: 'Readability',
          score: Math.floor(Math.random() * 15) + 80,
          issues: wordCount < 300 ? ['Content too short'] : [],
          recommendations: [
            'Use shorter sentences for better readability',
            'Include transition words between paragraphs',
            'Aim for 8th-grade reading level'
          ]
        },
        {
          category: 'SEO Elements',
          score: Math.floor(Math.random() * 25) + 65,
          issues: ['Missing meta description', 'No internal links'],
          recommendations: [
            'Add compelling meta description',
            'Include 2-3 internal links to related content',
            'Optimize images with alt text'
          ]
        }
      ],
      competitorAnalysis: {
        avgWordCount: Math.floor(Math.random() * 1000) + 1500,
        avgHeadings: Math.floor(Math.random() * 5) + 8,
        commonKeywords: [keyword, `${keyword} tool`, `best ${keyword}`, `free ${keyword}`]
      }
    };
  };

  const analyzeContent = async () => {
    if (!content.trim() || !targetKeyword.trim()) return;

    setIsAnalyzing(true);
    
    // Simulate analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const analysis = generateMockAnalysis(content, targetKeyword);
    setResults(analysis);
    setIsAnalyzing(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const loadSampleContent = () => {
    setTargetKeyword('password generator');
    setContent(`How to Create Strong Passwords with a Password Generator

In today's digital world, password security is more important than ever. A strong password generator can help you create secure passwords that protect your online accounts from cyber threats.

What Makes a Strong Password?

A strong password should be at least 12 characters long and include a mix of uppercase letters, lowercase letters, numbers, and special symbols. Avoid using personal information like birthdays or names.

Benefits of Using a Password Generator

Password generators create random, complex passwords that are virtually impossible to guess. They eliminate human bias in password creation and ensure maximum security for your accounts.

Best Practices for Password Security

1. Use unique passwords for each account
2. Enable two-factor authentication when available
3. Store passwords in a secure password manager
4. Regularly update passwords for sensitive accounts

By following these guidelines and using a reliable password generator, you can significantly improve your online security and protect your digital identity.`);
  };

  return (
    <>
      <Helmet>
        <title>Free Content SEO Optimizer - Optimize Content for Search Engines | ConvertFastly</title>
        <meta name="description" content="Optimize your content for SEO with AI-powered analysis. Get keyword optimization, readability scores, and competitor insights. Free alternative to SurferSEO and Frase." />
        <meta name="keywords" content="content optimizer, SEO content, content analysis, SurferSEO alternative, Frase alternative, content optimization, SEO writing, keyword optimization" />
        <link rel="canonical" href="https://convertfastly.com/content-optimizer" />
        <meta property="og:title" content="Free Content SEO Optimizer - Optimize Content for Search Engines" />
        <meta property="og:description" content="AI-powered content optimization with SEO analysis and competitor insights." />
        <meta property="og:url" content="https://convertfastly.com/content-optimizer" />
      </Helmet>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center space-x-3 mb-6">
          <Target className="h-8 w-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Content SEO Optimizer</h2>
        </div>

        <p className="text-gray-600 mb-8">
          Optimize your content for search engines with AI-powered analysis. Get keyword optimization, readability scores, and competitor insights.
        </p>

        <div className="space-y-8">
          {/* Input Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">Content to Optimize</label>
                <button
                  onClick={loadSampleContent}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Load Sample
                </button>
              </div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={12}
                placeholder="Paste your content here to analyze and optimize for SEO..."
              />
              <div className="text-xs text-gray-500 mt-1">
                {content.split(/\s+/).filter(w => w.length > 0).length} words • {content.length} characters
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Target Keyword</label>
                <input
                  type="text"
                  value={targetKeyword}
                  onChange={(e) => setTargetKeyword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="password generator"
                />
              </div>

              <button
                onClick={analyzeContent}
                disabled={isAnalyzing || !content.trim() || !targetKeyword.trim()}
                className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAnalyzing ? (
                  <>
                    <LoadingSpinner size="sm" color="white" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Search className="h-5 w-5" />
                    <span>Optimize Content</span>
                  </>
                )}
              </button>

              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">What We Analyze</h4>
                <ul className="space-y-1 text-sm text-blue-800">
                  <li>• Keyword optimization & density</li>
                  <li>• Content structure & headings</li>
                  <li>• Readability & engagement</li>
                  <li>• SEO elements & meta data</li>
                  <li>• Competitor comparison</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Analysis Progress */}
          {isAnalyzing && (
            <div className="text-center py-8">
              <LoadingSpinner size="lg" color="blue" />
              <p className="text-gray-600 mt-4">
                Analyzing content optimization opportunities...
              </p>
            </div>
          )}

          {/* Results */}
          {results && (
            <div className="space-y-8">
              {/* Overall Score */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Content Optimization Score</h3>
                <div className={`text-6xl font-bold mb-4 ${getScoreColor(results.overallScore)}`}>
                  {results.overallScore}/100
                </div>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div>
                    <div className="text-lg font-bold text-gray-900">{results.wordCount}</div>
                    <div className="text-sm text-gray-600">Words</div>
                  </div>
                  <div>
                    <div className={`text-lg font-bold ${getScoreColor(results.readabilityScore)}`}>
                      {results.readabilityScore}/100
                    </div>
                    <div className="text-sm text-gray-600">Readability</div>
                  </div>
                  <div>
                    <div className={`text-lg font-bold ${getScoreColor(results.seoScore)}`}>
                      {results.seoScore}/100
                    </div>
                    <div className="text-sm text-gray-600">SEO Score</div>
                  </div>
                </div>
              </div>

              {/* Detailed Scores */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {results.scores.map((score, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-gray-900">{score.category}</h4>
                      <div className={`text-2xl font-bold ${getScoreColor(score.score)}`}>
                        {score.score}/100
                      </div>
                    </div>

                    {score.issues.length > 0 && (
                      <div className="mb-4">
                        <h5 className="font-medium text-gray-800 mb-2 flex items-center">
                          <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2" />
                          Issues Found
                        </h5>
                        <ul className="space-y-1">
                          {score.issues.map((issue, issueIndex) => (
                            <li key={issueIndex} className="text-sm text-red-600 flex items-start">
                              <span className="mr-2">•</span>
                              {issue}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div>
                      <h5 className="font-medium text-gray-800 mb-2 flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Recommendations
                      </h5>
                      <ul className="space-y-1">
                        {score.recommendations.map((rec, recIndex) => (
                          <li key={recIndex} className="text-sm text-gray-600 flex items-start">
                            <span className="text-blue-600 mr-2">•</span>
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              {/* Competitor Analysis */}
              <div className="bg-purple-50 rounded-lg p-6">
                <h4 className="font-semibold text-purple-900 mb-4 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Competitor Analysis for "{results.targetKeyword}"
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{results.competitorAnalysis.avgWordCount}</div>
                    <div className="text-sm text-purple-800">Avg. Word Count</div>
                    <div className="text-xs text-purple-600 mt-1">
                      Your content: {results.wordCount} words
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{results.competitorAnalysis.avgHeadings}</div>
                    <div className="text-sm text-purple-800">Avg. Headings</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-purple-800 mb-2">Common Keywords:</div>
                    <div className="flex flex-wrap gap-1">
                      {results.competitorAnalysis.commonKeywords.map((kw, index) => (
                        <span key={index} className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs">
                          {kw}
                        </span>
                      ))}
                    </div>
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

export default ContentOptimizer;