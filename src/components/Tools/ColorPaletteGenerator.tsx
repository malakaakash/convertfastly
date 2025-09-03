import React, { useState } from 'react';
import { Palette, Copy, RefreshCw, Check } from 'lucide-react';
import EngagementPopup from '../Common/EngagementPopup';

const ColorPaletteGenerator: React.FC = () => {
  const [palette, setPalette] = useState<string[]>([]);
  const [paletteType, setPaletteType] = useState('random');
  const [baseColor, setBaseColor] = useState('#3B82F6');
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const generateRandomColor = (): string => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
  };

  const hexToHsl = (hex: string): [number, number, number] => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return [h * 360, s * 100, l * 100];
  };

  const hslToHex = (h: number, s: number, l: number): string => {
    h /= 360;
    s /= 100;
    l /= 100;

    const hue2rgb = (p: number, q: number, t: number): number => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    const r = hue2rgb(p, q, h + 1/3);
    const g = hue2rgb(p, q, h);
    const b = hue2rgb(p, q, h - 1/3);

    const toHex = (c: number): string => {
      const hex = Math.round(c * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  const generatePalette = () => {
    let newPalette: string[] = [];

    switch (paletteType) {
      case 'random':
        newPalette = Array.from({ length: 5 }, () => generateRandomColor());
        break;
      
      case 'monochromatic':
        const [h, s] = hexToHsl(baseColor);
        newPalette = [
          hslToHex(h, s, 20),
          hslToHex(h, s, 40),
          hslToHex(h, s, 60),
          hslToHex(h, s, 80),
          hslToHex(h, s, 95)
        ];
        break;
      
      case 'analogous':
        const [baseH, baseS, baseL] = hexToHsl(baseColor);
        newPalette = [
          hslToHex((baseH - 30 + 360) % 360, baseS, baseL),
          hslToHex((baseH - 15 + 360) % 360, baseS, baseL),
          baseColor,
          hslToHex((baseH + 15) % 360, baseS, baseL),
          hslToHex((baseH + 30) % 360, baseS, baseL)
        ];
        break;
      
      case 'complementary':
        const [compH, compS, compL] = hexToHsl(baseColor);
        const complementary = (compH + 180) % 360;
        newPalette = [
          hslToHex(compH, compS, Math.max(20, compL - 40)),
          hslToHex(compH, compS, Math.max(10, compL - 20)),
          baseColor,
          hslToHex(complementary, compS, compL),
          hslToHex(complementary, compS, Math.min(90, compL + 20))
        ];
        break;
      
      case 'triadic':
        const [triH, triS, triL] = hexToHsl(baseColor);
        newPalette = [
          baseColor,
          hslToHex((triH + 120) % 360, triS, triL),
          hslToHex((triH + 240) % 360, triS, triL),
          hslToHex(triH, Math.max(20, triS - 30), triL),
          hslToHex(triH, Math.min(90, triS + 20), triL)
        ];
        break;
    }

    setPalette(newPalette);
    
    // Show popup occasionally
    if (Math.random() > 0.8) {
      setShowPopup(true);
    }
  };

  const copyColor = async (color: string) => {
    try {
      await navigator.clipboard.writeText(color);
      setCopiedColor(color);
      setTimeout(() => setCopiedColor(null), 2000);
    } catch (err) {
      console.error('Failed to copy color:', err);
    }
  };

  const downloadPalette = () => {
    const paletteData = {
      type: paletteType,
      baseColor: baseColor,
      colors: palette,
      generatedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(paletteData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `color-palette-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  React.useEffect(() => {
    document.title = 'Color Palette Generator - ConvertFastly';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Generate beautiful color palettes for design projects. Create harmonious color schemes with various algorithms.');
    }
    
    // Generate initial palette
    generatePalette();
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Palette className="h-8 w-8 text-pink-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Color Palette Generator</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Generate beautiful color palettes for your design projects. Choose from various color harmony algorithms.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border p-8">
        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Palette Type
            </label>
            <select
              value={paletteType}
              onChange={(e) => setPaletteType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              <option value="random">Random</option>
              <option value="monochromatic">Monochromatic</option>
              <option value="analogous">Analogous</option>
              <option value="complementary">Complementary</option>
              <option value="triadic">Triadic</option>
            </select>
          </div>

          {paletteType !== 'random' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Base Color
              </label>
              <div className="flex space-x-2">
                <input
                  type="color"
                  value={baseColor}
                  onChange={(e) => setBaseColor(e.target.value)}
                  className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={baseColor}
                  onChange={(e) => setBaseColor(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent font-mono"
                  placeholder="#3B82F6"
                />
              </div>
            </div>
          )}

          <div className="flex items-end">
            <button
              onClick={generatePalette}
              className="w-full inline-flex items-center justify-center space-x-2 bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              <RefreshCw className="h-5 w-5" />
              <span>Generate Palette</span>
            </button>
          </div>
        </div>

        {/* Color Palette Display */}
        {palette.length > 0 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {palette.map((color, index) => (
                <div key={index} className="group">
                  <div
                    className="w-full h-32 rounded-lg shadow-sm border cursor-pointer transition-transform hover:scale-105"
                    style={{ backgroundColor: color }}
                    onClick={() => copyColor(color)}
                  />
                  <div className="mt-3 text-center">
                    <div className="font-mono text-sm text-gray-900 mb-1">{color.toUpperCase()}</div>
                    <button
                      onClick={() => copyColor(color)}
                      className="inline-flex items-center space-x-1 text-xs text-gray-600 hover:text-pink-600 transition-colors"
                    >
                      {copiedColor === color ? (
                        <>
                          <Check className="h-3 w-3" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Palette Preview */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Palette Preview</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="h-8 rounded" style={{ backgroundColor: palette[0] }}></div>
                  <div className="h-8 rounded" style={{ backgroundColor: palette[1] }}></div>
                  <div className="h-8 rounded" style={{ backgroundColor: palette[2] }}></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 rounded" style={{ backgroundColor: palette[3] }}></div>
                  <div className="h-4 rounded" style={{ backgroundColor: palette[4] }}></div>
                  <div className="h-4 rounded" style={{ backgroundColor: palette[0] }}></div>
                  <div className="h-4 rounded" style={{ backgroundColor: palette[1] }}></div>
                </div>
              </div>
            </div>

            {/* Export Options */}
            <div className="text-center">
              <button
                onClick={downloadPalette}
                className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                <span>Download Palette JSON</span>
              </button>
            </div>
          </div>
        )}

        {/* Color Theory Info */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h4 className="font-semibold text-blue-900 mb-3">Color Harmony Types:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
            <div>
              <strong>Monochromatic:</strong> Uses variations of a single color
            </div>
            <div>
              <strong>Analogous:</strong> Uses colors adjacent on the color wheel
            </div>
            <div>
              <strong>Complementary:</strong> Uses colors opposite on the color wheel
            </div>
            <div>
              <strong>Triadic:</strong> Uses three evenly spaced colors on the wheel
            </div>
          </div>
        </div>
      </div>

      <EngagementPopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        type="spin"
      />
    </div>
  );
};

export default ColorPaletteGenerator;