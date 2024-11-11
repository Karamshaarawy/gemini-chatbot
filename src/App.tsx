import { useState } from "react";

function App() {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<any>([]);

  const surpriseOptions = [
    "Who won the latest Nobel Physics price?",
    "Where does pizza come from?",
    "Suggest a meal and provide the recipe for it",
  ];

  function surprise() {
    const randomValue =
      surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)];
    setValue(randomValue);
  }

  async function getResponse() {
    if (!value) {
      setError("Error: Please ask a question");
      return;
    }
    try {
    } catch (err: any) {
      console.log(err);
      setError("Something went wrong! please try again later.");
    }
  }

  return (
    <div className="app">
      <p>
        What do you want to know?
        <button
          className="surprise"
          onClick={surprise}
          disabled={chatHistory.length}
        >
          Surprise me!
        </button>
      </p>
      <div className="input-container">
        <input
          value={value}
          placeholder="What is your question"
          onChange={(e) => {
            setValue(e.target.value);
            setError("");
          }}
        />
        {!error && <button onClick={getResponse}>Ask me</button>}
        {error && <button>Clear</button>}
      </div>
      {error && <p>{error}</p>}
      <div className="search-result">
        <div key={""}>
          <p className="answer"></p>
        </div>
      </div>
    </div>
  );
}

export default App;
