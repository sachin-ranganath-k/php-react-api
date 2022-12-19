import React, { lazy, Suspense } from "react";
const API = lazy(() => import("./components/API"));

function App() {
  return (
    <div className="App">
      <Suspense fallback="Loading Data...!">
        <API />
      </Suspense>
    </div>
  );
}

export default App;
