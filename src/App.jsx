import { useState, useEffect } from "react";

const subjects = [
  "Bahasa Melayu",
  "English",
  "Mathematics",
  "Science",
  "Chinese",
];

// Full question bank (20 per subject, mixed difficulty)
const questionBank = {
  Mathematics: [
    { q: "12 + 8 = ?", a: "20", level: "easy" },
    { q: "15 - 6 = ?", a: "9", level: "easy" },
    { q: "6 x 7 = ?", a: "42", level: "easy" },
    { q: "9 x 3 = ?", a: "27", level: "easy" },
    { q: "20 ÷ 4 = ?", a: "5", level: "easy" },
    { q: "14 + 9 = ?", a: "23", level: "easy" },
    { q: "30 - 11 = ?", a: "19", level: "medium" },
    { q: "8 x 8 = ?", a: "64", level: "easy" },
    { q: "56 ÷ 7 = ?", a: "8", level: "easy" },
    { q: "13 + 17 = ?", a: "30", level: "easy" },
    { q: "25 - 9 = ?", a: "16", level: "easy" },
    { q: "7 x 6 = ?", a: "42", level: "medium" },
    { q: "81 ÷ 9 = ?", a: "9", level: "easy" },
    { q: "18 + 7 = ?", a: "25", level: "easy" },
    { q: "45 - 18 = ?", a: "27", level: "medium" },
    { q: "9 x 12 = ?", a: "108", level: "medium" },
    { q: "100 - 37 = ?", a: "63", level: "medium" },
    { q: "6 x 9 = ?", a: "54", level: "easy" },
    { q: "72 ÷ 8 = ?", a: "9", level: "easy" },
    { q: "11 x 11 = ?", a: "121", level: "medium" },
  ],

  English: [
    { q: "Opposite of big?", a: "small", level: "easy" },
    { q: "Opposite of hot?", a: "cold", level: "easy" },
    { q: "She ___ to school.", a: "goes", level: "easy" },
    { q: "They ___ playing football.", a: "are playing", level: "medium" },
    { q: "Plural of cat?", a: "cats", level: "easy" },
    { q: "Synonym of happy?", a: "glad", level: "easy" },
    { q: "Past tense of go?", a: "went", level: "easy" },
    { q: "Opposite of fast?", a: "slow", level: "easy" },
    { q: "I ___ a book.", a: "have", level: "easy" },
    { q: "He ___ a car.", a: "has", level: "easy" },
    { q: "Plural of mouse?", a: "mice", level: "medium" },
    { q: "Synonym of sad?", a: "unhappy", level: "easy" },
    { q: "Opposite of up?", a: "down", level: "easy" },
    { q: "We ___ students.", a: "are", level: "easy" },
    { q: "Spelling: colour", a: "colour", level: "easy" },
    { q: "Plural of box?", a: "boxes", level: "easy" },
    { q: "Opposite of old?", a: "young", level: "easy" },
    { q: "It ___ raining.", a: "is", level: "easy" },
    { q: "Synonym of big?", a: "large", level: "easy" },
    { q: "Past tense of eat?", a: "ate", level: "medium" },
  ],

  "Bahasa Melayu": [
    { q: "Sinonim bagi 'cantik'", a: "indah", level: "easy" },
    { q: "Lawan bagi 'besar'", a: "kecil", level: "easy" },
    { q: "Sinonim bagi 'cepat'", a: "laju", level: "easy" },
    { q: "Lawan bagi 'panas'", a: "sejuk", level: "easy" },
    { q: "Sinonim bagi 'pintar'", a: "bijak", level: "easy" },
    { q: "Lawan bagi 'tinggi'", a: "rendah", level: "easy" },
    { q: "Saya ___ makan", a: "sedang", level: "medium" },
    { q: "Sinonim bagi 'rumah'", a: "kediaman", level: "medium" },
    { q: "Lawan bagi 'kuat'", a: "lemah", level: "easy" },
    { q: "Sinonim bagi 'baik'", a: "bagus", level: "easy" },
    { q: "Lawan bagi 'kaya'", a: "miskin", level: "easy" },
    { q: "Dia ___ pergi", a: "telah", level: "medium" },
    { q: "Sinonim bagi 'murid'", a: "pelajar", level: "easy" },
    { q: "Lawan bagi 'lama'", a: "baru", level: "easy" },
    { q: "Sinonim bagi 'bersih'", a: "suci", level: "medium" },
    { q: "Lawan bagi 'gelap'", a: "cerah", level: "easy" },
    { q: "Sinonim bagi 'makan'", a: "menjamu", level: "medium" },
    { q: "Lawan bagi 'dekat'", a: "jauh", level: "easy" },
    { q: "Sinonim bagi 'kawan'", a: "rakan", level: "easy" },
    { q: "Lawan bagi 'cepat'", a: "perlahan", level: "easy" },
  ],

  Science: [
    { q: "Water changing to gas is called?", a: "evaporation", level: "easy" },
    { q: "States of matter?", a: "solid liquid gas", level: "easy" },
    { q: "Plants need ___", a: "sunlight", level: "easy" },
    { q: "Humans breathe ___", a: "oxygen", level: "easy" },
    { q: "Sun is a ___", a: "star", level: "easy" },
    { q: "Water freezes at 0°C", a: "true", level: "medium" },
    { q: "Rain comes from ___", a: "clouds", level: "easy" },
    { q: "We use ___ to see", a: "light", level: "easy" },
    { q: "Force unit", a: "newton", level: "medium" },
    { q: "Magnet attracts ___", a: "iron", level: "easy" },
    { q: "Heart pumps ___", a: "blood", level: "easy" },
    { q: "Earth orbits ___", a: "sun", level: "easy" },
    { q: "Sound travels through ___", a: "air", level: "easy" },
    { q: "Plants make food by ___", a: "photosynthesis", level: "medium" },
    { q: "Largest planet", a: "jupiter", level: "medium" },
    { q: "Friction slows ___", a: "movement", level: "medium" },
    { q: "Electricity flows in ___", a: "circuit", level: "medium" },
    { q: "Animals eating plants", a: "herbivores", level: "easy" },
    { q: "Moon orbits ___", a: "earth", level: "easy" },
    { q: "Water cycle involves ___", a: "evaporation condensation precipitation", level: "medium" },
  ],

  Chinese: [
    { q: "苹果是什么意思", a: "apple", level: "easy" },
    { q: "你 = ?", a: "you", level: "easy" },
    { q: "我 = ?", a: "I", level: "easy" },
    { q: "水 = ?", a: "water", level: "easy" },
    { q: "火 = ?", a: "fire", level: "easy" },
    { q: "山 = ?", a: "mountain", level: "easy" },
    { q: "日 = ?", a: "sun", level: "easy" },
    { q: "月 = ?", a: "moon", level: "easy" },
    { q: "书 = ?", a: "book", level: "easy" },
    { q: "学校 = ?", a: "school", level: "easy" },
    { q: "老师 = ?", a: "teacher", level: "easy" },
    { q: "学生 = ?", a: "student", level: "easy" },
    { q: "大 = ?", a: "big", level: "easy" },
    { q: "小 = ?", a: "small", level: "easy" },
    { q: "好 = ?", a: "good", level: "easy" },
    { q: "吃 = ?", a: "eat", level: "medium" },
    { q: "喝 = ?", a: "drink", level: "medium" },
    { q: "爱 = ?", a: "love", level: "medium" },
    { q: "家 = ?", a: "home", level: "easy" },
    { q: "朋友 = ?", a: "friend", level: "easy" },
  ],
};

