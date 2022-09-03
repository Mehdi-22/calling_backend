import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import "./App.css";
import Personnel from "./components/personnel";

function App() {
  return (
    <React.Fragment>
      <main className="container">
        <Routes>
          <Route path="/personnel" element={<Personnel />}></Route>
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
