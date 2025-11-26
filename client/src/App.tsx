import { BrowserRouter, Routes, Route } from "react-router-dom";
import FeedbackForm from "./pages/FeedbackForm";
import AdminPanel from "./pages/AdminPanel";
import NavBar from "./components/NavBar";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<FeedbackForm />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
