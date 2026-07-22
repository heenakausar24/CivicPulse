import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getProjects, createProject, deleteProject } from '../../services/project.service.js';

const ProjectsPage = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [goal, setGoal] = useState('');
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

  const loadProjects = async () => {
    try {
      const result = await getProjects();
      setProjects(result.data || []);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    loadProjects();
  }, [token, navigate]);

  const handleCreate = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError(null);

    try {
      await createProject({ title, description, goal });
      setTitle('');
      setDescription('');
      setGoal('');
      await loadProjects();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (projectId) => {
    if (!window.confirm('Delete this project?')) return;
    setError(null);

    try {
      await deleteProject(projectId);
      setProjects((prev) => prev.filter((project) => project.id !== projectId));
    } catch (err) {
      setError(err.message);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-slate-50 px-6 py-8 flex items-center justify-center">
        <div className="max-w-xl rounded-3xl bg-white p-10 shadow-sm border border-slate-200 text-center">
          <h1 className="text-3xl font-semibold text-slate-900 mb-4">Please sign in first</h1>
          <p className="text-slate-600 mb-8">
            You must be logged in to create and manage projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="rounded-2xl bg-slate-900 px-6 py-3 text-white font-semibold hover:bg-slate-800"
            >
              Sign in
            </Link>
            <Link
              to="/register"
              className="rounded-2xl border border-slate-300 px-6 py-3 text-slate-900 font-semibold hover:bg-slate-50"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold text-slate-900 mb-4">Projects</h1>
        <p className="text-slate-600 mb-8">Create and manage research projects.</p>

        <section className="mb-12 rounded-3xl bg-white p-8 shadow-sm border border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">New Project</h2>
          {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 focus:border-slate-500 focus:outline-none"
                placeholder="Project title"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 focus:border-slate-500 focus:outline-none"
                rows={3}
                placeholder="Short project description"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Research Goal</label>
              <input
                value={goal}
                onChange={(event) => setGoal(event.target.value)}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 focus:border-slate-500 focus:outline-none"
                placeholder="Research goal or objective"
              />
            </div>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-6 py-3 text-white font-semibold hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {saving ? 'Saving...' : 'Create Project'}
            </button>
          </form>
        </section>

        <section className="space-y-4">
          {projects.length === 0 ? (
            <div className="rounded-3xl bg-white p-8 border border-slate-200 text-slate-600">
              No projects yet. Create one to get started.
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {projects.map((project) => (
                <div key={project.id} className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.2em] text-slate-500">{project.status}</p>
                      <h3 className="text-xl font-semibold text-slate-900 mt-3">{project.title}</h3>
                      <p className="mt-3 text-slate-600">{project.description || 'No description provided.'}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Link
                        to={`/projects/${project.id}/literature`}
                        className="text-sm text-slate-900 underline hover:text-slate-700"
                      >
                        Literature
                      </Link>
                      <Link
                        to={`/projects/${project.id}/workflow`}
                        className="text-sm text-slate-900 underline hover:text-slate-700"
                      >
                        Workflow
                      </Link>
                      <Link
                        to={`/projects/${project.id}/concepts`}
                        className="text-sm text-slate-900 underline hover:text-slate-700"
                      >
                        Concepts
                      </Link>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="text-sm text-red-600 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="mt-6 text-sm text-slate-500">
                    Created {new Date(project.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default ProjectsPage;
