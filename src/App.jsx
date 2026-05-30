import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import CodeEditor from "./components/CodeEditor";
import ResponsePanel from "./components/ResponsePanel";

import { fixCode, reviewCode } from "./services/geminiService";

const App = () => {
  const languageOptions = [
    "javascript",
    "python",
    "java",
    "c++",
    "c#",
    "php",
    "go",
    "rust",
  ];

  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const [theme, setTheme] = useState("dark");

  async function handleFixCode() {
    if (!code || !code.trim()) {
      alert("Please enter code first");
      return;
    }

    setLoading(true);

    try {
      const fixedCode = await fixCode(code, language);

      setCode(fixedCode || "");
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleReviewCode() {
    if (!code || !code.trim()) {
      alert("Please enter code first");
      return;
    }

    setLoading(true);

    try {
      const review = await reviewCode(code, language);

      setResponse(review || "");
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={theme}>
      <Navbar />

      <div className="main-container">
        <CodeEditor
          language={language}
          setLanguage={setLanguage}
          code={code}
          setCode={setCode}
          languageOptions={languageOptions}
          handleFixCode={handleFixCode}
          handleReviewCode={handleReviewCode}
          theme={theme}
          setTheme={setTheme}
        />

        <ResponsePanel response={response} loading={loading} />
      </div>
    </div>
  );
};

export default App;
