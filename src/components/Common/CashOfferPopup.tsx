import React, { useState } from 'react';
import { X, DollarSign, Gift, Mail, CreditCard } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface CashOfferPopupProps {
  isVisible: boolean;
  onClose: () => void;
}

const CashOfferPopup: React.FC<CashOfferPopupProps> = ({ isVisible, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    paypalEmail: '',
    phone: '',
    country: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Store cash offer claim in database
      const { error } = await supabase
        .from('cash_offer_claims')
        .insert({
          name: formData.name,
          email: formData.email,
          paypal_email: formData.paypalEmail,
          phone: formData.phone,
          country: formData.country,
          visit_count: parseInt(localStorage.getItem('visitCount') || '0'),
          user_agent: navigator.userAgent,
          claimed_at: new Date().toISOString()
        });

      if (error) throw error;

      // Mark as claimed in localStorage
      localStorage.setItem('hasClaimedCashOffer', 'true');
      // Store user info for approval notifications
      localStorage.setItem('userEmail', formData.email);
      localStorage.setItem('userPayPal', formData.paypalEmail);
      setIsSubmitted(true);
      
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Error submitting cash offer claim:', error);
      alert('There was an error submitting your claim. Please try again.');
    }
    
    setIsSubmitting(false);
  };

  const handleClose = () => {
    localStorage.setItem('hasSeenCashOffer', 'true');
    onClose();
  };

  if (!isVisible) return null;

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl max-w-md w-full p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 p-4 rounded-full">
              <Gift className="h-12 w-12 text-green-600" />
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            🎉 Claim Submitted!
          </h3>
          
          <p className="text-gray-600 mb-4">
            Thank you for being a loyal ConvertFastly user! Your $10 cash reward claim has been submitted successfully.
          </p>
          
          <p className="text-sm text-gray-500">
            Our team will process your claim within 24-48 hours and send the payment to your PayPal account.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-lg w-full p-8 relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 p-4 rounded-full">
              <DollarSign className="h-12 w-12 text-green-600" />
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            🎉 Congratulations!
          </h3>
          
          <p className="text-lg text-gray-600 mb-4">
            You've used ConvertFastly <strong>50+ times</strong>!
          </p>
          
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 mb-4">
            <div className="text-3xl font-bold text-green-600 mb-2">$10 Cash Reward</div>
            <p className="text-green-800 text-sm">
              As a thank you for being a loyal user, claim your $10 cash reward!
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              PayPal Email Address *
            </label>
            <div className="relative">
              <input
                type="email"
                name="paypalEmail"
                value={formData.paypalEmail}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="paypal@example.com"
              />
              <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              We'll send your $10 reward to this PayPal account
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country *
              </label>
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select Country</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="GB">United Kingdom</option>
                <option value="AU">Australia</option>
                <option value="DE">Germany</option>
                <option value="FR">France</option>
                <option value="ES">Spain</option>
                <option value="IT">Italy</option>
                <option value="IN">India</option>
                <option value="BR">Brazil</option>
                <option value="MX">Mexico</option>
                <option value="JP">Japan</option>
                <option value="KR">South Korea</option>
                <option value="CN">China</option>
                <option value="RU">Russia</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">Terms & Conditions</h4>
            <ul className="space-y-1 text-sm text-blue-800">
              <li>• Valid for users with 50+ website visits</li>
              <li>• One reward per user/household</li>
              <li>• Payment processed within 24-48 hours</li>
              <li>• Must have valid PayPal account</li>
              <li>• ConvertFastly reserves the right to verify eligibility</li>
            </ul>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 font-semibold"
          >
            {isSubmitting ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                <DollarSign className="h-5 w-5" />
                <span>Claim My $10 Reward</span>
              </>
            )}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={handleClose}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Maybe later
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CashOfferPopup;