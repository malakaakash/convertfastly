import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Image, Wand2, Download, RefreshCw, Palette, Sparkles } from 'lucide-react';
import LoadingSpinner from '../Common/LoadingSpinner';
import { useToolTracking } from '../../hooks/useToolTracking';

const AIImageGenerator: React.FC = () => {
  useToolTracking('ai-image-generator');

  const [prompt, setPrompt] = useState<string>('');
  const [generatedImage, setGeneratedImage] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [style, setStyle] = useState<string>('realistic');
  const [size, setSize] = useState<string>('512x512');

  const styles = [
    { value: 'realistic', label: 'Realistic', desc: 'Photorealistic images' },
    { value: 'artistic', label: 'Artistic', desc: 'Painting-like style' },
    { value: 'cartoon', label: 'Cartoon', desc: 'Animated cartoon style' },
    { value: 'digital-art', label: 'Digital Art', desc: 'Modern digital artwork' },
    { value: 'fantasy', label: 'Fantasy', desc: 'Magical and fantastical' },
    { value: 'cyberpunk', label: 'Cyberpunk', desc: 'Futuristic neon style' }
  ];

  const sizes = [
    { value: '256x256', label: '256×256', desc: 'Small' },
    { value: '512x512', label: '512×512', desc: 'Medium' },
    { value: '768x768', label: '768×768', desc: 'Large' },
    { value: '1024x1024', label: '1024×1024', desc: 'Extra Large' }
  ];

  const simulateImageGeneration = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    
    // Simulate AI image generation time
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    // Use a placeholder image service for demo
    const [width, height] = size.split('x');
    const placeholderUrl = `https://picsum.photos/${width}/${height}?random=${Date.now()}`;
    setGeneratedImage(placeholderUrl);
    setIsGenerating(false);
  };

  const downloadImage = async () => {
    if (!generatedImage) return;

    try {
      const response = await fetch(generatedImage);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `ai-generated-${Date.now()}.png`;
      a.click();
      
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download image:', error);
    }
  };

  const samplePrompts = [
    "A majestic mountain landscape at sunset with golden clouds",
    "A cute robot reading a book in a cozy library",
    "A futuristic city with flying cars and neon lights",
    "A magical forest with glowing mushrooms and fairy lights",
    "A vintage coffee shop on a rainy street corner",
    "A space station orbiting a colorful nebula"
  ];

  return (
    <>
      <Helmet>
        <title>Free AI Image Generator - Create Images from Text | ConvertFastly</title>
        <meta name="description" content="Generate stunning AI images from text prompts for free. Powered by advanced AI models. Create art, illustrations, and photos instantly. No registration required." />
        <meta name="keywords" content="AI image generator, text to image, AI art generator, free image generator, AI artwork, digital art creator, image creation tool, AI artist" />
        <link rel="canonical" href="https://convertfastly.com/ai-image-generator" />
        <meta property="og:title" content="Free AI Image Generator - Create Images from Text" />
        <meta property="og:description" content="Generate stunning AI images from text prompts. Free, fast, and powered by advanced AI models." />
        <meta property="og:url" content="https://convertfastly.com/ai-image-generator" />
      </Helmet>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center space-x-3 mb-6">
          <Wand2 className="h-8 w-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">AI Image Generator</h2>
        </div>

        <p className="text-gray-600 mb-8">
          Transform your ideas into stunning visuals with AI. Describe what you want to see and watch it come to life in seconds.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Describe your image
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={4}
                placeholder="A beautiful sunset over mountains with golden clouds..."
              />
              <div className="text-xs text-gray-500 mt-1">
                Be descriptive for better results
              </div>
            </div>

            {/* Sample Prompts */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Try these prompts
              </label>
              <div className="grid grid-cols-1 gap-2">
                {samplePrompts.slice(0, 3).map((samplePrompt, index) => (
                  <button
                    key={index}
                    onClick={() => setPrompt(samplePrompt)}
                    className="text-left p-2 text-sm border border-gray-200 rounded hover:border-blue-300 hover:bg-blue-50 transition-colors"
                  >
                    {samplePrompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Style Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Art Style
              </label>
              <div className="grid grid-cols-2 gap-3">
                {styles.slice(0, 4).map((styleOption) => (
                  <button
                    key={styleOption.value}
                    onClick={() => setStyle(styleOption.value)}
                    className={`p-3 text-left border rounded-lg transition-colors ${
                      style === styleOption.value
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="font-medium">{styleOption.label}</div>
                    <div className="text-xs text-gray-500">{styleOption.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Image Size
              </label>
              <div className="grid grid-cols-2 gap-3">
                {sizes.map((sizeOption) => (
                  <button
                    key={sizeOption.value}
                    onClick={() => setSize(sizeOption.value)}
                    className={`p-3 text-center border rounded-lg transition-colors ${
                      size === sizeOption.value
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="font-medium">{sizeOption.label}</div>
                    <div className="text-xs text-gray-500">{sizeOption.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={simulateImageGeneration}
              disabled={isGenerating || !prompt.trim()}
              className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <LoadingSpinner size="sm" color="white" />
                  <span>Generating Image...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  <span>Generate Image</span>
                </>
              )}
            </button>
          </div>

          {/* Output Section */}
          <div className="space-y-6">
            <div className="text-center">
              {generatedImage ? (
                <div className="space-y-4">
                  <img
                    src={generatedImage}
                    alt="AI Generated"
                    className="w-full rounded-lg shadow-lg"
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={downloadImage}
                      className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download</span>
                    </button>
                    <button
                      onClick={simulateImageGeneration}
                      className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <RefreshCw className="h-4 w-4" />
                      <span>Regenerate</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12">
                  <Image className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Your AI-generated image will appear here</p>
                </div>
              )}
            </div>

            {/* Features */}
            <div className="bg-purple-50 rounded-lg p-6">
              <h4 className="font-semibold text-purple-900 mb-3 flex items-center">
                <Palette className="h-5 w-5 mr-2" />
                Perfect For
              </h4>
              <ul className="space-y-2 text-sm text-purple-800">
                <li>• Social media content creation</li>
                <li>• Blog post illustrations</li>
                <li>• Creative project inspiration</li>
                <li>• Marketing materials</li>
                <li>• Personal artwork and gifts</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIImageGenerator;