import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Image, Upload, Download, Settings } from 'lucide-react';
import LoadingSpinner from '../Common/LoadingSpinner';
import { useToolTracking } from '../../hooks/useToolTracking';
import ToolDisruptionNotice from '../Common/ToolDisruptionNotice';

const ImageResizer: React.FC = () => {
  useToolTracking('image-resizer');

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [width, setWidth] = useState<number>(800);
  const [height, setHeight] = useState<number>(600);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [originalDimensions, setOriginalDimensions] = useState<{ width: number; height: number } | null>(null);
  const [showDisruption, setShowDisruption] = useState<boolean>(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreview(result);
        
        // Get original dimensions
        const img = new Image();
        img.onload = () => {
          setOriginalDimensions({ width: img.width, height: img.height });
          setWidth(img.width);
          setHeight(img.height);
        };
        img.src = result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleWidthChange = (newWidth: number) => {
    setWidth(newWidth);
    if (maintainAspectRatio && originalDimensions) {
      const aspectRatio = originalDimensions.width / originalDimensions.height;
      setHeight(Math.round(newWidth / aspectRatio));
    }
  };

  const handleHeightChange = (newHeight: number) => {
    setHeight(newHeight);
    if (maintainAspectRatio && originalDimensions) {
      const aspectRatio = originalDimensions.width / originalDimensions.height;
      setWidth(Math.round(newHeight * aspectRatio));
    }
  };

  const resizeImage = () => {
    if (!selectedFile || !canvasRef.current) return;

    setIsProcessing(true);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      setIsProcessing(false);
      return;
    }

    const img = new Image();
    img.onload = () => {
      canvas.width = width;
      canvas.height = height;
      
      ctx.drawImage(img, 0, 0, width, height);
      
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `resized-${selectedFile.name}`;
          a.click();
          URL.revokeObjectURL(url);
        }
        setIsProcessing(false);
      }, selectedFile.type, 0.9);
    };
    
    img.src = preview;
  };

  return (
    <>
      <Helmet>
        <title>Free Image Resizer - Resize Images Online | ConvertFastly</title>
        <meta name="description" content="Free online image resizer tool. Resize images to any dimension while maintaining quality. Supports JPG, PNG, WebP formats. Fast, secure, no registration required." />
        <meta name="keywords" content="image resizer, resize image, image dimensions, photo resizer, online image tool, free image resizer, image editor" />
        <link rel="canonical" href="https://convertfastly.com/image-resizer" />
        <meta property="og:title" content="Free Image Resizer - Resize Images Online" />
        <meta property="og:description" content="Free online image resizer tool. Resize images to any dimension while maintaining quality. Supports JPG, PNG, WebP formats." />
        <meta property="og:url" content="https://convertfastly.com/image-resizer" />
      </Helmet>
    <div className="bg-white rounded-xl shadow-lg p-8">
      {showDisruption && (
        <ToolDisruptionNotice 
          toolName="Image Resizer"
          onDismiss={() => setShowDisruption(false)}
        />
      )}
      
      <div className="flex items-center space-x-3 mb-6">
        <Image className="h-8 w-8 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">Image Resizer</h2>
      </div>

      <p className="text-gray-600 mb-6">
        Resize your images to any dimension while maintaining quality. Supports JPG, PNG, and WebP formats.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div>
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
          >
            {preview ? (
              <img src={preview} alt="Preview" className="max-w-full max-h-48 mx-auto rounded-lg" />
            ) : (
              <>
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Click to upload an image</p>
                <p className="text-sm text-gray-400 mt-2">PNG, JPG, WebP up to 10MB</p>
              </>
            )}
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          {originalDimensions && (
            <div className="mt-4 text-sm text-gray-600">
              Original: {originalDimensions.width} × {originalDimensions.height}
            </div>
          )}
        </div>

        {/* Controls Section */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <Settings className="h-6 w-6 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Resize Settings</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Width (px)
              </label>
              <input
                type="number"
                value={width}
                onChange={(e) => handleWidthChange(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Height (px)
              </label>
              <input
                type="number"
                value={height}
                onChange={(e) => handleHeightChange(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="aspectRatio"
                checked={maintainAspectRatio}
                onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="aspectRatio" className="text-sm text-gray-700">
                Maintain aspect ratio
              </label>
            </div>
          </div>

          <button
            onClick={resizeImage}
            disabled={!selectedFile || isProcessing}
            className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <LoadingSpinner size="sm" color="white" />
            ) : (
              <>
                <Download className="h-5 w-5" />
                <span>Download Resized Image</span>
              </>
            )}
          </button>

          <div className="text-sm text-gray-500">
            New size: {width} × {height} pixels
          </div>
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
    </>
  );
};

export default ImageResizer;