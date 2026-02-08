import Column from "./Column";
import { DndContext } from "@dnd-kit/core";

import "../styles/kanban.css";
import { useState } from "react";
export default function KanbanBoard() {
  const [data, setData] = useState({
    todo: [
      { id: 1, text: "Make a project plan" },
      { id: 2, text: "Design a landing page" },
    ],
    inProgress: [{ id: 3, text: "Fix Navbar bus" }],
    done: [],
  });
  // to add new card
  function addCard(columnType, text) {
    if (!text.trim()) return;
    const newCard = {
      id: Date.now(),
      text,
    };
    setData((prev) => ({
      ...prev,
      [columnType]: [...prev[columnType], newCard],
    }));
  }

  //to delete a card

  function deleteCard(columnType, id) {
    setData((prev) => ({
      ...prev,
      [columnType]: prev[columnType].filter((card) => card.id !== id),
    }));
  }

  //adding drag and drop

  function handleDrag(event) {
    const { active, over } = event;
    if (!over) return;
    const fromColumn = active.data.current.column;
    const toColumn = over.id;

    if (fromColumn === toColumn) return;
    const cardId = active.id;
    setData((prev) => {
      const fromCards = prev[fromColumn].filter((c) => c.id !== cardId);

      const moveCard = prev[fromColumn].find((c) => c.id === cardId);

      return {
        ...prev,
        [fromColumn]: fromCards,
        [toColumn]: [...prev[toColumn], moveCard],
      };
    });
  }

  //In-line editing
  function updateCard(columnType, id, newText) {
    setData((prev) => ({
      ...prev,
      [columnType]: prev[columnType].map((card) =>
        card.id === id ? { ...card, text: newText } : card,
      ),
    }));
  }
  return (
    <DndContext onDragEnd={handleDrag}>
      <div className="board">
        <Column
          title="Todo"
          type="todo"
          cards={data.todo}
          addCard={addCard}
          deleteCard={deleteCard}
          updateCard={updateCard}
        />
        <Column
          title="In-Progress"
          type="inProgress"
          cards={data.inProgress}
          addCard={addCard}
          deleteCard={deleteCard}
          updateCard={updateCard}
        />
        <Column
          title="Done"
          type="done"
          cards={data.done}
          addCard={addCard}
          deleteCard={deleteCard}
          updateCard={updateCard}
        />
      </div>
    </DndContext>
  );
}
