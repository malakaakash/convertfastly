import React from 'react';
import { useState, useEffect } from 'react';
import { getPolicy, Policy } from '../lib/supabase';

const Privacy: React.FC = () => {
  const [policy, setPolicy] = useState<Policy | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPolicy();
  }, []);

  const fetchPolicy = async () => {
    const data = await getPolicy('privacy');
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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{policy?.title || 'Privacy Policy'}</h1>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
          <p className="text-gray-700 leading-relaxed">
            ConvertFastly is designed with privacy in mind. We do not collect, store, or transmit your personal files 
            or data. All file processing occurs locally in your browser using client-side JavaScript.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Since we don't collect your files or personal data, we cannot use them for any purpose. The only 
            information we may collect includes:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
            <li>Basic analytics data (page views, browser type) to improve our service</li>
            <li>Error logs to help us fix technical issues</li>
            <li>Feedback you voluntarily provide through our contact form</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Data Processing</h2>
          <p className="text-gray-700 leading-relaxed">
            All file conversions and processing happen entirely within your web browser. Your files never leave 
            your device or get uploaded to our servers. This ensures maximum privacy and security for your data.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Cookies and Local Storage</h2>
          <p className="text-gray-700 leading-relaxed">
            We may use cookies and local storage to remember your preferences and improve your user experience. 
            These do not contain any personal information and can be cleared at any time through your browser settings.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Third-Party Services</h2>
          <p className="text-gray-700 leading-relaxed">
            We may use third-party services for analytics and error tracking. These services may collect anonymous 
            usage data to help us improve ConvertFastly. No personal files or sensitive information is shared with 
            these services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data Security</h2>
          <p className="text-gray-700 leading-relaxed">
            Since your files are processed locally in your browser and never transmitted to our servers, they remain 
            completely secure and private. We implement industry-standard security measures to protect any minimal 
            data we do collect.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Your Rights</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            You have the right to:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
            <li>Use our service without providing any personal information</li>
            <li>Clear your browser data at any time</li>
            <li>Contact us with any privacy concerns</li>
            <li>Request information about any data we may have collected</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Children's Privacy</h2>
          <p className="text-gray-700 leading-relaxed">
            ConvertFastly does not knowingly collect personal information from children under 13. Our service can be 
            used safely by users of all ages since no personal data is collected or transmitted.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to This Policy</h2>
          <p className="text-gray-700 leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the 
            new Privacy Policy on this page and updating the "Last updated" date.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Us</h2>
          <p className="text-gray-700 leading-relaxed">
            If you have any questions about this Privacy Policy, please contact us at{' '}
            <a href="mailto:privacy@convertfastly.com" className="text-blue-600 hover:text-blue-800">
              privacy@convertfastly.com
            </a>
          </p>
        </section>
          </>
        )}
      </div>
    </div>
  );
};

export default Privacy;