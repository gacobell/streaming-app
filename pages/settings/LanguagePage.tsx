import { ArrowLeft, Check } from 'lucide-react';
import { useState } from 'react';

interface LanguagePageProps {
  onBack: () => void;
}

interface Language {
  code: string;
  name: string;
  nativeName: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  { code: 'pt-br', name: 'Portuguese (Brazil)', nativeName: 'Português (Brasil)' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'ko', name: 'Korean', nativeName: '한국어' },
  { code: 'zh', name: 'Chinese (Simplified)', nativeName: '简体中文' },
  { code: 'zh-tw', name: 'Chinese (Traditional)', nativeName: '繁體中文' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski' },
  { code: 'uk', name: 'Ukrainian', nativeName: 'Українська' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands' },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska' },
  { code: 'no', name: 'Norwegian', nativeName: 'Norsk' },
  { code: 'da', name: 'Danish', nativeName: 'Dansk' },
  { code: 'fi', name: 'Finnish', nativeName: 'Suomi' },
  { code: 'el', name: 'Greek', nativeName: 'Ελληνικά' },
  { code: 'cs', name: 'Czech', nativeName: 'Čeština' },
  { code: 'ro', name: 'Romanian', nativeName: 'Română' },
  { code: 'hu', name: 'Hungarian', nativeName: 'Magyar' },
  { code: 'th', name: 'Thai', nativeName: 'ไทย' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia' },
  { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu' },
  { code: 'tl', name: 'Filipino', nativeName: 'Filipino' },
  { code: 'he', name: 'Hebrew', nativeName: 'עברית' },
  { code: 'fa', name: 'Persian', nativeName: 'فارسی' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو' },
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili' },
  { code: 'af', name: 'Afrikaans', nativeName: 'Afrikaans' },
  { code: 'sq', name: 'Albanian', nativeName: 'Shqip' },
  { code: 'bg', name: 'Bulgarian', nativeName: 'Български' },
  { code: 'hr', name: 'Croatian', nativeName: 'Hrvatski' },
  { code: 'sr', name: 'Serbian', nativeName: 'Српски' },
  { code: 'sk', name: 'Slovak', nativeName: 'Slovenčina' },
  { code: 'sl', name: 'Slovenian', nativeName: 'Slovenščina' },
  { code: 'et', name: 'Estonian', nativeName: 'Eesti' },
  { code: 'lv', name: 'Latvian', nativeName: 'Latviešu' },
  { code: 'lt', name: 'Lithuanian', nativeName: 'Lietuvių' }
];

export function LanguagePage({ onBack }: LanguagePageProps) {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const handleSave = () => {
    console.log('Language changed to:', selectedLanguage);
    onBack();
  };

  return (
    <div className="relative z-10 min-h-screen flex flex-col" style={{ background: 'rgba(5, 15, 35, 0.9)' }}>
      {/* Header */}
      <div className="px-4 py-4 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-white/70 hover:text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-white text-2xl font-bold">Language & Region</h1>
        </div>
        {selectedLanguage !== 'en' && (
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-full font-bold text-white"
            style={{
              background: 'linear-gradient(135deg, #ff0099 0%, #dd00ff 50%, #00ffff 100%)'
            }}
          >
            Save
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="space-y-2">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => setSelectedLanguage(language.code)}
              className={`w-full px-4 py-4 rounded-xl flex items-center justify-between transition-colors ${
                selectedLanguage === language.code
                  ? 'bg-purple-500/20 border-2 border-purple-400/50'
                  : 'bg-white/5 border-2 border-transparent hover:bg-white/10'
              }`}
            >
              <div className="text-left">
                <p className="text-white font-bold">{language.name}</p>
                <p className="text-white/60 text-sm">{language.nativeName}</p>
              </div>
              {selectedLanguage === language.code && (
                <Check className="w-6 h-6 text-purple-400" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}