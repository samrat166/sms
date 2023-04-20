import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./common/navbar";
import Home from "./components/Home";
import Notice from "./components/notice/Notice";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/Login";

function App() {
  const [value, setValue] = useState(0);
  return (
    <>
      <Header />
      <div className="p-2">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="notice" element={<Notice />} />
          <Route path="login" element={<Login />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
