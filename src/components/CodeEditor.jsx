import Editor from "@monaco-editor/react";
import { Moon, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import Output from "./Output";
import { executeCode } from "../services/geminiService";

const CodeEditor = ({
  language,
  setLanguage,
  code,
  setCode,
  languageOptions,
  handleFixCode,
  handleReviewCode,
  theme,
  setTheme,
}) => {
  const monacoRef = useRef(null);

  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  function handleEditorDidMount(editor, monaco) {
    monacoRef.current = monaco;
  }

  useEffect(() => {
    if (monacoRef.current) {
      monacoRef.current.editor.setTheme(theme === "dark" ? "vs-dark" : "light");
    }
  }, [theme]);

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  async function handleRunCode() {
    if (!code.trim()) {
      setOutput("Please write some code...");
      return;
    }

    try {
      setLoading(true);
      setOutput("");

      const result = await executeCode(code, language);

      setOutput(result || "No Output");
    } catch (error) {
      console.log(error);

      setOutput("Something went wrong...");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="editor-container">
      <div className="editor-top">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="language-select"
        >
          {languageOptions.map((lang, index) => (
            <option key={index} value={lang}>
              {lang}
            </option>
          ))}
        </select>

        <button className="action-btn" onClick={handleRunCode}>
          {loading ? "Running..." : "Run Code"}
        </button>

        <button className="action-btn" onClick={handleFixCode}>
          Fix Code
        </button>

        <button className="action-btn" onClick={handleReviewCode}>
          Review Code
        </button>

        <div className="theme-div">
          <button className="theme-toggle-btn" onClick={toggleTheme}>
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>

      <Editor
        height="60%"
        language={language}
        value={code}
        onChange={(value) => setCode(value || "")}
        onMount={handleEditorDidMount}
        theme={theme === "dark" ? "vs-dark" : "light"}
      />

      <Output output={output} />
    </div>
  );
};

export default CodeEditor;
