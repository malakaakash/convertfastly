import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Globe, Copy, Download, Plus, Trash2, Calendar } from 'lucide-react';
import { useToolTracking } from '../../hooks/useToolTracking';

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}

const SitemapGenerator: React.FC = () => {
  useToolTracking('sitemap-generator');

  const [baseUrl, setBaseUrl] = useState<string>('');
  const [urls, setUrls] = useState<SitemapUrl[]>([
    { loc: '/', lastmod: new Date().toISOString().split('T')[0], changefreq: 'daily', priority: '1.0' }
  ]);
  const [generatedSitemap, setGeneratedSitemap] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const changeFreqOptions = [
    'always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'
  ];

  const addUrl = () => {
    setUrls([...urls, { 
      loc: '', 
      lastmod: new Date().toISOString().split('T')[0], 
      changefreq: 'weekly', 
      priority: '0.5' 
    }]);
  };

  const removeUrl = (index: number) => {
    setUrls(urls.filter((_, i) => i !== index));
  };

  const updateUrl = (index: number, field: keyof SitemapUrl, value: string) => {
    const newUrls = [...urls];
    newUrls[index] = { ...newUrls[index], [field]: value };
    setUrls(newUrls);
  };

  const generateSitemap = () => {
    if (!baseUrl.trim()) {
      setGeneratedSitemap('');
      return;
    }

    const cleanBaseUrl = baseUrl.replace(/\/$/, '');
    
    let sitemapContent = [];
    sitemapContent.push('<?xml version="1.0" encoding="UTF-8"?>');
    sitemapContent.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');

    urls.forEach(url => {
      if (url.loc.trim()) {
        sitemapContent.push('  <url>');
        sitemapContent.push(`    <loc>${cleanBaseUrl}${url.loc.startsWith('/') ? url.loc : '/' + url.loc}</loc>`);
        if (url.lastmod) {
          sitemapContent.push(`    <lastmod>${url.lastmod}</lastmod>`);
        }
        sitemapContent.push(`    <changefreq>${url.changefreq}</changefreq>`);
        sitemapContent.push(`    <priority>${url.priority}</priority>`);
        sitemapContent.push('  </url>');
      }
    });

    sitemapContent.push('</urlset>');
    setGeneratedSitemap(sitemapContent.join('\n'));
  };

  const copyToClipboard = async () => {
    if (generatedSitemap) {
      await navigator.clipboard.writeText(generatedSitemap);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadSitemap = () => {
    if (generatedSitemap) {
      const blob = new Blob([generatedSitemap], { type: 'application/xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'sitemap.xml';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const loadSampleSitemap = () => {
    setBaseUrl('https://example.com');
    setUrls([
      { loc: '/', lastmod: new Date().toISOString().split('T')[0], changefreq: 'daily', priority: '1.0' },
      { loc: '/about', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: '0.8' },
      { loc: '/products', lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly', priority: '0.9' },
      { loc: '/blog', lastmod: new Date().toISOString().split('T')[0], changefreq: 'daily', priority: '0.7' },
      { loc: '/contact', lastmod: new Date().toISOString().split('T')[0], changefreq: 'yearly', priority: '0.5' }
    ]);
  };

  React.useEffect(() => {
    generateSitemap();
  }, [baseUrl, urls]);

  return (
    <>
      <Helmet>
        <title>Free XML Sitemap Generator - Create SEO Sitemaps | ConvertFastly</title>
        <meta name="description" content="Generate XML sitemaps for your website. Improve SEO and help search engines discover your pages. Free sitemap generator with priority and frequency settings." />
        <meta name="keywords" content="sitemap generator, XML sitemap, SEO sitemap, website sitemap, search engine optimization, Google sitemap" />
        <link rel="canonical" href="https://convertfastly.com/sitemap-generator" />
        <meta property="og:title" content="Free XML Sitemap Generator - Create SEO Sitemaps" />
        <meta property="og:description" content="Generate XML sitemaps to improve SEO and help search engines discover your website pages." />
        <meta property="og:url" content="https://convertfastly.com/sitemap-generator" />
      </Helmet>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center space-x-3 mb-6">
          <Globe className="h-8 w-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">XML Sitemap Generator</h2>
        </div>

        <p className="text-gray-600 mb-8">
          Generate XML sitemaps to help search engines discover and index your website pages. Improve your SEO with proper sitemap structure.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Configuration */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Sitemap Configuration</h3>
              <button
                onClick={loadSampleSitemap}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Load Sample
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Website Base URL *</label>
              <input
                type="url"
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-gray-700">URLs to Include</label>
                <button
                  onClick={addUrl}
                  className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add URL</span>
                </button>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {urls.map((url, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-3">
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={url.loc}
                          onChange={(e) => updateUrl(index, 'loc', e.target.value)}
                          className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                          placeholder="/page-path"
                        />
                        <button
                          onClick={() => removeUrl(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2">
                        <input
                          type="date"
                          value={url.lastmod}
                          onChange={(e) => updateUrl(index, 'lastmod', e.target.value)}
                          className="px-2 py-1 border border-gray-300 rounded text-xs"
                        />
                        <select
                          value={url.changefreq}
                          onChange={(e) => updateUrl(index, 'changefreq', e.target.value)}
                          className="px-2 py-1 border border-gray-300 rounded text-xs"
                        >
                          {changeFreqOptions.map(freq => (
                            <option key={freq} value={freq}>{freq}</option>
                          ))}
                        </select>
                        <input
                          type="number"
                          min="0"
                          max="1"
                          step="0.1"
                          value={url.priority}
                          onChange={(e) => updateUrl(index, 'priority', e.target.value)}
                          className="px-2 py-1 border border-gray-300 rounded text-xs"
                          placeholder="0.5"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Generated Sitemap */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Generated Sitemap</h3>
              <div className="flex space-x-2">
                <button
                  onClick={copyToClipboard}
                  disabled={!generatedSitemap}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  <Copy className="h-4 w-4" />
                  <span>Copy</span>
                </button>
                <button
                  onClick={downloadSitemap}
                  disabled={!generatedSitemap}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  <Download className="h-4 w-4" />
                  <span>Download</span>
                </button>
              </div>
            </div>

            <div className="relative">
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm font-mono whitespace-pre-wrap min-h-[400px]">
                {generatedSitemap || '<!-- Generated XML sitemap will appear here -->'}
              </pre>
              {copied && (
                <div className="absolute top-2 right-2 bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                  Copied! ✓
                </div>
              )}
            </div>

            {/* Tips */}
            <div className="bg-green-50 rounded-lg p-6">
              <h4 className="font-semibold text-green-900 mb-3">SEO Tips</h4>
              <ul className="space-y-2 text-sm text-green-800">
                <li>• Submit sitemap to Google Search Console</li>
                <li>• Update lastmod dates when content changes</li>
                <li>• Use higher priority (0.8-1.0) for important pages</li>
                <li>• Set appropriate change frequencies</li>
                <li>• Keep sitemaps under 50,000 URLs</li>
                <li>• Include only canonical URLs</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SitemapGenerator;