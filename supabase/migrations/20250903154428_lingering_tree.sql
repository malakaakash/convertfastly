/*
  # Create Articles/Blog System

  1. New Tables
    - `articles`
      - `id` (uuid, primary key)
      - `title` (text)
      - `slug` (text, unique)
      - `excerpt` (text)
      - `content` (text)
      - `featured_image` (text, optional)
      - `category` (text)
      - `tags` (text array)
      - `is_published` (boolean)
      - `is_featured` (boolean)
      - `author` (text)
      - `meta_title` (text, for SEO)
      - `meta_description` (text, for SEO)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `published_at` (timestamp)

  2. Security
    - Enable RLS on `articles` table
    - Add policy for public to read published articles
    - Add policy for admin to manage all articles
</*/

CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  featured_image text,
  category text DEFAULT 'General',
  tags text[] DEFAULT '{}',
  is_published boolean DEFAULT false,
  is_featured boolean DEFAULT false,
  author text DEFAULT 'ConvertFastly Team',
  meta_title text,
  meta_description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  published_at timestamptz
);

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Policy for public to read published articles
CREATE POLICY "Anyone can read published articles"
  ON articles
  FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

-- Policy for admin to manage all articles
CREATE POLICY "Admin can manage all articles"
  ON articles
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS articles_published_idx ON articles (is_published, published_at DESC);
CREATE INDEX IF NOT EXISTS articles_slug_idx ON articles (slug);
CREATE INDEX IF NOT EXISTS articles_category_idx ON articles (category);
CREATE INDEX IF NOT EXISTS articles_featured_idx ON articles (is_featured, published_at DESC);

