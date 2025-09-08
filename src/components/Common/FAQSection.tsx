import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
  category?: string;
}

interface FAQSectionProps {
  title?: string;
  faqs?: FAQ[];
  className?: string;
}

const defaultFAQs: FAQ[] = [
  {
    question: "Are ConvertFastly tools really free?",
    answer: "Yes! All our tools are completely free to use with no hidden fees, registration requirements, or usage limits. We believe in providing accessible tools for everyone.",
    category: "General"
  },
  {
    question: "Do you store my files or data?",
    answer: "No, we never store your files. All processing happens directly in your browser using client-side JavaScript. Your files never leave your device, ensuring maximum privacy and security.",
    category: "Privacy"
  },
  {
    question: "How do I use the Password Generator?",
    answer: "Simply navigate to the Password Generator tool, adjust the length and character options (uppercase, lowercase, numbers, symbols), and click generate. You can copy the password with one click.",
    category: "Tools"
  },
  {
    question: "What file formats does the File Converter support?",
    answer: "Our File Converter supports popular formats including PNG, JPG, WebP, PDF, and TXT. We're continuously adding support for more formats based on user feedback.",
    category: "Tools"
  },
  {
    question: "Can I use these tools for commercial purposes?",
    answer: "Absolutely! All our tools are free for both personal and commercial use. There are no restrictions on how you use the converted files or generated content.",
    category: "Usage"
  },
  {
    question: "Why is the Image Compressor not working?",
    answer: "Make sure your image file is under 10MB and in a supported format (PNG, JPG, WebP). If issues persist, try refreshing the page or using a different browser.",
    category: "Troubleshooting"
  },
  {
    question: "How accurate is the Currency Converter?",
    answer: "Our Currency Converter uses real-time exchange rates updated regularly. However, rates may vary slightly from actual trading rates and should be used for reference purposes.",
    category: "Tools"
  },
  {
    question: "Can I suggest new tools or features?",
    answer: "Yes! We love hearing from our users. Contact us through our contact page with your suggestions, and we'll consider adding new tools based on community demand.",
    category: "General"
  }
];

const FAQSection: React.FC<FAQSectionProps> = ({ 
  title = "Frequently Asked Questions", 
  faqs = defaultFAQs,
  className = "" 
}) => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(faqs.map(faq => faq.category || 'General')))];
  
  const filteredFAQs = selectedCategory === 'All' 
    ? faqs 
    : faqs.filter(faq => (faq.category || 'General') === selectedCategory);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section className={`bg-white rounded-2xl shadow-lg p-8 ${className}`}>
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <HelpCircle className="h-8 w-8 text-blue-600" />
          <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Find answers to common questions about our tools and services
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* FAQ Items */}
      <div className="space-y-4">
        {filteredFAQs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
              {openItems.includes(index) ? (
                <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
              )}
            </button>
            
            {openItems.includes(index) && (
              <div className="px-6 pb-4">
                <div className="pt-2 border-t border-gray-100">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  {faq.category && (
                    <span className="inline-block mt-3 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {faq.category}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Contact CTA */}
      <div className="mt-8 text-center p-6 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Still have questions?</h3>
        <p className="text-gray-600 mb-4">
          Can't find what you're looking for? We're here to help!
        </p>
        <a
          href="/contact"
          className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <HelpCircle className="h-5 w-5" />
          <span>Contact Support</span>
        </a>
      </div>
    </section>
  );
};

export default FAQSection;