import React, { useState } from "react";

function App() {
  const [userQuery, setUserQuery] = useState('');

  const fireSearchQueryFunc = () => {
    window.open(`https://google.com/search?q=${userQuery}`, '_blank');
  };

  return (
    <div className="App">
      <h1>Hello Atul</h1>
      <div className="form">
        <input value={userQuery}
          onChange={(e) => setUserQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              fireSearchQueryFunc();
            }
          }}
          />
        <button onClick={() => fireSearchQueryFunc()}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default App;
