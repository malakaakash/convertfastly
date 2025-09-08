import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { FileText, Upload, Download, Save, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, List, ListOrdered } from 'lucide-react';
import { useToolTracking } from '../../hooks/useToolTracking';

const WordEditor: React.FC = () => {
  useToolTracking('word-editor');

  const [content, setContent] = useState<string>('');
  const [fileName, setFileName] = useState<string>('document');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setContent(text);
        setFileName(file.name.replace(/\.(docx?|txt)$/i, ''));
      };
      reader.readAsText(file);
    }
  };

  const formatText = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }
  };

  const downloadAsWord = () => {
    const blob = new Blob([content], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.doc`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadAsTxt = () => {
    const textContent = editorRef.current?.innerText || content;
    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const loadSampleDocument = () => {
    const sampleContent = `<h1>Sample Document</h1>
<p>This is a sample document created with our Word Editor. You can format text with various options:</p>
<ul>
<li><strong>Bold text</strong></li>
<li><em>Italic text</em></li>
<li><u>Underlined text</u></li>
</ul>
<p>You can also create numbered lists:</p>
<ol>
<li>First item</li>
<li>Second item</li>
<li>Third item</li>
</ol>
<p>The editor supports different text alignments and formatting options to help you create professional documents.</p>`;
    
    setContent(sampleContent);
    if (editorRef.current) {
      editorRef.current.innerHTML = sampleContent;
    }
  };

  return (
    <>
      <Helmet>
        <title>Free Online Word Editor - Create & Edit Documents | ConvertFastly</title>
        <meta name="description" content="Free online word processor and document editor. Create, edit, and format documents with rich text editing features. Download as Word or text files." />
        <meta name="keywords" content="word editor, document editor, online word processor, text editor, document creator, rich text editor, free word editor" />
        <link rel="canonical" href="https://convertfastly.com/word-editor" />
        <meta property="og:title" content="Free Online Word Editor - Create & Edit Documents" />
        <meta property="og:description" content="Create and edit documents online with our free word processor. Rich text formatting and download options." />
        <meta property="og:url" content="https://convertfastly.com/word-editor" />
      </Helmet>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center space-x-3 mb-6">
          <FileText className="h-8 w-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Word Editor</h2>
        </div>

        <p className="text-gray-600 mb-8">
          Create and edit documents online with rich text formatting. Perfect for writing letters, reports, and documents.
        </p>

        <div className="space-y-6">
          {/* File Controls */}
          <div className="flex flex-wrap items-center gap-4">
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Document name"
            />
            
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              <Upload className="h-4 w-4" />
              <span>Upload</span>
            </button>

            <button
              onClick={loadSampleDocument}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Load Sample
            </button>

            <button
              onClick={downloadAsWord}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Download className="h-4 w-4" />
              <span>Download Word</span>
            </button>

            <button
              onClick={downloadAsTxt}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              <Download className="h-4 w-4" />
              <span>Download Text</span>
            </button>
          </div>

          {/* Formatting Toolbar */}
          <div className="flex flex-wrap items-center gap-2 p-4 bg-gray-50 rounded-lg">
            <button
              onClick={() => formatText('bold')}
              className="p-2 hover:bg-gray-200 rounded"
              title="Bold"
            >
              <Bold className="h-4 w-4" />
            </button>
            
            <button
              onClick={() => formatText('italic')}
              className="p-2 hover:bg-gray-200 rounded"
              title="Italic"
            >
              <Italic className="h-4 w-4" />
            </button>
            
            <button
              onClick={() => formatText('underline')}
              className="p-2 hover:bg-gray-200 rounded"
              title="Underline"
            >
              <Underline className="h-4 w-4" />
            </button>

            <div className="w-px h-6 bg-gray-300 mx-2"></div>

            <button
              onClick={() => formatText('justifyLeft')}
              className="p-2 hover:bg-gray-200 rounded"
              title="Align Left"
            >
              <AlignLeft className="h-4 w-4" />
            </button>
            
            <button
              onClick={() => formatText('justifyCenter')}
              className="p-2 hover:bg-gray-200 rounded"
              title="Align Center"
            >
              <AlignCenter className="h-4 w-4" />
            </button>
            
            <button
              onClick={() => formatText('justifyRight')}
              className="p-2 hover:bg-gray-200 rounded"
              title="Align Right"
            >
              <AlignRight className="h-4 w-4" />
            </button>

            <div className="w-px h-6 bg-gray-300 mx-2"></div>

            <button
              onClick={() => formatText('insertUnorderedList')}
              className="p-2 hover:bg-gray-200 rounded"
              title="Bullet List"
            >
              <List className="h-4 w-4" />
            </button>
            
            <button
              onClick={() => formatText('insertOrderedList')}
              className="p-2 hover:bg-gray-200 rounded"
              title="Numbered List"
            >
              <ListOrdered className="h-4 w-4" />
            </button>

            <select
              onChange={(e) => formatText('fontSize', e.target.value)}
              className="px-2 py-1 border border-gray-300 rounded text-sm"
            >
              <option value="1">Small</option>
              <option value="3" selected>Normal</option>
              <option value="5">Large</option>
              <option value="7">Extra Large</option>
            </select>
          </div>

          {/* Editor */}
          <div
            ref={editorRef}
            contentEditable
            onInput={(e) => setContent(e.currentTarget.innerHTML)}
            className="min-h-[400px] p-6 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            style={{ lineHeight: '1.6' }}
            dangerouslySetInnerHTML={{ __html: content }}
          />

          <input
            ref={fileInputRef}
            type="file"
            accept=".txt,.doc,.docx"
            onChange={handleFileUpload}
            className="hidden"
          />

          {/* Features */}
          <div className="bg-blue-50 rounded-lg p-6">
            <h4 className="font-semibold text-blue-900 mb-3">Features</h4>
            <ul className="space-y-2 text-sm text-blue-800">
              <li>• Rich text formatting (bold, italic, underline)</li>
              <li>• Text alignment options</li>
              <li>• Bullet and numbered lists</li>
              <li>• Font size adjustment</li>
              <li>• Download as Word or text file</li>
              <li>• Upload existing documents</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default WordEditor;