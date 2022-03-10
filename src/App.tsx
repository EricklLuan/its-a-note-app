import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home } from "./pages/Home";
import { NotePads } from "./pages/NotePads";
import { Notes } from "./pages/Notes";

import { AuthContextProvider } from "./contexts/AuthContext";

import './styles/global.scss'

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/notepads/" element={<NotePads />} />
          <Route path="/user/notepads/:id/notes" element={<Notes />} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;