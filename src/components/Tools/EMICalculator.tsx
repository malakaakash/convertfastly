import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, TrendingUp, Calendar } from 'lucide-react';

const EMICalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<number>(500000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [tenure, setTenure] = useState<number>(20);
  const [emi, setEmi] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const calculateEMI = () => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 12 / 100;
    const months = tenure * 12;

    if (monthlyRate === 0) {
      const emiValue = principal / months;
      setEmi(emiValue);
      setTotalInterest(0);
      setTotalAmount(principal);
    } else {
      const emiValue = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                      (Math.pow(1 + monthlyRate, months) - 1);
      
      const totalAmountValue = emiValue * months;
      const totalInterestValue = totalAmountValue - principal;
      
      setEmi(emiValue);
      setTotalInterest(totalInterestValue);
      setTotalAmount(totalAmountValue);
    }
  };

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, tenure]);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center space-x-3 mb-6">
        <Calculator className="h-8 w-8 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">EMI Calculator</h2>
      </div>

      <p className="text-gray-600 mb-8">
        Calculate your Equated Monthly Installment (EMI) for home loans, car loans, and personal loans.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loan Amount (₹)
            </label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(parseInt(e.target.value) || 0)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="500000"
            />
            <input
              type="range"
              min="100000"
              max="10000000"
              step="50000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(parseInt(e.target.value))}
              className="w-full mt-2"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>₹1L</span>
              <span>₹1Cr</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Annual Interest Rate (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="8.5"
            />
            <input
              type="range"
              min="1"
              max="20"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(parseFloat(e.target.value))}
              className="w-full mt-2"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1%</span>
              <span>20%</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loan Tenure (Years)
            </label>
            <input
              type="number"
              value={tenure}
              onChange={(e) => setTenure(parseInt(e.target.value) || 0)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="20"
            />
            <input
              type="range"
              min="1"
              max="30"
              value={tenure}
              onChange={(e) => setTenure(parseInt(e.target.value))}
              className="w-full mt-2"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1 Year</span>
              <span>30 Years</span>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          <div className="bg-blue-50 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <DollarSign className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Monthly EMI</h3>
            </div>
            <p className="text-3xl font-bold text-blue-600">
              {formatCurrency(emi)}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="h-5 w-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-600">Total Interest</span>
              </div>
              <p className="text-lg font-bold text-gray-900">
                {formatCurrency(totalInterest)}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Calendar className="h-5 w-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-600">Total Amount</span>
              </div>
              <p className="text-lg font-bold text-gray-900">
                {formatCurrency(totalAmount)}
              </p>
            </div>
          </div>

          {/* Breakdown Chart */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Loan Breakdown</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Principal Amount</span>
                <span className="font-medium">{formatCurrency(loanAmount)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Interest</span>
                <span className="font-medium">{formatCurrency(totalInterest)}</span>
              </div>
              <div className="border-t pt-3 flex justify-between items-center">
                <span className="font-semibold text-gray-900">Total Amount</span>
                <span className="font-bold text-blue-600">{formatCurrency(totalAmount)}</span>
              </div>
            </div>
            
            {/* Visual Breakdown */}
            <div className="mt-4">
              <div className="flex rounded-lg overflow-hidden h-4">
                <div 
                  className="bg-blue-600" 
                  style={{ width: `${(loanAmount / totalAmount) * 100}%` }}
                />
                <div 
                  className="bg-red-400" 
                  style={{ width: `${(totalInterest / totalAmount) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Principal</span>
                <span>Interest</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EMICalculator;