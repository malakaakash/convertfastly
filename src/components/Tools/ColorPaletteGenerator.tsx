import React, { useState } from 'react';
import { Palette, Copy, RefreshCw, Download } from 'lucide-react';
import { useToolTracking } from '../../hooks/useToolTracking';
import ToolDisruptionNotice from '../Common/ToolDisruptionNotice';

const ColorPaletteGenerator: React.FC = () => {
  useToolTracking('color-palette-generator');

  const [colors, setColors] = useState<string[]>([]);
  const [copiedColor, setCopiedColor] = useState<string>('');
  const [showDisruption, setShowDisruption] = useState<boolean>(true);

  const generateRandomColor = (): string => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const generatePalette = () => {
    const newColors = Array.from({ length: 5 }, () => generateRandomColor());
    setColors(newColors);
  };

  const copyToClipboard = async (color: string) => {
    await navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(''), 2000);
  };

  const exportPalette = () => {
    const paletteText = colors.join('\n');
    const blob = new Blob([paletteText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'color-palette.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  React.useEffect(() => {
    generatePalette();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      {showDisruption && (
        <ToolDisruptionNotice 
          toolName="Color Palette Generator"
          onDismiss={() => setShowDisruption(false)}
        />
      )}
      
      <div className="flex items-center space-x-3 mb-6">
        <Palette className="h-8 w-8 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">Color Palette Generator</h2>
      </div>

      <p className="text-gray-600 mb-6">
        Generate beautiful color palettes for your designs. Click on any color to copy its hex code.
      </p>

      <div className="flex flex-wrap gap-4 mb-6">
        <button
          onClick={generatePalette}
          className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <RefreshCw className="h-5 w-5" />
          <span>Generate New Palette</span>
        </button>

        {colors.length > 0 && (
          <button
            onClick={exportPalette}
            className="flex items-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Download className="h-5 w-5" />
            <span>Export Palette</span>
          </button>
        )}
      </div>

      {colors.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {colors.map((color, index) => (
            <div
              key={index}
              className="relative group cursor-pointer transform hover:scale-105 transition-transform"
              onClick={() => copyToClipboard(color)}
            >
              <div
                className="w-full h-32 rounded-lg shadow-md"
                style={{ backgroundColor: color }}
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-50 rounded-lg">
                <div className="text-white text-center">
                  <Copy className="h-6 w-6 mx-auto mb-1" />
                  <span className="text-sm">Click to copy</span>
                </div>
              </div>
              <p className="text-center mt-2 font-mono text-sm text-gray-700 font-semibold">
                {color}
              </p>
              {copiedColor === color && (
                <p className="text-center text-xs text-green-600 font-medium">
                  Copied! ✓
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorPaletteGenerator;