import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Edit3, Wand2, Copy, Download, RefreshCw, Lightbulb, Target, ExternalLink } from 'lucide-react';
import LoadingSpinner from '../Common/LoadingSpinner';
import { useToolTracking } from '../../hooks/useToolTracking';
import PromotionRequestForm from '../Common/PromotionRequestForm';

const AIContentWriter: React.FC = () => {
  useToolTracking('ai-content-writer');

  const [contentType, setContentType] = useState<string>('blog-post');
  const [topic, setTopic] = useState<string>('');
  const [keywords, setKeywords] = useState<string>('');
  const [tone, setTone] = useState<string>('professional');
  const [length, setLength] = useState<string>('medium');
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const contentTypes = [
    { value: 'blog-post', label: 'Blog Post', desc: 'SEO-optimized blog articles' },
    { value: 'product-description', label: 'Product Description', desc: 'Compelling product copy' },
    { value: 'social-media', label: 'Social Media Post', desc: 'Engaging social content' },
    { value: 'email-subject', label: 'Email Subject Lines', desc: 'High-converting email subjects' },
    { value: 'meta-description', label: 'Meta Description', desc: 'SEO meta descriptions' },
    { value: 'ad-copy', label: 'Ad Copy', desc: 'Persuasive advertising copy' },
    { value: 'landing-page', label: 'Landing Page', desc: 'Conversion-focused page copy' },
    { value: 'press-release', label: 'Press Release', desc: 'Professional announcements' }
  ];

  const tones = [
    { value: 'professional', label: 'Professional' },
    { value: 'casual', label: 'Casual' },
    { value: 'friendly', label: 'Friendly' },
    { value: 'authoritative', label: 'Authoritative' },
    { value: 'conversational', label: 'Conversational' },
    { value: 'persuasive', label: 'Persuasive' },
    { value: 'informative', label: 'Informative' },
    { value: 'creative', label: 'Creative' }
  ];

  const lengths = [
    { value: 'short', label: 'Short', desc: '100-300 words' },
    { value: 'medium', label: 'Medium', desc: '300-800 words' },
    { value: 'long', label: 'Long', desc: '800-1500 words' },
    { value: 'very-long', label: 'Very Long', desc: '1500+ words' }
  ];

  const generateMockContent = (type: string, topic: string, tone: string, length: string): string => {
    const templates = {
      'blog-post': `# The Ultimate Guide to ${topic}

## Introduction

In today's digital landscape, ${topic} has become increasingly important for businesses and individuals alike. This comprehensive guide will walk you through everything you need to know about ${topic}, from basic concepts to advanced strategies.

## What is ${topic}?

${topic} refers to the process and techniques used to achieve specific goals in your field. Understanding the fundamentals is crucial for success.

## Key Benefits of ${topic}

1. **Improved Efficiency**: Streamline your workflow and save valuable time
2. **Better Results**: Achieve higher quality outcomes with proven methods
3. **Cost Effectiveness**: Reduce expenses while maximizing return on investment
4. **Competitive Advantage**: Stay ahead of the competition with cutting-edge approaches

## Best Practices for ${topic}

### Getting Started
Begin by understanding your specific needs and objectives. This foundation will guide all subsequent decisions and strategies.

### Implementation Strategy
Develop a systematic approach that includes planning, execution, and continuous improvement. Regular monitoring and adjustment are essential for long-term success.

## Conclusion

Mastering ${topic} requires dedication, practice, and the right tools. By following the strategies outlined in this guide, you'll be well-equipped to achieve your goals and drive meaningful results.`,

      'product-description': `Discover the power of ${topic} with our premium solution designed for modern professionals.

**Key Features:**
• Advanced functionality that delivers exceptional results
• User-friendly interface for seamless operation
• Professional-grade quality and reliability
• Comprehensive support and documentation

**Why Choose Our ${topic} Solution?**
Our product stands out from the competition with innovative features, superior performance, and unmatched value. Perfect for businesses of all sizes looking to enhance their operations.

**Specifications:**
- Premium quality materials and construction
- Compatible with industry standards
- Backed by our satisfaction guarantee
- Available with flexible pricing options

Transform your workflow today with the ultimate ${topic} solution!`,

      'social-media': `🚀 Excited to share insights about ${topic}! 

Did you know that ${topic} can significantly impact your success? Here are 3 key benefits:

✅ Increased efficiency and productivity
✅ Better results with less effort  
✅ Competitive advantage in your field

What's your experience with ${topic}? Share your thoughts below! 👇

#${topic.replace(/\s+/g, '')} #productivity #success #tips`,

      'email-subject': `• Unlock the Secret to ${topic} Success
• 5 ${topic} Mistakes That Are Costing You Money
• The Ultimate ${topic} Guide (Free Download)
• How I Improved My ${topic} Results by 300%
• ${topic}: What Nobody Tells You
• Stop Struggling with ${topic} - Try This Instead
• The ${topic} Strategy That Changed Everything
• ${topic} Made Simple: A Step-by-Step Guide`,

      'meta-description': `Discover everything you need to know about ${topic}. Get expert tips, best practices, and proven strategies to achieve better results. Free comprehensive guide with actionable insights.`,

      'ad-copy': `**Transform Your Results with ${topic}**

Tired of struggling with ${topic}? Our proven solution helps you achieve better results in less time.

✓ Easy to implement
✓ Immediate results
✓ Expert support included
✓ 30-day money-back guarantee

Join thousands of satisfied customers who've already transformed their approach to ${topic}.

**Limited Time Offer - Get Started Today!**

[Call to Action Button]`,

      'landing-page': `# Revolutionize Your Approach to ${topic}

## The Problem
Most people struggle with ${topic} because they lack the right tools and strategies. This leads to wasted time, poor results, and frustration.

## The Solution
Our comprehensive ${topic} system provides everything you need to succeed:

### ✨ Key Benefits
- **Save Time**: Streamlined processes that work
- **Better Results**: Proven strategies that deliver
- **Expert Support**: Get help when you need it
- **Guaranteed Success**: 30-day money-back guarantee

### 🎯 What You Get
1. Complete ${topic} toolkit
2. Step-by-step implementation guide
3. Expert video tutorials
4. 24/7 customer support
5. Regular updates and improvements

## Ready to Get Started?

Join thousands of successful users who've transformed their ${topic} results.

[Get Started Now - Special Offer]`,

      'press-release': `FOR IMMEDIATE RELEASE

**Revolutionary ${topic} Solution Launches to Transform Industry Standards**

*New platform delivers unprecedented results for businesses and professionals*

[City, Date] - Today marks the launch of an innovative ${topic} solution that promises to revolutionize how professionals approach their work. This groundbreaking platform combines cutting-edge technology with proven methodologies to deliver exceptional results.

**Key Highlights:**
- Advanced ${topic} capabilities
- User-friendly interface design
- Comprehensive feature set
- Industry-leading performance

"We're excited to introduce this game-changing solution to the market," said [Spokesperson Name]. "Our ${topic} platform addresses real challenges that professionals face daily."

The platform is now available and offers both free and premium tiers to accommodate different user needs.

**About [Company Name]**
[Company Name] is a leading provider of innovative solutions for modern professionals. Founded in [Year], the company has helped thousands of users achieve their goals through technology-driven solutions.

For more information, visit [Website] or contact [Contact Information].

###`
    };

    return templates[type as keyof typeof templates] || templates['blog-post'];
  };

  const generateContent = async () => {
    if (!topic.trim()) return;

    setIsGenerating(true);
    
    // Simulate AI content generation
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    const content = generateMockContent(contentType, topic, tone, length);
    setGeneratedContent(content);
    setIsGenerating(false);
  };

  const copyToClipboard = async () => {
    if (generatedContent) {
      await navigator.clipboard.writeText(generatedContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadContent = () => {
    if (generatedContent) {
      const blob = new Blob([generatedContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ai-generated-${contentType}-${Date.now()}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const loadSampleData = () => {
    setTopic('password security');
    setKeywords('password generator, secure passwords, online security, cybersecurity');
    setContentType('blog-post');
    setTone('professional');
    setLength('medium');
  };

  return (
    <>
      <Helmet>
        <title>Free AI Content Writer - Generate SEO Content with AI | ConvertFastly</title>
        <meta name="description" content="Generate high-quality content with AI. Create blog posts, product descriptions, social media content, and more. Free alternative to Copy.ai and Jasper.ai." />
        <meta name="keywords" content="AI content writer, AI copywriter, content generator, Copy.ai alternative, Jasper alternative, AI writing tool, content creation, blog post generator" />
        <link rel="canonical" href="https://convertfastly.com/ai-content-writer" />
        <meta property="og:title" content="Free AI Content Writer - Generate SEO Content with AI" />
        <meta property="og:description" content="Create high-quality content with AI. Perfect alternative to Copy.ai and Jasper for content creators." />
        <meta property="og:url" content="https://convertfastly.com/ai-content-writer" />
      </Helmet>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center space-x-3 mb-6">
          <Edit3 className="h-8 w-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">AI Content Writer</h2>
        </div>

        <p className="text-gray-600 mb-8">
          Generate high-quality content with AI. Create blog posts, product descriptions, social media content, and more. Perfect alternative to Copy.ai and Jasper.ai.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Content Settings</h3>
              <button
                onClick={loadSampleData}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Load Sample
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Content Type</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {contentTypes.slice(0, 6).map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setContentType(type.value)}
                    className={`p-3 text-left border rounded-lg transition-colors ${
                      contentType === type.value
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="font-medium">{type.label}</div>
                    <div className="text-xs text-gray-500">{type.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Topic/Subject</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your topic or subject..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Target Keywords (optional)</label>
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="keyword1, keyword2, keyword3"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tone</label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {tones.map((toneOption) => (
                    <option key={toneOption.value} value={toneOption.value}>
                      {toneOption.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Length</label>
                <select
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {lengths.map((lengthOption) => (
                    <option key={lengthOption.value} value={lengthOption.value}>
                      {lengthOption.label} ({lengthOption.desc})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={generateContent}
              disabled={isGenerating || !topic.trim()}
              className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <LoadingSpinner size="sm" color="white" />
                  <span>Generating Content...</span>
                </>
              ) : (
                <>
                  <Wand2 className="h-5 w-5" />
                  <span>Generate Content</span>
                </>
              )}
            </button>

            {/* Features */}
            <div className="bg-purple-50 rounded-lg p-6">
              <h4 className="font-semibold text-purple-900 mb-3 flex items-center">
                <Lightbulb className="h-5 w-5 mr-2" />
                Perfect For
              </h4>
              <ul className="space-y-2 text-sm text-purple-800">
                <li>• Content marketers and bloggers</li>
                <li>• E-commerce product descriptions</li>
                <li>• Social media managers</li>
                <li>• Email marketing campaigns</li>
                <li>• SEO content optimization</li>
                <li>• Creative writing projects</li>
              </ul>
            </div>
          </div>

          {/* Output Section */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">Generated Content</label>
                {generatedContent && (
                  <div className="flex space-x-2">
                    <button
                      onClick={copyToClipboard}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                    <button
                      onClick={downloadContent}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                    <button
                      onClick={generateContent}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
              
              <div className="relative">
                <div className="w-full min-h-[500px] px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 overflow-y-auto">
                  {generatedContent ? (
                    <div className="prose prose-sm max-w-none">
                      <pre className="whitespace-pre-wrap text-gray-900 leading-relaxed font-sans">
                        {generatedContent}
                      </pre>
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">Your AI-generated content will appear here...</p>
                  )}
                </div>
                
                {copied && (
                  <div className="absolute top-2 right-2 bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                    Copied! ✓
                  </div>
                )}
              </div>
              
              {generatedContent && (
                <div className="text-xs text-gray-500">
                  {generatedContent.split(/\s+/).filter(w => w.length > 0).length} words • {generatedContent.length} characters
                </div>
              )}
            </div>

            {/* Promotion Request Form */}
            <PromotionRequestForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default AIContentWriter;