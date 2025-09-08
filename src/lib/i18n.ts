// Internationalization system for ConvertFastly
export interface Translation {
  [key: string]: string | Translation;
}

export const translations: { [lang: string]: Translation } = {
  en: {
    nav: {
      home: 'Home',
      blog: 'Blog',
      contact: 'Contact',
      terms: 'Terms',
      privacy: 'Privacy'
    },
    home: {
      title: 'ConvertFastly - Free Online Tools & Converters',
      subtitle: 'Your ultimate toolkit for free online conversions. Fast, secure, and completely free tools for all your needs.',
      searchPlaceholder: 'Search for tools, converters, generators...',
      chooseYourTool: 'Choose Your Tool',
      mostPopular: 'Most Popular Tools',
      howToUse: 'How to Use Our Tools',
      whyChoose: 'Why Choose ConvertFastly?',
      step1: 'Choose a Tool',
      step2: 'Upload or Input',
      step3: 'Get Results',
      privacyFirst: 'Privacy First',
      lightningFast: 'Lightning Fast',
      alwaysFree: 'Always Free',
      trustedBy: 'Trusted by 100,000+ users'
    },
    tools: {
      passwordGenerator: 'Password Generator',
      qrCodeGenerator: 'QR Code Generator',
      imageResizer: 'Image Resizer',
      jsonFormatter: 'JSON Formatter',
      currencyConverter: 'Currency Converter',
      colorPaletteGenerator: 'Color Palette Generator'
    },
    common: {
      generate: 'Generate',
      download: 'Download',
      copy: 'Copy',
      upload: 'Upload',
      analyze: 'Analyze',
      convert: 'Convert',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success'
    }
  },
  es: {
    nav: {
      home: 'Inicio',
      blog: 'Blog',
      contact: 'Contacto',
      terms: 'Términos',
      privacy: 'Privacidad'
    },
    home: {
      title: 'ConvertFastly - Herramientas y Convertidores Online Gratuitos',
      subtitle: 'Tu kit de herramientas definitivo para conversiones online gratuitas. Herramientas rápidas, seguras y completamente gratuitas para todas tus necesidades.',
      searchPlaceholder: 'Buscar herramientas, convertidores, generadores...',
      chooseYourTool: 'Elige Tu Herramienta',
      mostPopular: 'Herramientas Más Populares',
      howToUse: 'Cómo Usar Nuestras Herramientas',
      whyChoose: '¿Por Qué Elegir ConvertFastly?',
      step1: 'Elige una Herramienta',
      step2: 'Sube o Ingresa',
      step3: 'Obtén Resultados',
      privacyFirst: 'Privacidad Primero',
      lightningFast: 'Súper Rápido',
      alwaysFree: 'Siempre Gratis',
      trustedBy: 'Confiado por más de 100,000 usuarios'
    },
    tools: {
      passwordGenerator: 'Generador de Contraseñas',
      qrCodeGenerator: 'Generador de Códigos QR',
      imageResizer: 'Redimensionador de Imágenes',
      jsonFormatter: 'Formateador JSON',
      currencyConverter: 'Conversor de Monedas',
      colorPaletteGenerator: 'Generador de Paletas de Colores'
    },
    common: {
      generate: 'Generar',
      download: 'Descargar',
      copy: 'Copiar',
      upload: 'Subir',
      analyze: 'Analizar',
      convert: 'Convertir',
      loading: 'Cargando...',
      error: 'Error',
      success: 'Éxito'
    }
  },
  fr: {
    nav: {
      home: 'Accueil',
      blog: 'Blog',
      contact: 'Contact',
      terms: 'Conditions',
      privacy: 'Confidentialité'
    },
    home: {
      title: 'ConvertFastly - Outils et Convertisseurs en Ligne Gratuits',
      subtitle: 'Votre boîte à outils ultime pour les conversions en ligne gratuites. Outils rapides, sécurisés et entièrement gratuits pour tous vos besoins.',
      searchPlaceholder: 'Rechercher des outils, convertisseurs, générateurs...',
      chooseYourTool: 'Choisissez Votre Outil',
      mostPopular: 'Outils Les Plus Populaires',
      howToUse: 'Comment Utiliser Nos Outils',
      whyChoose: 'Pourquoi Choisir ConvertFastly?',
      step1: 'Choisir un Outil',
      step2: 'Télécharger ou Saisir',
      step3: 'Obtenir les Résultats',
      privacyFirst: 'Confidentialité d\'Abord',
      lightningFast: 'Ultra Rapide',
      alwaysFree: 'Toujours Gratuit',
      trustedBy: 'Approuvé par plus de 100 000 utilisateurs'
    },
    tools: {
      passwordGenerator: 'Générateur de Mots de Passe',
      qrCodeGenerator: 'Générateur de Codes QR',
      imageResizer: 'Redimensionneur d\'Images',
      jsonFormatter: 'Formateur JSON',
      currencyConverter: 'Convertisseur de Devises',
      colorPaletteGenerator: 'Générateur de Palettes de Couleurs'
    },
    common: {
      generate: 'Générer',
      download: 'Télécharger',
      copy: 'Copier',
      upload: 'Télécharger',
      analyze: 'Analyser',
      convert: 'Convertir',
      loading: 'Chargement...',
      error: 'Erreur',
      success: 'Succès'
    }
  },
  de: {
    nav: {
      home: 'Startseite',
      blog: 'Blog',
      contact: 'Kontakt',
      terms: 'Bedingungen',
      privacy: 'Datenschutz'
    },
    home: {
      title: 'ConvertFastly - Kostenlose Online-Tools & Konverter',
      subtitle: 'Ihr ultimatives Toolkit für kostenlose Online-Konvertierungen. Schnelle, sichere und völlig kostenlose Tools für alle Ihre Bedürfnisse.',
      searchPlaceholder: 'Suchen Sie nach Tools, Konvertern, Generatoren...',
      chooseYourTool: 'Wählen Sie Ihr Tool',
      mostPopular: 'Beliebteste Tools',
      howToUse: 'So Verwenden Sie Unsere Tools',
      whyChoose: 'Warum ConvertFastly Wählen?',
      step1: 'Tool Auswählen',
      step2: 'Hochladen oder Eingeben',
      step3: 'Ergebnisse Erhalten',
      privacyFirst: 'Datenschutz Zuerst',
      lightningFast: 'Blitzschnell',
      alwaysFree: 'Immer Kostenlos',
      trustedBy: 'Vertraut von über 100.000 Benutzern'
    },
    tools: {
      passwordGenerator: 'Passwort-Generator',
      qrCodeGenerator: 'QR-Code-Generator',
      imageResizer: 'Bildgrößenänderer',
      jsonFormatter: 'JSON-Formatierer',
      currencyConverter: 'Währungsrechner',
      colorPaletteGenerator: 'Farbpaletten-Generator'
    },
    common: {
      generate: 'Generieren',
      download: 'Herunterladen',
      copy: 'Kopieren',
      upload: 'Hochladen',
      analyze: 'Analysieren',
      convert: 'Konvertieren',
      loading: 'Laden...',
      error: 'Fehler',
      success: 'Erfolg'
    }
  }
};

export const useTranslation = (language: string = 'en') => {
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language] || translations.en;
    
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) {
        // Fallback to English if translation not found
        value = translations.en;
        for (const fallbackKey of keys) {
          value = value?.[fallbackKey];
          if (value === undefined) break;
        }
        break;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return { t };
};

export const getCurrentLanguage = (): string => {
  return localStorage.getItem('preferredLanguage') || 'en';
};

export const setCurrentLanguage = (language: string): void => {
  localStorage.setItem('preferredLanguage', language);
  // Trigger a custom event to notify components of language change
  window.dispatchEvent(new CustomEvent('languageChanged', { detail: language }));
};