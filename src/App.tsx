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

  async function getResponse(e: any) {
    e.preventDefault();
    if (!value) {
      setError("Error: Please ask a question");
      return;
    }
    const options = {
      method: "POST",
      body: JSON.stringify({
        history: chatHistory,
        message: value,
      }),
      headers: { "Content-Type": "application/json" },
    };
    try {
      const response = await fetch("http://localhost:8000/gemini", options);
      const data = await response.text();
      setChatHistory((oldChatHistory: any) => [
        ...oldChatHistory,
        {
          role: "user",
          parts: [{ text: value }],
        },
        {
          role: "model",
          parts: [{ text: data }],
        },
      ]);
      setValue("");
    } catch (err: any) {
      console.log(err);
      setError("Something went wrong! please try again later.");
    }
  }
  console.log(chatHistory);

  function clear() {
    setValue("");
    setError("");
    setChatHistory([]);
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
        <form
          onSubmit={(e: any) => {
            getResponse(e);
          }}
        >
          <input
            className="input"
            value={value}
            placeholder="What is your question"
            onChange={(e) => {
              setValue(e.target.value);
              setError("");
            }}
          />
          {!error && (
            <button className="submit" type="submit">
              Ask me
            </button>
          )}
          {error && (
            <button className="submit" onClick={clear}>
              Clear
            </button>
          )}
        </form>
      </div>
      {error && <p>{error}</p>}
      <div className="search-result">
        {chatHistory.map((item: any, index: any) => {
          return (
            <div key={index}>
              <p className="answer">
                {item.role} : {item.parts[0].text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
