import React, { useState, useEffect } from 'react';
import { Palette, Copy, RefreshCw } from 'lucide-react';

interface ColorFormats {
  hex: string;
  rgb: string;
  hsl: string;
  hsv: string;
}

const ColorFormatConverter: React.FC = () => {
  const [color, setColor] = useState<string>('#3b82f6');
  const [formats, setFormats] = useState<ColorFormats>({
    hex: '',
    rgb: '',
    hsl: '',
    hsv: ''
  });
  const [copiedFormat, setCopiedFormat] = useState<string>('');

  const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgbToHsl = (r: number, g: number, b: number): { h: number; s: number; l: number } => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h: number, s: number, l: number;

    l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
        default: h = 0;
      }
      h /= 6;
    }

    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  };

  const rgbToHsv = (r: number, g: number, b: number): { h: number; s: number; v: number } => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const diff = max - min;

    let h: number, s: number, v: number;
    v = max;

    if (max === 0) {
      s = 0;
    } else {
      s = diff / max;
    }

    if (diff === 0) {
      h = 0;
    } else {
      switch (max) {
        case r: h = (g - b) / diff + (g < b ? 6 : 0); break;
        case g: h = (b - r) / diff + 2; break;
        case b: h = (r - g) / diff + 4; break;
        default: h = 0;
      }
      h /= 6;
    }

    return { h: Math.round(h * 360), s: Math.round(s * 100), v: Math.round(v * 100) };
  };

  const convertColor = (hexColor: string) => {
    const rgb = hexToRgb(hexColor);
    if (!rgb) return;

    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);

    setFormats({
      hex: hexColor.toUpperCase(),
      rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
      hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
      hsv: `hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`
    });
  };

  const generateRandomColor = () => {
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    setColor(randomColor);
  };

  const copyToClipboard = async (text: string, format: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedFormat(format);
    setTimeout(() => setCopiedFormat(''), 2000);
  };

  const popularColors = [
    { name: 'Blue', hex: '#3b82f6' },
    { name: 'Red', hex: '#ef4444' },
    { name: 'Green', hex: '#10b981' },
    { name: 'Purple', hex: '#8b5cf6' },
    { name: 'Yellow', hex: '#f59e0b' },
    { name: 'Pink', hex: '#ec4899' },
    { name: 'Indigo', hex: '#6366f1' },
    { name: 'Teal', hex: '#14b8a6' },
  ];

  useEffect(() => {
    convertColor(color);
  }, [color]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center space-x-3 mb-6">
        <Palette className="h-8 w-8 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">Color Format Converter</h2>
      </div>

      <p className="text-gray-600 mb-8">
        Convert colors between different formats: HEX, RGB, HSL, and HSV. Perfect for design and development work.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Color Input */}
        <div className="space-y-6">
          <div className="text-center">
            <div
              className="w-48 h-48 mx-auto rounded-xl shadow-lg border-4 border-white"
              style={{ backgroundColor: color }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Color Picker
            </label>
            <div className="flex space-x-3">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-16 h-12 border border-gray-300 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
                placeholder="#000000"
              />
              <button
                onClick={generateRandomColor}
                className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <RefreshCw className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Popular Colors
            </label>
            <div className="grid grid-cols-4 gap-2">
              {popularColors.map((colorItem, index) => (
                <button
                  key={index}
                  onClick={() => setColor(colorItem.hex)}
                  className="group text-center"
                >
                  <div
                    className="w-12 h-12 rounded-lg mx-auto mb-1 border-2 border-gray-200 group-hover:border-gray-400 transition-colors"
                    style={{ backgroundColor: colorItem.hex }}
                  />
                  <div className="text-xs text-gray-600">{colorItem.name}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Format Results */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Color Formats</h3>
          
          {Object.entries(formats).map(([format, value]) => (
            <div key={format} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700 uppercase">
                  {format}
                </span>
                <button
                  onClick={() => copyToClipboard(value, format)}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
              
              <div className="bg-gray-50 rounded p-3 font-mono text-sm">
                {value}
              </div>
              
              {copiedFormat === format && (
                <div className="text-xs text-green-600 mt-2">Copied to clipboard! ✓</div>
              )}
            </div>
          ))}

          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">Format Usage</h4>
            <div className="space-y-2 text-sm text-blue-800">
              <div><strong>HEX:</strong> Web development, CSS</div>
              <div><strong>RGB:</strong> Digital displays, CSS</div>
              <div><strong>HSL:</strong> CSS, easier color manipulation</div>
              <div><strong>HSV:</strong> Design software, color theory</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorFormatConverter;