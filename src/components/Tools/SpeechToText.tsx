import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Mic, MicOff, Copy, Download, Settings, Volume2 } from 'lucide-react';
import { useToolTracking } from '../../hooks/useToolTracking';

const SpeechToText: React.FC = () => {
  useToolTracking('speech-to-text');

  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [language, setLanguage] = useState<string>('en-US');
  const [isSupported, setIsSupported] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const recognitionRef = useRef<any>(null);

  React.useEffect(() => {
    // Check if browser supports Speech Recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = language;

    recognition.onresult = (event: any) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      setTranscript(prev => prev + finalTranscript);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [language]);

  const startRecording = () => {
    if (!recognitionRef.current) return;
    
    try {
      recognitionRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recognition:', error);
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  const clearTranscript = () => {
    setTranscript('');
  };

  const copyToClipboard = async () => {
    if (transcript) {
      await navigator.clipboard.writeText(transcript);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadText = () => {
    if (transcript) {
      const blob = new Blob([transcript], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'speech-transcript.txt';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const languages = [
    { code: 'en-US', name: 'English (US)' },
    { code: 'en-GB', name: 'English (UK)' },
    { code: 'es-ES', name: 'Spanish' },
    { code: 'fr-FR', name: 'French' },
    { code: 'de-DE', name: 'German' },
    { code: 'it-IT', name: 'Italian' },
    { code: 'pt-BR', name: 'Portuguese (Brazil)' },
    { code: 'ru-RU', name: 'Russian' },
    { code: 'ja-JP', name: 'Japanese' },
    { code: 'ko-KR', name: 'Korean' },
    { code: 'zh-CN', name: 'Chinese (Mandarin)' },
    { code: 'ar-SA', name: 'Arabic' }
  ];

  if (!isSupported) {
    return (
      <>
        <Helmet>
          <title>Speech to Text Converter - Voice Recognition Tool | ConvertFastly</title>
          <meta name="description" content="Convert speech to text with our free voice recognition tool. Supports multiple languages and real-time transcription. Perfect for note-taking and accessibility." />
        </Helmet>
        
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center">
            <MicOff className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Speech to Text Not Supported</h2>
            <p className="text-gray-600">
              Your browser doesn't support speech recognition. Please try using Chrome, Edge, or Safari.
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Free Speech to Text Converter - Voice Recognition Tool | ConvertFastly</title>
        <meta name="description" content="Convert speech to text with our free voice recognition tool. Supports 50+ languages and real-time transcription. Perfect for note-taking, accessibility, and content creation." />
        <meta name="keywords" content="speech to text, voice recognition, voice to text, transcription tool, dictation software, speech recognition, voice typing, STT converter" />
        <link rel="canonical" href="https://convertfastly.com/speech-to-text" />
        <meta property="og:title" content="Free Speech to Text Converter - Voice Recognition Tool" />
        <meta property="og:description" content="Convert speech to text with real-time voice recognition. Supports multiple languages and perfect for accessibility." />
        <meta property="og:url" content="https://convertfastly.com/speech-to-text" />
      </Helmet>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center space-x-3 mb-6">
          <Mic className="h-8 w-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Speech to Text Converter</h2>
        </div>

        <p className="text-gray-600 mb-8">
          Convert your speech into text with real-time voice recognition. Perfect for note-taking, transcription, and accessibility needs.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recording Section */}
          <div className="space-y-6">
            <div className="text-center">
              <div className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center mb-6 transition-all duration-300 ${
                isRecording 
                  ? 'bg-red-100 border-4 border-red-500 animate-pulse' 
                  : 'bg-blue-100 border-4 border-blue-500'
              }`}>
                {isRecording ? (
                  <MicOff className="h-16 w-16 text-red-600" />
                ) : (
                  <Mic className="h-16 w-16 text-blue-600" />
                )}
              </div>
              
              <button
                onClick={isRecording ? stopRecording : startRecording}
                className={`px-8 py-4 rounded-lg font-semibold text-lg transition-colors ${
                  isRecording
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isRecording ? 'Stop Recording' : 'Start Recording'}
              </button>
              
              <p className="text-sm text-gray-500 mt-3">
                {isRecording ? 'Listening... Speak clearly into your microphone' : 'Click to start voice recognition'}
              </p>
            </div>

            {/* Settings */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-3">
                <Settings className="h-5 w-5 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-900">Settings</h3>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Language
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  disabled={isRecording}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={clearTranscript}
                disabled={!transcript || isRecording}
                className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Clear Transcript
              </button>
            </div>
          </div>

          {/* Transcript Section */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">Live Transcript</label>
                {transcript && (
                  <div className="flex space-x-2">
                    <button
                      onClick={copyToClipboard}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                    <button
                      onClick={downloadText}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
              
              <div className="relative">
                <div className="w-full min-h-[300px] px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 overflow-y-auto">
                  {transcript ? (
                    <p className="text-gray-900 leading-relaxed whitespace-pre-wrap">{transcript}</p>
                  ) : (
                    <p className="text-gray-500 italic">Your speech will be transcribed here in real-time...</p>
                  )}
                </div>
                
                {copied && (
                  <div className="absolute top-2 right-2 bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                    Copied! ✓
                  </div>
                )}
              </div>
              
              <div className="text-xs text-gray-500 mt-1">
                {transcript.length} characters
              </div>
            </div>

            {/* Features */}
            <div className="bg-green-50 rounded-lg p-6">
              <h4 className="font-semibold text-green-900 mb-3 flex items-center">
                <Volume2 className="h-5 w-5 mr-2" />
                Perfect For
              </h4>
              <ul className="space-y-2 text-sm text-green-800">
                <li>• Meeting transcriptions</li>
                <li>• Voice note-taking</li>
                <li>• Content creation and blogging</li>
                <li>• Accessibility for typing difficulties</li>
                <li>• Language learning practice</li>
                <li>• Interview transcriptions</li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h4 className="font-semibold text-blue-900 mb-3">Tips for Best Results</h4>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>• Speak clearly and at moderate pace</li>
                <li>• Use a good quality microphone</li>
                <li>• Minimize background noise</li>
                <li>• Pause between sentences</li>
                <li>• Select the correct language</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SpeechToText;