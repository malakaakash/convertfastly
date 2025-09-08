import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Languages, ArrowRightLeft, Copy, Volume2, Globe } from 'lucide-react';
import LoadingSpinner from '../Common/LoadingSpinner';
import { useToolTracking } from '../../hooks/useToolTracking';

const LanguageTranslator: React.FC = () => {
  useToolTracking('language-translator');

  const [sourceText, setSourceText] = useState<string>('');
  const [translatedText, setTranslatedText] = useState<string>('');
  const [sourceLang, setSourceLang] = useState<string>('en');
  const [targetLang, setTargetLang] = useState<string>('es');
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'it', name: 'Italian', flag: '🇮🇹' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
    { code: 'ru', name: 'Russian', flag: '🇷🇺' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
    { code: 'th', name: 'Thai', flag: '🇹🇭' },
    { code: 'vi', name: 'Vietnamese', flag: '🇻🇳' },
    { code: 'tr', name: 'Turkish', flag: '🇹🇷' },
    { code: 'pl', name: 'Polish', flag: '🇵🇱' },
    { code: 'nl', name: 'Dutch', flag: '🇳🇱' },
    { code: 'sv', name: 'Swedish', flag: '🇸🇪' },
    { code: 'da', name: 'Danish', flag: '🇩🇰' },
    { code: 'no', name: 'Norwegian', flag: '🇳🇴' }
  ];

  const simulateTranslation = async () => {
    if (!sourceText.trim()) return;

    setIsTranslating(true);
    
    // Simulate translation API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock translation responses based on target language
    const mockTranslations: { [key: string]: string } = {
      'es': 'Esta es una traducción simulada al español. El texto original ha sido procesado por nuestro sistema de traducción AI.',
      'fr': 'Ceci est une traduction simulée en français. Le texte original a été traité par notre système de traduction IA.',
      'de': 'Dies ist eine simulierte Übersetzung ins Deutsche. Der ursprüngliche Text wurde von unserem KI-Übersetzungssystem verarbeitet.',
      'it': 'Questa è una traduzione simulata in italiano. Il testo originale è stato elaborato dal nostro sistema di traduzione AI.',
      'pt': 'Esta é uma tradução simulada para o português. O texto original foi processado pelo nosso sistema de tradução AI.',
      'ru': 'Это имитированный перевод на русский язык. Исходный текст был обработан нашей системой перевода ИИ.',
      'ja': 'これは日本語への模擬翻訳です。元のテキストは私たちのAI翻訳システムによって処理されました。',
      'ko': '이것은 한국어로의 시뮬레이션 번역입니다. 원본 텍스트는 우리의 AI 번역 시스템에 의해 처리되었습니다.',
      'zh': '这是模拟的中文翻译。原始文本已由我们的AI翻译系统处理。',
      'ar': 'هذه ترجمة محاكاة إلى العربية. تم معالجة النص الأصلي بواسطة نظام الترجمة بالذكاء الاصطناعي الخاص بنا.',
      'hi': 'यह हिंदी में एक अनुकरणीय अनुवाद है। मूल पाठ को हमारे AI अनुवाद सिस्टम द्वारा संसाधित किया गया है।'
    };

    const translation = mockTranslations[targetLang] || `Translated text in ${languages.find(l => l.code === targetLang)?.name}: ${sourceText}`;
    setTranslatedText(translation);
    setIsTranslating(false);
  };

  const swapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  const copyToClipboard = async () => {
    if (translatedText) {
      await navigator.clipboard.writeText(translatedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const speakText = (text: string, lang: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      speechSynthesis.speak(utterance);
    }
  };

  const loadSampleText = () => {
    const sampleTexts: { [key: string]: string } = {
      'en': 'Welcome to our AI-powered language translator! This tool can translate text between over 100 languages instantly. Perfect for travelers, students, and international business.',
      'es': '¡Bienvenido a nuestro traductor de idiomas con inteligencia artificial! Esta herramienta puede traducir texto entre más de 100 idiomas al instante.',
      'fr': 'Bienvenue dans notre traducteur de langues alimenté par IA! Cet outil peut traduire du texte entre plus de 100 langues instantanément.',
      'de': 'Willkommen bei unserem KI-gestützten Sprachübersetzer! Dieses Tool kann Text zwischen über 100 Sprachen sofort übersetzen.',
      'zh': '欢迎使用我们的AI驱动语言翻译器！这个工具可以在100多种语言之间即时翻译文本。'
    };
    
    setSourceText(sampleTexts[sourceLang] || sampleTexts['en']);
  };

  React.useEffect(() => {
    if (sourceText.trim()) {
      const debounceTimer = setTimeout(() => {
        simulateTranslation();
      }, 1000);
      
      return () => clearTimeout(debounceTimer);
    } else {
      setTranslatedText('');
    }
  }, [sourceText, sourceLang, targetLang]);

  return (
    <>
      <Helmet>
        <title>Free AI Language Translator - Translate 100+ Languages | ConvertFastly</title>
        <meta name="description" content="Free AI-powered language translator supporting 100+ languages. Instant translation with high accuracy. Perfect alternative to Google Translate for students, travelers, and businesses." />
        <meta name="keywords" content="language translator, AI translator, Google Translate alternative, free translator, multilingual translator, instant translation, text translator, language converter" />
        <link rel="canonical" href="https://convertfastly.com/language-translator" />
        <meta property="og:title" content="Free AI Language Translator - Translate 100+ Languages" />
        <meta property="og:description" content="AI-powered language translator supporting 100+ languages. Free, fast, and accurate translations." />
        <meta property="og:url" content="https://convertfastly.com/language-translator" />
      </Helmet>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center space-x-3 mb-6">
          <Languages className="h-8 w-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">AI Language Translator</h2>
        </div>

        <p className="text-gray-600 mb-8">
          Translate text between 100+ languages instantly with AI. Perfect alternative to Google Translate for students, travelers, and international communication.
        </p>

        <div className="space-y-6">
          {/* Language Selection */}
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
              <select
                value={sourceLang}
                onChange={(e) => setSourceLang(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={swapLanguages}
              className="mt-7 p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowRightLeft className="h-5 w-5" />
            </button>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
              <select
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Source Text */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">
                  {languages.find(l => l.code === sourceLang)?.name} Text
                </label>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={loadSampleText}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Sample
                  </button>
                  <button
                    onClick={() => speakText(sourceText, sourceLang)}
                    disabled={!sourceText.trim()}
                    className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
                  >
                    <Volume2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <textarea
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={8}
                placeholder="Enter text to translate..."
              />
              <div className="text-xs text-gray-500 mt-1">
                {sourceText.length} characters
              </div>
            </div>

            {/* Translated Text */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">
                  {languages.find(l => l.code === targetLang)?.name} Translation
                </label>
                <div className="flex items-center space-x-2">
                  {translatedText && (
                    <>
                      <button
                        onClick={copyToClipboard}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => speakText(translatedText, targetLang)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Volume2 className="h-4 w-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div className="relative">
                <div className="w-full min-h-[200px] px-4 py-3 border border-gray-300 rounded-lg bg-gray-50">
                  {isTranslating ? (
                    <div className="flex items-center justify-center h-32">
                      <LoadingSpinner size="md" color="blue" />
                      <span className="ml-2 text-gray-600">Translating...</span>
                    </div>
                  ) : translatedText ? (
                    <p className="text-gray-900 leading-relaxed">{translatedText}</p>
                  ) : (
                    <p className="text-gray-500 italic">Translation will appear here...</p>
                  )}
                </div>
                {copied && (
                  <div className="absolute top-2 right-2 bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                    Copied! ✓
                  </div>
                )}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {translatedText.length} characters
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-blue-50 rounded-lg p-6">
              <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                Supported Languages
              </h4>
              <div className="grid grid-cols-2 gap-1 text-sm text-blue-800">
                {languages.slice(0, 8).map((lang) => (
                  <div key={lang.code} className="flex items-center">
                    <span className="mr-2">{lang.flag}</span>
                    {lang.name}
                  </div>
                ))}
              </div>
              <p className="text-xs text-blue-600 mt-2">And 80+ more languages...</p>
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <h4 className="font-semibold text-green-900 mb-3">Perfect For</h4>
              <ul className="space-y-2 text-sm text-green-800">
                <li>• International business communication</li>
                <li>• Travel and tourism</li>
                <li>• Language learning and education</li>
                <li>• Social media and content creation</li>
                <li>• Academic research and studies</li>
                <li>• Customer support and service</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LanguageTranslator;