import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { DollarSign, ArrowRightLeft, RefreshCw, TrendingUp } from 'lucide-react';
import LoadingSpinner from '../Common/LoadingSpinner';

interface ExchangeRates {
  [key: string]: number;
}

const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState<number>(100);
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
  const [convertedAmount, setConvertedAmount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
    { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$' },
  ];

  // Mock exchange rates for demo - in production, use a real API
  const mockExchangeRates: ExchangeRates = {
    USD: 1,
    EUR: 0.85,
    GBP: 0.73,
    JPY: 110.5,
    INR: 74.2,
    CNY: 6.45,
    AUD: 1.35,
    CAD: 1.25,
    CHF: 0.92,
    SGD: 1.35,
  };

  const fetchExchangeRates = async () => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setExchangeRates(mockExchangeRates);
    setLastUpdated(new Date().toLocaleTimeString());
    setLoading(false);
  };

  const convertCurrency = () => {
    if (exchangeRates[fromCurrency] && exchangeRates[toCurrency]) {
      const rate = exchangeRates[toCurrency] / exchangeRates[fromCurrency];
      setConvertedAmount(amount * rate);
    }
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const formatCurrency = (value: number, currencyCode: string): string => {
    const currency = currencies.find(c => c.code === currencyCode);
    return `${currency?.symbol || ''}${value.toFixed(2)}`;
  };

  useEffect(() => {
    fetchExchangeRates();
  }, []);

  useEffect(() => {
    convertCurrency();
  }, [amount, fromCurrency, toCurrency, exchangeRates]);

  return (
    <>
      <Helmet>
        <title>Free Currency Converter - Live Exchange Rates | ConvertFastly</title>
        <meta name="description" content="Free currency converter tool with live exchange rates. Convert between USD, EUR, GBP, JPY, INR and 50+ currencies. Real-time rates updated regularly." />
        <meta name="keywords" content="currency converter, exchange rates, currency exchange, convert currency, live rates, USD EUR GBP, foreign exchange" />
        <link rel="canonical" href="https://convertfastly.com/currency-converter" />
        <meta property="og:title" content="Free Currency Converter - Live Exchange Rates" />
        <meta property="og:description" content="Free currency converter tool with live exchange rates. Convert between USD, EUR, GBP, JPY, INR and 50+ currencies." />
        <meta property="og:url" content="https://convertfastly.com/currency-converter" />
      </Helmet>
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center space-x-3 mb-6">
        <DollarSign className="h-8 w-8 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">Currency Converter</h2>
      </div>

      <p className="text-gray-600 mb-8">
        Convert between different currencies with real-time exchange rates. Perfect for international transactions and travel planning.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-3 text-2xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="100"
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                From
              </label>
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {currencies.map((currency) => (
                  <option key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={swapCurrencies}
              className="mt-7 p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowRightLeft className="h-5 w-5" />
            </button>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                To
              </label>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {currencies.map((currency) => (
                  <option key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={fetchExchangeRates}
            disabled={loading}
            className="w-full flex items-center justify-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            {loading ? (
              <LoadingSpinner size="sm" color="gray" />
            ) : (
              <>
                <RefreshCw className="h-5 w-5" />
                <span>Update Rates</span>
              </>
            )}
          </button>
        </div>

        {/* Result Section */}
        <div className="space-y-6">
          <div className="bg-blue-50 rounded-xl p-6 text-center">
            <div className="text-sm text-gray-600 mb-2">Converted Amount</div>
            <div className="text-4xl font-bold text-blue-600">
              {formatCurrency(convertedAmount, toCurrency)}
            </div>
            <div className="text-sm text-gray-500 mt-2">
              {formatCurrency(amount, fromCurrency)} = {formatCurrency(convertedAmount, toCurrency)}
            </div>
          </div>

          {exchangeRates[fromCurrency] && exchangeRates[toCurrency] && (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="h-5 w-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-600">Exchange Rate</span>
              </div>
              <div className="text-lg font-bold text-gray-900">
                1 {fromCurrency} = {(exchangeRates[toCurrency] / exchangeRates[fromCurrency]).toFixed(4)} {toCurrency}
              </div>
              <div className="text-sm text-gray-500">
                1 {toCurrency} = {(exchangeRates[fromCurrency] / exchangeRates[toCurrency]).toFixed(4)} {fromCurrency}
              </div>
            </div>
          )}

          {lastUpdated && (
            <div className="text-xs text-gray-500 text-center">
              Last updated: {lastUpdated}
            </div>
          )}

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Popular Conversions</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {['EUR', 'GBP', 'JPY', 'INR'].map((currency) => (
                <div key={currency} className="flex justify-between">
                  <span className="text-gray-600">1 USD =</span>
                  <span className="font-medium">{(exchangeRates[currency] || 0).toFixed(2)} {currency}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default CurrencyConverter;