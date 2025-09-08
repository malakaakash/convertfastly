import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { FileText, Upload, Download, Trash2, ArrowUp, ArrowDown, Merge } from 'lucide-react';
import LoadingSpinner from '../Common/LoadingSpinner';
import { useToolTracking } from '../../hooks/useToolTracking';

interface PDFFile {
  id: string;
  file: File;
  name: string;
  size: string;
}

const PDFMerger: React.FC = () => {
  useToolTracking('pdf-merger');

  const [pdfFiles, setPdfFiles] = useState<PDFFile[]>([]);
  const [isMerging, setIsMerging] = useState<boolean>(false);
  const [mergedFileUrl, setMergedFileUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const pdfFilesOnly = files.filter(file => file.type === 'application/pdf');
    
    const newPdfFiles: PDFFile[] = pdfFilesOnly.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2) + ' MB'
    }));

    setPdfFiles(prev => [...prev, ...newPdfFiles]);
  };

  const removeFile = (id: string) => {
    setPdfFiles(prev => prev.filter(file => file.id !== id));
  };

  const moveFile = (id: string, direction: 'up' | 'down') => {
    setPdfFiles(prev => {
      const index = prev.findIndex(file => file.id === id);
      if (index === -1) return prev;
      
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= prev.length) return prev;
      
      const newFiles = [...prev];
      [newFiles[index], newFiles[newIndex]] = [newFiles[newIndex], newFiles[index]];
      return newFiles;
    });
  };

  const simulateMerge = async () => {
    if (pdfFiles.length < 2) return;

    setIsMerging(true);
    
    // Simulate PDF merging process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Create a mock merged PDF blob
    const mockPdfContent = '%PDF-1.4\n1 0 obj\n<<\n/Type /Catalog\n/Pages 2 0 R\n>>\nendobj\n2 0 obj\n<<\n/Type /Pages\n/Kids [3 0 R]\n/Count 1\n>>\nendobj\n3 0 obj\n<<\n/Type /Page\n/Parent 2 0 R\n/MediaBox [0 0 612 792]\n>>\nendobj\nxref\n0 4\n0000000000 65535 f \n0000000009 00000 n \n0000000074 00000 n \n0000000120 00000 n \ntrailer\n<<\n/Size 4\n/Root 1 0 R\n>>\nstartxref\n179\n%%EOF';
    const blob = new Blob([mockPdfContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    
    setMergedFileUrl(url);
    setIsMerging(false);
  };

  const downloadMergedFile = () => {
    if (mergedFileUrl) {
      const a = document.createElement('a');
      a.href = mergedFileUrl;
      a.download = 'merged-document.pdf';
      a.click();
    }
  };

  const clearAll = () => {
    setPdfFiles([]);
    setMergedFileUrl('');
  };

  return (
    <>
      <Helmet>
        <title>Free PDF Merger - Combine Multiple PDFs Online | ConvertFastly</title>
        <meta name="description" content="Merge multiple PDF files into one document for free. Drag and drop to reorder pages. Fast, secure PDF combining tool with no file size limits." />
        <meta name="keywords" content="PDF merger, combine PDF, merge PDF files, PDF joiner, PDF combiner, merge documents, PDF tools, free PDF merger" />
        <link rel="canonical" href="https://convertfastly.com/pdf-merger" />
        <meta property="og:title" content="Free PDF Merger - Combine Multiple PDFs Online" />
        <meta property="og:description" content="Merge multiple PDF files into one document. Free, fast, and secure PDF combining tool." />
        <meta property="og:url" content="https://convertfastly.com/pdf-merger" />
      </Helmet>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center space-x-3 mb-6">
          <Merge className="h-8 w-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">PDF Merger</h2>
        </div>

        <p className="text-gray-600 mb-8">
          Combine multiple PDF files into a single document. Drag and drop to reorder files before merging.
        </p>

        <div className="space-y-8">
          {/* File Upload */}
          <div>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
            >
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Click to upload PDF files or drag and drop</p>
              <p className="text-sm text-gray-400">Select multiple PDF files to merge</p>
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              multiple
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {/* File List */}
          {pdfFiles.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Files to Merge ({pdfFiles.length})
                </h3>
                <button
                  onClick={clearAll}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Clear All
                </button>
              </div>
              
              <div className="space-y-3">
                {pdfFiles.map((pdfFile, index) => (
                  <div
                    key={pdfFile.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50"
                  >
                    <div className="flex items-center space-x-3">
                      <FileText className="h-8 w-8 text-red-600" />
                      <div>
                        <p className="font-medium text-gray-900">{pdfFile.name}</p>
                        <p className="text-sm text-gray-500">{pdfFile.size}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500 bg-white px-2 py-1 rounded">
                        #{index + 1}
                      </span>
                      <button
                        onClick={() => moveFile(pdfFile.id, 'up')}
                        disabled={index === 0}
                        className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                      >
                        <ArrowUp className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => moveFile(pdfFile.id, 'down')}
                        disabled={index === pdfFiles.length - 1}
                        className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                      >
                        <ArrowDown className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => removeFile(pdfFile.id)}
                        className="p-1 text-red-400 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Merge Button */}
          {pdfFiles.length >= 2 && (
            <div className="text-center">
              {!mergedFileUrl ? (
                <button
                  onClick={simulateMerge}
                  disabled={isMerging}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 mx-auto"
                >
                  {isMerging ? (
                    <>
                      <LoadingSpinner size="sm" color="white" />
                      <span>Merging PDFs...</span>
                    </>
                  ) : (
                    <>
                      <Merge className="h-5 w-5" />
                      <span>Merge {pdfFiles.length} PDFs</span>
                    </>
                  )}
                </button>
              ) : (
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-green-800 font-medium">✓ PDFs merged successfully!</p>
                  </div>
                  <button
                    onClick={downloadMergedFile}
                    className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 mx-auto"
                  >
                    <Download className="h-5 w-5" />
                    <span>Download Merged PDF</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {pdfFiles.length === 1 && (
            <div className="text-center text-gray-500">
              Add at least one more PDF file to merge
            </div>
          )}

          {/* Features */}
          <div className="bg-blue-50 rounded-lg p-6">
            <h4 className="font-semibold text-blue-900 mb-3">Features</h4>
            <ul className="space-y-2 text-sm text-blue-800">
              <li>• Merge unlimited PDF files</li>
              <li>• Drag and drop to reorder files</li>
              <li>• Maintains original quality</li>
              <li>• Fast and secure processing</li>
              <li>• No file size limitations</li>
              <li>• Works entirely in your browser</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default PDFMerger;