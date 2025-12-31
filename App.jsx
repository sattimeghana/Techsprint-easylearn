import React, { useState } from "react";
import {
  Database,
  Layers,
  List as ListIcon,
  GitBranch,
  Award,
  Home,
} from "lucide-react";

/* ===== IMPORT LOCAL IMAGES ===== */
import frontImg from "./assets/front.png";
import arrayImg from "./assets/array.png";
import stackImg from "./assets/stack.png";
import queueImg from "./assets/queue.png";
import bubbleImg from "./assets/bubble.png";

/* ===== DATA ===== */

const TOPICS = [
  {
    id: "arrays",
    title: "Arrays",
    icon: <Database />,
    image: arrayImg,
    concept:
      "An array is a linear data structure where elements are stored in contiguous memory locations. It allows O(1) access using index.",
    visualizer: "array",
    quiz: [
      {
        question: "Time complexity to access array element?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
        answer: 0,
      },
    ],
  },
  {
    id: "stacks",
    title: "Stacks",
    icon: <Layers />,
    image: stackImg,
    concept:
      "Stack follows LIFO (Last In First Out). Main operations are Push and Pop.",
    visualizer: "stack",
    quiz: [
      {
        question: "Which operation removes element from stack?",
        options: ["Push", "Pop", "Peek", "Insert"],
        answer: 1,
      },
    ],
  },
  {
    id: "queues",
    title: "Queues",
    icon: <ListIcon />,
    image: queueImg,
    concept:
      "Queue follows FIFO (First In First Out). Enqueue inserts, Dequeue removes.",
    visualizer: "queue",
    quiz: [
      {
        question: "Queue deletion operation is called?",
        options: ["Push", "Pop", "Dequeue", "Peek"],
        answer: 2,
      },
    ],
  },
  {
    id: "bubble",
    title: "Bubble Sort",
    icon: <GitBranch />,
    image: bubbleImg,
    concept:
      "Bubble Sort repeatedly swaps adjacent elements if they are in the wrong order.",
    visualizer: "bubble",
    quiz: [
      {
        question: "Worst case complexity of Bubble Sort?",
        options: ["O(n)", "O(n log n)", "O(n²)", "O(1)"],
        answer: 2,
      },
    ],
  },
];

const BADGES = [
  { id: 1, name: "Beginner", points: 1 },
  { id: 2, name: "Learner", points: 3 },
  { id: 3, name: "DSA Star", points: 5 },
];

/* ===== VISUALIZERS ===== */

function StackVisualizer() {
  const [stack, setStack] = useState([]);

  return (
    <div>
      <button
        onClick={() => setStack([...stack, Math.floor(Math.random() * 100)])}
        className="bg-indigo-600 text-white px-3 py-1 rounded mr-2"
      >
        Push
      </button>
      <button
        onClick={() => setStack(stack.slice(0, -1))}
        className="bg-red-500 text-white px-3 py-1 rounded"
      >
        Pop
      </button>

      <div className="mt-3 border p-3">
        {stack.map((v, i) => (
          <div key={i} className="bg-indigo-400 text-white p-1 mb-1 rounded">
            {v}
          </div>
        ))}
      </div>
    </div>
  );
}

function QueueVisualizer() {
  const [queue, setQueue] = useState([]);

  return (
    <div>
      <button
        onClick={() => setQueue([...queue, Math.floor(Math.random() * 100)])}
        className="bg-emerald-600 text-white px-3 py-1 rounded mr-2"
      >
        Enqueue
      </button>
      <button
        onClick={() => setQueue(queue.slice(1))}
        className="bg-red-500 text-white px-3 py-1 rounded"
      >
        Dequeue
      </button>

      <div className="mt-3 flex gap-2 border p-3">
        {queue.map((v, i) => (
          <div key={i} className="bg-emerald-400 text-white p-2 rounded">
            {v}
          </div>
        ))}
      </div>
    </div>
  );
}

function ArrayVisualizer() {
  return (
    <div className="flex gap-2">
      {[10, 20, 30, 40].map((v, i) => (
        <div key={i} className="border p-4 rounded font-bold">
          {v}
        </div>
      ))}
    </div>
  );
}

function BubbleSortVisualizer() {
  return <p>Bubble sort swaps adjacent elements repeatedly.</p>;
}

/* ===== PROGRESS HELPERS ===== */

const today = new Date().toDateString();

const getProgress = () =>
  JSON.parse(localStorage.getItem("progress")) || {};

const saveProgress = (data) =>
  localStorage.setItem("progress", JSON.stringify(data));

/* ===== MAIN APP ===== */

