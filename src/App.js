import React, { useState } from 'react';
import './App.css';

const foodsForSaranWrap = [
  "Avocado",
  "Cut fruits (like melon, pineapple, or strawberries)",
  "Sandwiches",
  "Leftover pizza",
  "Soft cheeses (like brie or camembert)",
  "Pastries and baked goods",
  "Cooked pasta or rice",
  "Salads (like Caesar or Greek salad)",
  "Sushi rolls",
  "Dough or batter",
  "Fish fillets",
  "Cooked vegetables",
  "Jellies and puddings",
  "Deli meats",
  "Sliced bread",
  "Uncooked meat patties",
  "Desserts like tiramisu or cheesecake",
  "Leftover soups (stored in a bowl)",
  "Scrambled or boiled eggs",
  "Tofu blocks",
  "Cooked grains like quinoa or barley"
];

const foodsForTinFoil = [
  "Grilled or roasted meats (like chicken, beef, or pork)",
  "Baked fish",
  "Barbecue ribs",
  "Corn on the cob",
  "Roasted vegetables",
  "Fresh herbs (like cilantro or parsley, wrapped with a damp paper towel)",
  "Baked potatoes",
  "Garlic heads for roasting",
  "Loaves of bread for reheating",
  "Casseroles or lasagna (for reheating or storing leftovers)",
  "Pies or tarts for reheating",
  "Whole fish for grilling or baking",
  "Baked beans",
  "Cooked ribs or brisket",
  "Burritos or wraps",
  "Homemade pizza (for reheating)",
  "Stuffed peppers",
  "Meat or fish for marinating (wrapped tightly to hold in juices and marinade)",
  "Cold sandwiches or subs (for picnics or travel)",
  "Homemade freezer meals"
];

const questions = [
  ...foodsForSaranWrap.map(food => ({ food, answer: 'saran wrap' })),
  ...foodsForTinFoil.map(food => ({ food, answer: 'tin foil' })),
];

const NUM_QUESTIONS = 10;

const shuffleArray = (array) => {
  const shuffled = array.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [gameStatus, setGameStatus] = useState("start");
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    const isAnswerCorrect = answer === shuffledQuestions[currentQuestion].answer;
    setIsCorrect(isAnswerCorrect);
    if (isAnswerCorrect) {
      setScore(score + 1);
    }
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2000);

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < NUM_QUESTIONS) {
      setCurrentQuestion(nextQuestion);
    } else {
      setGameStatus("end");
    }
  };

  const startGame = () => {
    const randomizedQuestions = shuffleArray(questions).slice(0, NUM_QUESTIONS);
    setShuffledQuestions(randomizedQuestions);
    setGameStatus("inProgress");
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer('');
  };

  const restartGame = () => {
    setGameStatus("start");
  };

  if (gameStatus === "start") {
    return (
      <div className="App">
        <h1>Food Cover Game</h1>
        <p>Guess whether to cover a particular food with saran wrap or tin foil. Try to get the highest score!</p>
        <button onClick={startGame}>Start</button>
      </div>
    );
  } else if (gameStatus === "end") {
    return (
      <div className="App">
        <h1>Game Over!</h1>
        <p>Your final score is: {score}/{NUM_QUESTIONS}</p>
        <button onClick={restartGame}>Play Again</button>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Food Cover Game</h1>
      <p>Would you cover {shuffledQuestions[currentQuestion].food} with:</p>
      <button onClick={() => handleAnswer('saran wrap')}>Saran Wrap</button>
      <button onClick={() => handleAnswer('tin foil')}>Tin Foil</button>
      <p>Your answer: {selectedAnswer}</p>
      <p>Score: {score}</p>
      {showMessage && (
        <div className={`fade-message show ${isCorrect ? 'correct' : 'incorrect'}`}>
          {isCorrect ? 'Correct!' : 'Incorrect'}
        </div>
      )}
    </div>
  );
};

export default App;