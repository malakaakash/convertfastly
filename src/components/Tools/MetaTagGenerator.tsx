import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Code, Copy, Download, Globe, Image, Twitter } from 'lucide-react';
import { useToolTracking } from '../../hooks/useToolTracking';

const MetaTagGenerator: React.FC = () => {
  useToolTracking('meta-tag-generator');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    keywords: '',
    author: '',
    canonical: '',
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    ogUrl: '',
    twitterTitle: '',
    twitterDescription: '',
    twitterImage: '',
    robotsIndex: true,
    robotsFollow: true,
    viewport: 'width=device-width, initial-scale=1.0',
    charset: 'UTF-8'
  });

  const [generatedTags, setGeneratedTags] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const generateMetaTags = () => {
    let tags = [];

    // Basic meta tags
    if (formData.charset) {
      tags.push(`<meta charset="${formData.charset}">`);
    }
    
    if (formData.viewport) {
      tags.push(`<meta name="viewport" content="${formData.viewport}">`);
    }

    if (formData.title) {
      tags.push(`<title>${formData.title}</title>`);
    }

    if (formData.description) {
      tags.push(`<meta name="description" content="${formData.description}">`);
    }

    if (formData.keywords) {
      tags.push(`<meta name="keywords" content="${formData.keywords}">`);
    }

    if (formData.author) {
      tags.push(`<meta name="author" content="${formData.author}">`);
    }

    if (formData.canonical) {
      tags.push(`<link rel="canonical" href="${formData.canonical}">`);
    }

    // Robots meta tag
    const robotsContent = [];
    if (formData.robotsIndex) robotsContent.push('index');
    else robotsContent.push('noindex');
    if (formData.robotsFollow) robotsContent.push('follow');
    else robotsContent.push('nofollow');
    tags.push(`<meta name="robots" content="${robotsContent.join(', ')}">`);

    // Open Graph tags
    if (formData.ogTitle || formData.title) {
      tags.push(`<meta property="og:title" content="${formData.ogTitle || formData.title}">`);
    }

    if (formData.ogDescription || formData.description) {
      tags.push(`<meta property="og:description" content="${formData.ogDescription || formData.description}">`);
    }

    if (formData.ogImage) {
      tags.push(`<meta property="og:image" content="${formData.ogImage}">`);
    }

    if (formData.ogUrl) {
      tags.push(`<meta property="og:url" content="${formData.ogUrl}">`);
    }

    tags.push(`<meta property="og:type" content="website">`);

    // Twitter Card tags
    tags.push(`<meta name="twitter:card" content="summary_large_image">`);
    
    if (formData.twitterTitle || formData.title) {
      tags.push(`<meta name="twitter:title" content="${formData.twitterTitle || formData.title}">`);
    }

    if (formData.twitterDescription || formData.description) {
      tags.push(`<meta name="twitter:description" content="${formData.twitterDescription || formData.description}">`);
    }

    if (formData.twitterImage || formData.ogImage) {
      tags.push(`<meta name="twitter:image" content="${formData.twitterImage || formData.ogImage}">`);
    }

    setGeneratedTags(tags.join('\n'));
  };

  const copyToClipboard = async () => {
    if (generatedTags) {
      await navigator.clipboard.writeText(generatedTags);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadTags = () => {
    if (generatedTags) {
      const blob = new Blob([generatedTags], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'meta-tags.html';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const loadSampleData = () => {
    setFormData({
      title: 'ConvertFastly - Free Online Tools & Converters',
      description: 'Access 20+ free online tools including file converter, image resizer, password generator, and more. Fast, secure, browser-based tools.',
      keywords: 'online tools, file converter, image resizer, password generator, free tools',
      author: 'ConvertFastly Team',
      canonical: 'https://convertfastly.com/',
      ogTitle: 'ConvertFastly - Free Online Tools & Converters',
      ogDescription: 'Access 20+ free online tools for all your conversion needs. Fast, secure, and completely free.',
      ogImage: 'https://convertfastly.com/og-image.png',
      ogUrl: 'https://convertfastly.com/',
      twitterTitle: 'ConvertFastly - Free Online Tools',
      twitterDescription: 'Access 20+ free online tools for all your conversion needs.',
      twitterImage: 'https://convertfastly.com/twitter-image.png',
      robotsIndex: true,
      robotsFollow: true,
      viewport: 'width=device-width, initial-scale=1.0',
      charset: 'UTF-8'
    });
  };

  React.useEffect(() => {
    generateMetaTags();
  }, [formData]);

  return (
    <>
      <Helmet>
        <title>Free Meta Tag Generator - Create SEO Meta Tags | ConvertFastly</title>
        <meta name="description" content="Generate SEO-optimized meta tags for your website. Create title tags, meta descriptions, Open Graph tags, and Twitter Cards. Free meta tag generator tool." />
        <meta name="keywords" content="meta tag generator, SEO meta tags, Open Graph generator, Twitter Cards, meta description generator, title tag generator" />
        <link rel="canonical" href="https://convertfastly.com/meta-tag-generator" />
        <meta property="og:title" content="Free Meta Tag Generator - Create SEO Meta Tags" />
        <meta property="og:description" content="Generate SEO-optimized meta tags, Open Graph tags, and Twitter Cards for better search engine visibility." />
        <meta property="og:url" content="https://convertfastly.com/meta-tag-generator" />
      </Helmet>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center space-x-3 mb-6">
          <Code className="h-8 w-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Meta Tag Generator</h2>
        </div>

        <p className="text-gray-600 mb-8">
          Generate SEO-optimized meta tags for your website. Create title tags, meta descriptions, Open Graph tags, and Twitter Cards for better search visibility.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Website Information</h3>
              <button
                onClick={loadSampleData}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Load Sample
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Page Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Your page title (50-60 characters)"
                />
                <div className="text-xs text-gray-500 mt-1">{formData.title.length}/60 characters</div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Brief description of your page (150-160 characters)"
                />
                <div className="text-xs text-gray-500 mt-1">{formData.description.length}/160 characters</div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Keywords</label>
                <input
                  type="text"
                  value={formData.keywords}
                  onChange={(e) => setFormData({...formData, keywords: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="keyword1, keyword2, keyword3"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({...formData, author: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Author name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Canonical URL</label>
                  <input
                    type="url"
                    value={formData.canonical}
                    onChange={(e) => setFormData({...formData, canonical: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/page"
                  />
                </div>
              </div>

              {/* Open Graph */}
              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <Globe className="h-4 w-4 mr-2" />
                  Open Graph (Facebook)
                </h4>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={formData.ogTitle}
                    onChange={(e) => setFormData({...formData, ogTitle: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="OG Title (leave empty to use page title)"
                  />
                  <textarea
                    value={formData.ogDescription}
                    onChange={(e) => setFormData({...formData, ogDescription: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows={2}
                    placeholder="OG Description (leave empty to use meta description)"
                  />
                  <input
                    type="url"
                    value={formData.ogImage}
                    onChange={(e) => setFormData({...formData, ogImage: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="OG Image URL (1200x630px recommended)"
                  />
                </div>
              </div>

              {/* Twitter Cards */}
              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <Twitter className="h-4 w-4 mr-2" />
                  Twitter Cards
                </h4>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={formData.twitterTitle}
                    onChange={(e) => setFormData({...formData, twitterTitle: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Twitter Title (leave empty to use page title)"
                  />
                  <textarea
                    value={formData.twitterDescription}
                    onChange={(e) => setFormData({...formData, twitterDescription: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows={2}
                    placeholder="Twitter Description"
                  />
                  <input
                    type="url"
                    value={formData.twitterImage}
                    onChange={(e) => setFormData({...formData, twitterImage: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Twitter Image URL"
                  />
                </div>
              </div>

              {/* Robots Settings */}
              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-900 mb-3">Robots Settings</h4>
                <div className="flex space-x-6">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="robotsIndex"
                      checked={formData.robotsIndex}
                      onChange={(e) => setFormData({...formData, robotsIndex: e.target.checked})}
                      className="rounded border-gray-300"
                    />
                    <label htmlFor="robotsIndex" className="text-sm text-gray-700">Index</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="robotsFollow"
                      checked={formData.robotsFollow}
                      onChange={(e) => setFormData({...formData, robotsFollow: e.target.checked})}
                      className="rounded border-gray-300"
                    />
                    <label htmlFor="robotsFollow" className="text-sm text-gray-700">Follow</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Generated Tags */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Generated Meta Tags</h3>
              <div className="flex space-x-2">
                <button
                  onClick={copyToClipboard}
                  disabled={!generatedTags}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  <Copy className="h-4 w-4" />
                  <span>Copy</span>
                </button>
                <button
                  onClick={downloadTags}
                  disabled={!generatedTags}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  <Download className="h-4 w-4" />
                  <span>Download</span>
                </button>
              </div>
            </div>

            <div className="relative">
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm font-mono whitespace-pre-wrap">
                {generatedTags || '<!-- Generated meta tags will appear here -->'}
              </pre>
              {copied && (
                <div className="absolute top-2 right-2 bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                  Copied! ✓
                </div>
              )}
            </div>

            {/* Preview */}
            {formData.title && formData.description && (
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Search Result Preview</h4>
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="text-blue-600 text-lg hover:underline cursor-pointer">
                    {formData.title}
                  </div>
                  <div className="text-green-700 text-sm">
                    {formData.canonical || 'https://example.com'}
                  </div>
                  <div className="text-gray-600 text-sm mt-1">
                    {formData.description}
                  </div>
                </div>
              </div>
            )}

            {/* Tips */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h4 className="font-semibold text-blue-900 mb-3">SEO Tips</h4>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>• Keep titles under 60 characters</li>
                <li>• Meta descriptions should be 150-160 characters</li>
                <li>• Use relevant keywords naturally</li>
                <li>• OG images should be 1200x630px</li>
                <li>• Always include canonical URLs</li>
                <li>• Test your meta tags with social media debuggers</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MetaTagGenerator;