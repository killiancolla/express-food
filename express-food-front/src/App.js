import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route
          path="/dashboard"
          element={
            // <ProtectedRoute user={test}>
            <Dashboard />
            /* </ProtectedRoute> */
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
