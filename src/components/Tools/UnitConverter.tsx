import React, { useState, useEffect } from 'react';
import { Ruler, ArrowRightLeft, Calculator } from 'lucide-react';

const UnitConverter: React.FC = () => {
  const [value, setValue] = useState<number>(1);
  const [fromUnit, setFromUnit] = useState<string>('meters');
  const [toUnit, setToUnit] = useState<string>('feet');
  const [convertedValue, setConvertedValue] = useState<number>(0);
  const [category, setCategory] = useState<string>('length');

  const conversions = {
    length: {
      name: 'Length',
      units: {
        meters: { name: 'Meters', factor: 1, symbol: 'm' },
        feet: { name: 'Feet', factor: 3.28084, symbol: 'ft' },
        inches: { name: 'Inches', factor: 39.3701, symbol: 'in' },
        centimeters: { name: 'Centimeters', factor: 100, symbol: 'cm' },
        kilometers: { name: 'Kilometers', factor: 0.001, symbol: 'km' },
        miles: { name: 'Miles', factor: 0.000621371, symbol: 'mi' },
        yards: { name: 'Yards', factor: 1.09361, symbol: 'yd' },
      }
    },
    weight: {
      name: 'Weight',
      units: {
        kilograms: { name: 'Kilograms', factor: 1, symbol: 'kg' },
        pounds: { name: 'Pounds', factor: 2.20462, symbol: 'lb' },
        grams: { name: 'Grams', factor: 1000, symbol: 'g' },
        ounces: { name: 'Ounces', factor: 35.274, symbol: 'oz' },
        tons: { name: 'Metric Tons', factor: 0.001, symbol: 't' },
        stones: { name: 'Stones', factor: 0.157473, symbol: 'st' },
      }
    },
    temperature: {
      name: 'Temperature',
      units: {
        celsius: { name: 'Celsius', factor: 1, symbol: '°C' },
        fahrenheit: { name: 'Fahrenheit', factor: 1, symbol: '°F' },
        kelvin: { name: 'Kelvin', factor: 1, symbol: 'K' },
      }
    },
    area: {
      name: 'Area',
      units: {
        'square-meters': { name: 'Square Meters', factor: 1, symbol: 'm²' },
        'square-feet': { name: 'Square Feet', factor: 10.7639, symbol: 'ft²' },
        'square-inches': { name: 'Square Inches', factor: 1550, symbol: 'in²' },
        acres: { name: 'Acres', factor: 0.000247105, symbol: 'ac' },
        hectares: { name: 'Hectares', factor: 0.0001, symbol: 'ha' },
      }
    }
  };

  const convertTemperature = (value: number, from: string, to: string): number => {
    let celsius = value;
    
    // Convert to Celsius first
    if (from === 'fahrenheit') {
      celsius = (value - 32) * 5/9;
    } else if (from === 'kelvin') {
      celsius = value - 273.15;
    }
    
    // Convert from Celsius to target
    if (to === 'fahrenheit') {
      return celsius * 9/5 + 32;
    } else if (to === 'kelvin') {
      return celsius + 273.15;
    }
    
    return celsius;
  };

  const performConversion = () => {
    const categoryData = conversions[category as keyof typeof conversions];
    
    if (category === 'temperature') {
      const result = convertTemperature(value, fromUnit, toUnit);
      setConvertedValue(result);
    } else {
      const fromFactor = categoryData.units[fromUnit]?.factor || 1;
      const toFactor = categoryData.units[toUnit]?.factor || 1;
      const baseValue = value / fromFactor;
      setConvertedValue(baseValue * toFactor);
    }
  };

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  useEffect(() => {
    // Reset units when category changes
    const categoryData = conversions[category as keyof typeof conversions];
    const firstUnit = Object.keys(categoryData.units)[0];
    const secondUnit = Object.keys(categoryData.units)[1] || firstUnit;
    setFromUnit(firstUnit);
    setToUnit(secondUnit);
  }, [category]);

  useEffect(() => {
    performConversion();
  }, [value, fromUnit, toUnit, category]);

  const currentCategory = conversions[category as keyof typeof conversions];

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center space-x-3 mb-6">
        <Ruler className="h-8 w-8 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">Unit Converter</h2>
      </div>

      <p className="text-gray-600 mb-8">
        Convert between different units of measurement. Supports length, weight, temperature, and area conversions.
      </p>

      <div className="space-y-6">
        {/* Category Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Measurement Category
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(conversions).map(([key, cat]) => (
              <button
                key={key}
                onClick={() => setCategory(key)}
                className={`p-3 text-sm border rounded-lg transition-colors ${
                  category === key
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Value
              </label>
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-3 text-2xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter value"
              />
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  From
                </label>
                <select
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {Object.entries(currentCategory.units).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name} ({unit.symbol})
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={swapUnits}
                className="mt-7 p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowRightLeft className="h-5 w-5" />
              </button>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  To
                </label>
                <select
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {Object.entries(currentCategory.units).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name} ({unit.symbol})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Result Section */}
          <div className="space-y-6">
            <div className="bg-blue-50 rounded-xl p-6 text-center">
              <div className="text-sm text-gray-600 mb-2">Converted Value</div>
              <div className="text-4xl font-bold text-blue-600">
                {convertedValue.toFixed(6).replace(/\.?0+$/, '')}
              </div>
              <div className="text-lg text-gray-700 mt-2">
                {currentCategory.units[toUnit]?.name} ({currentCategory.units[toUnit]?.symbol})
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Conversion Formula</h4>
              <div className="text-sm text-gray-600">
                {value} {currentCategory.units[fromUnit]?.symbol} = {convertedValue.toFixed(6).replace(/\.?0+$/, '')} {currentCategory.units[toUnit]?.symbol}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Quick Reference</h4>
              <div className="space-y-1 text-xs text-gray-600">
                {Object.entries(currentCategory.units).slice(0, 4).map(([key, unit]) => (
                  <div key={key} className="flex justify-between">
                    <span>1 {currentCategory.units[fromUnit]?.symbol} =</span>
                    <span>
                      {category === 'temperature' 
                        ? convertTemperature(1, fromUnit, key).toFixed(2)
                        : (currentCategory.units[fromUnit]?.factor / unit.factor).toFixed(4)
                      } {unit.symbol}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitConverter;