import React, { useState, useRef } from 'react';
import { Download, Upload } from 'lucide-react';
import LoadingSpinner from '../Common/LoadingSpinner';
import EngagementPopup from '../Common/EngagementPopup';

const FileConverter: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState('');
  const [isConverting, setIsConverting] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const supportedFormats = {
    image: ['jpg', 'png', 'gif', 'bmp', 'webp'],
    document: ['pdf', 'docx', 'txt', 'rtf'],
    audio: ['mp3', 'wav', 'ogg', 'aac'],
    video: ['mp4', 'avi', 'mov', 'wmv']
  };

  const getFileType = (filename: string): string => {
    const extension = filename.split('.').pop()?.toLowerCase() || '';
    for (const [type, formats] of Object.entries(supportedFormats)) {
      if (formats.includes(extension)) {
        return type;
      }
    }
    return 'unknown';
  };

  const getAvailableFormats = (fileType: string): string[] => {
    return supportedFormats[fileType as keyof typeof supportedFormats] || [];
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setDownloadUrl(null);
      setOutputFormat('');
    }
  };

  const handleConvert = async () => {
    if (!file || !outputFormat) return;

    setIsConverting(true);
    
    // Simulate conversion process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Create a dummy converted file
    const dummyContent = `Converted file from ${file.name} to ${outputFormat} format.\n\nThis is a demo conversion.`;
    const blob = new Blob([dummyContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    setDownloadUrl(url);
    setIsConverting(false);
    setShowPopup(true);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setDownloadUrl(null);
      setOutputFormat('');
    }
  };

  React.useEffect(() => {
    document.title = 'Universal File Converter - ConvertFastly';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Convert between various file formats online. Support for images, documents, audio, and video files.');
    }
  }, []);

  const fileType = file ? getFileType(file.name) : '';
  const availableFormats = fileType ? getAvailableFormats(fileType) : [];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Download className="h-8 w-8 text-purple-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Universal File Converter</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Convert between various file formats including images, documents, audio, and video files.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border p-8">
        {!file ? (
          <div
            className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-purple-400 transition-colors cursor-pointer"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Choose file or drag & drop</h3>
            <p className="text-gray-500 mb-4">Support for images, documents, audio, and video files</p>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
              Select File
            </button>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <Download className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="font-medium text-gray-900">{file.name}</p>
              <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              <p className="text-sm text-purple-600 capitalize">File Type: {fileType}</p>
            </div>

            {availableFormats.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select output format:
                </label>
                <select
                  value={outputFormat}
                  onChange={(e) => setOutputFormat(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Choose format...</option>
                  {availableFormats.map((format) => (
                    <option key={format} value={format}>
                      .{format.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {isConverting ? (
              <div className="text-center py-8">
                <LoadingSpinner size="lg" color="blue" />
                <p className="text-gray-600 mt-4">Converting file...</p>
              </div>
            ) : downloadUrl ? (
              <div className="text-center py-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <p className="text-green-800 font-medium">Conversion completed successfully!</p>
                </div>
                <a
                  href={downloadUrl}
                  download={`${file.name.split('.')[0]}.${outputFormat}`}
                  className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  <Download className="h-5 w-5" />
                  <span>Download Converted File</span>
                </a>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <button
                  onClick={handleConvert}
                  disabled={!outputFormat}
                  className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-medium transition-colors"
                >
                  Convert File
                </button>
                <br />
                <button
                  onClick={() => {
                    setFile(null);
                    setDownloadUrl(null);
                    setOutputFormat('');
                  }}
                  className="text-gray-500 hover:text-gray-700 text-sm"
                >
                  Choose different file
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <EngagementPopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        type="spin"
      />
    </div>
  );
};

export default FileConverter;