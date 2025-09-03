import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Contact from './pages/Contact';
import PDFToWord from './components/Tools/PDFToWord';
import WordToPDF from './components/Tools/WordToPDF';
import FileConverter from './components/Tools/FileConverter';
import ImageCompressor from './components/Tools/ImageCompressor';
import ImageResizer from './components/Tools/ImageResizer';
import PasswordGenerator from './components/Tools/PasswordGenerator';
import ColorPaletteGenerator from './components/Tools/ColorPaletteGenerator';
import CurrencyConverter from './components/Tools/CurrencyConverter';
import EMICalculator from './components/Tools/EMICalculator';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tools/pdf-to-word" element={<PDFToWord />} />
        <Route path="/tools/word-to-pdf" element={<WordToPDF />} />
        <Route path="/tools/file-converter" element={<FileConverter />} />
        <Route path="/tools/image-compressor" element={<ImageCompressor />} />
        <Route path="/tools/image-resizer" element={<ImageResizer />} />
        <Route path="/tools/password-generator" element={<PasswordGenerator />} />
        <Route path="/tools/color-palette-generator" element={<ColorPaletteGenerator />} />
        <Route path="/tools/currency-converter" element={<CurrencyConverter />} />
        <Route path="/tools/emi-calculator" element={<EMICalculator />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Layout>
  );
}

export default App;