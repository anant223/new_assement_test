import React from "react"
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import TaskAssign from "./pages/TaskAssign";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/task/:id" element={<TaskAssign/>}/>
    </Routes>
  );
}

export default App
