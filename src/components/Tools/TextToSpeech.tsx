import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Volume2, Play, Pause, Download, Settings, Mic } from 'lucide-react';
import { useToolTracking } from '../../hooks/useToolTracking';

const TextToSpeech: React.FC = () => {
  useToolTracking('text-to-speech');

  const [text, setText] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [voice, setVoice] = useState<string>('');
  const [rate, setRate] = useState<number>(1);
  const [pitch, setPitch] = useState<number>(1);
  const [volume, setVolume] = useState<number>(1);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  React.useEffect(() => {
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices();
      setAvailableVoices(voices);
      if (voices.length > 0 && !voice) {
        setVoice(voices[0].name);
      }
    };

    loadVoices();
    speechSynthesis.addEventListener('voiceschanged', loadVoices);

    return () => {
      speechSynthesis.removeEventListener('voiceschanged', loadVoices);
    };
  }, [voice]);

  const speak = () => {
    if (!text.trim()) return;

    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    const selectedVoice = availableVoices.find(v => v.name === voice);
    
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    utteranceRef.current = utterance;
    speechSynthesis.speak(utterance);
  };

  const pause = () => {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  const downloadAudio = () => {
    // Note: Web Speech API doesn't support direct audio download
    // This would require a server-side TTS service for actual audio file generation
    alert('Audio download feature requires a premium TTS service. Currently showing demo functionality.');
  };

  const loadSampleText = () => {
    const sampleText = "Welcome to ConvertFastly's Text-to-Speech tool! This advanced AI-powered tool can convert any text into natural-sounding speech. Perfect for creating voiceovers, accessibility features, or simply listening to your content. Try adjusting the voice, speed, and pitch settings to customize your audio experience.";
    setText(sampleText);
  };

  const languages = [
    { code: 'en-US', name: 'English (US)' },
    { code: 'en-GB', name: 'English (UK)' },
    { code: 'es-ES', name: 'Spanish' },
    { code: 'fr-FR', name: 'French' },
    { code: 'de-DE', name: 'German' },
    { code: 'it-IT', name: 'Italian' },
    { code: 'pt-BR', name: 'Portuguese' },
    { code: 'ru-RU', name: 'Russian' },
    { code: 'ja-JP', name: 'Japanese' },
    { code: 'ko-KR', name: 'Korean' }
  ];

  return (
    <>
      <Helmet>
        <title>Free Text to Speech Converter - Natural AI Voices | ConvertFastly</title>
        <meta name="description" content="Convert text to speech with natural AI voices. Free online TTS tool with multiple languages and voice options. Perfect for accessibility, content creation, and learning." />
        <meta name="keywords" content="text to speech, TTS, voice generator, speech synthesis, AI voice, text reader, accessibility tool, voice over, audio converter" />
        <link rel="canonical" href="https://convertfastly.com/text-to-speech" />
        <meta property="og:title" content="Free Text to Speech Converter - Natural AI Voices" />
        <meta property="og:description" content="Convert text to speech with natural AI voices. Multiple languages and customization options available." />
        <meta property="og:url" content="https://convertfastly.com/text-to-speech" />
      </Helmet>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center space-x-3 mb-6">
          <Volume2 className="h-8 w-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Text to Speech Converter</h2>
        </div>

        <p className="text-gray-600 mb-8">
          Convert any text into natural-sounding speech with AI voices. Perfect for accessibility, content creation, and learning.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">Text to Convert</label>
                <button
                  onClick={loadSampleText}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Load Sample
                </button>
              </div>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={8}
                placeholder="Enter the text you want to convert to speech..."
              />
              <div className="text-xs text-gray-500 mt-1">
                {text.length} characters
              </div>
            </div>

            {/* Voice Settings */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-3">
                <Settings className="h-5 w-5 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-900">Voice Settings</h3>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Voice
                </label>
                <select
                  value={voice}
                  onChange={(e) => setVoice(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {availableVoices.map((voiceOption, index) => (
                    <option key={index} value={voiceOption.name}>
                      {voiceOption.name} ({voiceOption.lang})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Speed: {rate.toFixed(1)}x
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={rate}
                  onChange={(e) => setRate(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Slow</span>
                  <span>Fast</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pitch: {pitch.toFixed(1)}
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={pitch}
                  onChange={(e) => setPitch(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Low</span>
                  <span>High</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Volume: {Math.round(volume * 100)}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Quiet</span>
                  <span>Loud</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={isPlaying ? pause : speak}
                disabled={!text.trim()}
                className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                <span>{isPlaying ? 'Stop' : 'Play'}</span>
              </button>
              
              <button
                onClick={downloadAudio}
                disabled={!text.trim()}
                className="flex items-center justify-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="h-5 w-5" />
                <span>Download</span>
              </button>
            </div>
          </div>

          {/* Features & Info */}
          <div className="space-y-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                <Mic className="h-5 w-5 mr-2" />
                Features
              </h4>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>• Natural-sounding AI voices</li>
                <li>• Multiple languages and accents</li>
                <li>• Adjustable speed, pitch, and volume</li>
                <li>• Real-time speech synthesis</li>
                <li>• Perfect for accessibility needs</li>
              </ul>
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <h4 className="font-semibold text-green-900 mb-3">Perfect For</h4>
              <ul className="space-y-2 text-sm text-green-800">
                <li>• Content creators making voiceovers</li>
                <li>• Students with reading difficulties</li>
                <li>• Podcast and video production</li>
                <li>• Language learning and pronunciation</li>
                <li>• Accessibility for visually impaired</li>
                <li>• Proofreading by listening</li>
              </ul>
            </div>

            <div className="bg-purple-50 rounded-lg p-6">
              <h4 className="font-semibold text-purple-900 mb-3">Supported Languages</h4>
              <div className="grid grid-cols-2 gap-2 text-sm text-purple-800">
                {languages.slice(0, 8).map((lang, index) => (
                  <div key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    {lang.name}
                  </div>
                ))}
              </div>
              <p className="text-xs text-purple-600 mt-2">And many more...</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TextToSpeech;