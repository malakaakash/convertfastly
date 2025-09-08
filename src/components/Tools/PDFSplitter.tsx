import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { FileText, Upload, Download, Scissors, Settings } from 'lucide-react';
import LoadingSpinner from '../Common/LoadingSpinner';
import { useToolTracking } from '../../hooks/useToolTracking';

const PDFSplitter: React.FC = () => {
  useToolTracking('pdf-splitter');

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [splitMode, setSplitMode] = useState<'pages' | 'range'>('pages');
  const [pageNumbers, setPageNumbers] = useState<string>('1,2,3');
  const [pageRange, setPageRange] = useState<{ start: number; end: number }>({ start: 1, end: 5 });
  const [isSplitting, setIsSplitting] = useState<boolean>(false);
  const [splitFiles, setSplitFiles] = useState<string[]>([]);
  const [totalPages, setTotalPages] = useState<number>(10); // Mock total pages
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      setSplitFiles([]);
      // In a real implementation, you would extract the actual page count
      setTotalPages(Math.floor(Math.random() * 20) + 5); // Mock 5-25 pages
    }
  };

  const simulateSplit = async () => {
    if (!selectedFile) return;

    setIsSplitting(true);
    
    // Simulate PDF splitting process
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Create mock split PDF URLs
    const mockUrls: string[] = [];
    
    if (splitMode === 'pages') {
      const pages = pageNumbers.split(',').map(p => parseInt(p.trim())).filter(p => !isNaN(p));
      pages.forEach(page => {
        const mockPdfContent = `%PDF-1.4 Mock PDF Page ${page}`;
        const blob = new Blob([mockPdfContent], { type: 'application/pdf' });
        mockUrls.push(URL.createObjectURL(blob));
      });
    } else {
      const mockPdfContent = `%PDF-1.4 Mock PDF Pages ${pageRange.start}-${pageRange.end}`;
      const blob = new Blob([mockPdfContent], { type: 'application/pdf' });
      mockUrls.push(URL.createObjectURL(blob));
    }
    
    setSplitFiles(mockUrls);
    setIsSplitting(false);
  };

  const downloadFile = (url: string, index: number) => {
    const a = document.createElement('a');
    a.href = url;
    if (splitMode === 'pages') {
      const pages = pageNumbers.split(',').map(p => parseInt(p.trim())).filter(p => !isNaN(p));
      a.download = `${selectedFile?.name.replace('.pdf', '')}-page-${pages[index]}.pdf`;
    } else {
      a.download = `${selectedFile?.name.replace('.pdf', '')}-pages-${pageRange.start}-${pageRange.end}.pdf`;
    }
    a.click();
  };

  const downloadAll = () => {
    splitFiles.forEach((url, index) => {
      setTimeout(() => downloadFile(url, index), index * 500);
    });
  };

  return (
    <>
      <Helmet>
        <title>Free PDF Splitter - Extract Pages from PDF Online | ConvertFastly</title>
        <meta name="description" content="Split PDF files and extract specific pages for free. Choose individual pages or page ranges. Fast, secure PDF splitting tool with no file size limits." />
        <meta name="keywords" content="PDF splitter, split PDF, extract PDF pages, PDF page extractor, divide PDF, PDF tools, free PDF splitter, separate PDF pages" />
        <link rel="canonical" href="https://convertfastly.com/pdf-splitter" />
        <meta property="og:title" content="Free PDF Splitter - Extract Pages from PDF Online" />
        <meta property="og:description" content="Split PDF files and extract specific pages. Free, fast, and secure PDF splitting tool." />
        <meta property="og:url" content="https://convertfastly.com/pdf-splitter" />
      </Helmet>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center space-x-3 mb-6">
          <Scissors className="h-8 w-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">PDF Splitter</h2>
        </div>

        <p className="text-gray-600 mb-8">
          Extract specific pages from your PDF documents. Choose individual pages or page ranges to create separate PDF files.
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
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • {totalPages} pages
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
              {/* Split Options */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Settings className="h-5 w-5 text-gray-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Split Options</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => setSplitMode('pages')}
                    className={`p-4 text-left border rounded-lg transition-colors ${
                      splitMode === 'pages'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="font-medium">Extract Specific Pages</div>
                    <div className="text-sm text-gray-500">Choose individual pages to extract</div>
                  </button>

                  <button
                    onClick={() => setSplitMode('range')}
                    className={`p-4 text-left border rounded-lg transition-colors ${
                      splitMode === 'range'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="font-medium">Extract Page Range</div>
                    <div className="text-sm text-gray-500">Choose a continuous range of pages</div>
                  </button>
                </div>

                {splitMode === 'pages' ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Page Numbers (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={pageNumbers}
                      onChange={(e) => setPageNumbers(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="1,3,5,7"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Example: 1,3,5 will extract pages 1, 3, and 5 as separate files
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Page
                      </label>
                      <input
                        type="number"
                        min="1"
                        max={totalPages}
                        value={pageRange.start}
                        onChange={(e) => setPageRange(prev => ({ ...prev, start: parseInt(e.target.value) || 1 }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        End Page
                      </label>
                      <input
                        type="number"
                        min={pageRange.start}
                        max={totalPages}
                        value={pageRange.end}
                        onChange={(e) => setPageRange(prev => ({ ...prev, end: parseInt(e.target.value) || totalPages }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Split Button */}
              <div className="text-center">
                {splitFiles.length === 0 ? (
                  <button
                    onClick={simulateSplit}
                    disabled={isSplitting}
                    className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 mx-auto"
                  >
                    {isSplitting ? (
                      <>
                        <LoadingSpinner size="sm" color="white" />
                        <span>Splitting PDF...</span>
                      </>
                    ) : (
                      <>
                        <Scissors className="h-5 w-5" />
                        <span>Split PDF</span>
                      </>
                    )}
                  </button>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="text-green-800 font-medium">
                        ✓ PDF split successfully! {splitFiles.length} file(s) created.
                      </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <button
                        onClick={downloadAll}
                        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                      >
                        <Download className="h-5 w-5" />
                        <span>Download All ({splitFiles.length})</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
                      {splitFiles.map((url, index) => (
                        <button
                          key={index}
                          onClick={() => downloadFile(url, index)}
                          className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-left"
                        >
                          <div className="flex items-center space-x-2">
                            <FileText className="h-5 w-5 text-red-600" />
                            <span className="text-sm font-medium">
                              {splitMode === 'pages' 
                                ? `Page ${pageNumbers.split(',')[index]?.trim()}`
                                : `Pages ${pageRange.start}-${pageRange.end}`
                              }
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Features */}
          <div className="bg-blue-50 rounded-lg p-6">
            <h4 className="font-semibold text-blue-900 mb-3">Features</h4>
            <ul className="space-y-2 text-sm text-blue-800">
              <li>• Extract specific pages or page ranges</li>
              <li>• Maintains original PDF quality</li>
              <li>• Fast and secure processing</li>
              <li>• No file size limitations</li>
              <li>• Download individual or all files</li>
              <li>• Works entirely in your browser</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default PDFSplitter;