-- Insert sample articles
INSERT INTO articles (title, slug, excerpt, content, category, tags, is_published, is_featured, meta_title, meta_description, published_at) VALUES
(
  'Top 10 Online Tools Every Professional Needs in 2025',
  'top-10-online-tools-professionals-2025',
  'Discover the essential online tools that can boost your productivity and streamline your workflow in 2025.',
  '<h2>Introduction</h2>
<p>In today''s digital landscape, having the right online tools can make the difference between struggling with tasks and completing them efficiently. Whether you''re a designer, developer, content creator, or business professional, these 10 online tools will revolutionize your workflow.</p>

<h2>1. File Conversion Tools</h2>
<p>File conversion tools are essential for any professional dealing with different file formats. From converting PDFs to Word documents to transforming images between formats, these tools save countless hours.</p>

<h3>Why You Need Them:</h3>
<ul>
<li>Seamless collaboration across different platforms</li>
<li>Maintain document formatting integrity</li>
<li>Quick format changes without specialized software</li>
</ul>

<h2>2. Image Optimization Tools</h2>
<p>With web performance being crucial, image optimization tools help reduce file sizes while maintaining quality.</p>

<h2>3. Password Generators</h2>
<p>Security is paramount in 2025. Strong, unique passwords for every account are no longer optional.</p>

<h2>4. QR Code Generators</h2>
<p>QR codes have made a comeback and are essential for contactless interactions and quick information sharing.</p>

<h2>5. JSON Formatters</h2>
<p>For developers and data analysts, properly formatted JSON is crucial for debugging and data analysis.</p>

<h2>Conclusion</h2>
<p>These tools represent just the beginning of what''s possible with modern online utilities. The key is finding reliable, secure tools that respect your privacy while delivering professional results.</p>',
  'Productivity',
  ARRAY['tools', 'productivity', '2025', 'professional'],
  true,
  true,
  'Top 10 Online Tools Every Professional Needs in 2025 | ConvertFastly',
  'Discover the essential online tools that can boost your productivity and streamline your workflow in 2025. Free tools for professionals.',
  now()
),
(
  'How to Choose the Right File Converter for Your Needs',
  'choose-right-file-converter-guide',
  'A comprehensive guide to selecting the perfect file conversion tool based on your specific requirements and use cases.',
  '<h2>Understanding File Conversion</h2>
<p>File conversion is the process of changing a file from one format to another. This might seem simple, but choosing the right converter can impact quality, security, and efficiency.</p>

<h2>Key Factors to Consider</h2>

<h3>1. Security and Privacy</h3>
<p>When dealing with sensitive documents, ensure your converter processes files locally rather than uploading them to servers.</p>

<h3>2. Supported Formats</h3>
<p>Look for converters that support a wide range of input and output formats to future-proof your workflow.</p>

<h3>3. Quality Preservation</h3>
<p>The best converters maintain the original quality and formatting of your documents.</p>

<h3>4. Speed and Efficiency</h3>
<p>Time is valuable. Choose tools that process files quickly without compromising quality.</p>

<h2>Common Conversion Scenarios</h2>

<h3>PDF to Word</h3>
<p>Essential for editing PDF documents. Look for converters that preserve formatting and handle complex layouts.</p>

<h3>Image Format Conversion</h3>
<p>Converting between PNG, JPG, WebP, and other formats for web optimization or compatibility.</p>

<h2>Best Practices</h2>
<ul>
<li>Always keep backups of original files</li>
<li>Test converters with sample files first</li>
<li>Verify output quality before relying on converted files</li>
<li>Use reputable, established conversion tools</li>
</ul>

<h2>Conclusion</h2>
<p>The right file converter can streamline your workflow and save hours of manual work. Prioritize security, quality, and ease of use when making your choice.</p>',
  'Tutorials',
  ARRAY['file conversion', 'tutorial', 'guide', 'PDF', 'productivity'],
  true,
  false,
  'How to Choose the Right File Converter | Complete Guide | ConvertFastly',
  'Learn how to choose the perfect file converter for your needs. Complete guide covering security, quality, and efficiency factors.',
  now()
),
(
  'The Ultimate Guide to Password Security in 2025',
  'ultimate-password-security-guide-2025',
  'Everything you need to know about creating, managing, and maintaining secure passwords in the modern digital age.',
  '<h2>Why Password Security Matters More Than Ever</h2>
<p>In 2025, cyber threats are more sophisticated than ever. A single weak password can compromise your entire digital life, from personal photos to financial accounts.</p>

<h2>Anatomy of a Strong Password</h2>

<h3>Length Matters</h3>
<p>Passwords should be at least 12 characters long, with 16+ characters being ideal for sensitive accounts.</p>

<h3>Character Variety</h3>
<ul>
<li>Uppercase letters (A-Z)</li>
<li>Lowercase letters (a-z)</li>
<li>Numbers (0-9)</li>
<li>Special characters (!@#$%^&*)</li>
</ul>

<h3>Unpredictability</h3>
<p>Avoid common patterns, dictionary words, and personal information that could be guessed or found online.</p>

<h2>Password Generation Best Practices</h2>

<h3>Use a Password Generator</h3>
<p>Reliable password generators create truly random passwords that are impossible to guess.</p>

<h3>Unique Passwords for Every Account</h3>
<p>Never reuse passwords across multiple accounts. Each account should have its own unique password.</p>

<h2>Common Password Mistakes to Avoid</h2>
<ul>
<li>Using personal information (birthdays, names, addresses)</li>
<li>Simple patterns (123456, qwerty, password)</li>
<li>Reusing passwords across multiple sites</li>
<li>Sharing passwords via insecure methods</li>
</ul>

<h2>Password Management Tools</h2>
<p>Consider using a reputable password manager to generate, store, and autofill complex passwords securely.</p>

<h2>Two-Factor Authentication</h2>
<p>Even the strongest password can be compromised. Always enable two-factor authentication when available.</p>

<h2>Conclusion</h2>
<p>Strong password security is your first line of defense against cyber threats. Invest time in creating and maintaining secure passwords – your digital security depends on it.</p>',
  'Security',
  ARRAY['password', 'security', 'cybersecurity', '2025', 'privacy'],
  true,
  true,
  'Ultimate Password Security Guide 2025 | ConvertFastly',
  'Complete guide to password security in 2025. Learn to create strong passwords, avoid common mistakes, and protect your digital life.',
  now()
);