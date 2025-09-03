import React, { useState, useEffect } from 'react';
import { DollarSign, ArrowRightLeft } from 'lucide-react';
import LoadingSpinner from '../Common/LoadingSpinner';
import EngagementPopup from '../Common/EngagementPopup';

interface CurrencyRate {
  [key: string]: number;
}

const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState('1');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [result, setResult] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rates, setRates] = useState<CurrencyRate>({});
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [showPopup, setShowPopup] = useState(false);

  // Mock exchange rates (in a real app, you'd fetch from an API like ExchangeRate-API)
  const mockRates: CurrencyRate = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    JPY: 149.50,
    AUD: 1.52,
    CAD: 1.36,
    CHF: 0.88,
    CNY: 7.24,
    INR: 83.12,
    KRW: 1309.45,
    BRL: 4.97,
    MXN: 17.89,
    RUB: 92.75,
    ZAR: 18.65,
    SGD: 1.34,
    HKD: 7.83,
    NOK: 10.87,
    SEK: 10.52,
    PLN: 4.09,
    TRY: 29.15
  };

  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
    { code: 'KRW', name: 'South Korean Won', symbol: '₩' },
    { code: 'BRL', name: 'Brazilian Real', symbol: 'R$' },
    { code: 'MXN', name: 'Mexican Peso', symbol: '$' },
    { code: 'RUB', name: 'Russian Ruble', symbol: '₽' },
    { code: 'ZAR', name: 'South African Rand', symbol: 'R' },
    { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$' },
    { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$' },
    { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr' },
    { code: 'SEK', name: 'Swedish Krona', symbol: 'kr' },
    { code: 'PLN', name: 'Polish Zloty', symbol: 'zł' },
    { code: 'TRY', name: 'Turkish Lira', symbol: '₺' }
  ];

  const fetchRates = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, you would fetch from a currency API
    // const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
    // const data = await response.json();
    
    setRates(mockRates);
    setLastUpdated(new Date().toLocaleString());
    setIsLoading(false);
  };

  const convertCurrency = () => {
    if (!amount || !rates[fromCurrency] || !rates[toCurrency]) return;
    
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount)) return;
    
    // Convert to USD first, then to target currency
    const usdAmount = numAmount / rates[fromCurrency];
    const convertedAmount = usdAmount * rates[toCurrency];
    
    setResult(convertedAmount);
    
    // Show popup occasionally
    if (Math.random() > 0.7) {
      setShowPopup(true);
    }
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setResult(null);
  };

  const formatCurrency = (value: number, currencyCode: string): string => {
    const currency = currencies.find(c => c.code === currencyCode);
    const symbol = currency?.symbol || currencyCode;
    
    return `${symbol}${value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  useEffect(() => {
    document.title = 'Currency Converter - ConvertFastly';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Convert between different currencies with real-time exchange rates. Support for 20+ major world currencies.');
    }
    
    fetchRates();
  }, []);

  useEffect(() => {
    if (rates[fromCurrency] && rates[toCurrency] && amount) {
      convertCurrency();
    }
  }, [amount, fromCurrency, toCurrency, rates]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <DollarSign className="h-8 w-8 text-emerald-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Currency Converter</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Convert between different currencies with up-to-date exchange rates. Support for 20+ major world currencies.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border p-8">
        {isLoading && !Object.keys(rates).length ? (
          <div className="text-center py-8">
            <LoadingSpinner size="lg" color="green" />
            <p className="text-gray-600 mt-4">Loading exchange rates...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Amount Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="Enter amount"
                min="0"
                step="0.01"
              />
            </div>

            {/* Currency Selection */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  From
                </label>
                <select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  {currencies.map((currency) => (
                    <option key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={swapCurrencies}
                  className="p-3 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors"
                  title="Swap currencies"
                >
                  <ArrowRightLeft className="h-6 w-6" />
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  To
                </label>
                <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  {currencies.map((currency) => (
                    <option key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Result */}
            {result !== null && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
                <div className="text-center">
                  <div className="text-sm text-emerald-700 mb-2">Converted Amount</div>
                  <div className="text-3xl font-bold text-emerald-900">
                    {formatCurrency(result, toCurrency)}
                  </div>
                  <div className="text-sm text-emerald-600 mt-2">
                    {formatCurrency(parseFloat(amount) || 0, fromCurrency)} = {formatCurrency(result, toCurrency)}
                  </div>
                </div>
              </div>
            )}

            {/* Exchange Rate Info */}
            {rates[fromCurrency] && rates[toCurrency] && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <div>
                    <strong>Exchange Rate:</strong> 1 {fromCurrency} = {(rates[toCurrency] / rates[fromCurrency]).toFixed(4)} {toCurrency}
                  </div>
                  <div>
                    Last updated: {lastUpdated}
                  </div>
                </div>
              </div>
            )}

            {/* Popular Currency Pairs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">USD to EUR</h4>
                <div className="text-lg font-bold text-gray-700">
                  {(rates.EUR / rates.USD).toFixed(4)}
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">GBP to USD</h4>
                <div className="text-lg font-bold text-gray-700">
                  {(rates.USD / rates.GBP).toFixed(4)}
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">EUR to JPY</h4>
                <div className="text-lg font-bold text-gray-700">
                  {(rates.JPY / rates.EUR).toFixed(2)}
                </div>
              </div>
            </div>

            {/* Refresh Button */}
            <div className="text-center">
              <button
                onClick={fetchRates}
                disabled={isLoading}
                className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                {isLoading && <LoadingSpinner size="sm" color="gray" />}
                <span>Refresh Rates</span>
              </button>
            </div>
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

export default CurrencyConverter;