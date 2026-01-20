"use client";

import { useState } from "react";

type PersonalityType =
  | "Bold Adventurer"
  | "Cozy Classic"
  | "Sweet Enthusiast"
  | "Zen Minimalist"
  | "Social Butterfly"
  | "Night Owl";

interface PersonalityInfo {
  coffee: string;
  tagline: string;
  emoji: string;
}

interface Answer {
  text: string;
  icon: string;
  personality: PersonalityType;
}

interface Question {
  question: string;
  answers: Answer[];
}

const personalities: Record<PersonalityType, PersonalityInfo> = {
  "Bold Adventurer": {
    coffee: "Double Espresso",
    tagline: "You live for intensity",
    emoji: "⚡",
  },
  "Cozy Classic": {
    coffee: "Medium Roast Drip",
    tagline: "Comfort in every cup",
    emoji: "🏠",
  },
  "Sweet Enthusiast": {
    coffee: "Caramel Latte",
    tagline: "Life's too short for bitter",
    emoji: "🍬",
  },
  "Zen Minimalist": {
    coffee: "Black Coffee, Single Origin",
    tagline: "Simple. Clean. Perfect.",
    emoji: "🧘",
  },
  "Social Butterfly": {
    coffee: "Cappuccino",
    tagline: "Coffee is better with company",
    emoji: "🦋",
  },
  "Night Owl": {
    coffee: "Red Eye (coffee + espresso shot)",
    tagline: "Sleep is optional",
    emoji: "🦉",
  },
};

const questions: Question[] = [
  {
    question: "What's your ideal weekend morning?",
    answers: [
      { text: "Up at dawn for an adventure", icon: "🌅", personality: "Bold Adventurer" },
      { text: "Slow start, cozy pajamas", icon: "🛋️", personality: "Cozy Classic" },
      { text: "Brunch with something sweet", icon: "🧁", personality: "Sweet Enthusiast" },
      { text: "Quiet meditation, no rush", icon: "🧘", personality: "Zen Minimalist" },
      { text: "Catching up with friends", icon: "👯", personality: "Social Butterfly" },
      { text: "Still awake from last night", icon: "🌙", personality: "Night Owl" },
    ],
  },
  {
    question: "Pick a vacation style:",
    answers: [
      { text: "Backpacking through mountains", icon: "🏔️", personality: "Bold Adventurer" },
      { text: "Cabin in the woods", icon: "🏡", personality: "Cozy Classic" },
      { text: "All-inclusive resort", icon: "🏖️", personality: "Sweet Enthusiast" },
      { text: "Solo retreat in Japan", icon: "🏯", personality: "Zen Minimalist" },
      { text: "Group trip with friends", icon: "🎉", personality: "Social Butterfly" },
      { text: "City that never sleeps", icon: "🌃", personality: "Night Owl" },
    ],
  },
  {
    question: "It's Friday night. You're most likely:",
    answers: [
      { text: "At a concert or event", icon: "🎸", personality: "Bold Adventurer" },
      { text: "Movie night at home", icon: "📺", personality: "Cozy Classic" },
      { text: "Trying a new dessert spot", icon: "🍰", personality: "Sweet Enthusiast" },
      { text: "Reading or journaling", icon: "📖", personality: "Zen Minimalist" },
      { text: "Dinner party with friends", icon: "🍻", personality: "Social Butterfly" },
      { text: "Deep into a project at 2am", icon: "💻", personality: "Night Owl" },
    ],
  },
  {
    question: "Your ideal workspace is:",
    answers: [
      { text: "Busy café with energy", icon: "☕", personality: "Bold Adventurer" },
      { text: "Home office with a blanket", icon: "🏠", personality: "Cozy Classic" },
      { text: "Bakery with treats nearby", icon: "🍩", personality: "Sweet Enthusiast" },
      { text: "Minimal desk, no clutter", icon: "🪴", personality: "Zen Minimalist" },
      { text: "Co-working with people around", icon: "🏢", personality: "Social Butterfly" },
      { text: "Anywhere, as long as it's late", icon: "🌙", personality: "Night Owl" },
    ],
  },
  {
    question: "Pick a comfort food:",
    answers: [
      { text: "Spicy ramen challenge", icon: "🌶️", personality: "Bold Adventurer" },
      { text: "Homemade mac and cheese", icon: "🥧", personality: "Cozy Classic" },
      { text: "Ice cream sundae", icon: "🍦", personality: "Sweet Enthusiast" },
      { text: "Simple, fresh salad", icon: "🥗", personality: "Zen Minimalist" },
      { text: "Pizza to share", icon: "🍕", personality: "Social Butterfly" },
      { text: "3am instant noodles", icon: "🍜", personality: "Night Owl" },
    ],
  },
  {
    question: "What's your phone battery usually at?",
    answers: [
      { text: "5% - living on the edge", icon: "📱", personality: "Bold Adventurer" },
      { text: "Always charged, just in case", icon: "🔋", personality: "Cozy Classic" },
      { text: "Cute portable charger, of course", icon: "🎀", personality: "Sweet Enthusiast" },
      { text: "Don't check it much anyway", icon: "🔌", personality: "Zen Minimalist" },
      { text: "Low from all the group chats", icon: "📞", personality: "Social Butterfly" },
      { text: "Dead by noon, alive by midnight", icon: "🌙", personality: "Night Owl" },
    ],
  },
];

