import { useEffect, useMemo, useState } from "react";

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

function saveState(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadState(key, fallback) {
  try {
    const v = JSON.parse(localStorage.getItem(key));
    return v ?? fallback;
  } catch {
    return fallback;
  }
}

function LevelPath({ subject, onSelect }) {
  const levels = [1, 2, 3, 4, 5];

  return (
    <div className="flex flex-col items-center gap-4">
      {levels.map((lvl, i) => (
        <div key={lvl} className="flex items-center gap-3">
          <div
            onClick={() => onSelect(subject, lvl)}
            className="w-14 h-14 rounded-full bg-green-500 text-white flex items-center justify-center font-bold shadow-lg hover:scale-110 transition cursor-pointer"
          >
            {lvl}
          </div>
          {i < levels.length - 1 && (
            <div className="w-1 h-10 bg-green-200 rounded" />
          )}
        </div>
      ))}
    </div>
  );
}

function XPBar({ xp }) {
  return (
    <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
      <div
        className="h-3 bg-green-500 transition-all duration-500"
        style={{ width: `${xp % 100}%` }}
      />
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("home");
  const [subject, setSubject] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");

  const [xp, setXp] = useState(() => loadState("xp", 0));
  const [coins, setCoins] = useState(() => loadState("coins", 0));
  const [hearts, setHearts] = useState(() => loadState("hearts", 5));
  const [badges, setBadges] = useState(() => loadState("badges", []));

  const [shake, setShake] = useState(false);
  const [shop, setShop] = useState(false);

  const current = questions[index];

  useEffect(() => {
    saveState("xp", xp);
    saveState("coins", coins);
    saveState("hearts", hearts);
    saveState("badges", badges);
  }, [xp, coins, hearts, badges]);

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

      if (xp > 0 && xp % 50 === 0) {
        setBadges((b) => [...b, `🏅 Level Master ${subject}`]);
      }
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
    <div className="min-h-screen bg-[#f2f3f5] flex">

      {/* SIDEBAR */}
      <div className="w-60 bg-white shadow-xl p-4 flex flex-col gap-4">
        <h1 className="text-green-600 font-bold text-xl">SJKC Quest 🌱</h1>

        <XPBar xp={xp} />

        <div className="text-sm">❤️ Hearts: {hearts}</div>
        <div className="text-sm">🪙 Coins: {coins}</div>

        <button
          onClick={() => setShop(true)}
          className="bg-green-500 text-white p-2 rounded-xl"
        >
          Shop 🛒
        </button>

        <div className="mt-4">
          <h3 className="font-bold text-sm mb-2">Badges</h3>
          <div className="text-xs space-y-1">
            {badges.map((b, i) => (
              <div key={i}>🏆 {b}</div>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-6">

        {screen === "home" && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-green-600">
              Choose Your Learning Path
            </h2>

            <div className="grid grid-cols-3 gap-10">
              {subjects.map((s) => (
                <div key={s} className="flex flex-col items-center">
                  <h3 className="font-bold mb-2">{s}</h3>
                  <LevelPath subject={s} onSelect={startLevel} />
                </div>
              ))}
            </div>
          </div>
        )}

        {screen === "play" && current && (
          <div className={`bg-white p-6 rounded-2xl shadow-xl max-w-xl ${shake ? "animate-pulse" : ""}`}>
            <h3 className="text-green-600 font-bold mb-2">{subject}</h3>
            <p className="text-xl mb-4">{current.q}</p>

            <input
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="border p-3 w-full rounded-xl mb-3"
              placeholder="Type answer..."
            />

            <button
              onClick={check}
              className="bg-green-500 hover:bg-green-600 text-white w-full p-3 rounded-xl"
            >
              Check Answer
            </button>
          </div>
        )}

        {/* SHOP */}
        {shop && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white p-6 rounded-2xl w-80">
              <h2 className="font-bold mb-3">Shop 🛒</h2>

              <button
                onClick={buyHeart}
                className="w-full bg-blue-500 text-white p-2 rounded-xl"
              >
                Buy Heart (20 coins)
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
