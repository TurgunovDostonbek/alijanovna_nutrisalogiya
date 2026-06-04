const Result = ({ score, total, onRestart }) => {
  return (
    <div className="result-container">
      <h2>Quiz Yakunlandi!</h2>
      <p>
        Sizning natijangiz: {score} / {total}
      </p>
      <button className="restart-btn" onClick={onRestart}>
        Qayta boshlash
      </button>
      <div className="promo-message">
        <p>Agar sizga ham shunday quiz kerak bo'lsa, biz bilan bog'laning:</p>
        <a
          href="https://t.me/Turgunov1398"
          target="_blank"
          rel="noreferrer"
          className="promo-link"
        >
          Biz bilan bog'lanish
        </a>
      </div>
    </div>
  );
};

export default Result;
