import React, { useState } from 'react';
import { Type, Copy, Download, RefreshCw } from 'lucide-react';

const LoremIpsumGenerator: React.FC = () => {
  const [generatedText, setGeneratedText] = useState<string>('');
  const [paragraphs, setParagraphs] = useState<number>(3);
  const [wordsPerParagraph, setWordsPerParagraph] = useState<number>(50);
  const [startWithLorem, setStartWithLorem] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  const loremWords = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
    'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
    'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
    'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
    'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
    'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum', 'at', 'vero', 'eos',
    'accusamus', 'iusto', 'odio', 'dignissimos', 'ducimus', 'blanditiis',
    'praesentium', 'voluptatum', 'deleniti', 'atque', 'corrupti', 'quos', 'dolores',
    'quas', 'molestias', 'excepturi', 'occaecati', 'cupiditate', 'similique',
    'eleifend', 'feugiat', 'pretium', 'lectus', 'quam', 'viverra', 'ornare'
  ];

  const generateLorem = () => {
    let result = [];
    
    for (let i = 0; i < paragraphs; i++) {
      let paragraph = [];
      
      for (let j = 0; j < wordsPerParagraph; j++) {
        if (i === 0 && j === 0 && startWithLorem) {
          paragraph.push('Lorem');
        } else if (i === 0 && j === 1 && startWithLorem) {
          paragraph.push('ipsum');
        } else {
          const randomWord = loremWords[Math.floor(Math.random() * loremWords.length)];
          if (j === 0) {
            paragraph.push(randomWord.charAt(0).toUpperCase() + randomWord.slice(1));
          } else {
            paragraph.push(randomWord);
          }
        }
      }
      
      result.push(paragraph.join(' ') + '.');
    }
    
    setGeneratedText(result.join('\n\n'));
  };

  const copyToClipboard = async () => {
    if (generatedText) {
      await navigator.clipboard.writeText(generatedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadText = () => {
    if (generatedText) {
      const blob = new Blob([generatedText], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'lorem-ipsum.txt';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const presets = [
    { name: 'Short (1 paragraph)', paragraphs: 1, words: 30 },
    { name: 'Medium (3 paragraphs)', paragraphs: 3, words: 50 },
    { name: 'Long (5 paragraphs)', paragraphs: 5, words: 75 },
    { name: 'Article (10 paragraphs)', paragraphs: 10, words: 60 },
  ];

  React.useEffect(() => {
    generateLorem();
  }, [paragraphs, wordsPerParagraph, startWithLorem]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center space-x-3 mb-6">
        <Type className="h-8 w-8 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">Lorem Ipsum Generator</h2>
      </div>

      <p className="text-gray-600 mb-8">
        Generate placeholder text for your designs and layouts. Perfect for wireframes, mockups, and testing content layouts.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Quick Presets
            </label>
            <div className="grid grid-cols-1 gap-2">
              {presets.map((preset, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setParagraphs(preset.paragraphs);
                    setWordsPerParagraph(preset.words);
                  }}
                  className="text-left p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                >
                  <div className="font-medium text-gray-900">{preset.name}</div>
                  <div className="text-sm text-gray-500">
                    {preset.paragraphs} paragraphs, ~{preset.words} words each
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Paragraphs: {paragraphs}
            </label>
            <input
              type="range"
              min="1"
              max="20"
              value={paragraphs}
              onChange={(e) => setParagraphs(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1</span>
              <span>20</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Words per Paragraph: {wordsPerParagraph}
            </label>
            <input
              type="range"
              min="10"
              max="100"
              value={wordsPerParagraph}
              onChange={(e) => setWordsPerParagraph(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>10</span>
              <span>100</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="startWithLorem"
              checked={startWithLorem}
              onChange={(e) => setStartWithLorem(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="startWithLorem" className="text-sm text-gray-700">
              Start with "Lorem ipsum"
            </label>
          </div>

          <div className="flex gap-3">
            <button
              onClick={generateLorem}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex-1"
            >
              <RefreshCw className="h-5 w-5" />
              <span>Generate</span>
            </button>
            
            <button
              onClick={copyToClipboard}
              disabled={!generatedText}
              className="flex items-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <Copy className="h-5 w-5" />
              <span>Copy</span>
            </button>
            
            <button
              onClick={downloadText}
              disabled={!generatedText}
              className="flex items-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <Download className="h-5 w-5" />
              <span>Download</span>
            </button>
          </div>

          {copied && (
            <div className="text-sm text-green-600 text-center">
              Text copied to clipboard! ✓
            </div>
          )}
        </div>

        {/* Generated Text */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-gray-700">Generated Text</label>
            <span className="text-xs text-gray-500">
              {generatedText.split(' ').length} words, {generatedText.length} characters
            </span>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 h-96 overflow-y-auto">
            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
              {generatedText || 'Generated Lorem Ipsum text will appear here...'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoremIpsumGenerator;