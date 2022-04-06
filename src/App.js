import { useState } from "react";
import { AddThoughtForm } from "./AddThoughtForm";
import { generateId, getNewExpirationTime } from "./utils/utils";

const App = () => {
  const [thoughts, setThoughts] = useState([
    {
      id: generateId(),
      text: "This is a place for your passing thoughts.",
      expiresAt: getNewExpirationTime(),
    },
    {
      id: generateId(),
      text: "They'll be removed after 15 seconds.",
      expiresAt: getNewExpirationTime(),
    },
  ]);

  const addThought = (thought) => {
    setThoughts((thoughts) => [thought, ...thoughts]);
  };

  return (
    <div className="App">
      <header>
        <h1>Passing Thoughts</h1>
      </header>

      <main>
        <AddThoughtForm addThought={addThought} />
      </main>
    </div>
  );
};

export default App;
