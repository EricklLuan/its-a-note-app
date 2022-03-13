import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home } from "./pages/Home";
import { NotePad } from "./pages/NotePad";

import { AuthContextProvider } from "./contexts/AuthContext";

import './styles/global.scss'

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/notepad/" element={<NotePad />} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;