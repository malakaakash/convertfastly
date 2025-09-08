import React from 'react';
import { useState, useEffect } from 'react';
import { getPolicy, Policy } from '../lib/supabase';

const Terms: React.FC = () => {
  const [policy, setPolicy] = useState<Policy | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPolicy();
  }, []);

  const fetchPolicy = async () => {
    const data = await getPolicy('terms');
    setPolicy(data);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{policy?.title || 'Terms of Service'}</h1>
        <p className="text-lg text-gray-600">
          Last updated: {policy ? new Date(policy.updated_at).toLocaleDateString() : 'January 2025'}
        </p>
        {policy?.version && (
          <p className="text-sm text-gray-500">Version {policy.version}</p>
        )}
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
        {policy?.content ? (
          <div 
            className="prose prose-gray max-w-none"
            dangerouslySetInnerHTML={{ __html: policy.content }}
          />
        ) : (
          <>
            <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-700 leading-relaxed">
            By accessing and using ConvertFastly, you accept and agree to be bound by the terms and provision of this agreement. 
            If you do not agree to abide by the above, please do not use this service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Use License</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Permission is granted to temporarily use ConvertFastly for personal, non-commercial transitory viewing only. 
            This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
            <li>modify or copy the materials</li>
            <li>use the materials for any commercial purpose or for any public display</li>
            <li>attempt to reverse engineer any software contained on the website</li>
            <li>remove any copyright or other proprietary notations from the materials</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Service Description</h2>
          <p className="text-gray-700 leading-relaxed">
            ConvertFastly provides free online conversion tools including but not limited to file format conversion, 
            image processing, text encoding/decoding, and utility calculators. All processing is performed client-side 
            in your browser for maximum privacy and security.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Privacy and Data</h2>
          <p className="text-gray-700 leading-relaxed">
            We do not store, collect, or transmit your files or personal data. All file processing occurs locally 
            in your browser. For more details, please review our Privacy Policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Disclaimer</h2>
          <p className="text-gray-700 leading-relaxed">
            The materials on ConvertFastly are provided on an 'as is' basis. ConvertFastly makes no warranties, 
            expressed or implied, and hereby disclaims and negates all other warranties including without limitation, 
            implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement 
            of intellectual property or other violation of rights.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Limitations</h2>
          <p className="text-gray-700 leading-relaxed">
            In no event shall ConvertFastly or its suppliers be liable for any damages (including, without limitation, 
            damages for loss of data or profit, or due to business interruption) arising out of the use or inability 
            to use the materials on ConvertFastly, even if ConvertFastly or an authorized representative has been 
            notified orally or in writing of the possibility of such damage.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Accuracy of Materials</h2>
          <p className="text-gray-700 leading-relaxed">
            The materials appearing on ConvertFastly could include technical, typographical, or photographic errors. 
            ConvertFastly does not warrant that any of the materials on its website are accurate, complete, or current.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Modifications</h2>
          <p className="text-gray-700 leading-relaxed">
            ConvertFastly may revise these terms of service at any time without notice. By using this website, 
            you are agreeing to be bound by the then current version of these terms of service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contact Information</h2>
          <p className="text-gray-700 leading-relaxed">
            If you have any questions about these Terms of Service, please contact us at{' '}
            <a href="mailto:support@convertfastly.com" className="text-blue-600 hover:text-blue-800">
              support@convertfastly.com
            </a>
          </p>
        </section>
          </>
        )}
      </div>
    </div>
  );
};

export default Terms;