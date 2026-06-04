import { useState } from 'react';
import confetti from 'canvas-confetti';

export const useQuiz = (questions) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [questionResults, setQuestionResults] = useState({}); // { index: 'correct' | 'wrong' }

  const handleAnswer = (answer) => {
    if (showFeedback) return;

    setSelectedAnswer(answer);
    setShowFeedback(true);

    const isCorrect = answer === questions[currentQuestionIndex].correctAnswer;
    
    setQuestionResults(prev => ({
      ...prev,
      [currentQuestionIndex]: isCorrect ? 'correct' : 'wrong'
    }));

    if (isCorrect) {
      setScore(score + 1);
      
      // Ovoz chiqarish
      const audio = new Audio('/succes.mp3.wav');
      audio.play().catch(e => console.log("Ovoz ijro etilmadi:", e));

      const count = 200;
      const defaults = {
        origin: { y: 0.7 }
      };

      function fire(particleRatio, opts) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio)
        });
      }

      fire(0.25, {
        spread: 26,
        startVelocity: 55,
      });
      fire(0.2, {
        spread: 60,
      });
      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 45,
      });
    } else {
      // Noto'g'ri javob uchun ovoz
      const audio = new Audio('/error.wav');
      audio.play().catch(e => console.log("Ovoz ijro etilmadi:", e));
    }
  };

  const nextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setIsFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsFinished(false);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setQuestionResults({});
  };

  return {
    currentQuestionIndex,
    score,
    isFinished,
    handleAnswer,
    nextQuestion,
    restartQuiz,
    currentQuestion: questions[currentQuestionIndex],
    selectedAnswer,
    showFeedback,
    questionResults,
  };
};
