import React, { useState } from 'react';
import { useEffect } from 'react';
import { Mail, Send, Star, ExternalLink } from 'lucide-react';
import { getAdminSettings } from '../../lib/supabase';

const PromotionRequestForm: React.FC = () => {
  const [showPromotionForm, setShowPromotionForm] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    website: '',
    toolName: '',
    description: '',
    budget: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    fetchPromotionSettings();
  }, []);

  const fetchPromotionSettings = async () => {
    try {
      const settings = await getAdminSettings();
      if (settings?.promotion_settings) {
        setShowPromotionForm(settings.promotion_settings.show_promotion_form);
      } else {
        // Default to false if no settings found
        setShowPromotionForm(false);
      }
    } catch (error) {
      // Default to false if error fetching settings
      setShowPromotionForm(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would send to your backend
    console.log('Promotion request:', formData);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        company: '',
        website: '',
        toolName: '',
        description: '',
        budget: ''
      });
    }, 3000);
  };

  // Don't render if promotion form is disabled
  if (!showPromotionForm) {
    return null;
  }

  if (isSubmitted) {
    return (
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 p-3 rounded-full">
            <Send className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-green-800 mb-2">Request Submitted!</h3>
        <p className="text-green-700">
          Thank you for your interest in promoting your tool. Our admin team will review your request and get back to you within 24-48 hours.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8">
      <div className="text-center mb-6">
        <div className="flex justify-center mb-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <Star className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Want to Promote Your Tool?</h3>
        <p className="text-gray-600">
          Get your tool featured on ConvertFastly and reach thousands of users daily. 
          Contact our admin team for promotion opportunities.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company/Organization
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Your Company"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Website/Tool URL *
            </label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://yourtool.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tool/Service Name *
          </label>
          <input
            type="text"
            name="toolName"
            value={formData.toolName}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Your Amazing Tool"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tool Description & Promotion Details *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Describe your tool, its benefits, target audience, and how you'd like it promoted on ConvertFastly..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Promotion Budget (Optional)
          </label>
          <select
            name="budget"
            value={formData.budget}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select budget range</option>
            <option value="under-500">Under $500</option>
            <option value="500-1000">$500 - $1,000</option>
            <option value="1000-2500">$1,000 - $2,500</option>
            <option value="2500-5000">$2,500 - $5,000</option>
            <option value="5000-plus">$5,000+</option>
            <option value="discuss">Let's discuss</option>
          </select>
        </div>

        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2">Promotion Options Available:</h4>
          <ul className="space-y-1 text-sm text-blue-800">
            <li>• Featured tool placement on homepage</li>
            <li>• Dedicated tool page integration</li>
            <li>• Blog article featuring your tool</li>
            <li>• Newsletter mentions to our user base</li>
            <li>• Social media promotion</li>
            <li>• Custom partnership opportunities</li>
          </ul>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          <Send className="h-5 w-5" />
          <span>Submit Promotion Request</span>
        </button>

        <div className="text-center">
          <p className="text-sm text-gray-500">
            Or email us directly at{' '}
            <a href="mailto:partnerships@convertfastly.com" className="text-blue-600 hover:text-blue-800">
              partnerships@convertfastly.com
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default PromotionRequestForm;