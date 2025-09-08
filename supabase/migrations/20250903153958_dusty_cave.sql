/*
  # Create Privacy Policy and Terms of Service

  1. New Content
    - Insert comprehensive Privacy Policy
    - Insert detailed Terms of Service
  2. Features
    - HTML formatted content for proper display
    - Version control and timestamps
    - Active status management
*/

-- Insert Privacy Policy
INSERT INTO policies (type, title, content, version, is_active, created_at, updated_at)
VALUES (
  'privacy',
  'Privacy Policy',
  '<h2>1. Information We Collect</h2>
<p>ConvertFastly is designed with privacy in mind. We do not collect, store, or transmit your personal files or data. All file processing occurs locally in your browser using client-side JavaScript.</p>

<h3>1.1 Information We Do NOT Collect</h3>
<ul>
<li>Your uploaded files or documents</li>
<li>Personal data from file contents</li>
<li>Converted or processed files</li>
<li>File names or metadata</li>
</ul>

<h3>1.2 Information We May Collect</h3>
<ul>
<li>Basic analytics data (page views, browser type) to improve our service</li>
<li>Error logs to help us fix technical issues</li>
<li>Feedback you voluntarily provide through our contact form</li>
<li>General usage statistics (which tools are most popular)</li>
</ul>

<h2>2. How We Use Your Information</h2>
<p>Since we don''t collect your files or personal data, we cannot use them for any purpose. The minimal information we may collect is used solely to:</p>
<ul>
<li>Improve our service performance and reliability</li>
<li>Fix technical issues and bugs</li>
<li>Understand which tools are most useful to our users</li>
<li>Respond to user inquiries and feedback</li>
</ul>

<h2>3. Data Processing and Storage</h2>
<p>All file conversions and processing happen entirely within your web browser. Your files never leave your device or get uploaded to our servers. This ensures maximum privacy and security for your data.</p>

<h3>3.1 Client-Side Processing</h3>
<ul>
<li>All tools use JavaScript that runs in your browser</li>
<li>Files are processed locally on your device</li>
<li>No data is transmitted to our servers during processing</li>
<li>Converted files remain on your device until you download them</li>
</ul>

<h2>4. Cookies and Local Storage</h2>
<p>We may use cookies and local storage to:</p>
<ul>
<li>Remember your tool preferences and settings</li>
<li>Improve your user experience</li>
<li>Collect anonymous usage analytics</li>
</ul>
<p>These do not contain any personal information and can be cleared at any time through your browser settings.</p>

<h2>5. Third-Party Services</h2>
<p>We may use third-party services for:</p>
<ul>
<li>Website analytics (Google Analytics or similar)</li>
<li>Error tracking and monitoring</li>
<li>Content delivery and performance optimization</li>
</ul>
<p>These services may collect anonymous usage data to help us improve ConvertFastly. No personal files or sensitive information is shared with these services.</p>

<h2>6. Data Security</h2>
<p>Since your files are processed locally in your browser and never transmitted to our servers, they remain completely secure and private. We implement industry-standard security measures to protect any minimal data we do collect.</p>

<h3>6.1 Security Measures</h3>
<ul>
<li>HTTPS encryption for all website traffic</li>
<li>Secure hosting infrastructure</li>
<li>Regular security updates and monitoring</li>
<li>No storage of user files or personal data</li>
</ul>

<h2>7. Your Rights and Choices</h2>
<p>You have the right to:</p>
<ul>
<li>Use our service without providing any personal information</li>
<li>Clear your browser data at any time</li>
<li>Disable cookies through your browser settings</li>
<li>Contact us with any privacy concerns</li>
<li>Request information about any data we may have collected</li>
</ul>

<h2>8. Children''s Privacy</h2>
<p>ConvertFastly does not knowingly collect personal information from children under 13. Our service can be used safely by users of all ages since no personal data is collected or transmitted.</p>

<h2>9. International Users</h2>
<p>ConvertFastly is available worldwide. Since all processing happens in your browser, your data never crosses international borders through our service.</p>

<h2>10. Changes to This Policy</h2>
<p>We may update this Privacy Policy from time to time. We will notify you of any changes by:</p>
<ul>
<li>Posting the new Privacy Policy on this page</li>
<li>Updating the "Last updated" date</li>
<li>Providing notice through our website if changes are significant</li>
</ul>

<h2>11. Contact Us</h2>
<p>If you have any questions about this Privacy Policy, please contact us at:</p>
<ul>
<li>Email: <a href="mailto:privacy@convertfastly.com">privacy@convertfastly.com</a></li>
<li>Contact Form: <a href="/contact">https://convertfastly.com/contact</a></li>
</ul>

<p><strong>Effective Date:</strong> January 1, 2025</p>
<p><strong>Last Updated:</strong> January 1, 2025</p>',
  '1.0',
  true,
  now(),
  now()
);

