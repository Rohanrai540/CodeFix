const Output = ({ output }) => {
  return (
    <div className="output-container">
      <div className="output-header">
        <h3>Output</h3>
      </div>

      <div className="output-box">
        <pre>{output}</pre>
      </div>
    </div>
  );
};

export default Output;
