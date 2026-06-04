import { useState, useEffect } from "react";
import "./App.css";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import Quiz from "./components/Quiz";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="App">
      <h1 className="title-animated">Nutrisologiya</h1>
      <br />
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === "light" ? <MdDarkMode /> : <MdLightMode />}
        {theme === "light" ? " Tungi rejim" : " Kunduzgi rejim"}
      </button>
      <h2>
        <span className="animated-name">.Alijanovna.</span>
      </h2>
      {/* <h3>Page Not Found</h3> */}
      {/* <b>
        <BiSolidMehAlt className="icons" />
      </b> */}
      <Quiz />
      <footer className="promo-footer">
        <p>
          Agar sizga ham shunday quiz kerak bo'lsa, biz bilan bog'laning: <br />{" "}
          <br />
          <a href="https://t.me/Turgunov1398" target="_blank" rel="noreferrer">
            Biz bilan bog'lanish...!
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
