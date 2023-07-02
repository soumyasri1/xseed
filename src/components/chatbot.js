import React, { useState } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const handleInputSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") {
      return;
    }

    // Add user message
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: inputValue, sender: "user" },
    ]);

    // Clear input value
    setInputValue("");

    // Call a function to handle bot response
    handleBotResponse(inputValue);
  };

  const handleBotResponse = (userInput) => {
    // Simulating a basic chatbot response logic
    let botResponse = "";

    if (
      userInput.toLowerCase().includes("hello") ||
      userInput.toLowerCase().includes("hi")
    ) {
      botResponse = "Hello there!";
    } else if (userInput.toLowerCase().includes("how are you")) {
      botResponse =
        "I'm a chatbot, so I don't have feelings, but thanks for asking!";
    } else if (userInput.toLowerCase().includes("time")) {
      const currentTime = new Date().toLocaleTimeString();
      botResponse = `The current time is ${currentTime}.`;
    } else {
      botResponse = "I'm sorry, I don't understand. Can you please rephrase?";
    }

    // Add bot message
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botResponse, sender: "bot" },
      ]);
    }, 500);
  };

  const toggleChatbot = () => {
    setIsChatbotOpen((prevState) => !prevState);
  };

  return (
    <div className={`chatbot-container ${isChatbotOpen ? "active" : ""}`}>
      <div
        className={`chatbot-icon ${isChatbotOpen ? "active" : ""}`}
        onClick={toggleChatbot}
      >
        <span>&#128172;</span> {/* Message icon */}
      </div>
      {isChatbotOpen && (
        <div className="chatbot-window">
          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${
                  message.sender === "bot" ? "bot" : "user"
                }`}
              >
                {message.sender === "bot" ? (
                  <span>&#9787;</span> // Person symbol for bot messages
                ) : (
                  <span>&#128104;</span> // Person symbol for user messages
                )}
                {message.text}
              </div>
            ))}
          </div>
          <form className="chatbot-input" onSubmit={handleInputSubmit}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
