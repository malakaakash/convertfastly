import React from 'react';
import { ExternalLink, Star } from 'lucide-react';

const PartnerPromotion: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-white">
          <div className="flex justify-center items-center space-x-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-current text-yellow-400" />
            ))}
          </div>
          <h3 className="text-xl font-bold mb-2">Trusted by 100,000+ Users Worldwide</h3>
          <p className="text-blue-100 mb-4 max-w-2xl mx-auto">
            Join thousands of satisfied users who rely on ConvertFastly for their daily conversion needs. 
            Fast, secure, and completely free.
          </p>
          <a
            href="#"
            className="inline-flex items-center space-x-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            <span>Get Started Now</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default PartnerPromotion;