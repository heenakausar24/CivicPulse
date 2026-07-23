import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ProjectsPage from "./pages/project/ProjectsPage";
import ProjectWorkspace from "./pages/project/ProjectWorkspace";
import LiteraturePage from "./pages/project/LiteraturePage";
import WorkflowPage from "./pages/project/WorkflowPage";
import ConceptsPage from "./pages/project/ConceptsPage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      
      {/* Project Workspace tab views nested under a common layout */}
      <Route path="/projects/:projectId" element={<ProjectWorkspace />}>
        <Route index element={<div className="text-slate-600">Overview</div>} />
        <Route path="literature" element={<LiteraturePage />} />
        <Route path="workflow" element={<WorkflowPage />} />
        <Route path="concepts" element={<ConceptsPage />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;