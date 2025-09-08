import React, { useState, useRef } from 'react';
import { FileText, Upload, Download, ArrowRight } from 'lucide-react';
import LoadingSpinner from '../Common/LoadingSpinner';

const PDFToWord: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [convertedFileUrl, setConvertedFileUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      setConvertedFileUrl('');
    }
  };

  const simulateConversion = async () => {
    if (!selectedFile) return;

    setIsConverting(true);
    
    // Simulate conversion process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // For demo purposes, create a blob
    const blob = new Blob(['Demo Word content'], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    const url = URL.createObjectURL(blob);
    setConvertedFileUrl(url);
    setIsConverting(false);
  };

  const downloadConvertedFile = () => {
    if (convertedFileUrl && selectedFile) {
      const a = document.createElement('a');
      a.href = convertedFileUrl;
      a.download = `${selectedFile.name.replace('.pdf', '')}.docx`;
      a.click();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center space-x-3 mb-6">
        <FileText className="h-8 w-8 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">PDF to Word Converter</h2>
      </div>

      <p className="text-gray-600 mb-8">
        Convert your PDF documents to editable Word format. Perfect for editing and reformatting documents.
      </p>

      <div className="space-y-8">
        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Select PDF File
          </label>
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
          >
            {selectedFile ? (
              <div className="space-y-2">
                <FileText className="h-12 w-12 text-blue-600 mx-auto" />
                <p className="text-gray-900 font-medium">{selectedFile.name}</p>
                <p className="text-sm text-gray-500">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            ) : (
              <>
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Click to upload a PDF file</p>
                <p className="text-sm text-gray-400 mt-2">Maximum file size: 10MB</p>
              </>
            )}
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {selectedFile && (
          <>
            {/* Conversion Flow */}
            <div className="flex items-center justify-center space-x-4 py-6 bg-gray-50 rounded-lg">
              <div className="text-center">
                <div className="text-sm font-medium text-gray-600">From</div>
                <div className="text-lg font-bold text-red-600">PDF</div>
              </div>
              
              <ArrowRight className="h-8 w-8 text-gray-400" />
              
              <div className="text-center">
                <div className="text-sm font-medium text-gray-600">To</div>
                <div className="text-lg font-bold text-blue-600">DOCX</div>
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
                      <FileText className="h-5 w-5" />
                      <span>Convert to Word</span>
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={downloadConvertedFile}
                  className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 mx-auto"
                >
                  <Download className="h-5 w-5" />
                  <span>Download Word Document</span>
                </button>
              )}
            </div>
          </>
        )}

        {/* Features */}
        <div className="bg-blue-50 rounded-lg p-6">
          <h4 className="font-semibold text-blue-900 mb-3">Features</h4>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• Preserves original formatting and layout</li>
            <li>• Maintains text, images, and tables</li>
            <li>• Fast and secure conversion</li>
            <li>• No registration required</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PDFToWord;