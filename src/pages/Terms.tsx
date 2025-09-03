import React from 'react';

const Terms: React.FC = () => {
  React.useEffect(() => {
    document.title = 'Terms of Service - ConvertFastly';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Terms of Service for ConvertFastly - Free online conversion tools and utilities.');
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 mb-6">
            Last updated: January 16, 2025
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 mb-4">
              By accessing and using ConvertFastly ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. These Terms of Service govern your use of our website and all services provided through convertfastly.com.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
            <p className="text-gray-700 mb-4">
              ConvertFastly provides free online tools including but not limited to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>PDF to Word conversion</li>
              <li>Word to PDF conversion</li>
              <li>File format conversion</li>
              <li>Image compression and resizing</li>
              <li>Password generation</li>
              <li>Color palette generation</li>
              <li>Currency conversion</li>
              <li>EMI calculation</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">3. User Responsibilities</h2>
            <p className="text-gray-700 mb-4">
              You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree not to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Upload or process files containing malicious code, viruses, or harmful content</li>
              <li>Attempt to gain unauthorized access to our systems or networks</li>
              <li>Use the Service for any illegal or unauthorized purpose</li>
              <li>Interfere with or disrupt the Service or servers</li>
              <li>Upload copyrighted material without proper authorization</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Privacy and Data Security</h2>
            <p className="text-gray-700 mb-4">
              We take your privacy seriously. All file processing is done client-side in your browser when possible. Files uploaded for conversion are processed securely and are not stored on our servers beyond the time necessary for processing. For detailed information about how we handle your data, please refer to our Privacy Policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Intellectual Property</h2>
            <p className="text-gray-700 mb-4">
              The Service and its original content, features, and functionality are owned by ConvertFastly and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Disclaimer of Warranties</h2>
            <p className="text-gray-700 mb-4">
              The Service is provided on an "AS IS" and "AS AVAILABLE" basis. ConvertFastly makes no representations or warranties of any kind, express or implied, as to the operation of the Service or the information, content, materials, or products included on the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Limitation of Liability</h2>
            <p className="text-gray-700 mb-4">
              ConvertFastly will not be liable for any damages of any kind arising from the use of the Service, including but not limited to direct, indirect, incidental, punitive, and consequential damages.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Service Availability</h2>
            <p className="text-gray-700 mb-4">
              We strive to maintain the Service with minimal downtime. However, we do not guarantee that the Service will be available at all times. We may temporarily or permanently discontinue the Service or any features within the Service without notice.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Changes to Terms</h2>
            <p className="text-gray-700 mb-4">
              We reserve the right to modify these Terms of Service at any time. We will provide notice of significant changes by posting the new Terms of Service on this page with an updated effective date. Your continued use of the Service after any changes constitutes acceptance of the new Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Governing Law</h2>
            <p className="text-gray-700 mb-4">
              These Terms shall be interpreted and governed in accordance with the laws of the jurisdiction in which ConvertFastly operates, without regard to its conflict of law provisions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">11. Contact Information</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about these Terms of Service, please contact us through our contact page or email us at support@convertfastly.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;