import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Welcome from "./pages/Welcome"; 
import NoteDetail from "./pages/NoteDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/" element={<Home />} />
        <Route path="/note/:id" element={<NoteDetail />} />
        <Route path="/note/new" element={<NoteDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
