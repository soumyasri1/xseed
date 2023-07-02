import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import SignIn from "./components/Navbar/SignIn";
import SignUp from "./components/Navbar/SignUp";
import Footer from "./components/Footer";
import ChapterComponent from "./components/ChapterComponent";
import Chatbot from "./components/chatbot";

function App() {
  const [selectedChapter, setSelectedChapter] = useState("Chapter 1");

  const handleChapterClick = (chapter) => {
    setSelectedChapter(chapter);
  };

  return (
    <Router>
      <div className="App">
        <Navbar handleChapterClick={handleChapterClick} />
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <ChapterComponent selectedChapter={selectedChapter} />
                <Chatbot />
              </div>
            }
          />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
