import React, { useState, useEffect } from 'react';
import { Calculator, PieChart } from 'lucide-react';
import EngagementPopup from '../Common/EngagementPopup';

interface EMIDetails {
  emi: number;
  totalAmount: number;
  totalInterest: number;
  monthlyBreakdown: Array<{
    month: number;
    emi: number;
    principal: number;
    interest: number;
    balance: number;
  }>;
}

const EMICalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState('500000');
  const [interestRate, setInterestRate] = useState('8.5');
  const [tenure, setTenure] = useState('20');
  const [tenureType, setTenureType] = useState('years');
  const [emiDetails, setEmiDetails] = useState<EMIDetails | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const calculateEMI = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100;
    const time = tenureType === 'years' ? parseFloat(tenure) * 12 : parseFloat(tenure);

    if (!principal || !rate || !time || principal <= 0 || rate <= 0 || time <= 0) {
      setEmiDetails(null);
      return;
    }

    const monthlyRate = rate / 12;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, time)) / 
                 (Math.pow(1 + monthlyRate, time) - 1);

    const totalAmount = emi * time;
    const totalInterest = totalAmount - principal;

    // Calculate monthly breakdown
    let balance = principal;
    const monthlyBreakdown: EMIDetails['monthlyBreakdown'] = [];

    for (let month = 1; month <= Math.min(time, 12); month++) {
      const interestComponent = balance * monthlyRate;
      const principalComponent = emi - interestComponent;
      balance -= principalComponent;

      monthlyBreakdown.push({
        month,
        emi: emi,
        principal: principalComponent,
        interest: interestComponent,
        balance: Math.max(0, balance)
      });
    }

    setEmiDetails({
      emi,
      totalAmount,
      totalInterest,
      monthlyBreakdown
    });

    // Show popup occasionally
    if (Math.random() > 0.8) {
      setShowPopup(true);
    }
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('en-IN').format(Math.round(num));
  };

  useEffect(() => {
    document.title = 'EMI Calculator - ConvertFastly';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Calculate loan EMI with detailed breakdown. Get monthly payment amount, total interest, and amortization schedule.');
    }
  }, []);

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, tenure, tenureType]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Calculator className="h-8 w-8 text-orange-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">EMI Calculator</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Calculate your loan EMI (Equated Monthly Installment) with detailed breakdown and amortization schedule.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="bg-white rounded-2xl shadow-sm border p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Loan Details</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loan Amount (₹)
              </label>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Enter loan amount"
                min="1000"
              />
              <div className="mt-2">
                <input
                  type="range"
                  min="100000"
                  max="10000000"
                  step="50000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>₹1L</span>
                  <span>₹1Cr</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Interest Rate (% per annum)
              </label>
              <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Enter interest rate"
                min="0.1"
                step="0.1"
              />
              <div className="mt-2">
                <input
                  type="range"
                  min="5"
                  max="20"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>5%</span>
                  <span>20%</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loan Tenure
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  value={tenure}
                  onChange={(e) => setTenure(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter tenure"
                  min="1"
                />
                <select
                  value={tenureType}
                  onChange={(e) => setTenureType(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="years">Years</option>
                  <option value="months">Months</option>
                </select>
              </div>
              <div className="mt-2">
                <input
                  type="range"
                  min={tenureType === 'years' ? '1' : '12'}
                  max={tenureType === 'years' ? '30' : '360'}
                  step="1"
                  value={tenure}
                  onChange={(e) => setTenure(e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{tenureType === 'years' ? '1 Year' : '12 Months'}</span>
                  <span>{tenureType === 'years' ? '30 Years' : '360 Months'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="bg-white rounded-2xl shadow-sm border p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">EMI Breakdown</h2>
          
          {emiDetails ? (
            <div className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
                  <div className="text-sm text-orange-700 mb-1">Monthly EMI</div>
                  <div className="text-2xl font-bold text-orange-900">
                    {formatCurrency(emiDetails.emi)}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                    <div className="text-xs text-blue-700 mb-1">Total Amount</div>
                    <div className="text-lg font-semibold text-blue-900">
                      {formatCurrency(emiDetails.totalAmount)}
                    </div>
                  </div>
                  
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                    <div className="text-xs text-red-700 mb-1">Total Interest</div>
                    <div className="text-lg font-semibold text-red-900">
                      {formatCurrency(emiDetails.totalInterest)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual Representation */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-center mb-4">
                  <PieChart className="h-6 w-6 text-gray-600 mr-2" />
                  <span className="font-medium text-gray-900">Loan Composition</span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-blue-500 rounded"></div>
                      <span className="text-sm">Principal Amount</span>
                    </div>
                    <span className="text-sm font-medium">
                      {formatCurrency(parseFloat(loanAmount))} 
                      ({((parseFloat(loanAmount) / emiDetails.totalAmount) * 100).toFixed(1)}%)
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-red-500 rounded"></div>
                      <span className="text-sm">Interest Amount</span>
                    </div>
                    <span className="text-sm font-medium">
                      {formatCurrency(emiDetails.totalInterest)} 
                      ({((emiDetails.totalInterest / emiDetails.totalAmount) * 100).toFixed(1)}%)
                    </span>
                  </div>
                </div>
                
                <div className="mt-4 h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 transition-all duration-300"
                    style={{ 
                      width: `${(parseFloat(loanAmount) / emiDetails.totalAmount) * 100}%` 
                    }}
                  ></div>
                </div>
              </div>

              {/* Monthly Breakdown Table */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">First Year Breakdown</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="px-2 py-2 text-left">Month</th>
                        <th className="px-2 py-2 text-right">EMI</th>
                        <th className="px-2 py-2 text-right">Principal</th>
                        <th className="px-2 py-2 text-right">Interest</th>
                        <th className="px-2 py-2 text-right">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {emiDetails.monthlyBreakdown.map((row) => (
                        <tr key={row.month} className="border-b border-gray-100">
                          <td className="px-2 py-2">{row.month}</td>
                          <td className="px-2 py-2 text-right">{formatNumber(row.emi)}</td>
                          <td className="px-2 py-2 text-right text-blue-600">{formatNumber(row.principal)}</td>
                          <td className="px-2 py-2 text-right text-red-600">{formatNumber(row.interest)}</td>
                          <td className="px-2 py-2 text-right">{formatNumber(row.balance)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              Enter valid loan details to calculate EMI
            </div>
          )}
        </div>
      </div>

      {/* Tips */}
      <div className="mt-8 bg-white rounded-2xl shadow-sm border p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">EMI Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Lower Your EMI:</h4>
            <ul className="space-y-1">
              <li>• Increase the loan tenure</li>
              <li>• Make a larger down payment</li>
              <li>• Compare interest rates from different lenders</li>
              <li>• Consider part-prepayment options</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Save on Interest:</h4>
            <ul className="space-y-1">
              <li>• Choose shorter tenure when possible</li>
              <li>• Make prepayments to reduce principal</li>
              <li>• Consider step-up EMI options</li>
              <li>• Review and switch to lower interest rates</li>
            </ul>
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

export default EMICalculator;