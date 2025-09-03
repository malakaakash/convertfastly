import React from 'react';

const Privacy: React.FC = () => {
  React.useEffect(() => {
    document.title = 'Privacy Policy - ConvertFastly';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Privacy Policy for ConvertFastly - How we protect your data and privacy while using our online tools.');
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 mb-6">
            Last updated: January 16, 2025
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-700 mb-4">
              ConvertFastly ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website convertfastly.com and use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
            
            <h3 className="text-lg font-medium text-gray-900 mb-3">2.1 Information You Provide</h3>
            <p className="text-gray-700 mb-4">
              We may collect information you provide directly to us, such as:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Email addresses when you contact us or subscribe to updates</li>
              <li>Files you upload for conversion or processing</li>
              <li>Feedback, comments, or other communications you send to us</li>
            </ul>

            <h3 className="text-lg font-medium text-gray-900 mb-3">2.2 Automatically Collected Information</h3>
            <p className="text-gray-700 mb-4">
              When you use our services, we may automatically collect:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>IP address and device information</li>
              <li>Browser type and version</li>
              <li>Pages visited and time spent on our site</li>
              <li>Referring website addresses</li>
              <li>Usage patterns and preferences</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-700 mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Provide and maintain our conversion tools and services</li>
              <li>Process files you upload for conversion</li>
              <li>Improve and optimize our website and services</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Send you technical notices and support messages</li>
              <li>Analyze usage patterns to enhance user experience</li>
              <li>Detect and prevent fraud and abuse</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">4. File Processing and Storage</h2>
            <p className="text-gray-700 mb-4">
              <strong>Client-Side Processing:</strong> Many of our tools process files directly in your browser without uploading them to our servers. This ensures maximum privacy and security for your documents.
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Server-Side Processing:</strong> When server-side processing is required:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Files are processed temporarily and deleted immediately after conversion</li>
              <li>We do not store, access, or retain your files</li>
              <li>All file transfers are encrypted using HTTPS</li>
              <li>Processing typically takes seconds to minutes</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Cookies and Tracking Technologies</h2>
            <p className="text-gray-700 mb-4">
              We use cookies and similar tracking technologies to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Remember your preferences and settings</li>
              <li>Analyze website traffic and usage patterns</li>
              <li>Provide personalized content and advertisements</li>
              <li>Improve website functionality and user experience</li>
            </ul>
            <p className="text-gray-700 mb-4">
              You can control cookies through your browser settings. However, disabling cookies may affect the functionality of our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Information Sharing and Disclosure</h2>
            <p className="text-gray-700 mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li><strong>Service Providers:</strong> We may share information with trusted third-party service providers who assist us in operating our website and services</li>
              <li><strong>Legal Requirements:</strong> We may disclose information if required by law or to protect our rights, property, or safety</li>
              <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale, your information may be transferred to the new entity</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Data Security</h2>
            <p className="text-gray-700 mb-4">
              We implement appropriate security measures to protect your information:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>SSL/HTTPS encryption for all data transmissions</li>
              <li>Secure servers with regular security updates</li>
              <li>Access controls and authentication measures</li>
              <li>Regular security audits and monitoring</li>
              <li>Immediate deletion of processed files</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Third-Party Links and Services</h2>
            <p className="text-gray-700 mb-4">
              Our website may contain links to third-party websites, including our partner sites. We are not responsible for the privacy practices of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Children's Privacy</h2>
            <p className="text-gray-700 mb-4">
              Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we discover that we have collected information from a child under 13, we will delete such information immediately.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Your Rights and Choices</h2>
            <p className="text-gray-700 mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Access and update your personal information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt-out of marketing communications</li>
              <li>Control cookie preferences</li>
              <li>Request information about data processing</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">11. International Data Transfers</h2>
            <p className="text-gray-700 mb-4">
              Your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws. We ensure appropriate safeguards are in place to protect your information during such transfers.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">12. Changes to This Privacy Policy</h2>
            <p className="text-gray-700 mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page with an updated effective date. We encourage you to review this Privacy Policy periodically.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">13. Contact Us</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about this Privacy Policy or our privacy practices, please contact us:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Through our contact form on the website</li>
              <li>Email: privacy@convertfastly.com</li>
              <li>Mail: ConvertFastly Privacy Team</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;