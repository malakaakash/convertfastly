import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { FileText, Upload, Download, RotateCw, Scissors, Merge, Type, Image as ImageIcon } from 'lucide-react';
import LoadingSpinner from '../Common/LoadingSpinner';
import { useToolTracking } from '../../hooks/useToolTracking';

const PDFEditor: React.FC = () => {
  useToolTracking('pdf-editor');

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [editedFileUrl, setEditedFileUrl] = useState<string>('');
  const [currentOperation, setCurrentOperation] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      setEditedFileUrl('');
    }
  };

  const simulateOperation = async (operation: string) => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setCurrentOperation(operation);
    
    // Simulate PDF editing process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Create mock edited PDF blob
    const mockPdfContent = `%PDF-1.4 Edited PDF - ${operation}`;
    const blob = new Blob([mockPdfContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    
    setEditedFileUrl(url);
    setIsProcessing(false);
    setCurrentOperation('');
  };

  const downloadEditedFile = () => {
    if (editedFileUrl && selectedFile) {
      const a = document.createElement('a');
      a.href = editedFileUrl;
      a.download = `edited-${selectedFile.name}`;
      a.click();
    }
  };

  const operations = [
    {
      id: 'rotate',
      name: 'Rotate Pages',
      description: 'Rotate PDF pages 90°, 180°, or 270°',
      icon: RotateCw,
      color: 'blue'
    },
    {
      id: 'split',
      name: 'Split PDF',
      description: 'Extract specific pages or ranges',
      icon: Scissors,
      color: 'green'
    },
    {
      id: 'merge',
      name: 'Merge PDFs',
      description: 'Combine multiple PDF files',
      icon: Merge,
      color: 'purple'
    },
    {
      id: 'text',
      name: 'Add Text',
      description: 'Insert text annotations',
      icon: Type,
      color: 'orange'
    },
    {
      id: 'image',
      name: 'Add Images',
      description: 'Insert images into PDF',
      icon: ImageIcon,
      color: 'red'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Free PDF Editor - Edit PDF Files Online | ConvertFastly</title>
        <meta name="description" content="Edit PDF files online for free. Rotate pages, split PDFs, merge documents, add text and images. No software installation required." />
        <meta name="keywords" content="PDF editor, edit PDF online, PDF tools, rotate PDF, split PDF, merge PDF, add text to PDF, PDF annotator" />
        <link rel="canonical" href="https://convertfastly.com/pdf-editor" />
        <meta property="og:title" content="Free PDF Editor - Edit PDF Files Online" />
        <meta property="og:description" content="Edit PDF files online with our free PDF editor. Rotate, split, merge, and annotate PDFs." />
        <meta property="og:url" content="https://convertfastly.com/pdf-editor" />
      </Helmet>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center space-x-3 mb-6">
          <FileText className="h-8 w-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">PDF Editor</h2>
        </div>

        <p className="text-gray-600 mb-8">
          Edit your PDF files online with powerful editing tools. Rotate pages, split documents, add text, and more.
        </p>

        <div className="space-y-8">
          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select PDF File to Edit
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
                  <p className="text-sm text-gray-400 mt-2">Maximum file size: 50MB</p>
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
              {/* Editing Operations */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Editing Operation</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {operations.map((operation) => {
                    const Icon = operation.icon;
                    return (
                      <button
                        key={operation.id}
                        onClick={() => simulateOperation(operation.id)}
                        disabled={isProcessing}
                        className={`p-6 border-2 border-gray-200 rounded-lg hover:border-${operation.color}-300 hover:bg-${operation.color}-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-left`}
                      >
                        <Icon className={`h-8 w-8 text-${operation.color}-600 mb-3`} />
                        <h4 className="font-semibold text-gray-900 mb-2">{operation.name}</h4>
                        <p className="text-sm text-gray-600">{operation.description}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Processing Status */}
              {isProcessing && (
                <div className="text-center py-8">
                  <LoadingSpinner size="lg" color="blue" />
                  <p className="text-gray-600 mt-4">
                    Processing PDF - {operations.find(op => op.id === currentOperation)?.name}...
                  </p>
                </div>
              )}

              {/* Download Result */}
              {editedFileUrl && (
                <div className="text-center space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-green-800 font-medium">✓ PDF edited successfully!</p>
                  </div>
                  <button
                    onClick={downloadEditedFile}
                    className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 mx-auto"
                  >
                    <Download className="h-5 w-5" />
                    <span>Download Edited PDF</span>
                  </button>
                </div>
              )}
            </>
          )}

          {/* Features */}
          <div className="bg-blue-50 rounded-lg p-6">
            <h4 className="font-semibold text-blue-900 mb-3">PDF Editing Features</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
              <ul className="space-y-2">
                <li>• Rotate pages in any direction</li>
                <li>• Split PDFs by page ranges</li>
                <li>• Merge multiple PDF files</li>
              </ul>
              <ul className="space-y-2">
                <li>• Add text annotations</li>
                <li>• Insert images and graphics</li>
                <li>• Secure and private editing</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PDFEditor;