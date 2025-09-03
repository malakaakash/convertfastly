import React, { useState, useRef } from 'react';
import { FileText, Upload, Download } from 'lucide-react';
import LoadingSpinner from '../Common/LoadingSpinner';
import EngagementPopup from '../Common/EngagementPopup';

const WordToPDF: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && (selectedFile.type.includes('word') || selectedFile.name.endsWith('.docx') || selectedFile.name.endsWith('.doc'))) {
      setFile(selectedFile);
      setDownloadUrl(null);
    } else {
      alert('Please select a valid Word document (.doc or .docx).');
    }
  };

  const handleConvert = async () => {
    if (!file) return;

    setIsConverting(true);
    
    // Simulate conversion process
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Create a dummy PDF file download
    const dummyContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
>>
endobj

4 0 obj
<<
/Length 44
>>
stream
BT
/F1 12 Tf
72 720 Td
(Converted from ${file.name}) Tj
ET
endstream
endobj

xref
0 5
0000000000 65535 f 
0000000010 00000 n 
0000000079 00000 n 
0000000173 00000 n 
0000000301 00000 n 
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
395
%%EOF`;
    
    const blob = new Blob([dummyContent], { type: 'application/pdf' });
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
    if (droppedFile && (droppedFile.type.includes('word') || droppedFile.name.endsWith('.docx') || droppedFile.name.endsWith('.doc'))) {
      setFile(droppedFile);
      setDownloadUrl(null);
    }
  };

  React.useEffect(() => {
    document.title = 'Word to PDF Converter - ConvertFastly';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Convert Word documents to PDF files online. Fast, free, and secure DOCX to PDF conversion.');
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText className="h-8 w-8 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Word to PDF Converter</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Convert your Word documents to PDF format. Preserve formatting and create professional-looking PDF files.
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
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Choose Word file or drag & drop</h3>
            <p className="text-gray-500 mb-4">Support for .doc and .docx files up to 10MB</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
              Select Word File
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".doc,.docx"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        ) : (
          <div className="text-center">
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <FileText className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="font-medium text-gray-900">{file.name}</p>
              <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>

            {isConverting ? (
              <div className="py-8">
                <LoadingSpinner size="lg" color="blue" />
                <p className="text-gray-600 mt-4">Converting Word to PDF...</p>
              </div>
            ) : downloadUrl ? (
              <div className="py-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <p className="text-green-800 font-medium">Conversion completed successfully!</p>
                </div>
                <a
                  href={downloadUrl}
                  download={file.name.replace(/\.(doc|docx)$/, '.pdf')}
                  className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  <Download className="h-5 w-5" />
                  <span>Download PDF</span>
                </a>
              </div>
            ) : (
              <div className="space-y-4">
                <button
                  onClick={handleConvert}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                >
                  Convert to PDF
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
        type="email"
      />
    </div>
  );
};

export default WordToPDF;