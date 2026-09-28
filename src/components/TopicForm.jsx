import { useState } from "react";

function TopicForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim() === "") return;

    onAdd({
      title: title.trim(),
      description:
        description.trim() ||
        "This is a new topic added to the React project.",
    });

    setTitle("");
    setDescription("");
  };

  return (
    <form className="topic-form" onSubmit={handleSubmit}>
      <div>
        <h2>Add New Topic</h2>
        <p>Create a new React learning topic.</p>
      </div>

      <input
        type="text"
        placeholder="Enter topic title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Enter topic description..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button type="submit" className="add-btn">
        + Add Topic
      </button>
    </form>
  );
}

export default TopicForm;