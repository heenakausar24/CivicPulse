import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as conceptService from '../../services/concept.service.js';

const types = ['CONCEPT', 'HYPOTHESIS', 'PAPER', 'EXPERIMENT', 'INSIGHT'];
const relationLabels = {
  SUPPORTS: 'Supports',
  CONTRADICTS: 'Contradicts',
  DERIVED_FROM: 'Derived from',
  LEADS_TO: 'Leads to',
};

const ConceptsPage = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [newNode, setNewNode] = useState({ label: '', type: 'CONCEPT', description: '' });
  const [newEdge, setNewEdge] = useState({ sourceId: '', targetId: '', relation: 'SUPPORTS' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

  const loadGraph = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await conceptService.getConceptGraph(projectId);
      setNodes(data.data.nodes || []);
      setEdges(data.data.edges || []);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Unable to load concept graph.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    loadGraph();
  }, [projectId, token, navigate]);

  const nodePositions = useMemo(() => {
    const columns = 3;
    return nodes.reduce((acc, node, index) => {
      const x = (index % columns) * 260 + 80;
      const y = Math.floor(index / columns) * 140 + 80;
      acc[node.id] = { x, y };
      return acc;
    }, {});
  }, [nodes]);

  const handleCreateNode = async (event) => {
    event.preventDefault();
    if (!newNode.label.trim()) {
      setError('Node label is required.');
      return;
    }
    try {
      setLoading(true);
      await conceptService.createConceptNode(projectId, newNode);
      setNewNode({ label: '', type: 'CONCEPT', description: '' });
      await loadGraph();
    } catch (err) {
      console.error(err);
      setError(err.message || 'Unable to create node.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEdge = async (event) => {
    event.preventDefault();
    if (!newEdge.sourceId || !newEdge.targetId) {
      setError('Source and target nodes are required.');
      return;
    }
    try {
      setLoading(true);
      await conceptService.createEdge(projectId, newEdge);
      setNewEdge({ sourceId: '', targetId: '', relation: 'SUPPORTS' });
      await loadGraph();
    } catch (err) {
      console.error(err);
      setError(err.message || 'Unable to create edge.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNode = async (nodeId) => {
    try {
      await conceptService.deleteConceptNode(projectId, nodeId);
      await loadGraph();
    } catch (err) {
      console.error(err);
      setError(err.message || 'Unable to delete node.');
    }
  };

  const handleDeleteEdge = async (edgeId) => {
    try {
      await conceptService.deleteEdge(projectId, edgeId);
      await loadGraph();
    } catch (err) {
      console.error(err);
      setError(err.message || 'Unable to delete edge.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-semibold">Concept Graph</h1>
          <p className="text-sm text-slate-500">Visualize concepts, hypotheses, experiments, and insights for this project.</p>
        </div>
        <button
          type="button"
          className="rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
          onClick={() => navigate('/projects')}
        >
          Back to Projects
        </button>
      </div>

      {error && <div className="mb-4 rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700">{error}</div>}

      <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
        <div>
          <div className="mb-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Graph view</h2>
            <div className="relative h-130 overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 840 520" preserveAspectRatio="none">
                {edges.map((edge) => {
                  const source = nodePositions[edge.sourceId];
                  const target = nodePositions[edge.targetId];
                  if (!source || !target) return null;
                  return (
                    <g key={edge.id}>
                      <line
                        x1={source.x}
                        y1={source.y}
                        x2={target.x}
                        y2={target.y}
                        stroke="#94a3b8"
                        strokeWidth="2"
                        markerEnd="url(#arrow)"
                      />
                      <text x={(source.x + target.x) / 2} y={(source.y + target.y) / 2 - 10} fill="#334155" fontSize="10" textAnchor="middle">
                        {relationLabels[edge.relation] || edge.relation}
                      </text>
                    </g>
                  );
                })}
                <defs>
                  <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto-start-reverse">
                    <path d="M0,0 L8,4 L0,8" fill="#475569" />
                  </marker>
                </defs>
              </svg>

              {nodes.map((node, index) => {
                const position = nodePositions[node.id] || { x: 80, y: 80 };
                return (
                  <div
                    key={node.id}
                    className="absolute w-56 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm"
                    style={{ left: position.x - 100, top: position.y - 40 }}
                  >
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-600">
                        {node.type.toLowerCase()}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleDeleteNode(node.id)}
                        className="text-xs font-semibold text-red-600 hover:text-red-800"
                      >
                        delete
                      </button>
                    </div>
                    <h3 className="text-sm font-semibold text-slate-900">{node.label}</h3>
                    <p className="mt-2 text-sm text-slate-600">{node.description || 'No description added.'}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Edges</h2>
            {edges.length === 0 ? (
              <p className="text-sm text-slate-600">No relationships created yet.</p>
            ) : (
              <div className="space-y-3">
                {edges.map((edge) => (
                  <div key={edge.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm text-slate-700">
                          <span className="font-semibold">{nodes.find((n) => n.id === edge.sourceId)?.label || 'Unknown'}</span>
                          {' '}→{' '}
                          <span className="font-semibold">{nodes.find((n) => n.id === edge.targetId)?.label || 'Unknown'}</span>
                        </p>
                        <p className="text-xs text-slate-500">{relationLabels[edge.relation] || edge.relation}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeleteEdge(edge.id)}
                        className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700 hover:bg-red-100"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Add node</h2>
            <form onSubmit={handleCreateNode} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Label</label>
                <input
                  value={newNode.label}
                  onChange={(event) => setNewNode({ ...newNode, label: event.target.value })}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3"
                  placeholder="New concept or hypothesis"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Type</label>
                <select
                  value={newNode.type}
                  onChange={(event) => setNewNode({ ...newNode, type: event.target.value })}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3"
                >
                  {types.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                <textarea
                  value={newNode.description}
                  onChange={(event) => setNewNode({ ...newNode, description: event.target.value })}
                  className="w-full min-h-24 rounded-2xl border border-slate-300 px-4 py-3"
                  placeholder="Optional details"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-6 py-3 text-white font-semibold hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
              >
                Add node
              </button>
            </form>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Add relationship</h2>
            <form onSubmit={handleCreateEdge} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Source node</label>
                <select
                  value={newEdge.sourceId}
                  onChange={(event) => setNewEdge({ ...newEdge, sourceId: event.target.value })}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3"
                >
                  <option value="">Select source</option>
                  {nodes.map((node) => (
                    <option key={node.id} value={node.id}>{node.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Target node</label>
                <select
                  value={newEdge.targetId}
                  onChange={(event) => setNewEdge({ ...newEdge, targetId: event.target.value })}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3"
                >
                  <option value="">Select target</option>
                  {nodes.map((node) => (
                    <option key={node.id} value={node.id}>{node.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Relation</label>
                <select
                  value={newEdge.relation}
                  onChange={(event) => setNewEdge({ ...newEdge, relation: event.target.value })}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3"
                >
                  {Object.entries(relationLabels).map(([relation, label]) => (
                    <option key={relation} value={relation}>{label}</option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-6 py-3 text-white font-semibold hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
              >
                Add relationship
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConceptsPage;