type Screen = "welcome" | "quiz" | "results";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<PersonalityType[]>([]);

  const handleStart = () => {
    setScreen("quiz");
    setCurrentQuestion(0);
    setAnswers([]);
  };

  const handleAnswer = (personality: PersonalityType) => {
    const newAnswers = [...answers, personality];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setScreen("results");
    }
  };

  const handleRestart = () => {
    setScreen("welcome");
    setCurrentQuestion(0);
    setAnswers([]);
  };

  const calculateResults = () => {
    const counts: Record<PersonalityType, number> = {
      "Bold Adventurer": 0,
      "Cozy Classic": 0,
      "Sweet Enthusiast": 0,
      "Zen Minimalist": 0,
      "Social Butterfly": 0,
      "Night Owl": 0,
    };

    answers.forEach((answer) => {
      counts[answer]++;
    });

    const total = answers.length;
    const results = Object.entries(counts)
      .map(([personality, count]) => ({
        personality: personality as PersonalityType,
        percentage: Math.round((count / total) * 100),
        count,
      }))
      .sort((a, b) => b.percentage - a.percentage);

    return results;
  };

  // Welcome Screen
  if (screen === "welcome") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="quiz-card text-center">
          <div className="text-6xl mb-6">☕</div>
          <h1 className="quiz-title text-4xl font-bold mb-4">
            Coffee Personality Quiz
          </h1>
          <p className="text-lg mb-8 opacity-80">
            Discover your perfect coffee match based on your lifestyle and preferences
          </p>
          <button onClick={handleStart} className="start-btn">
            Find Your Coffee ☕
          </button>
        </div>
      </div>
    );
  }

  // Quiz Screen
  if (screen === "quiz") {
    const question = questions[currentQuestion];

    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="quiz-card">
          {/* Progress Dots */}
          <div className="progress-dots mb-6">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`progress-dot ${
                  index === currentQuestion
                    ? "active"
                    : index < currentQuestion
                    ? "completed"
                    : ""
                }`}
              />
            ))}
          </div>

          {/* Question Number */}
          <p className="text-sm opacity-60 mb-2">
            Question {currentQuestion + 1} of {questions.length}
          </p>

          {/* Question */}
          <h2 className="quiz-title text-2xl font-bold mb-6">
            {question.question}
          </h2>

          {/* Answer Options */}
          <div className="flex flex-col gap-3">
            {question.answers.map((answer, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(answer.personality)}
                className="answer-btn flex items-center gap-3"
              >
                <span className="text-2xl">{answer.icon}</span>
                <span>{answer.text}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Results Screen
  const results = calculateResults();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="quiz-card">
        <div className="text-center mb-6">
          <div className="text-5xl mb-4">☕</div>
          <h2 className="quiz-title text-3xl font-bold mb-2">
            Your Coffee Personality
          </h2>
          <p className="opacity-70">Here&apos;s your complete breakdown</p>
        </div>

        {/* Results List */}
        <div className="space-y-4">
          {results.map((result, index) => {
            const info = personalities[result.personality];
            const isTop = index === 0;

            return (
              <div
                key={result.personality}
                className={`result-card ${isTop ? "ring-2 ring-[#8D6E63]" : ""}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{info.emoji}</span>
                    <div>
                      <h3 className={`font-bold ${isTop ? "text-lg" : ""}`}>
                        {result.personality}
                        {isTop && (
                          <span className="ml-2 text-xs bg-[#5D4037] text-white px-2 py-0.5 rounded-full">
                            Top Match
                          </span>
                        )}
                      </h3>
                      <p className="text-sm opacity-70">{info.tagline}</p>
                    </div>
                  </div>
                  <span className="font-bold text-lg">{result.percentage}%</span>
                </div>

                {/* Percentage Bar */}
                <div className="percentage-bar">
                  <div
                    className="percentage-fill"
                    style={{ width: `${result.percentage}%` }}
                  />
                </div>

                {/* Coffee Recommendation */}
                <p className="mt-2 text-sm">
                  <span className="opacity-60">Your drink:</span>{" "}
                  <span className="font-medium">{info.coffee}</span>
                </p>
              </div>
            );
          })}
        </div>

        {/* Restart Button */}
        <div className="text-center mt-8">
          <button onClick={handleRestart} className="start-btn">
            Take Quiz Again
          </button>
        </div>
      </div>
    </div>
  );
}
