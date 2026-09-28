import { useState } from "react";

function Card({ topic, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(topic.title);
  const [description, setDescription] = useState(topic.description);

  const handleSave = () => {
    if (title.trim() === "") return;

    onEdit(topic.id, title, description);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTitle(topic.title);
    setDescription(topic.description);
    setIsEditing(false);
  };

  return (
    <div className="card">
      {isEditing ? (
        <>
          <input
            className="edit-input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="edit-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="card-buttons">
            <button className="save-btn" onClick={handleSave}>
              Save
            </button>

            <button className="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="card-icon">⚛️</div>

          <h2>{topic.title}</h2>

          <p>{topic.description}</p>

          <div className="card-buttons">
            <button className="edit-btn" onClick={() => setIsEditing(true)}>
              Edit
            </button>

            <button
              className="delete-btn"
              onClick={() => onDelete(topic.id)}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Card;