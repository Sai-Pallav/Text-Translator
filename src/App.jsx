import { useState, useEffect } from "react";
import { PiArrowsLeftRightBold } from "react-icons/pi";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [lang, setLang] = useState("es");
  const [translated, setTranslated] = useState("");

  useEffect(() => {
    if (text.trim() === "") {
      setTranslated("");
      return;
    }
    const controller = new AbortController();
    async function translate() {
      try {
        const response = await fetch(
          "https://deep-translate1.p.rapidapi.com/language/translate/v2",
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
              "X-RapidAPI-Key":
                "4cb853a854msh2a6b8e75be374f9p1686e4jsnb99d8234e86f",
              "X-RapidAPI-Host": "deep-translate1.p.rapidapi.com",
            },
            body: JSON.stringify({
              q: text,
              source: "en",
              target: lang,
            }),
            signal: controller.signal,
          }
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "API request failed");
        }
        if (data?.data?.translations?.translatedText) {
          setTranslated(data.data.translations.translatedText);
        } else {
          setTranslated("Translation failed.");
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
        }
      }
    }
    const delayDebounce = setTimeout(() => {
      translate();
    }, 500);
    return () => {
      clearTimeout(delayDebounce);
      controller.abort();
    };
  }, [text, lang]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-semibold text-gray-900">Translator</h1>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-8">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="text-sm font-medium text-gray-700">English</div>
            <div className="text-gray-400">
              <PiArrowsLeftRightBold className="w-5 h-5" />
            </div>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="text-sm font-medium text-gray-700 bg-transparent border-none focus:outline-none cursor-pointer"
            >
                <option value="en">🇺🇸 English</option>
                <option value="hi">🇮🇳 Hindi</option>
                <option value="te">🇮🇳 Telugu</option>
                <option value="ta">🇮🇳 Tamil</option>
                <option value="ml">🇮🇳 Malayalam</option>
                <option value="kn">🇮🇳 Kannada</option>
                <option value="es">🇪🇸 Spanish</option>
                <option value="fr">🇫🇷 French</option>
                <option value="de">🇩🇪 German</option>
                <option value="zh">🇨🇳 Chinese</option>
                <option value="ar">🇸🇦 Arabic</option>
                <option value="ru">🇷🇺 Russian</option>
                <option value="ja">🇯🇵 Japanese</option>
                <option value="ko">🇰🇷 Korean</option>
                <option value="pt">🇵🇹 Portuguese</option>
                <option value="it">🇮🇹 Italian</option>
                <option value="bn">🇧🇩 Bengali</option>
                <option value="pa">🇮🇳 Punjabi</option>
                <option value="ur">🇵🇰 Urdu</option>
                <option value="vi">🇻🇳 Vietnamese</option>
                <option value="th">🇹🇭 Thai</option>
                <option value="tr">🇹🇷 Turkish</option>
                <option value="fa">🇮🇷 Persian</option>
                <option value="id">🇮🇩 Indonesian</option>
                <option value="nl">🇳🇱 Dutch</option>
                <option value="sv">🇸🇪 Swedish</option>
                <option value="no">🇳🇴 Norwegian</option>
                <option value="da">🇩🇰 Danish</option>
                <option value="fi">🇫🇮 Finnish</option>
                <option value="pl">🇵🇱 Polish</option>
                <option value="cs">🇨🇿 Czech</option>
                <option value="sk">🇸🇰 Slovak</option>
                <option value="hu">🇭🇺 Hungarian</option>
                <option value="ro">🇷🇴 Romanian</option>
                <option value="bg">🇧🇬 Bulgarian</option>
                <option value="hr">🇭🇷 Croatian</option>
                <option value="sr">🇷🇸 Serbian</option>
                <option value="sl">🇸🇮 Slovenian</option>
                <option value="et">🇪🇪 Estonian</option>
                <option value="lv">🇱🇻 Latvian</option>
                <option value="lt">🇱🇹 Lithuanian</option>
                <option value="uk">🇺🇦 Ukrainian</option>
                <option value="be">🇧🇾 Belarusian</option>
                <option value="el">🇬🇷 Greek</option>
                <option value="he">🇮🇱 Hebrew</option>
                <option value="sw">🇰🇪 Swahili</option>
                <option value="af">🇿🇦 Afrikaans</option>
              </select>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="border-b lg:border-b-0 lg:border-r border-gray-200">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text to translate..."
                className="w-full h-64 lg:h-80 p-4 resize-none border-none focus:outline-none text-gray-900 placeholder-gray-500"
              />
            </div>
            
            <div className="bg-gray-50">
              <div className="w-full h-64 lg:h-80 p-4 text-gray-900 overflow-y-auto">
                {translated || (
                  <div className="text-gray-500 italic">
                    Translation will appear here...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
