import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as workflowService from '../../services/workflow.service.js';

const stages = ['LITERATURE_REVIEW', 'HYPOTHESIS_DEVELOPMENT', 'EXPERIMENT_DESIGN', 'RESULT_ANALYSIS'];
const stageLabels = {
  LITERATURE_REVIEW: 'Literature Review',
  HYPOTHESIS_DEVELOPMENT: 'Hypothesis Development',
  EXPERIMENT_DESIGN: 'Experiment Design',
  RESULT_ANALYSIS: 'Result Analysis',
};

const defaultCard = { title: '', description: '', stage: 'LITERATURE_REVIEW' };

const WorkflowPage = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [cards, setCards] = useState([]);
  const [newCard, setNewCard] = useState(defaultCard);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

  const loadCards = async () => {
    setLoading(true);
    setError('');

    try {
      const data = await workflowService.getWorkflowCards(projectId);
      setCards(data.data || []);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Unable to load workflow cards.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    loadCards();
  }, [projectId, token, navigate]);

  const cardsByStage = useMemo(
    () => stages.reduce((acc, stage) => ({ ...acc, [stage]: cards.filter((card) => card.stage === stage) }), {}),
    [cards],
  );

  const handleCreate = async (event) => {
    event.preventDefault();
    if (!newCard.title.trim()) {
      setError('Card title is required.');
      return;
    }

    try {
      setLoading(true);
      await workflowService.createWorkflowCard(projectId, newCard);
      setNewCard(defaultCard);
      await loadCards();
    } catch (err) {
      console.error(err);
      setError(err.message || 'Unable to create workflow card.');
    } finally {
      setLoading(false);
    }
  };

  const handleStageChange = async (card, nextStage) => {
    try {
      await workflowService.updateWorkflowCard(projectId, card.id, { stage: nextStage });
      await loadCards();
    } catch (err) {
      console.error(err);
      setError(err.message || 'Unable to move card.');
    }
  };

  const handleDelete = async (cardId) => {
    try {
      await workflowService.deleteWorkflowCard(projectId, cardId);
      setCards((current) => current.filter((card) => card.id !== cardId));
    } catch (err) {
      console.error(err);
      setError(err.message || 'Unable to delete card.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-semibold">Workflow Board</h1>
          <p className="text-sm text-slate-500">Manage your project workflow with kanban-style cards.</p>
        </div>
        <button type="button" className="rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50" onClick={() => navigate('/projects')}>
          Back to Projects
        </button>
      </div>

      <div className="mb-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold mb-3">Add new card</h2>
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              value={newCard.title}
              onChange={(e) => setNewCard({ ...newCard, title: e.target.value })}
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 focus:border-slate-500 focus:outline-none"
              placeholder="Card title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={newCard.description}
              onChange={(e) => setNewCard({ ...newCard, description: e.target.value })}
              className="w-full min-h-25 rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 focus:border-slate-500 focus:outline-none"
              placeholder="Optional details"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Stage</label>
            <select
              value={newCard.stage}
              onChange={(e) => setNewCard({ ...newCard, stage: e.target.value })}
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 focus:border-slate-500 focus:outline-none"
            >
              {stages.map((stage) => (
                <option key={stage} value={stage}>
                  {stageLabels[stage]}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-6 py-3 text-white font-semibold hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70" disabled={loading}>
            {loading ? 'Saving...' : 'Create card'}
          </button>
        </form>
      </div>

      {error && <div className="mb-4 rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700">{error}</div>}

      <div className="grid gap-4 lg:grid-cols-4">
        {stages.map((stage) => (
          <div key={stage} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <h3 className="mb-3 text-lg font-semibold">{stageLabels[stage]}</h3>
            <div className="space-y-3 min-h-50">
              {cardsByStage[stage]?.length ? (
                cardsByStage[stage].map((card) => (
                  <div key={card.id} className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
                    <div className="mb-2 flex items-start justify-between gap-3">
                      <div>
                        <h4 className="text-sm font-semibold">{card.title}</h4>
                        <p className="text-xs text-slate-500">Updated {new Date(card.updatedAt).toLocaleString()}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDelete(card.id)}
                        className="text-sm text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
                    <p className="mb-3 text-sm text-slate-600">{card.description || 'No description provided.'}</p>
                    <div className="flex flex-wrap gap-2">
                      {stages.map((nextStage) => (
                        <button
                          type="button"
                          key={nextStage}
                          disabled={nextStage === card.stage}
                          onClick={() => handleStageChange(card, nextStage)}
                          className={`rounded px-2 py-1 text-xs ${nextStage === card.stage ? 'bg-slate-200 text-slate-600' : 'bg-slate-100 text-slate-800 hover:bg-slate-200'}`}
                        >
                          {nextStage === card.stage ? 'Current' : `Move to ${stageLabels[nextStage]}`}
                        </button>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500">No cards yet.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkflowPage;
