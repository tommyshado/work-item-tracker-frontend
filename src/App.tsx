import { Routes, Route } from "react-router-dom";
import WorkItemsPage from "./pages/work-items";
import WorkItemDetailPage from "./pages/work-items/WorkItemDetailPage";

import "./App.css";
import LoginPage from "./pages/login";

function App() {
  return (
    <div className="root">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/work-items" element={<WorkItemsPage />} />
        <Route path="/work-items/:id" element={<WorkItemDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;