-- Insert Terms of Service
INSERT INTO policies (type, title, content, version, is_active, created_at, updated_at)
VALUES (
  'terms',
  'Terms of Service',
  '<h2>1. Acceptance of Terms</h2>
<p>By accessing and using ConvertFastly ("the Service"), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by the above, please do not use this service.</p>

<h2>2. Description of Service</h2>
<p>ConvertFastly provides free online conversion tools including but not limited to:</p>
<ul>
<li>File format conversion (images, documents, etc.)</li>
<li>Image processing and optimization</li>
<li>Text encoding and decoding</li>
<li>Password generation and security tools</li>
<li>QR code generation</li>
<li>JSON formatting and validation</li>
<li>Unit conversion calculators</li>
<li>Other utility tools and converters</li>
</ul>
<p>All processing is performed client-side in your browser for maximum privacy and security.</p>

<h2>3. Use License</h2>
<p>Permission is granted to use ConvertFastly for personal and commercial purposes, subject to the following restrictions:</p>

<h3>3.1 You may:</h3>
<ul>
<li>Use all tools for personal and commercial projects</li>
<li>Process unlimited files and data</li>
<li>Access the service from any device or location</li>
<li>Share links to our tools with others</li>
</ul>

<h3>3.2 You may not:</h3>
<ul>
<li>Attempt to reverse engineer any software or algorithms</li>
<li>Use the service for illegal or harmful activities</li>
<li>Attempt to overload or disrupt our servers</li>
<li>Remove or modify any copyright or attribution notices</li>
<li>Create derivative works based on our service</li>
<li>Use automated tools to excessively access our service</li>
</ul>

<h2>4. User Responsibilities</h2>
<p>You are responsible for:</p>
<ul>
<li>Ensuring you have the right to process any files you upload</li>
<li>Complying with all applicable laws and regulations</li>
<li>Maintaining the security of your own devices and data</li>
<li>Using the service in a reasonable and appropriate manner</li>
</ul>

<h2>5. Privacy and Data Handling</h2>
<p>We are committed to protecting your privacy:</p>
<ul>
<li>All file processing occurs locally in your browser</li>
<li>We do not store, collect, or transmit your files</li>
<li>No personal data is required to use our service</li>
<li>See our Privacy Policy for complete details</li>
</ul>

<h2>6. Intellectual Property</h2>
<p>The ConvertFastly service, including its design, functionality, and content, is protected by copyright and other intellectual property laws. You retain all rights to any files you process using our service.</p>

<h2>7. Service Availability</h2>
<p>We strive to maintain high availability, but:</p>
<ul>
<li>Service may be temporarily unavailable for maintenance</li>
<li>We do not guarantee 100% uptime</li>
<li>Features may be added, modified, or removed at our discretion</li>
<li>We reserve the right to limit usage if necessary</li>
</ul>

<h2>8. Disclaimer of Warranties</h2>
<p>ConvertFastly is provided on an "as is" and "as available" basis. We make no warranties, expressed or implied, including but not limited to:</p>
<ul>
<li>Merchantability or fitness for a particular purpose</li>
<li>Accuracy or reliability of conversion results</li>
<li>Uninterrupted or error-free operation</li>
<li>Security against all possible threats</li>
</ul>

<h2>9. Limitation of Liability</h2>
<p>In no event shall ConvertFastly, its owners, or contributors be liable for any damages including:</p>
<ul>
<li>Direct, indirect, incidental, or consequential damages</li>
<li>Loss of data, profits, or business opportunities</li>
<li>Damages resulting from service interruptions</li>
<li>Any damages exceeding the amount you paid for the service (which is $0)</li>
</ul>

<h2>10. Indemnification</h2>
<p>You agree to indemnify and hold harmless ConvertFastly from any claims, damages, or expenses arising from your use of the service or violation of these terms.</p>

<h2>11. Modifications to Service and Terms</h2>
<p>We reserve the right to:</p>
<ul>
<li>Modify or discontinue any part of the service</li>
<li>Update these terms at any time</li>
<li>Change our privacy practices with notice</li>
</ul>
<p>Continued use of the service after changes constitutes acceptance of new terms.</p>

<h2>12. Termination</h2>
<p>We may terminate or suspend access to our service immediately, without prior notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties.</p>

<h2>13. Governing Law</h2>
<p>These terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law provisions.</p>

<h2>14. Severability</h2>
<p>If any provision of these terms is found to be unenforceable, the remaining provisions will remain in full force and effect.</p>

<h2>15. Contact Information</h2>
<p>If you have any questions about these Terms of Service, please contact us:</p>
<ul>
<li>Email: <a href="mailto:support@convertfastly.com">support@convertfastly.com</a></li>
<li>Contact Form: <a href="/contact">https://convertfastly.com/contact</a></li>
</ul>

<p><strong>Effective Date:</strong> January 1, 2025</p>
<p><strong>Last Updated:</strong> January 1, 2025</p>',
  '1.0',
  true,
  now(),
  now()
);