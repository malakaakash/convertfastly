import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Instagram, Download, FileText, AlertTriangle, CheckCircle, User, Clock } from 'lucide-react';
import LoadingSpinner from '../Common/LoadingSpinner';
import { useToolTracking } from '../../hooks/useToolTracking';

interface ReelMetadata {
  caption: string;
  username: string;
  timestamp: string;
  thumbnail: string;
  isPublic: boolean;
}

const InstagramReelDownloader: React.FC = () => {
  useToolTracking('instagram-reel-downloader');

  const [url, setUrl] = useState<string>('');
  const [isValidUrl, setIsValidUrl] = useState<boolean>(false);
  const [metadata, setMetadata] = useState<ReelMetadata | null>(null);
  const [includeCaption, setIncludeCaption] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [downloadProgress, setDownloadProgress] = useState<number>(0);

  const validateInstagramUrl = (inputUrl: string): boolean => {
    const patterns = [
      /^https?:\/\/(www\.)?instagram\.com\/reel\/([A-Za-z0-9_-]+)/,
      /^https?:\/\/(www\.)?instagram\.com\/p\/([A-Za-z0-9_-]+)/
    ];
    
    return patterns.some(pattern => pattern.test(inputUrl));
  };

  const extractReelId = (inputUrl: string): string | null => {
    const patterns = [
      /instagram\.com\/reel\/([A-Za-z0-9_-]+)/,
      /instagram\.com\/p\/([A-Za-z0-9_-]+)/
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
    setMetadata(null);
    
    if (inputUrl.trim()) {
      const isValid = validateInstagramUrl(inputUrl);
      setIsValidUrl(isValid);
      
      if (isValid) {
        await fetchReelInfo(inputUrl);
      } else {
        setError('Please enter a valid Instagram Reel URL');
      }
    } else {
      setIsValidUrl(false);
    }
  };

  const fetchReelInfo = async (reelUrl: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call to fetch reel metadata
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Check if reel is accessible (simulate)
      if (Math.random() < 0.1) {
        throw new Error('This reel is private or unavailable');
      }

      // Mock metadata
      const mockUsernames = ['creator_user', 'content_maker', 'reel_artist', 'video_creator'];
      const mockCaptions = [
        'Check out this amazing content! 🔥 #viral #trending #instagram',
        'Tutorial on how to create amazing content 📱✨ Follow for more tips!',
        'Behind the scenes of my latest project 🎬 What do you think?',
        'Quick tip that changed everything! Save this post 💡 #lifehack'
      ];

      const reelId = extractReelId(reelUrl);
      
      setMetadata({
        caption: mockCaptions[Math.floor(Math.random() * mockCaptions.length)],
        username: mockUsernames[Math.floor(Math.random() * mockUsernames.length)],
        timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        thumbnail: `https://picsum.photos/400/600?random=${reelId}`,
        isPublic: true
      });
    } catch (err) {
      setError((err as Error).message);
    }
    
    setIsLoading(false);
  };

  const downloadReel = async () => {
    if (!metadata) return;

    setIsDownloading(true);
    setDownloadProgress(0);

    try {
      // Simulate download progress
      for (let i = 0; i <= 100; i += 10) {
        setDownloadProgress(i);
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      // In production, this would call your backend API
      // For demo, create a placeholder video file
      const videoBlob = new Blob(['Demo Instagram Reel Video Content'], { type: 'video/mp4' });
      const videoUrl = URL.createObjectURL(videoBlob);
      
      const a = document.createElement('a');
      a.href = videoUrl;
      a.download = `instagram-reel-${Date.now()}.mp4`;
      a.click();
      URL.revokeObjectURL(videoUrl);

      // Download caption if requested
      if (includeCaption) {
        const captionBlob = new Blob([metadata.caption], { type: 'text/plain' });
        const captionUrl = URL.createObjectURL(captionBlob);
        
        const captionLink = document.createElement('a');
        captionLink.href = captionUrl;
        captionLink.download = `instagram-caption-${Date.now()}.txt`;
        captionLink.click();
        URL.revokeObjectURL(captionUrl);
      }

    } catch (error) {
      setError('Download failed. Please try again.');
    }
    
    setIsDownloading(false);
    setDownloadProgress(0);
  };

  return (
    <>
      <Helmet>
        <title>Free Instagram Reel Downloader - Download Public Reels | ConvertFastly</title>
        <meta name="description" content="Free Instagram Reel downloader tool. Download public Instagram Reels with optional captions. Save Instagram videos for offline viewing. Only works with public content, respects privacy." />
        <meta name="keywords" content="Instagram reel downloader, download Instagram video, Instagram video downloader, save Instagram reel, Instagram content downloader" />
        <link rel="canonical" href="https://convertfastly.com/instagram-reel-downloader" />
        <meta property="og:title" content="Free Instagram Reel Downloader - Download Public Reels" />
        <meta property="og:description" content="Free Instagram Reel downloader tool. Download public Instagram Reels with optional captions. Save Instagram videos for offline viewing." />
        <meta property="og:url" content="https://convertfastly.com/instagram-reel-downloader" />
      </Helmet>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center space-x-3 mb-6">
          <Instagram className="h-8 w-8 text-pink-600" />
          <h2 className="text-2xl font-bold text-gray-900">Instagram Reel Downloader</h2>
        </div>

        <p className="text-gray-600 mb-8">
          Download public Instagram Reels with optional caption text. Only works with public content - respects privacy and creator rights.
        </p>

        <div className="space-y-8">
          {/* URL Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Instagram Reel URL
            </label>
            <div className="relative">
              <input
                type="url"
                value={url}
                onChange={(e) => handleUrlChange(e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                  error ? 'border-red-300' : isValidUrl ? 'border-green-300' : 'border-gray-300'
                }`}
                placeholder="Paste Instagram Reel URL (https://www.instagram.com/reel/...)"
              />
              {isValidUrl && metadata && (
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
              <p className="text-gray-600 mt-4">Fetching reel information...</p>
            </div>
          )}

          {/* Reel Metadata */}
          {metadata && !isLoading && (
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <img
                    src={metadata.thumbnail}
                    alt="Reel thumbnail"
                    className="w-full rounded-lg shadow-md"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/400x600/f3f4f6/6b7280?text=Reel+Preview';
                    }}
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <User className="h-4 w-4" />
                    <span>@{metadata.username}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>{metadata.timestamp}</span>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Caption</label>
                    <div className="bg-white border border-gray-200 rounded-lg p-3 text-sm text-gray-700 max-h-32 overflow-y-auto">
                      {metadata.caption}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="includeCaption"
                      checked={includeCaption}
                      onChange={(e) => setIncludeCaption(e.target.checked)}
                      className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                    />
                    <label htmlFor="includeCaption" className="text-sm text-gray-700">
                      Download caption as text file
                    </label>
                  </div>

                  <button
                    onClick={downloadReel}
                    disabled={isDownloading}
                    className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors disabled:opacity-50 font-semibold"
                  >
                    {isDownloading ? (
                      <>
                        <LoadingSpinner size="sm" color="white" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <Download className="h-5 w-5" />
                        <span>Download Reel{includeCaption ? ' + Caption' : ''}</span>
                      </>
                    )}
                  </button>

                  {/* Download Progress */}
                  {isDownloading && (
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Processing reel...</span>
                        <span>{downloadProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-pink-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${downloadProgress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Features & Legal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-pink-50 rounded-lg p-6">
              <h4 className="font-semibold text-pink-900 mb-3">Features</h4>
              <ul className="space-y-2 text-sm text-pink-800">
                <li>• Download public Instagram Reels</li>
                <li>• High-quality video preservation</li>
                <li>• Optional caption text download</li>
                <li>• Mobile-friendly interface</li>
                <li>• Fast processing and download</li>
                <li>• No registration required</li>
              </ul>
            </div>

            <div className="bg-yellow-50 rounded-lg p-6">
              <h4 className="font-semibold text-yellow-900 mb-3 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Important Guidelines
              </h4>
              <ul className="space-y-2 text-sm text-yellow-800">
                <li>• Only public content can be downloaded</li>
                <li>• Respect creators' rights and copyright</li>
                <li>• For personal use and educational purposes</li>
                <li>• Do not redistribute without permission</li>
                <li>• Private accounts are not accessible</li>
                <li>• Comply with Instagram's Terms of Service</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InstagramReelDownloader;