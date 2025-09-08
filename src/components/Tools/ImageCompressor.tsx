import React, { useState, useRef } from 'react';
import { Image, Upload, Download, Settings } from 'lucide-react';
import LoadingSpinner from '../Common/LoadingSpinner';

const ImageCompressor: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [quality, setQuality] = useState<number>(80);
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const compressImage = () => {
    if (!selectedFile || !canvasRef.current) return;

    setIsCompressing(true);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      setIsCompressing(false);
      return;
    }

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      
      ctx.drawImage(img, 0, 0);
      
      canvas.toBlob((blob) => {
        if (blob) {
          setCompressedSize(blob.size);
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `compressed-${selectedFile.name}`;
          a.click();
          URL.revokeObjectURL(url);
        }
        setIsCompressing(false);
      }, selectedFile.type, quality / 100);
    };
    
    img.src = preview;
  };

  const compressionRatio = selectedFile && compressedSize 
    ? Math.round((1 - compressedSize / selectedFile.size) * 100)
    : 0;

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center space-x-3 mb-6">
        <Image className="h-8 w-8 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">Image Compressor</h2>
      </div>

      <p className="text-gray-600 mb-8">
        Reduce image file size while maintaining quality. Perfect for web optimization and storage savings.
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

          {selectedFile && (
            <div className="mt-4 text-sm text-gray-600">
              Original: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
            </div>
          )}
        </div>

        {/* Controls Section */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <Settings className="h-6 w-6 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Compression Settings</h3>
          </div>

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

          <button
            onClick={compressImage}
            disabled={!selectedFile || isCompressing}
            className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isCompressing ? (
              <LoadingSpinner size="sm" color="white" />
            ) : (
              <>
                <Download className="h-5 w-5" />
                <span>Compress & Download</span>
              </>
            )}
          </button>

          {compressedSize > 0 && (
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-2">Compression Results</h4>
              <div className="space-y-1 text-sm text-green-800">
                <div>Compressed size: {(compressedSize / 1024 / 1024).toFixed(2)} MB</div>
                <div>Space saved: {compressionRatio}%</div>
              </div>
            </div>
          )}
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default ImageCompressor;