import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { FileType, Upload, Download, ArrowRight } from 'lucide-react';
import LoadingSpinner from '../Common/LoadingSpinner';

const FileConverter: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [targetFormat, setTargetFormat] = useState<string>('png');
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [convertedFileUrl, setConvertedFileUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const supportedFormats = [
    { value: 'png', label: 'PNG', description: 'Portable Network Graphics' },
    { value: 'jpg', label: 'JPG', description: 'JPEG Image' },
    { value: 'webp', label: 'WebP', description: 'Web Picture format' },
    { value: 'pdf', label: 'PDF', description: 'Portable Document Format' },
    { value: 'txt', label: 'TXT', description: 'Plain Text File' }
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setConvertedFileUrl('');
    }
  };

  const getFileType = (filename: string): string => {
    return filename.split('.').pop()?.toLowerCase() || '';
  };

  const simulateConversion = async () => {
    if (!selectedFile) return;

    setIsConverting(true);
    
    // Simulate conversion process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // For demo purposes, create a blob with the original file
    const blob = new Blob([selectedFile], { type: `image/${targetFormat}` });
    const url = URL.createObjectURL(blob);
    setConvertedFileUrl(url);
    setIsConverting(false);
  };

  const downloadConvertedFile = () => {
    if (convertedFileUrl && selectedFile) {
      const a = document.createElement('a');
      a.href = convertedFileUrl;
      a.download = `converted-${selectedFile.name.split('.')[0]}.${targetFormat}`;
      a.click();
    }
  };

  return (
    <>
      <Helmet>
        <title>Free File Converter - Convert Files Online | ConvertFastly</title>
        <meta name="description" content="Free file converter tool. Convert files between different formats online including images, documents, and more. Fast, secure conversion in your browser with no registration required." />
        <meta name="keywords" content="file converter, convert files, file format converter, online converter, document converter, image converter, free file conversion" />
        <link rel="canonical" href="https://convertfastly.com/file-converter" />
        <meta property="og:title" content="Free File Converter - Convert Files Online" />
        <meta property="og:description" content="Free file converter tool. Convert files between different formats online including images, documents, and more. Fast, secure conversion in your browser." />
        <meta property="og:url" content="https://convertfastly.com/file-converter" />
      </Helmet>
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center space-x-3 mb-6">
        <FileType className="h-8 w-8 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">File Converter</h2>
      </div>

      <p className="text-gray-600 mb-8">
        Convert your files between different formats quickly and securely. All processing happens in your browser.
      </p>

      <div className="space-y-8">
        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Select File to Convert
          </label>
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
          >
            {selectedFile ? (
              <div className="space-y-2">
                <FileType className="h-12 w-12 text-blue-600 mx-auto" />
                <p className="text-gray-900 font-medium">{selectedFile.name}</p>
                <p className="text-sm text-gray-500">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • {getFileType(selectedFile.name).toUpperCase()}
                </p>
              </div>
            ) : (
              <>
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Click to upload a file</p>
                <p className="text-sm text-gray-400 mt-2">Supports images, documents, and more</p>
              </>
            )}
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileSelect}
            className="hidden"
            accept="*/*"
          />
        </div>

        {selectedFile && (
          <>
            {/* Format Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Convert to Format
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {supportedFormats.map((format) => (
                  <button
                    key={format.value}
                    onClick={() => setTargetFormat(format.value)}
                    className={`p-4 border rounded-lg text-left transition-colors ${
                      targetFormat === format.value 
                        ? 'border-blue-500 bg-blue-50 text-blue-700' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="font-bold text-lg">{format.label}</div>
                    <div className="text-xs text-gray-500">{format.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Conversion Flow */}
            <div className="flex items-center justify-center space-x-4 py-6 bg-gray-50 rounded-lg">
              <div className="text-center">
                <div className="text-sm font-medium text-gray-600">From</div>
                <div className="text-lg font-bold text-gray-900 uppercase">
                  {getFileType(selectedFile.name)}
                </div>
              </div>
              
              <ArrowRight className="h-8 w-8 text-gray-400" />
              
              <div className="text-center">
                <div className="text-sm font-medium text-gray-600">To</div>
                <div className="text-lg font-bold text-blue-600 uppercase">
                  {targetFormat}
                </div>
              </div>
            </div>

            {/* Convert Button */}
            <div className="text-center">
              {!convertedFileUrl ? (
                <button
                  onClick={simulateConversion}
                  disabled={isConverting}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 mx-auto"
                >
                  {isConverting ? (
                    <>
                      <LoadingSpinner size="sm" color="white" />
                      <span>Converting...</span>
                    </>
                  ) : (
                    <>
                      <FileType className="h-5 w-5" />
                      <span>Convert File</span>
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={downloadConvertedFile}
                  className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 mx-auto"
                >
                  <Download className="h-5 w-5" />
                  <span>Download Converted File</span>
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
    </>
  );
};

export default FileConverter;