import "../styles/card.css";
import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

export default function Card({ text, onDelete, id, column, updateCard }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    data: { column },
  });

  const style = { transform: CSS.Transform.toString(transform) };

  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(text);

  function saveEdit() {
    if (!value.trim()) return setEdit(false);
    updateCard(column, id, value);
    setEdit(false);
  }

  return (
    <div ref={setNodeRef} style={style} className="card">
      <span className="dragHandle" {...listeners} {...attributes}>
        ☰
      </span>

      {edit ? (
        <input
          className="editInput"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={saveEdit}
          autoFocus
        />
      ) : (
        <span className="cardText" onDoubleClick={() => setEdit(true)}>
          {text}
        </span>
      )}

      <button className="deleteBtn" onClick={onDelete}>
        🗑️
      </button>
    </div>
  );
}
