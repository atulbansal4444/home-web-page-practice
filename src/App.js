import React, { useState } from "react";
import Jokes from "./jokes";
import Stories from "./stories";
import Tasks from "./components/Tasks";
import Gallery from "./Gallery";

function App() {
  const [userQuery, setUserQuery] = useState("");
  const [showGallery, setShowGallery] = useState(true);

  const fireSearchQueryFunc = () => {
    window.open(`https://google.com/search?q=${userQuery}`, "_blank");
  };

  return (
    <div className="App">
      <h1>Hello Atul</h1>
      <div className="form">
        <input
          value={userQuery}
          onChange={(e) => setUserQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              fireSearchQueryFunc();
            }
          }}
        />
        <button onClick={() => fireSearchQueryFunc()}>Submit</button>
      </div>
      <hr />
      <Jokes />
      <hr />
      <Stories />
      <hr />
      <Tasks />
      <hr />
      <div>
        {showGallery && <Gallery />}
        <button onClick={() => setShowGallery(!showGallery)}>
          {showGallery ? "Hide" : "Show"}
        </button>
      </div>
    </div>
  );
}

export default App;
