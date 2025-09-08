import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Image, Download, Globe, CheckCircle, AlertTriangle } from 'lucide-react';
import LoadingSpinner from '../Common/LoadingSpinner';
import { useToolTracking } from '../../hooks/useToolTracking';

interface ThumbnailOption {
  size: string;
  label: string;
  description: string;
  dimensions: string;
}

const YouTubeThumbnailDownloader: React.FC = () => {
  useToolTracking('youtube-thumbnail-downloader');

  const [url, setUrl] = useState<string>('');
  const [isValidUrl, setIsValidUrl] = useState<boolean>(false);
  const [videoTitle, setVideoTitle] = useState<string>('');
  const [videoId, setVideoId] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('maxresdefault');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const thumbnailSizes: ThumbnailOption[] = [
    { size: 'maxresdefault', label: 'Maximum Resolution', description: 'Highest quality available', dimensions: '1280×720' },
    { size: 'sddefault', label: 'Standard Definition', description: 'Good quality', dimensions: '640×480' },
    { size: 'hqdefault', label: 'High Quality', description: 'Medium quality', dimensions: '480×360' },
    { size: 'mqdefault', label: 'Medium Quality', description: 'Standard quality', dimensions: '320×180' },
    { size: 'default', label: 'Default', description: 'Basic quality', dimensions: '120×90' }
  ];

  const validateYouTubeUrl = (inputUrl: string): boolean => {
    const patterns = [
      /^https?:\/\/(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)/,
      /^https?:\/\/(www\.)?youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]{11})/,
      /^https?:\/\/youtu\.be\/([a-zA-Z0-9_-]{11})/
    ];
    
    return patterns.some(pattern => pattern.test(inputUrl));
  };

  const extractVideoId = (inputUrl: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/,
      /^([a-zA-Z0-9_-]{11})$/
    ];
    
    for (const pattern of patterns) {
      const match = inputUrl.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const handleUrlChange = async (inputUrl: string) => {
    setUrl(inputUrl);
    setError('');
    setVideoTitle('');
    setVideoId('');
    
    if (inputUrl.trim()) {
      const isValid = validateYouTubeUrl(inputUrl);
      setIsValidUrl(isValid);
      
      if (isValid) {
        const id = extractVideoId(inputUrl);
        if (id) {
          setVideoId(id);
          await fetchVideoInfo(id);
        }
      } else {
        setError('Please enter a valid YouTube URL');
      }
    } else {
      setIsValidUrl(false);
    }
  };

  const fetchVideoInfo = async (id: string) => {
    setIsLoading(true);
    
    try {
      // In production, this would call your backend API
      // For demo, we'll simulate fetching video info
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock video title - in production, use YouTube API or yt-dlp
      const mockTitles = [
        "Amazing Tutorial: Learn Something New Today",
        "Top 10 Tips for Better Productivity",
        "Complete Guide to Web Development",
        "Music Video - Artist Name",
        "Documentary: The Future of Technology"
      ];
      
      setVideoTitle(mockTitles[Math.floor(Math.random() * mockTitles.length)]);
    } catch (err) {
      setError('Could not fetch video information');
    }
    
    setIsLoading(false);
  };

  const getThumbnailUrl = (id: string, size: string): string => {
    return `https://i.ytimg.com/vi/${id}/${size}.jpg`;
  };

  const downloadThumbnail = async (size: string) => {
    if (!videoId) return;

    try {
      const thumbnailUrl = getThumbnailUrl(videoId, size);
      
      // Try to download the image
      const response = await fetch(thumbnailUrl);
      
      if (!response.ok) {
        // If this size doesn't exist, try fallback sizes
        const fallbackSizes = ['maxresdefault', 'sddefault', 'hqdefault', 'mqdefault', 'default'];
        const currentIndex = fallbackSizes.indexOf(size);
        
        if (currentIndex < fallbackSizes.length - 1) {
          const fallbackSize = fallbackSizes[currentIndex + 1];
          return downloadThumbnail(fallbackSize);
        } else {
          throw new Error('No thumbnail available');
        }
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `${videoTitle || 'youtube-thumbnail'}-${size}.jpg`;
      a.click();
      
      URL.revokeObjectURL(url);
      
      // Track usage
      // trackToolUsage('youtube-thumbnail-download');
      
    } catch (error) {
      console.error('Download failed:', error);
      setError('Failed to download thumbnail. Please try again.');
    }
  };

  const previewThumbnail = videoId ? getThumbnailUrl(videoId, selectedSize) : '';

  return (
    <>
      <Helmet>
        <title>Free YouTube Thumbnail Downloader - Download Video Thumbnails | ConvertFastly</title>
        <meta name="description" content="Download YouTube video thumbnails in multiple sizes and resolutions. Get high-quality thumbnails for your projects. Free online tool with instant download." />
        <meta name="keywords" content="YouTube thumbnail downloader, video thumbnail, YouTube image download, thumbnail extractor, video preview image" />
        <link rel="canonical" href="https://convertfastly.com/youtube-thumbnail-downloader" />
        <meta property="og:title" content="Free YouTube Thumbnail Downloader - Download Video Thumbnails" />
        <meta property="og:description" content="Download YouTube video thumbnails in multiple sizes and resolutions. Free and instant." />
        <meta property="og:url" content="https://convertfastly.com/youtube-thumbnail-downloader" />
      </Helmet>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center space-x-3 mb-6">
          <Image className="h-8 w-8 text-red-600" />
          <h2 className="text-2xl font-bold text-gray-900">YouTube Thumbnail Downloader</h2>
        </div>

        <p className="text-gray-600 mb-8">
          Download YouTube video thumbnails in various sizes and resolutions. Perfect for creating custom thumbnails or using as reference images.
        </p>

        <div className="space-y-8">
          {/* URL Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              YouTube URL
            </label>
            <div className="relative">
              <input
                type="url"
                value={url}
                onChange={(e) => handleUrlChange(e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                  error ? 'border-red-300' : isValidUrl ? 'border-green-300' : 'border-gray-300'
                }`}
                placeholder="Paste YouTube URL (https://www.youtube.com/watch?v=...)"
              />
              {isValidUrl && videoId && (
                <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
              )}
            </div>
            {error && (
              <div className="flex items-center space-x-2 mt-2 text-red-600">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-sm">{error}</span>
              </div>
            )}
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-8">
              <LoadingSpinner size="lg" color="blue" />
              <p className="text-gray-600 mt-4">Fetching video information...</p>
            </div>
          )}

          {/* Video Info & Thumbnail Preview */}
          {videoId && videoTitle && !isLoading && (
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">{videoTitle}</h3>
                  <div className="text-sm text-gray-600 mb-4">
                    Video ID: <code className="bg-gray-200 px-2 py-1 rounded">{videoId}</code>
                  </div>
                  
                  {/* Size Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Thumbnail Size
                    </label>
                    <div className="space-y-2">
                      {thumbnailSizes.map((option) => (
                        <button
                          key={option.size}
                          onClick={() => setSelectedSize(option.size)}
                          className={`w-full p-3 text-left border rounded-lg transition-colors ${
                            selectedSize === option.size
                              ? 'border-red-500 bg-red-50 text-red-700'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-medium">{option.label}</div>
                              <div className="text-sm text-gray-500">{option.description}</div>
                            </div>
                            <div className="text-xs text-gray-500">{option.dimensions}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preview ({selectedSize})
                    </label>
                    <img
                      src={previewThumbnail}
                      alt="Video thumbnail"
                      className="w-full rounded-lg shadow-md border border-gray-200"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        // Fallback to next available size
                        const currentIndex = thumbnailSizes.findIndex(s => s.size === selectedSize);
                        if (currentIndex < thumbnailSizes.length - 1) {
                          const fallbackSize = thumbnailSizes[currentIndex + 1].size;
                          target.src = getThumbnailUrl(videoId, fallbackSize);
                          setSelectedSize(fallbackSize);
                        }
                      }}
                    />
                  </div>

                  <button
                    onClick={() => downloadThumbnail(selectedSize)}
                    className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
                  >
                    <Download className="h-5 w-5" />
                    <span>Download Thumbnail</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-red-50 rounded-lg p-6">
              <h4 className="font-semibold text-red-900 mb-3">Available Sizes</h4>
              <ul className="space-y-2 text-sm text-red-800">
                <li>• <strong>Maximum (1280×720)</strong> - Highest quality</li>
                <li>• <strong>Standard (640×480)</strong> - Good for most uses</li>
                <li>• <strong>High Quality (480×360)</strong> - Balanced size</li>
                <li>• <strong>Medium (320×180)</strong> - Smaller file size</li>
                <li>• <strong>Default (120×90)</strong> - Thumbnail preview</li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h4 className="font-semibold text-blue-900 mb-3">Perfect For</h4>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>• Creating custom video thumbnails</li>
                <li>• Blog post featured images</li>
                <li>• Social media content</li>
                <li>• Video editing projects</li>
                <li>• Website graphics and banners</li>
                <li>• Presentation slides</li>
              </ul>
            </div>
          </div>

          {/* Legal Notice */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div className="text-sm text-yellow-800">
                <strong>Legal Notice:</strong> Only download thumbnails from public videos. 
                Respect copyright and creators' rights. Use downloaded images responsibly and in accordance with fair use guidelines.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default YouTubeThumbnailDownloader;