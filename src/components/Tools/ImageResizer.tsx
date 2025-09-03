import React, { useState, useRef } from 'react';
import { Maximize2, Upload, Download } from 'lucide-react';
import LoadingSpinner from '../Common/LoadingSpinner';
import EngagementPopup from '../Common/EngagementPopup';

const ImageResizer: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [dimensions, setDimensions] = useState({ width: '', height: '' });
  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 });
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [isResizing, setIsResizing] = useState(false);
  const [originalPreview, setOriginalPreview] = useState<string | null>(null);
  const [resizedPreview, setResizedPreview] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const presetSizes = [
    { name: 'Social Media Profile', width: 400, height: 400 },
    { name: 'Instagram Post', width: 1080, height: 1080 },
    { name: 'Facebook Cover', width: 1200, height: 630 },
    { name: 'Twitter Header', width: 1500, height: 500 },
    { name: 'LinkedIn Banner', width: 1584, height: 396 },
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          setOriginalDimensions({ width: img.width, height: img.height });
          setDimensions({ width: img.width.toString(), height: img.height.toString() });
        };
        img.src = e.target?.result as string;
        setOriginalPreview(e.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
      setResizedPreview(null);
    } else {
      alert('Please select a valid image file.');
    }
  };

  const handleDimensionChange = (dimension: 'width' | 'height', value: string) => {
    const numValue = parseInt(value) || 0;
    
    if (maintainAspectRatio && originalDimensions.width && originalDimensions.height) {
      const aspectRatio = originalDimensions.width / originalDimensions.height;
      
      if (dimension === 'width') {
        setDimensions({
          width: value,
          height: Math.round(numValue / aspectRatio).toString()
        });
      } else {
        setDimensions({
          width: Math.round(numValue * aspectRatio).toString(),
          height: value
        });
      }
    } else {
      setDimensions(prev => ({ ...prev, [dimension]: value }));
    }
  };

  const handlePresetSelect = (preset: { width: number; height: number }) => {
    setDimensions({
      width: preset.width.toString(),
      height: preset.height.toString()
    });
  };

  const resizeImage = async (): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext('2d')!;
      const img = new Image();
      
      img.onload = () => {
        const newWidth = parseInt(dimensions.width);
        const newHeight = parseInt(dimensions.height);
        
        canvas.width = newWidth;
        canvas.height = newHeight;
        
        ctx.drawImage(img, 0, 0, newWidth, newHeight);
        
        const resizedDataUrl = canvas.toDataURL(file!.type);
        resolve(resizedDataUrl);
      };
      
      img.src = originalPreview!;
    });
  };

  const handleResize = async () => {
    if (!file || !originalPreview || !dimensions.width || !dimensions.height) return;

    setIsResizing(true);
    
    // Simulate resizing process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      const resizedDataUrl = await resizeImage();
      setResizedPreview(resizedDataUrl);
      setShowPopup(true);
    } catch (error) {
      console.error('Resizing failed:', error);
      alert('Resizing failed. Please try again.');
    }
    
    setIsResizing(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      const event = { target: { files: [droppedFile] } } as any;
      handleFileSelect(event);
    }
  };

  React.useEffect(() => {
    document.title = 'Image Resizer - ConvertFastly';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Resize images online to custom dimensions. Perfect for social media, web, and print.');
    }
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Maximize2 className="h-8 w-8 text-yellow-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Image Resizer</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Resize images to custom dimensions or use preset sizes for social media and web.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border p-8">
        {!file ? (
          <div
            className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-yellow-400 transition-colors cursor-pointer"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Choose image or drag & drop</h3>
            <p className="text-gray-500 mb-4">Support for JPG, PNG, GIF, and WebP images</p>
            <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
              Select Image
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        ) : (
          <div className="space-y-6">
            {/* Image Previews */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Original</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <img
                    src={originalPreview!}
                    alt="Original"
                    className="w-full h-48 object-contain rounded mb-4"
                  />
                  <div className="text-sm text-gray-600">
                    <p><strong>Dimensions:</strong> {originalDimensions.width} × {originalDimensions.height}</p>
                    <p><strong>File:</strong> {file.name}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Resized</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  {resizedPreview ? (
                    <>
                      <img
                        src={resizedPreview}
                        alt="Resized"
                        className="w-full h-48 object-contain rounded mb-4"
                      />
                      <div className="text-sm text-gray-600">
                        <p><strong>New Dimensions:</strong> {dimensions.width} × {dimensions.height}</p>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-48 bg-gray-200 rounded flex items-center justify-center">
                      <span className="text-gray-500">Resized image will appear here</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Resize Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Custom Dimensions</h4>
                <div className="space-y-4">
                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Width (px)</label>
                      <input
                        type="number"
                        value={dimensions.width}
                        onChange={(e) => handleDimensionChange('width', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Height (px)</label>
                      <input
                        type="number"
                        value={dimensions.height}
                        onChange={(e) => handleDimensionChange('height', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={maintainAspectRatio}
                      onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                      className="w-4 h-4 text-yellow-600 bg-gray-100 border-gray-300 rounded focus:ring-yellow-500"
                    />
                    <span className="text-sm text-gray-700">Maintain aspect ratio</span>
                  </label>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Preset Sizes</h4>
                <div className="space-y-2">
                  {presetSizes.map((preset, index) => (
                    <button
                      key={index}
                      onClick={() => handlePresetSelect(preset)}
                      className="w-full text-left px-3 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="font-medium">{preset.name}</div>
                      <div className="text-gray-500">{preset.width} × {preset.height}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {isResizing ? (
              <div className="text-center py-8">
                <LoadingSpinner size="lg" color="blue" />
                <p className="text-gray-600 mt-4">Resizing image...</p>
              </div>
            ) : resizedPreview ? (
              <div className="text-center">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <p className="text-green-800 font-medium">Image resized successfully!</p>
                </div>
                <div className="space-x-4">
                  <a
                    href={resizedPreview}
                    download={`resized_${file.name}`}
                    className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    <Download className="h-5 w-5" />
                    <span>Download Resized</span>
                  </a>
                  <button
                    onClick={() => {
                      setFile(null);
                      setOriginalPreview(null);
                      setResizedPreview(null);
                      setDimensions({ width: '', height: '' });
                      setOriginalDimensions({ width: 0, height: 0 });
                    }}
                    className="inline-flex items-center space-x-2 border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    <span>Resize Another</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <button
                  onClick={handleResize}
                  disabled={!dimensions.width || !dimensions.height}
                  className="bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-medium transition-colors"
                >
                  Resize Image
                </button>
                <br />
                <button
                  onClick={() => {
                    setFile(null);
                    setOriginalPreview(null);
                    setResizedPreview(null);
                    setDimensions({ width: '', height: '' });
                    setOriginalDimensions({ width: 0, height: 0 });
                  }}
                  className="text-gray-500 hover:text-gray-700 text-sm"
                >
                  Choose different image
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <canvas ref={canvasRef} className="hidden" />

      <EngagementPopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        type="spin"
      />
    </div>
  );
};

export default ImageResizer;