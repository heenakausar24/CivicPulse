import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/citizen/Home";
import Dashboard from "./pages/admin/Dashboard";
import ProjectsPage from "./pages/project/ProjectsPage";
import LiteraturePage from "./pages/project/LiteraturePage";
import WorkflowPage from "./pages/project/WorkflowPage";
import ConceptsPage from "./pages/project/ConceptsPage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/projects/:projectId/literature" element={<LiteraturePage />} />
      <Route path="/projects/:projectId/workflow" element={<WorkflowPage />} />
      <Route path="/projects/:projectId/concepts" element={<ConceptsPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;