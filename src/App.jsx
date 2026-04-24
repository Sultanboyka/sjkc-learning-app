import { useEffect, useState } from "react";

const subjects = ["Bahasa Melayu", "English", "Mathematics", "Science", "Chinese"];

const questionBank = {
  Mathematics: [
    { q: "12 + 8 = ?", a: "20" },
    { q: "15 - 6 = ?", a: "9" },
    { q: "6 x 7 = ?", a: "42" },
    { q: "20 ÷ 4 = ?", a: "5" },
  ],
  English: [
    { q: "Opposite of big?", a: "small" },
    { q: "Past tense of go?", a: "went" },
    { q: "Plural of cat?", a: "cats" },
    { q: "Opposite of hot?", a: "cold" },
  ],
  "Bahasa Melayu": [
    { q: "Lawan bagi besar?", a: "kecil" },
    { q: "Sinonim cantik?", a: "indah" },
    { q: "Lawan panas?", a: "sejuk" },
    { q: "Saya ___ makan", a: "sedang" },
  ],
  Science: [
    { q: "Water boils at ___°C", a: "100" },
    { q: "We breathe ___", a: "oxygen" },
    { q: "Sun is a ___", a: "star" },
    { q: "Plants need ___", a: "sunlight" },
  ],
  Chinese: [
    { q: "水 = ?", a: "water" },
    { q: "火 = ?", a: "fire" },
    { q: "大 = ?", a: "big" },
    { q: "小 = ?", a: "small" },
  ],
};

function XPBar({ xp }) {
  return (
    <div className="w-full bg-white/20 h-3 rounded-full overflow-hidden backdrop-blur">
      <div
        className="h-3 bg-gradient-to-r from-green-400 to-emerald-600 transition-all duration-500 shadow-lg"
        style={{ width: `${xp % 100}%` }}
      />
    </div>
  );
}

function FloatingBlob() {
  return (
    <div className="absolute w-72 h-72 bg-green-300/30 rounded-full blur-3xl animate-pulse top-10 left-10" />
  );
}

function LevelNode({ label, onClick }) {
  return (
    <div
      onClick={onClick}
      className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 text-white flex items-center justify-center font-bold shadow-xl cursor-pointer hover:scale-110 hover:rotate-3 transition-all duration-300"
    >
      {label}
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("home");
  const [subject, setSubject] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");

  const [xp, setXp] = useState(() => Number(localStorage.getItem("xp") || 0));
  const [coins, setCoins] = useState(() => Number(localStorage.getItem("coins") || 0));
  const [hearts, setHearts] = useState(() => Number(localStorage.getItem("hearts") || 5));

  const [shake, setShake] = useState(false);
  const [shop, setShop] = useState(false);

  const current = questions[index];

  useEffect(() => {
    localStorage.setItem("xp", xp);
    localStorage.setItem("coins", coins);
    localStorage.setItem("hearts", hearts);
  }, [xp, coins, hearts]);

  const startLevel = (sub) => {
    const shuffled = [...questionBank[sub]].sort(() => Math.random() - 0.5);
    setSubject(sub);
    setQuestions(shuffled);
    setIndex(0);
    setScreen("play");
  };

  const check = () => {
    if (!current) return;

    const correct = answer.trim().toLowerCase() === current.a.toLowerCase();

    if (correct) {
      setXp((x) => x + 10);
      setCoins((c) => c + 5);
    } else {
      setHearts((h) => Math.max(0, h - 1));
      setShake(true);
      setTimeout(() => setShake(false), 300);
    }

    setAnswer("");

    if (index + 1 < questions.length) setIndex(index + 1);
    else setScreen("home");
  };

  const buyHeart = () => {
    if (coins >= 20) {
      setCoins((c) => c - 20);
      setHearts((h) => h + 1);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50">

      <FloatingBlob />
      <FloatingBlob />

      {/* SIDEBAR */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white/70 backdrop-blur-xl shadow-xl p-4 flex flex-col gap-4">
        <h1 className="text-2xl font-extrabold text-green-600">🌿 SJKC Quest</h1>

        <XPBar xp={xp} />

        <div className="text-sm mt-2 font-semibold">❤️ Hearts: {hearts}</div>
        <div className="text-sm font-semibold">🪙 Coins: {coins}</div>

        <button
          onClick={() => setShop(true)}
          className="mt-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white p-2 rounded-xl shadow-lg hover:scale-105 transition"
        >
          🛒 Shop
        </button>

        <p className="text-xs text-gray-500 mt-auto">
          Learn like a game 🎮
        </p>
      </div>

      {/* MAIN */}
      <div className="ml-64 p-8">

        {/* HOME */}
        {screen === "home" && (
          <div>
            <h2 className="text-3xl font-bold text-green-700 mb-6">
              Choose Your Adventure ✨
            </h2>

            <div className="grid grid-cols-3 gap-10">
              {subjects.map((s) => (
                <div key={s} className="flex flex-col items-center gap-3">
                  <LevelNode label={s[0]} onClick={() => startLevel(s)} />
                  <p className="text-sm font-semibold text-gray-600">{s}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PLAY */}
        {screen === "play" && current && (
          <div
            className={`max-w-xl bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-white ${shake ? "animate-pulse" : ""}`}
          >
            <h3 className="text-green-600 font-bold mb-2">{subject}</h3>
            <p className="text-2xl font-semibold mb-4">{current.q}</p>

            <input
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="border w-full p-3 rounded-xl mb-3 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Type your answer..."
            />

            <button
              onClick={check}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white p-3 rounded-xl font-bold hover:scale-105 transition"
            >
              Check Answer
            </button>
          </div>
        )}

        {/* SHOP */}
        {shop && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white p-6 rounded-2xl w-80 shadow-2xl">
              <h2 className="font-bold text-lg mb-3">🛒 Shop</h2>

              <button
                onClick={buyHeart}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-xl"
              >
                ❤️ Buy Heart (20 coins)
              </button>

              <button
                onClick={() => setShop(false)}
                className="w-full mt-3 text-gray-500"
              >
                Close
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
