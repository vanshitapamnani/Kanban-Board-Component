import { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import "../styles/column.css";
import Card from "./Card";

export default function Column({
  title,
  cards,
  type,
  addCard,
  deleteCard,
  updateCard,
}) {
  const [showInput, setShowInput] = useState(false);
  const [text, setText] = useState("");
  const { setNodeRef } = useDroppable({
    id: type,
  });
  function handleAdd() {
    addCard(type, text);
    setText("");
    setShowInput(false);
  }

  return (
    <div ref={setNodeRef} className="column">
      <div className={`column-header ${type}`}>{title}</div>

      {showInput ? (
        <div className="addCardBox">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter card title"
          />
          <button onClick={handleAdd}>+</button>
        </div>
      ) : (
        <button className="addBtn" onClick={() => setShowInput(true)}>
          + Add Card
        </button>
      )}
      {(cards || [])
        .filter((card) => card && card.id && card.text)
        .map((card) => (
          <Card
            key={card.id}
            id={card.id}
            column={type}
            text={card.text}
            updateCard={updateCard}
            onDelete={() => deleteCard(type, card.id)}
          />
        ))}
    </div>
  );
}