function getDailyQuestions() {
  const todayKey = new Date().toDateString();
  const saved = localStorage.getItem("dailyQuestions");

  if (saved) {
    const parsed = JSON.parse(saved);
    if (parsed.date === todayKey) return parsed.data;
  }

  const data = {};
  subjects.forEach((sub) => {
    const list = questionBank[sub];
    data[sub] = list.sort(() => 0.5 - Math.random()).slice(0, 5);
  });

  localStorage.setItem("dailyQuestions", JSON.stringify({ date: todayKey, data }));
  return data;
}

export default function Dashboard() {
  const [dailyQuestions, setDailyQuestions] = useState({});
  const [subject, setSubject] = useState(null);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");

  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [streak, setStreak] = useState(0);

  const [revision, setRevision] = useState([]);
  const [badge, setBadge] = useState("Starter");

  useEffect(() => {
    setDailyQuestions(getDailyQuestions());
  }, []);

  const q = subject ? dailyQuestions[subject]?.[index] : null;

  const submit = () => {
    if (!q) return;

    const correct = answer.toLowerCase() === q.a.toLowerCase();

    if (correct) {
      setScore((s) => s + 10);
      setCoins((c) => c + 5);
      setStreak((s) => s + 1);
    } else {
      setStreak(0);
      setRevision((r) => [...r, q]);
    }

    setAnswer("");

    const next = index + 1;
    if (next < dailyQuestions[subject].length) setIndex(next);
    else setSubject(null);
  };

  useEffect(() => {
    if (score > 300) setBadge("🏆 Gold Master");
    else if (score > 150) setBadge("🥈 Silver Learner");
    else if (score > 50) setBadge("🥉 Bronze Explorer");
  }, [score]);

  return (
    <div className="min-h-screen bg-[#f0f7ff] p-4">

      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold text-green-600">🌟 SJKC Learning App</h1>
        <p className="text-gray-600">Learn • Play • Improve</p>
      </div>

      {/* Top Stats (Duolingo style) */}
      <div className="flex justify-around mb-4">
        <div className="bg-white p-2 rounded-xl shadow">⭐ {score}</div>
        <div className="bg-white p-2 rounded-xl shadow">🪙 {coins}</div>
        <div className="bg-white p-2 rounded-xl shadow">🔥 {streak}</div>
      </div>

      <div className="text-center mb-3">
        <span className="bg-yellow-300 px-3 py-1 rounded-full font-semibold">
          {badge}
        </span>
      </div>

      {/* Subject Pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {subjects.map((s) => (
          <button
            key={s}
            onClick={() => {
              setSubject(s);
              setIndex(0);
            }}
            className="bg-green-500 text-white px-4 py-2 rounded-full shadow"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Question Card */}
      {q && (
        <div className="bg-white rounded-2xl shadow p-4 mb-4">
          <h2 className="font-bold text-green-600">{subject}</h2>
          <p className="my-2 text-lg">{q.q}</p>

          <input
            className="border w-full p-2 rounded"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type answer..."
          />

          <button
            onClick={submit}
            className="w-full mt-3 bg-green-500 text-white p-2 rounded-xl"
          >
            Submit
          </button>
        </div>
      )}

      {/* Revision */}
      <div className="bg-white p-3 rounded-xl shadow">
        <p>📝 Wrong Answers: {revision.length}</p>
      </div>

    </div>
  );
}
