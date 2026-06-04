import { useState } from "react";
import { questions } from "../data/questions";
import { useQuiz } from "../hooks/useQuiz";
import Question from "./Question";
import Result from "./Result";
import Timer from "./Timer";

const Quiz = () => {
  const [selectedSet, setSelectedSet] = useState(null);
  const questionsPerSet = 20;
  const totalSets = Math.ceil(questions.length / questionsPerSet);

  const filteredQuestions =
    selectedSet !== null
      ? questions.slice(
          selectedSet * questionsPerSet,
          (selectedSet + 1) * questionsPerSet,
        )
      : [];

  const {
    currentQuestion,
    currentQuestionIndex,
    score,
    isFinished,
    handleAnswer,
    nextQuestion,
    restartQuiz,
    selectedAnswer,
    showFeedback,
    questionResults,
  } = useQuiz(filteredQuestions);

  const handleRestart = () => {
    restartQuiz();
    setSelectedSet(null);
  };

  if (selectedSet === null) {
    return (
      <div className="set-selector">
        <h2>Variant tanlang (har birida {questionsPerSet} ta savol)</h2>
        <div className="set-grid">
          {Array.from({ length: totalSets }).map((_, index) => (
            <button key={index} onClick={() => setSelectedSet(index)}>
              {index + 1}-Variant ({index * questionsPerSet + 1}-
              {Math.min((index + 1) * questionsPerSet, questions.length)})
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (isFinished) {
    return (
      <Result
        score={score}
        total={filteredQuestions.length}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <button className="back-btn" onClick={handleRestart}>
          ⬅ Orqaga
        </button>
        <span className="set-info">{selectedSet + 1} - Bo'lim</span>
      </div>

      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{
            width: `${((currentQuestionIndex + 1) / filteredQuestions.length) * 100}%`,
          }}
        ></div>
      </div>

      {!showFeedback && (
        <Timer
          key={currentQuestionIndex}
          initialTime={60}
          onTimeUp={() => handleAnswer(null)}
        />
      )}

      <Question
        question={currentQuestion}
        onAnswer={handleAnswer}
        selectedAnswer={selectedAnswer}
        showFeedback={showFeedback}
      />

      {showFeedback && (
        <button className="next-btn" onClick={nextQuestion}>
          {currentQuestionIndex + 1 === filteredQuestions.length
            ? "Natijani ko'rish"
            : "Keyingi savol ➡"}
        </button>
      )}

      <div className="pagination">
        {filteredQuestions.map((_, index) => (
          <div
            key={index}
            className={`page-item ${index === currentQuestionIndex ? "active" : ""} ${questionResults[index] || ""}`}
          >
            {index + 1}
          </div>
        ))}
      </div>

      <div className="progress">
        Savol {currentQuestionIndex + 1} / {filteredQuestions.length}
      </div>
    </div>
  );
};

export default Quiz;
