import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Calendar, Gift, Clock, Star, Cake } from 'lucide-react';
import { useToolTracking } from '../../hooks/useToolTracking';

interface AgeData {
  years: number;
  months: number;
  days: number;
  totalYears: number;
  totalMonths: number;
  totalWeeks: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
  nextBirthday: {
    months: number;
    days: number;
    date: string;
  };
}

const AgeCalculator: React.FC = () => {
  useToolTracking('age-calculator');

  const [birthDate, setBirthDate] = useState<string>('');
  const [ageData, setAgeData] = useState<AgeData | null>(null);
  const [selectedCelebrity, setSelectedCelebrity] = useState<string>('');

  const celebrities = [
    { name: 'Albert Einstein', date: '1879-03-14' },
    { name: 'Leonardo da Vinci', date: '1452-04-15' },
    { name: 'William Shakespeare', date: '1564-04-23' },
    { name: 'Marie Curie', date: '1867-11-07' },
    { name: 'Isaac Newton', date: '1643-01-04' },
    { name: 'Charles Darwin', date: '1809-02-12' },
    { name: 'Nikola Tesla', date: '1856-07-10' },
    { name: 'Vincent van Gogh', date: '1853-03-30' },
    { name: 'Pablo Picasso', date: '1881-10-25' },
    { name: 'Mozart', date: '1756-01-27' },
    { name: 'Beethoven', date: '1770-12-17' },
    { name: 'Galileo Galilei', date: '1564-02-15' },
    { name: 'Frida Kahlo', date: '1907-07-06' },
    { name: 'Nelson Mandela', date: '1918-07-18' },
    { name: 'Martin Luther King Jr.', date: '1929-01-15' }
  ];

  const calculateAge = (birthDateStr: string) => {
    if (!birthDateStr) return null;

    const birth = new Date(birthDateStr);
    const today = new Date();
    
    // Calculate exact age
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    // Calculate totals
    const totalDays = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;
    const totalSeconds = totalMinutes * 60;
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;

    // Calculate next birthday
    const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday < today) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }

    const timeToBirthday = nextBirthday.getTime() - today.getTime();
    const daysToBirthday = Math.ceil(timeToBirthday / (1000 * 60 * 60 * 24));
    const monthsToBirthday = Math.floor(daysToBirthday / 30);
    const remainingDays = daysToBirthday % 30;

    return {
      years,
      months,
      days,
      totalYears: years,
      totalMonths,
      totalWeeks,
      totalDays,
      totalHours,
      totalMinutes,
      totalSeconds,
      nextBirthday: {
        months: monthsToBirthday,
        days: remainingDays,
        date: nextBirthday.toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })
      }
    };
  };

  const handleCelebritySelect = (celebrityDate: string) => {
    setBirthDate(celebrityDate);
    setSelectedCelebrity(celebrityDate);
  };

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat().format(num);
  };

  useEffect(() => {
    if (birthDate) {
      const data = calculateAge(birthDate);
      setAgeData(data);
    } else {
      setAgeData(null);
    }
  }, [birthDate]);

  return (
    <>
      <Helmet>
        <title>Free Age Calculator - Calculate Your Exact Age | ConvertFastly</title>
        <meta name="description" content="Calculate your exact age in years, months, days, hours, minutes, and seconds. Find out when your next birthday is and explore celebrity birthdays." />
        <meta name="keywords" content="age calculator, calculate age, birthday calculator, age in days, age in hours, next birthday, celebrity birthdays, exact age" />
        <link rel="canonical" href="https://convertfastly.com/age-calculator" />
        <meta property="og:title" content="Free Age Calculator - Calculate Your Exact Age" />
        <meta property="og:description" content="Calculate your exact age with detailed breakdown and find your next birthday date." />
        <meta property="og:url" content="https://convertfastly.com/age-calculator" />
      </Helmet>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center space-x-3 mb-6">
          <Calendar className="h-8 w-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Age Calculator</h2>
        </div>

        <p className="text-gray-600 mb-8">
          Calculate your exact age with detailed breakdown including years, months, days, and time until your next birthday.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Your Date of Birth
              </label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => {
                  setBirthDate(e.target.value);
                  setSelectedCelebrity('');
                }}
                max={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              />
            </div>

            {/* Celebrity Birthdays */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Or Try Celebrity Birthdays
              </label>
              <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto">
                {celebrities.map((celebrity, index) => (
                  <button
                    key={index}
                    onClick={() => handleCelebritySelect(celebrity.date)}
                    className={`text-left p-3 border rounded-lg transition-colors ${
                      selectedCelebrity === celebrity.date
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="font-medium">{celebrity.name}</span>
                    </div>
                    <div className="text-sm text-gray-500 ml-6">
                      {new Date(celebrity.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {ageData ? (
              <>
                {/* Present Age */}
                <div className="bg-blue-50 rounded-xl p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Cake className="h-6 w-6 text-blue-600" />
                    <h3 className="text-lg font-semibold text-blue-900">Present Age</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{ageData.years}</div>
                      <div className="text-sm text-blue-800">Years</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{ageData.months}</div>
                      <div className="text-sm text-blue-800">Months</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{ageData.days}</div>
                      <div className="text-sm text-blue-800">Days</div>
                    </div>
                  </div>
                </div>

                {/* Next Birthday */}
                <div className="bg-green-50 rounded-xl p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Gift className="h-6 w-6 text-green-600" />
                    <h3 className="text-lg font-semibold text-green-900">Next Birthday</h3>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-medium text-green-800 mb-2">
                      {ageData.nextBirthday.date}
                    </div>
                    <div className="flex justify-center space-x-6">
                      <div>
                        <div className="text-xl font-bold text-green-600">{ageData.nextBirthday.months}</div>
                        <div className="text-sm text-green-800">Months</div>
                      </div>
                      <div>
                        <div className="text-xl font-bold text-green-600">{ageData.nextBirthday.days}</div>
                        <div className="text-sm text-green-800">Days</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Total Time Lived */}
                <div className="bg-purple-50 rounded-xl p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Clock className="h-6 w-6 text-purple-600" />
                    <h3 className="text-lg font-semibold text-purple-900">Total Time Lived</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-purple-800">Total Years:</span>
                      <span className="font-semibold text-purple-600">{formatNumber(ageData.totalYears)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-800">Total Months:</span>
                      <span className="font-semibold text-purple-600">{formatNumber(ageData.totalMonths)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-800">Total Weeks:</span>
                      <span className="font-semibold text-purple-600">{formatNumber(ageData.totalWeeks)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-800">Total Days:</span>
                      <span className="font-semibold text-purple-600">{formatNumber(ageData.totalDays)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-800">Total Hours:</span>
                      <span className="font-semibold text-purple-600">{formatNumber(ageData.totalHours)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-800">Total Minutes:</span>
                      <span className="font-semibold text-purple-600">{formatNumber(ageData.totalMinutes)}</span>
                    </div>
                    <div className="flex justify-between col-span-2">
                      <span className="text-purple-800">Total Seconds:</span>
                      <span className="font-semibold text-purple-600">{formatNumber(ageData.totalSeconds)}</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Calendar className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <p>Select your date of birth to see detailed age calculations</p>
              </div>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 bg-gray-50 rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 mb-3">What You Get</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
            <ul className="space-y-2">
              <li>• Exact age in years, months, and days</li>
              <li>• Time until next birthday</li>
              <li>• Total time lived in various units</li>
            </ul>
            <ul className="space-y-2">
              <li>• Celebrity birthday comparisons</li>
              <li>• Precise calculations down to seconds</li>
              <li>• Easy-to-read formatted results</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default AgeCalculator;