import { BrowserRouter, Route } from "react-router";
import { Routes } from "react-router";
import { HomePage } from "./pages/HomePage";
import { PuzzlesPage } from "./pages/PuzzlesPage";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/puzzles" element={<PuzzlesPage />} />
      </Routes>
    </BrowserRouter>
  );
};
