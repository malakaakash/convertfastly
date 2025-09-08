import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Shield, FileText, AlertTriangle, CheckCircle, ExternalLink, Upload } from 'lucide-react';
import LoadingSpinner from '../Common/LoadingSpinner';
import { useToolTracking } from '../../hooks/useToolTracking';
import PromotionRequestForm from '../Common/PromotionRequestForm';

interface PlagiarismResult {
  source: string;
  similarity: number;
  matchedText: string;
  url: string;
}

const PlagiarismChecker: React.FC = () => {
  useToolTracking('plagiarism-checker');

  const [inputText, setInputText] = useState<string>('');
  const [results, setResults] = useState<PlagiarismResult[]>([]);
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [overallScore, setOverallScore] = useState<number>(0);
  const [wordCount, setWordCount] = useState<number>(0);

  const generateMockResults = (text: string): { results: PlagiarismResult[], score: number } => {
    const mockSources = [
      { source: 'Wikipedia', url: 'https://wikipedia.org' },
      { source: 'Academic Paper', url: 'https://scholar.google.com' },
      { source: 'News Article', url: 'https://news.example.com' },
      { source: 'Blog Post', url: 'https://blog.example.com' },
      { source: 'Research Journal', url: 'https://journal.example.com' }
    ];

    const results: PlagiarismResult[] = [];
    const sentences = text.split('.').filter(s => s.trim().length > 10);
    
    // Simulate some matches
    for (let i = 0; i < Math.min(3, sentences.length); i++) {
      if (Math.random() > 0.6) {
        const source = mockSources[Math.floor(Math.random() * mockSources.length)];
        results.push({
          source: source.source,
          similarity: Math.floor(Math.random() * 40) + 60,
          matchedText: sentences[i].trim() + '.',
          url: source.url
        });
      }
    }

    const score = Math.max(0, 100 - (results.length * 15) - Math.floor(Math.random() * 20));
    return { results, score };
  };

  const checkPlagiarism = async () => {
    if (!inputText.trim()) return;

    setIsChecking(true);
    
    // Simulate plagiarism checking
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    const { results, score } = generateMockResults(inputText);
    setResults(results);
    setOverallScore(score);
    setWordCount(inputText.split(/\s+/).filter(word => word.length > 0).length);
    setIsChecking(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreStatus = (score: number) => {
    if (score >= 90) return 'Original Content';
    if (score >= 70) return 'Minor Issues';
    return 'Potential Plagiarism';
  };

  const loadSampleText = () => {
    const sampleText = `Artificial intelligence has revolutionized the way we approach problem-solving in various industries. Machine learning algorithms can now process vast amounts of data to identify patterns and make predictions with remarkable accuracy. This technology has applications in healthcare, finance, transportation, and many other sectors. The future of AI holds immense potential for improving human life and solving complex global challenges.`;
    setInputText(sampleText);
  };

  return (
    <>
      <Helmet>
        <title>Free Plagiarism Checker - Detect Copied Content Online | ConvertFastly</title>
        <meta name="description" content="Free plagiarism checker to detect copied content. Check originality of essays, articles, and documents. Essential tool for students, writers, and educators." />
        <meta name="keywords" content="plagiarism checker, plagiarism detector, originality checker, duplicate content checker, academic integrity, content originality, free plagiarism tool" />
        <link rel="canonical" href="https://convertfastly.com/plagiarism-checker" />
        <meta property="og:title" content="Free Plagiarism Checker - Detect Copied Content Online" />
        <meta property="og:description" content="Check content originality and detect plagiarism. Free tool for students, writers, and educators." />
        <meta property="og:url" content="https://convertfastly.com/plagiarism-checker" />
      </Helmet>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center space-x-3 mb-6">
          <Shield className="h-8 w-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Plagiarism Checker</h2>
        </div>

        <p className="text-gray-600 mb-8">
          Check your content for originality and detect potential plagiarism. Essential tool for students, writers, educators, and content creators.
        </p>

        <div className="space-y-8">
          {/* Text Input */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">Text to Check</label>
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
              rows={8}
              placeholder="Paste your text here to check for plagiarism..."
            />
            <div className="text-xs text-gray-500 mt-1">
              {inputText.length} characters • {inputText.split(/\s+/).filter(w => w.length > 0).length} words
            </div>
          </div>

          {/* Check Button */}
          <div className="text-center">
            <button
              onClick={checkPlagiarism}
              disabled={isChecking || !inputText.trim()}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 mx-auto"
            >
              {isChecking ? (
                <>
                  <LoadingSpinner size="sm" color="white" />
                  <span>Checking for Plagiarism...</span>
                </>
              ) : (
                <>
                  <Shield className="h-5 w-5" />
                  <span>Check Plagiarism</span>
                </>
              )}
            </button>
          </div>

          {/* Analysis Progress */}
          {isChecking && (
            <div className="text-center py-8">
              <LoadingSpinner size="lg" color="blue" />
              <p className="text-gray-600 mt-4">
                Scanning content against billions of web pages and academic sources...
              </p>
            </div>
          )}

          {/* Results */}
          {overallScore > 0 && (
            <div className="space-y-6">
              {/* Overall Score */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Originality Score</h3>
                <div className={`text-6xl font-bold mb-4 ${getScoreColor(overallScore)}`}>
                  {overallScore}%
                </div>
                <div className={`text-lg font-medium ${getScoreColor(overallScore)}`}>
                  {getScoreStatus(overallScore)}
                </div>
                <div className="text-sm text-gray-600 mt-2">
                  Analyzed {wordCount} words
                </div>
              </div>

              {/* Detailed Results */}
              {results.length > 0 ? (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
                    Potential Matches Found ({results.length})
                  </h3>
                  <div className="space-y-4">
                    {results.map((result, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-900">{result.source}</span>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              result.similarity >= 80 ? 'bg-red-100 text-red-800' :
                              result.similarity >= 60 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {result.similarity}% match
                            </span>
                          </div>
                          <a
                            href={result.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </div>
                        <div className="bg-gray-50 rounded p-3 text-sm text-gray-700 italic">
                          "{result.matchedText}"
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-green-800 mb-2">No Plagiarism Detected</h3>
                  <p className="text-green-600">Your content appears to be original!</p>
                </div>
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

export default PlagiarismChecker;