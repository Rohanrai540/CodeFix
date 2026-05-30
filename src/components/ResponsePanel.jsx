import Markdown from "react-markdown";
import { CircleLoader } from "react-spinners";

const ResponsePanel = ({ response, loading }) => {
  return (
    <div className="response-container">
      <div className="response-header">
        <h2>AI Response</h2>
      </div>

      {loading ? (
        <div className="loader-container">
          <CircleLoader color="#11adf5" size={150} />
        </div>
      ) : (
        <Markdown>{response}</Markdown>
      )}
    </div>
  );
};

export default ResponsePanel;
