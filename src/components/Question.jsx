
const Question = ({ question, onAnswer, selectedAnswer, showFeedback }) => {
  return (
    <div className="question-container">
      <h2>{question.question}</h2>
      <div className="options">
        {question.options.map((option, index) => {
          let buttonClass = "";
          if (showFeedback) {
            if (option === question.correctAnswer) {
              buttonClass = "correct";
            } else if (option === selectedAnswer) {
              buttonClass = "wrong";
            }
          }

          return (
            <button
              key={index}
              className={buttonClass}
              onClick={() => onAnswer(option)}
              disabled={showFeedback}
            >
              <span className="option-letter">{String.fromCharCode(65 + index)}</span>
              <span className="option-text">{option}</span>
            </button>
          );
        })}
      </div>
      {showFeedback && (
        <div className="feedback">
          <p>
            To'g'ri javob: <strong>{question.correctAnswer}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default Question;
