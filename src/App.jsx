import { useEffect, useState } from "react";
import "./App.css";

import Header from "./components/Header";
import Card from "./components/Card";
import TopicForm from "./components/TopicForm";

const defaultTopics = [
  {
    id: 1,
    title: "React",
    description:
      "React is a JavaScript library used to build modern user interfaces.",
  },
  {
    id: 2,
    title: "Components",
    description:
      "Components help us create reusable parts of a React application.",
  },
  {
    id: 3,
    title: "useState",
    description:
      "useState is used to manage changing data inside a React component.",
  },
];

function App() {
  const [topics, setTopics] = useState(() => {
    const savedTopics = localStorage.getItem("react-topics");

    return savedTopics ? JSON.parse(savedTopics) : defaultTopics;
  });

  const [search, setSearch] = useState("");
  const [count, setCount] = useState(0);
  const counterMessage = `You have clicked the counter ${count} times.`;

  useEffect(() => {
    localStorage.setItem("react-topics", JSON.stringify(topics));
  }, [topics]);

  const addTopic = (newTopic) => {
    const topic = {
      id: Date.now(),
      title: newTopic.title,
      description: newTopic.description,
    };

    setTopics((currentTopics) => [...currentTopics, topic]);
  };

  const deleteTopic = (id) => {
    setTopics((currentTopics) =>
      currentTopics.filter((topic) => topic.id !== id)
    );
  };

  const editTopic = (id, newTitle, newDescription) => {
    const existingTopic = topics.find((topic) => topic.id === id);

    if (!existingTopic) return;

    setTopics((currentTopics) =>
      currentTopics.map((topic) =>
        topic.id === id
          ? {
              ...topic,
              title: newTitle,
              description: newDescription,
            }
          : topic
      )
    );
  };

  const filteredTopics = topics.filter(
    (topic) =>
      topic.title.toLowerCase().includes(search.toLowerCase()) ||
      topic.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <Header />

      <main className="container">
        {/* Search */}
        <section className="search-section">
          <div>
            <h2>Explore Topics</h2>
            <p>Search through your React learning topics.</p>
          </div>

          <input
            className="search-input"
            type="text"
            placeholder="🔎 Search topics..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </section>

        {/* Add Topic */}
        <TopicForm onAdd={addTopic} />

        {/* Topic Statistics */}
        <div className="topic-info">
          <div>
            <strong>{topics.length}</strong>
            <span>Total Topics</span>
          </div>

          <div>
            <strong>{filteredTopics.length}</strong>
            <span>Showing</span>
          </div>
        </div>

        {/* Cards */}
        <section className="cards">
          {filteredTopics.length > 0 ? (
            filteredTopics.map((topic) => (
              <Card
                key={topic.id}
                topic={topic}
                onDelete={deleteTopic}
                onEdit={editTopic}
              />
            ))
          ) : (
            <div className="empty-state">
              <div>🔍</div>
              <h2>No topics found</h2>
              <p>Try searching for another topic.</p>
            </div>
          )}
        </section>

        {/* Counter */}
        <section className="counter">
          <p className="counter-label">React State Practice</p>

          <h2>Counter: {count}</h2>
          <p>{counterMessage}</p>

          <div>
            <button
              className="counter-btn"
              onClick={() => setCount(count + 1)}
            >
              + Increase
            </button>

            <button
              className="reset-btn"
              onClick={() => setCount(0)}
            >
              Reset
            </button>
          </div>
        </section>
      </main>

      <footer>
        <p>Built with React ⚛️ | Week 04 Project</p>
      </footer>
    </div>
  );
}

export default App;