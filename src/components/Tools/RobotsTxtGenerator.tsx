import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Bot, Copy, Download, Settings, Globe } from 'lucide-react';
import { useToolTracking } from '../../hooks/useToolTracking';

interface RobotRule {
  userAgent: string;
  allow: string[];
  disallow: string[];
}

const RobotsTxtGenerator: React.FC = () => {
  useToolTracking('robots-txt-generator');

  const [rules, setRules] = useState<RobotRule[]>([
    { userAgent: '*', allow: [], disallow: [] }
  ]);
  const [sitemapUrl, setSitemapUrl] = useState<string>('');
  const [crawlDelay, setCrawlDelay] = useState<string>('');
  const [host, setHost] = useState<string>('');
  const [generatedRobots, setGeneratedRobots] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const addRule = () => {
    setRules([...rules, { userAgent: '*', allow: [], disallow: [] }]);
  };

  const removeRule = (index: number) => {
    setRules(rules.filter((_, i) => i !== index));
  };

  const updateRule = (index: number, field: keyof RobotRule, value: any) => {
    const newRules = [...rules];
    newRules[index] = { ...newRules[index], [field]: value };
    setRules(newRules);
  };

  const addPath = (ruleIndex: number, type: 'allow' | 'disallow', path: string) => {
    if (!path.trim()) return;
    
    const newRules = [...rules];
    newRules[ruleIndex][type] = [...newRules[ruleIndex][type], path];
    setRules(newRules);
  };

  const removePath = (ruleIndex: number, type: 'allow' | 'disallow', pathIndex: number) => {
    const newRules = [...rules];
    newRules[ruleIndex][type] = newRules[ruleIndex][type].filter((_, i) => i !== pathIndex);
    setRules(newRules);
  };

  const generateRobotsTxt = () => {
    let robotsContent = [];

    // Add rules
    rules.forEach(rule => {
      robotsContent.push(`User-agent: ${rule.userAgent}`);
      
      rule.disallow.forEach(path => {
        robotsContent.push(`Disallow: ${path}`);
      });
      
      rule.allow.forEach(path => {
        robotsContent.push(`Allow: ${path}`);
      });
      
      if (crawlDelay && rule.userAgent === '*') {
        robotsContent.push(`Crawl-delay: ${crawlDelay}`);
      }
      
      robotsContent.push(''); // Empty line between rules
    });

    // Add sitemap
    if (sitemapUrl) {
      robotsContent.push(`Sitemap: ${sitemapUrl}`);
    }

    // Add host
    if (host) {
      robotsContent.push(`Host: ${host}`);
    }

    setGeneratedRobots(robotsContent.join('\n'));
  };

  const copyToClipboard = async () => {
    if (generatedRobots) {
      await navigator.clipboard.writeText(generatedRobots);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadRobots = () => {
    if (generatedRobots) {
      const blob = new Blob([generatedRobots], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'robots.txt';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const loadPreset = (preset: string) => {
    switch (preset) {
      case 'allow-all':
        setRules([{ userAgent: '*', allow: ['/'], disallow: [] }]);
        break;
      case 'block-all':
        setRules([{ userAgent: '*', allow: [], disallow: ['/'] }]);
        break;
      case 'wordpress':
        setRules([
          { 
            userAgent: '*', 
            allow: [], 
            disallow: ['/wp-admin/', '/wp-includes/', '/wp-content/plugins/', '/wp-content/themes/'] 
          }
        ]);
        break;
      case 'ecommerce':
        setRules([
          { 
            userAgent: '*', 
            allow: [], 
            disallow: ['/admin/', '/cart/', '/checkout/', '/account/', '/search/'] 
          }
        ]);
        break;
    }
  };

  React.useEffect(() => {
    generateRobotsTxt();
  }, [rules, sitemapUrl, crawlDelay, host]);

  return (
    <>
      <Helmet>
        <title>Free Robots.txt Generator - Create SEO Robots File | ConvertFastly</title>
        <meta name="description" content="Generate robots.txt files for your website. Control search engine crawling, set crawl delays, and specify sitemaps. Free SEO tool for webmasters." />
        <meta name="keywords" content="robots.txt generator, robots file generator, SEO robots, crawl control, search engine optimization, webmaster tools" />
        <link rel="canonical" href="https://convertfastly.com/robots-txt-generator" />
        <meta property="og:title" content="Free Robots.txt Generator - Create SEO Robots File" />
        <meta property="og:description" content="Generate robots.txt files to control search engine crawling and improve SEO." />
        <meta property="og:url" content="https://convertfastly.com/robots-txt-generator" />
      </Helmet>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center space-x-3 mb-6">
          <Bot className="h-8 w-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Robots.txt Generator</h2>
        </div>

        <p className="text-gray-600 mb-8">
          Generate robots.txt files to control how search engines crawl your website. Set crawl rules, delays, and specify sitemaps.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Configuration */}
          <div className="space-y-6">
            {/* Presets */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Quick Presets</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { key: 'allow-all', label: 'Allow All' },
                  { key: 'block-all', label: 'Block All' },
                  { key: 'wordpress', label: 'WordPress' },
                  { key: 'ecommerce', label: 'E-commerce' }
                ].map((preset) => (
                  <button
                    key={preset.key}
                    onClick={() => loadPreset(preset.key)}
                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Rules */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-gray-700">Crawl Rules</label>
                <button
                  onClick={addRule}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  + Add Rule
                </button>
              </div>
              
              <div className="space-y-4">
                {rules.map((rule, ruleIndex) => (
                  <div key={ruleIndex} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <input
                        type="text"
                        value={rule.userAgent}
                        onChange={(e) => updateRule(ruleIndex, 'userAgent', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 mr-3"
                        placeholder="User-agent (e.g., *, Googlebot)"
                      />
                      {rules.length > 1 && (
                        <button
                          onClick={() => removeRule(ruleIndex)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-2">Disallow Paths</label>
                        <div className="space-y-2">
                          {rule.disallow.map((path, pathIndex) => (
                            <div key={pathIndex} className="flex items-center space-x-2">
                              <input
                                type="text"
                                value={path}
                                onChange={(e) => {
                                  const newRules = [...rules];
                                  newRules[ruleIndex].disallow[pathIndex] = e.target.value;
                                  setRules(newRules);
                                }}
                                className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                              />
                              <button
                                onClick={() => removePath(ruleIndex, 'disallow', pathIndex)}
                                className="text-red-600 hover:text-red-800 text-xs"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                          <input
                            type="text"
                            placeholder="Add disallow path"
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                addPath(ruleIndex, 'disallow', e.currentTarget.value);
                                e.currentTarget.value = '';
                              }
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-2">Allow Paths</label>
                        <div className="space-y-2">
                          {rule.allow.map((path, pathIndex) => (
                            <div key={pathIndex} className="flex items-center space-x-2">
                              <input
                                type="text"
                                value={path}
                                onChange={(e) => {
                                  const newRules = [...rules];
                                  newRules[ruleIndex].allow[pathIndex] = e.target.value;
                                  setRules(newRules);
                                }}
                                className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                              />
                              <button
                                onClick={() => removePath(ruleIndex, 'allow', pathIndex)}
                                className="text-red-600 hover:text-red-800 text-xs"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                          <input
                            type="text"
                            placeholder="Add allow path"
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                addPath(ruleIndex, 'allow', e.currentTarget.value);
                                e.currentTarget.value = '';
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Settings */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sitemap URL</label>
                <input
                  type="url"
                  value={sitemapUrl}
                  onChange={(e) => setSitemapUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/sitemap.xml"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Crawl Delay (seconds)</label>
                <input
                  type="number"
                  value={crawlDelay}
                  onChange={(e) => setCrawlDelay(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="10"
                />
              </div>
            </div>
          </div>

          {/* Generated Robots.txt */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Generated robots.txt</h3>
              <div className="flex space-x-2">
                <button
                  onClick={copyToClipboard}
                  disabled={!generatedRobots}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  <Copy className="h-4 w-4" />
                  <span>Copy</span>
                </button>
                <button
                  onClick={downloadRobots}
                  disabled={!generatedRobots}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  <Download className="h-4 w-4" />
                  <span>Download</span>
                </button>
              </div>
            </div>

            <div className="relative">
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm font-mono whitespace-pre-wrap min-h-[300px]">
                {generatedRobots || '# Generated robots.txt will appear here'}
              </pre>
              {copied && (
                <div className="absolute top-2 right-2 bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                  Copied! ✓
                </div>
              )}
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                How to Use
              </h4>
              <ol className="space-y-2 text-sm text-blue-800">
                <li>1. Download the generated robots.txt file</li>
                <li>2. Upload it to your website's root directory</li>
                <li>3. Make it accessible at: yoursite.com/robots.txt</li>
                <li>4. Test with Google Search Console</li>
              </ol>
            </div>

            {/* Common Examples */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-3">Common Patterns</h4>
              <div className="space-y-2 text-sm text-gray-700">
                <div><code>/admin/</code> - Block admin areas</div>
                <div><code>/private/</code> - Block private content</div>
                <div><code>/search/</code> - Block search result pages</div>
                <div><code>*.pdf</code> - Block all PDF files</div>
                <div><code>/wp-admin/</code> - Block WordPress admin</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RobotsTxtGenerator;