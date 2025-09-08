import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

// Tool Components
import ColorPaletteGenerator from './components/Tools/ColorPaletteGenerator';
import ImageResizer from './components/Tools/ImageResizer';
import PasswordGenerator from './components/Tools/PasswordGenerator';
import QRCodeGenerator from './components/Tools/QRCodeGenerator';
import TextEncoderDecoder from './components/Tools/TextEncoderDecoder';
import JSONFormatter from './components/Tools/JSONFormatter';
import UnitConverter from './components/Tools/UnitConverter';
import HashGenerator from './components/Tools/HashGenerator';
import LoremIpsumGenerator from './components/Tools/LoremIpsumGenerator';
import ColorFormatConverter from './components/Tools/ColorFormatConverter';
import EMICalculator from './components/Tools/EMICalculator';
import FileConverter from './components/Tools/FileConverter';
import CurrencyConverter from './components/Tools/CurrencyConverter';
import PDFToWord from './components/Tools/PDFToWord';
import WordToPDF from './components/Tools/WordToPDF';
import ImageCompressor from './components/Tools/ImageCompressor';
import AITextSummarizer from './components/Tools/AITextSummarizer';
import AIGrammarRewriter from './components/Tools/AIGrammarRewriter';
import AIImageGenerator from './components/Tools/AIImageGenerator';
import TextToSpeech from './components/Tools/TextToSpeech';
import SpeechToText from './components/Tools/SpeechToText';
import LanguageTranslator from './components/Tools/LanguageTranslator';
import PDFMerger from './components/Tools/PDFMerger';
import PDFSplitter from './components/Tools/PDFSplitter';
import WordEditor from './components/Tools/WordEditor';
import PDFEditor from './components/Tools/PDFEditor';
import AgeCalculator from './components/Tools/AgeCalculator';
import KeywordResearch from './components/Tools/KeywordResearch';
import WebsiteAudit from './components/Tools/WebsiteAudit';
import DomainAuthorityChecker from './components/Tools/DomainAuthorityChecker';
import BacklinkChecker from './components/Tools/BacklinkChecker';
import PlagiarismChecker from './components/Tools/PlagiarismChecker';
import TrafficEstimator from './components/Tools/TrafficEstimator';
import MetaTagGenerator from './components/Tools/MetaTagGenerator';
import RobotsTxtGenerator from './components/Tools/RobotsTxtGenerator';
import SitemapGenerator from './components/Tools/SitemapGenerator';
import BrokenLinkChecker from './components/Tools/BrokenLinkChecker';
import PageSpeedChecker from './components/Tools/PageSpeedChecker';
import KeywordDensityChecker from './components/Tools/KeywordDensityChecker';
import ContentOptimizer from './components/Tools/ContentOptimizer';
import AIContentWriter from './components/Tools/AIContentWriter';
import YouTubeDownloader from './components/Tools/YouTubeDownloader';
import YouTubeThumbnailDownloader from './components/Tools/YouTubeThumbnailDownloader';
import InstagramReelDownloader from './components/Tools/InstagramReelDownloader';

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            
            {/* Tool Routes */}
            <Route path="/color-palette-generator" element={<ColorPaletteGenerator />} />
            <Route path="/image-resizer" element={<ImageResizer />} />
            <Route path="/password-generator" element={<PasswordGenerator />} />
            <Route path="/qr-code-generator" element={<QRCodeGenerator />} />
            <Route path="/text-encoder-decoder" element={<TextEncoderDecoder />} />
            <Route path="/json-formatter" element={<JSONFormatter />} />
            <Route path="/unit-converter" element={<UnitConverter />} />
            <Route path="/hash-generator" element={<HashGenerator />} />
            <Route path="/lorem-ipsum-generator" element={<LoremIpsumGenerator />} />
            <Route path="/color-format-converter" element={<ColorFormatConverter />} />
            <Route path="/emi-calculator" element={<EMICalculator />} />
            <Route path="/file-converter" element={<FileConverter />} />
            <Route path="/currency-converter" element={<CurrencyConverter />} />
            <Route path="/pdf-to-word" element={<PDFToWord />} />
            <Route path="/word-to-pdf" element={<WordToPDF />} />
            <Route path="/image-compressor" element={<ImageCompressor />} />
            <Route path="/ai-text-summarizer" element={<AITextSummarizer />} />
            <Route path="/ai-grammar-rewriter" element={<AIGrammarRewriter />} />
            <Route path="/ai-image-generator" element={<AIImageGenerator />} />
            <Route path="/text-to-speech" element={<TextToSpeech />} />
            <Route path="/speech-to-text" element={<SpeechToText />} />
            <Route path="/language-translator" element={<LanguageTranslator />} />
            <Route path="/pdf-merger" element={<PDFMerger />} />
            <Route path="/pdf-splitter" element={<PDFSplitter />} />
            <Route path="/word-editor" element={<WordEditor />} />
            <Route path="/pdf-editor" element={<PDFEditor />} />
            <Route path="/age-calculator" element={<AgeCalculator />} />
            <Route path="/word-editor" element={<WordEditor />} />
            <Route path="/pdf-editor" element={<PDFEditor />} />
            <Route path="/age-calculator" element={<AgeCalculator />} />
            <Route path="/keyword-research" element={<KeywordResearch />} />
            <Route path="/website-audit" element={<WebsiteAudit />} />
            <Route path="/domain-authority-checker" element={<DomainAuthorityChecker />} />
            <Route path="/backlink-checker" element={<BacklinkChecker />} />
            <Route path="/plagiarism-checker" element={<PlagiarismChecker />} />
            <Route path="/traffic-estimator" element={<TrafficEstimator />} />
            <Route path="/meta-tag-generator" element={<MetaTagGenerator />} />
            <Route path="/robots-txt-generator" element={<RobotsTxtGenerator />} />
            <Route path="/sitemap-generator" element={<SitemapGenerator />} />
            <Route path="/broken-link-checker" element={<BrokenLinkChecker />} />
            <Route path="/pagespeed-checker" element={<PageSpeedChecker />} />
            <Route path="/keyword-density-checker" element={<KeywordDensityChecker />} />
            <Route path="/content-optimizer" element={<ContentOptimizer />} />
            <Route path="/ai-content-writer" element={<AIContentWriter />} />
            <Route path="/youtube-downloader" element={<YouTubeDownloader />} />
            <Route path="/youtube-thumbnail-downloader" element={<YouTubeThumbnailDownloader />} />
            <Route path="/instagram-reel-downloader" element={<InstagramReelDownloader />} />
          </Routes>
        </Layout>
      </Router>
    </HelmetProvider>
  );
};

export default App;