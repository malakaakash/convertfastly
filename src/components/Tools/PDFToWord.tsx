import React, { useState, useRef } from 'react';
import { FileText, Upload, Download } from 'lucide-react';
import LoadingSpinner from '../Common/LoadingSpinner';
import EngagementPopup from '../Common/EngagementPopup';

const PDFToWord: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setDownloadUrl(null);
    } else {
      alert('Please select a valid PDF file.');
    }
  };

  const handleConvert = async () => {
    if (!file) return;

    setIsConverting(true);
    
    // Simulate conversion process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Create a dummy Word file download
    const dummyContent = `Converted content from ${file.name}\n\nThis is a demo conversion. In a real implementation, this would contain the actual PDF content converted to Word format.`;
    const blob = new Blob([dummyContent], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
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
    if (droppedFile && droppedFile.type === 'application/pdf') {
      setFile(droppedFile);
      setDownloadUrl(null);
    }
  };

  React.useEffect(() => {
    document.title = 'PDF to Word Converter - ConvertFastly';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Convert PDF files to editable Word documents online. Fast, free, and secure PDF to DOCX conversion.');
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText className="h-8 w-8 text-red-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">PDF to Word Converter</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Convert your PDF documents to editable Word files. Maintain formatting and layout while making your documents editable.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border p-8">
        {!file ? (
          <div
            className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-blue-400 transition-colors cursor-pointer"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Choose PDF file or drag & drop</h3>
            <p className="text-gray-500 mb-4">Support for PDF files up to 10MB</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
              Select PDF File
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        ) : (
          <div className="text-center">
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <FileText className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <p className="font-medium text-gray-900">{file.name}</p>
              <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>

            {isConverting ? (
              <div className="py-8">
                <LoadingSpinner size="lg" color="blue" />
                <p className="text-gray-600 mt-4">Converting PDF to Word...</p>
              </div>
            ) : downloadUrl ? (
              <div className="py-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <p className="text-green-800 font-medium">Conversion completed successfully!</p>
                </div>
                <a
                  href={downloadUrl}
                  download={file.name.replace('.pdf', '.docx')}
                  className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  <Download className="h-5 w-5" />
                  <span>Download Word File</span>
                </a>
              </div>
            ) : (
              <div className="space-y-4">
                <button
                  onClick={handleConvert}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                >
                  Convert to Word
                </button>
                <br />
                <button
                  onClick={() => {
                    setFile(null);
                    setDownloadUrl(null);
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

export default PDFToWord;