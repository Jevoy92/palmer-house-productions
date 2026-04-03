import { BrowserRouter, Routes, Route } from "react-router-dom";
import SuddenWealthFilmSystem from "./pages/SuddenWealthFilmSystem";
import DemoPage from "./pages/DemoPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SuddenWealthFilmSystem />} />
        <Route path="/demo" element={<DemoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
