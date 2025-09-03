import React, { useState, useRef } from 'react';
import { Minimize2, Upload, Download } from 'lucide-react';
import LoadingSpinner from '../Common/LoadingSpinner';
import EngagementPopup from '../Common/EngagementPopup';

const ImageCompressor: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState(80);
  const [isCompressing, setIsCompressing] = useState(false);
  const [originalPreview, setOriginalPreview] = useState<string | null>(null);
  const [compressedPreview, setCompressedPreview] = useState<string | null>(null);
  const [compressionStats, setCompressionStats] = useState<{
    originalSize: number;
    compressedSize: number;
    reduction: number;
  } | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = (e) => {
        setOriginalPreview(e.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
      setCompressedPreview(null);
      setCompressionStats(null);
    } else {
      alert('Please select a valid image file.');
    }
  };

  const compressImage = async (file: File, quality: number): Promise<Blob> => {
    return new Promise((resolve) => {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext('2d')!;
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        
        ctx.drawImage(img, 0, 0);
        
        canvas.toBlob((blob) => {
          resolve(blob!);
        }, file.type, quality / 100);
      };
      
      img.src = originalPreview!;
    });
  };

  const handleCompress = async () => {
    if (!file || !originalPreview) return;

    setIsCompressing(true);
    
    // Simulate compression process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
      const compressedBlob = await compressImage(file, quality);
      const compressedUrl = URL.createObjectURL(compressedBlob);
      
      setCompressedPreview(compressedUrl);
      
      const reduction = Math.round(((file.size - compressedBlob.size) / file.size) * 100);
      setCompressionStats({
        originalSize: file.size,
        compressedSize: compressedBlob.size,
        reduction: reduction
      });
      
      setShowPopup(true);
    } catch (error) {
      console.error('Compression failed:', error);
      alert('Compression failed. Please try again.');
    }
    
    setIsCompressing(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      setFile(droppedFile);
      const reader = new FileReader();
      reader.onload = (e) => {
        setOriginalPreview(e.target?.result as string);
      };
      reader.readAsDataURL(droppedFile);
      setCompressedPreview(null);
      setCompressionStats(null);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  React.useEffect(() => {
    document.title = 'Image Compressor - ConvertFastly';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Compress images online without quality loss. Reduce file size for faster loading and storage.');
    }
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Minimize2 className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Image Compressor</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Reduce image file sizes without losing quality. Perfect for web optimization and storage.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border p-8">
        {!file ? (
          <div
            className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-green-400 transition-colors cursor-pointer"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Choose image or drag & drop</h3>
            <p className="text-gray-500 mb-4">Support for JPG, PNG, GIF, and WebP images</p>
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Original Image */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Original</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <img
                    src={originalPreview!}
                    alt="Original"
                    className="w-full h-48 object-contain rounded mb-4"
                  />
                  <div className="text-sm text-gray-600">
                    <p><strong>Size:</strong> {formatFileSize(file.size)}</p>
                    <p><strong>Name:</strong> {file.name}</p>
                  </div>
                </div>
              </div>

              {/* Compressed Image */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Compressed</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  {compressedPreview ? (
                    <>
                      <img
                        src={compressedPreview}
                        alt="Compressed"
                        className="w-full h-48 object-contain rounded mb-4"
                      />
                      {compressionStats && (
                        <div className="text-sm text-gray-600">
                          <p><strong>Size:</strong> {formatFileSize(compressionStats.compressedSize)}</p>
                          <p><strong>Reduction:</strong> {compressionStats.reduction}%</p>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="w-full h-48 bg-gray-200 rounded flex items-center justify-center">
                      <span className="text-gray-500">Compressed image will appear here</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Quality Slider */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quality: {quality}%
              </label>
              <input
                type="range"
                min="10"
                max="100"
                value={quality}
                onChange={(e) => setQuality(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Smaller file</span>
                <span>Better quality</span>
              </div>
            </div>

            {isCompressing ? (
              <div className="text-center py-8">
                <LoadingSpinner size="lg" color="green" />
                <p className="text-gray-600 mt-4">Compressing image...</p>
              </div>
            ) : compressedPreview ? (
              <div className="text-center">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <p className="text-green-800 font-medium">
                    Image compressed successfully! Reduced by {compressionStats?.reduction}%
                  </p>
                </div>
                <div className="space-x-4">
                  <a
                    href={compressedPreview}
                    download={`compressed_${file.name}`}
                    className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    <Download className="h-5 w-5" />
                    <span>Download Compressed</span>
                  </a>
                  <button
                    onClick={() => {
                      setFile(null);
                      setOriginalPreview(null);
                      setCompressedPreview(null);
                      setCompressionStats(null);
                    }}
                    className="inline-flex items-center space-x-2 border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    <span>Compress Another</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <button
                  onClick={handleCompress}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                >
                  Compress Image
                </button>
                <br />
                <button
                  onClick={() => {
                    setFile(null);
                    setOriginalPreview(null);
                    setCompressedPreview(null);
                    setCompressionStats(null);
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
        type="email"
      />
    </div>
  );
};

export default ImageCompressor;