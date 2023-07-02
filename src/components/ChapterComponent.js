import React, { useState, useEffect } from "react";
import { NavDropdown } from "react-bootstrap";
import { GiHamburgerMenu } from "react-icons/gi";
import { firestore } from "../firebase";

const ChapterComponent = () => {
  const [chapters, setChapters] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const chaptersCollection = firestore
          .collection("Chapters")
          .orderBy("title")
          .limit(10);
        const snapshot = await chaptersCollection.get();

        if (snapshot.empty) {
          setChapters([]);
        } else {
          const chapterList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setChapters(chapterList);
          setSelectedChapter(chapterList[0]);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching chapters:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchChapters();
  }, []);

  const handleChapterClick = (chapter) => {
    setSelectedChapter(chapter);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ display: "flex", justifyContent: "left" }}>
        <NavDropdown title={<GiHamburgerMenu />} id="menu-dropdown">
          {loading ? (
            <NavDropdown.Item>Loading chapters...</NavDropdown.Item>
          ) : error ? (
            <NavDropdown.Item>
              Error fetching chapters: {error}
            </NavDropdown.Item>
          ) : (
            chapters.map((chapter) => (
              <NavDropdown.Item
                key={chapter.id}
                onClick={() => handleChapterClick(chapter)}
              >
                {chapter.title}
                {chapter.intro && <span>{chapter.intro}</span>}
              </NavDropdown.Item>
            ))
          )}
        </NavDropdown>
      </div>
      {selectedChapter && (
        <div>
          <h2>{selectedChapter.title}</h2>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src={selectedChapter.image}
              alt="Chapter"
              style={{ maxWidth: "100%", maxHeight: "400px" }}
            />
          </div>

          <p>{selectedChapter.content}</p>
          {selectedChapter.video && (
            <div style={{ marginTop: "20px" }}>
              <iframe
                title="Chapter Video"
                width="260"
                height="215"
                src={selectedChapter.video}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChapterComponent;
