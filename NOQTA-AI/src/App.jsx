import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Welcome from "./pages/Welcome";
import NoteDetail from "./pages/NoteDetail";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/" element={<Home />} />
          <Route path="/note/:id" element={<NoteDetail />} />
          <Route path="/note/new" element={<NoteDetail />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App
