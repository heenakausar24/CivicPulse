import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getLiterature, uploadLiterature } from '../../services/literature.service.js';

const LiteraturePage = () => {
  const { projectId } = useParams();
  const [references, setReferences] = useState([]);
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const [year, setYear] = useState('');
  const [tags, setTags] = useState('');
  const [summary, setSummary] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const loadReferences = async () => {
    try {
      const result = await getLiterature(projectId);
      setReferences(result.data || []);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (projectId) loadReferences();
  }, [projectId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('authors', authors);
      formData.append('year', year);
      formData.append('tags', tags);
      formData.append('summary', summary);
      if (file) formData.append('file', file);

      await uploadLiterature(projectId, formData);
      setTitle('');
      setAuthors('');
      setYear('');
      setTags('');
      setSummary('');
      setFile(null);
      loadReferences();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Upload Reference</h2>
            <p className="text-sm text-slate-500">Project ID: {projectId}</p>
          </div>
          <Link to="/projects" className="text-sm text-slate-900 underline hover:text-slate-700">
            Back to projects
          </Link>
        </div>
        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
            <input
              className="w-full rounded-2xl border border-slate-300 px-4 py-3"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Reference title"
              required
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Authors</label>
              <input
                className="w-full rounded-2xl border border-slate-300 px-4 py-3"
                value={authors}
                onChange={(event) => setAuthors(event.target.value)}
                placeholder="Jane Doe, John Smith"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Year</label>
              <input
                className="w-full rounded-2xl border border-slate-300 px-4 py-3"
                value={year}
                onChange={(event) => setYear(event.target.value)}
                placeholder="2024"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Tags</label>
            <input
              className="w-full rounded-2xl border border-slate-300 px-4 py-3"
              value={tags}
              onChange={(event) => setTags(event.target.value)}
              placeholder="machine learning, literature review"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Summary</label>
            <textarea
              className="w-full rounded-2xl border border-slate-300 px-4 py-3"
              rows={4}
              value={summary}
              onChange={(event) => setSummary(event.target.value)}
              placeholder="Add a short summary or notes"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">File</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.txt,.csv,.png,.jpg,.jpeg"
              onChange={(event) => setFile(event.target.files?.[0] || null)}
              className="block w-full text-slate-700"
            />
          </div>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-6 py-3 text-white font-semibold hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {saving ? 'Uploading...' : 'Upload Reference'}
          </button>
        </form>
      </section>

      <section className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Literature References</h2>
        {references.length === 0 ? (
          <p className="text-slate-600">No references uploaded yet.</p>
        ) : (
          <div className="grid gap-4">
            {references.map((ref) => (
              <div key={ref.id} className="rounded-3xl border border-slate-200 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{ref.title}</h3>
                    <p className="mt-2 text-sm text-slate-500">{ref.authors || 'Unknown authors'} · {ref.year || 'Year not provided'}</p>
                    <div className="mt-3 text-sm text-slate-600">{ref.summary || 'No summary available.'}</div>
                  </div>
                  {ref.filePath && (
                    <a
                      href={`/uploads/${ref.filePath}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-slate-900 underline"
                    >
                      Download
                    </a>
                  )}
                </div>
                {ref.tags?.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {ref.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default LiteraturePage;