function App() {
  const [page, setPage] = useState("dashboard");
  const [topic, setTopic] = useState(null);
  const [tab, setTab] = useState("concept");
  const [score, setScore] = useState(0);

  const [progress, setProgress] = useState(getProgress());
  const [streak, setStreak] = useState(
    Number(localStorage.getItem("streak")) || 0
  );
  const [lastDay, setLastDay] = useState(
    localStorage.getItem("lastDay")
  );

  function updateProgress() {
    const newProgress = { ...progress };
    newProgress[today] = (newProgress[today] || 0) + 1;

    if (lastDay === today) {
      // same day
    } else if (
      lastDay === new Date(Date.now() - 86400000).toDateString()
    ) {
      setStreak(streak + 1);
      localStorage.setItem("streak", streak + 1);
    } else {
      setStreak(1);
      localStorage.setItem("streak", 1);
    }

    setLastDay(today);
    localStorage.setItem("lastDay", today);

    setProgress(newProgress);
    saveProgress(newProgress);
  }

  function renderVisualizer() {
    if (topic.visualizer === "stack") return <StackVisualizer />;
    if (topic.visualizer === "queue") return <QueueVisualizer />;
    if (topic.visualizer === "array") return <ArrayVisualizer />;
    return <BubbleSortVisualizer />;
  }

  /* ---- DASHBOARD ---- */
  if (page === "dashboard") {
    return (
      <div className="p-6">
        <img
          src={frontImg}
          alt="DSA Learning"
          className="w-full max-w-2xl mx-auto mb-6 rounded shadow"
        />

        <h1 className="text-3xl font-bold text-center mb-2">
          DSA Learning Dashboard
        </h1>

        <p className="text-center mb-4">
          🔥 <b>{streak}</b> Day Streak
        </p>

        <div className="bg-white p-4 rounded shadow mb-6">
          <h3 className="font-bold mb-2">Progress Graph</h3>
          <div className="flex gap-2 items-end h-32">
            {Object.entries(progress).map(([day, val]) => (
              <div key={day} className="flex flex-col items-center">
                <div
                  className="bg-indigo-500 w-6 rounded"
                  style={{ height: `${val * 20}px` }}
                ></div>
                <span className="text-xs mt-1">✓</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-4 shadow rounded">
            <Home /> Topics: {TOPICS.length}
          </div>
          <div className="bg-white p-4 shadow rounded">
            <Award /> Score: {score}
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => setPage("learn")}
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            Learn
          </button>
          <button
            onClick={() => setPage("practice")}
            className="bg-emerald-600 text-white px-4 py-2 rounded"
          >
            Practice
          </button>
          <button
            onClick={() => setPage("badges")}
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            Badges
          </button>
        </div>
      </div>
    );
  }

  /* ---- BADGES ---- */
  if (page === "badges") {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Your Badges</h2>

        {BADGES.map(
          (b) =>
            score >= b.points && (
              <div key={b.id} className="bg-yellow-100 p-3 mb-2 rounded">
                🏆 {b.name}
              </div>
            )
        )}

        <button
          onClick={() => setPage("dashboard")}
          className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Back
        </button>
      </div>
    );
  }

  /* ---- PRACTICE ---- */
  if (page === "practice") {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Practice MCQs</h2>

        {TOPICS.flatMap((t) => t.quiz).map((q, i) => (
          <div key={i} className="mb-3 bg-white p-3 rounded shadow">
            <p className="font-bold">{q.question}</p>
            {q.options.map((o, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (idx === q.answer) {
                    setScore(score + 1);
                    updateProgress();
                  }
                }}
                className="block border p-2 w-full mt-1 rounded"
              >
                {o}
              </button>
            ))}
          </div>
        ))}

        <button
          onClick={() => setPage("dashboard")}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Back
        </button>
      </div>
    );
  }

  /* ---- LEARN ---- */
  if (page === "learn" && !topic) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Learn DSA</h2>

        {TOPICS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTopic(t)}
            className="block bg-white p-4 rounded shadow mb-2 w-full text-left"
          >
            {t.icon} {t.title}
          </button>
        ))}

        <button
          onClick={() => setPage("dashboard")}
          className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Back
        </button>
      </div>
    );
  }

  /* ---- TOPIC PAGE ---- */
  return (
    <div className="p-6">
      <button onClick={() => setTopic(null)} className="text-indigo-600 mb-2">
        ← Back
      </button>

      <h2 className="text-xl font-bold mb-2">{topic.title}</h2>

      <img
        src={topic.image}
        alt={topic.title}
        className="max-w-md mb-4 rounded shadow"
      />

      <div className="flex gap-2 mb-4">
        {["concept", "visual", "quiz"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-1 rounded ${
              tab === t ? "bg-indigo-600 text-white" : "bg-slate-200"
            }`}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      {tab === "concept" && <p>{topic.concept}</p>}
      {tab === "visual" && renderVisualizer()}
      {tab === "quiz" && (
        <p className="text-slate-600">Quiz available in Practice section</p>
      )}
    </div>
  );
}

export default App;