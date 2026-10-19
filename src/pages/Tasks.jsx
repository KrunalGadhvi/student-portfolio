import React, { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../api';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';
import Toast from '../components/Toast';

/**
 * Tasks Page Component - Practical 6: Full Stack Integration React + Node + MongoDB
 * 
 * Features:
 * 1. Synchronizes frontend state with Express/MongoDB backend via central `api.js`.
 * 2. Full CRUD: Create, Read, Update, Delete.
 * 3. Supplementary 1: Optimistic UI updates on task creation.
 * 4. Supplementary 2: Confirmation modal before task deletion.
 * 5. Supplementary 3: Toast notification system for operation feedback.
 */
function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [submitting, setSubmitting] = useState(false);

  // Supplementary 2: Delete confirmation modal state
  const [taskToDelete, setTaskToDelete] = useState(null);

  // Supplementary 3: Toast notification state
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Fetch tasks on mount
  const loadTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTasks();
      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Unable to connect to backend server on port 5000');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // Handle Create Task with Optimistic UI Update (Supplementary Problem 1)
  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const tempId = `temp-${Date.now()}`;
    const optimisticTask = {
      _id: tempId,
      title: title.trim(),
      description: description.trim(),
      priority,
      completed: false,
      createdAt: new Date().toISOString(),
      isOptimistic: true
    };

    // Optimistically prepend to UI immediately
    setTasks((prev) => [optimisticTask, ...prev]);
    setTitle('');
    setDescription('');
    setPriority('medium');
    setSubmitting(true);

    try {
      const savedTask = await createTask({
        title: optimisticTask.title,
        description: optimisticTask.description,
        priority: optimisticTask.priority
      });

      // Replace optimistic placeholder with real MongoDB document
      setTasks((prev) =>
        prev.map((t) => (t._id === tempId ? savedTask : t))
      );
      showToast('Task created and saved to MongoDB!', 'success');
    } catch (err) {
      // Revert optimistic update on failure
      setTasks((prev) => prev.filter((t) => t._id !== tempId));
      showToast(`Creation failed: ${err.message}`, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  // Handle Toggle Task Completion (PUT)
  const handleToggleComplete = async (task) => {
    const updatedStatus = !task.completed;
    // Optimistic toggle
    setTasks((prev) =>
      prev.map((t) => (t._id === task._id ? { ...t, completed: updatedStatus } : t))
    );

    try {
      await updateTask(task._id, { completed: updatedStatus });
      showToast(`Task marked as ${updatedStatus ? 'completed' : 'pending'}`, 'success');
    } catch (err) {
      // Revert on failure
      setTasks((prev) =>
        prev.map((t) => (t._id === task._id ? { ...t, completed: task.completed } : t))
      );
      showToast(`Update failed: ${err.message}`, 'error');
    }
  };

  // Handle Delete Confirmation (Supplementary Problem 2)
  const confirmDelete = async () => {
    if (!taskToDelete) return;
    const id = taskToDelete._id;
    const originalTasks = [...tasks];

    // Optimistically remove
    setTasks((prev) => prev.filter((t) => t._id !== id));
    setTaskToDelete(null);

    try {
      await deleteTask(id);
      showToast('Task removed from MongoDB', 'success');
    } catch (err) {
      setTasks(originalTasks);
      showToast(`Delete failed: ${err.message}`, 'error');
    }
  };

  return (
    <div className="page-transition tasks-page container section-block">
      {/* Supplementary 3: Toast Notification */}
      <Toast 
        message={toast.message} 
        type={toast.type} 
        onClose={() => setToast({ message: '', type: 'success' })} 
      />

      <div className="section-header">
        <span className="section-eyebrow">Practical 6: Full Stack Integration</span>
        <h1 className="section-title">MongoDB Task Manager</h1>
        <p className="section-subtitle">
          Real-time end-to-end synchronization between React (port 5173), Express (port 5000), and MongoDB.
        </p>
      </div>

      <div className="tasks-dashboard-layout">
        {/* Task Creation Form Card */}
        <div className="task-form-panel">
          <h2 className="card-title">Add New Task</h2>
          <form onSubmit={handleCreateTask} className="task-input-form">
            <div className="form-group">
              <label htmlFor="task-title-input">Task Title *</label>
              <input
                id="task-title-input"
                type="text"
                placeholder="e.g. Implement JWT Authentication"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="task-desc-input">Description</label>
              <textarea
                id="task-desc-input"
                rows="3"
                placeholder="Brief summary of requirements..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-input form-textarea"
              />
            </div>

            <div className="form-group">
              <label htmlFor="task-priority-select">Priority Level</label>
              <select
                id="task-priority-select"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="form-input"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting || !title.trim()}
              style={{ backgroundColor: '#6366f1', width: '100%', marginTop: '0.5rem' }}
            >
              {submitting ? 'Saving to Database...' : '+ Create Task (Optimistic UI)'}
            </button>
          </form>

          <div className="architecture-note-box">
            <span className="note-title">⚡ Full-Stack Lifecycle</span>
            <p className="note-text">
              1. <strong>UI Form</strong> → 2. <strong>POST /tasks</strong> → 3. <strong>Mongoose Validation</strong> → 4. <strong>MongoDB Storage</strong> → 5. <strong>UI State Sync</strong>
            </p>
          </div>
        </div>

        {/* Task List Panel */}
        <div className="tasks-list-panel">
          <div className="tasks-list-header">
            <h2 className="card-title">Live Task Feed ({tasks.length})</h2>
            <button
              type="button"
              onClick={loadTasks}
              className="btn btn-secondary btn-sm"
              title="Refresh from MongoDB"
            >
              🔄 Refresh
            </button>
          </div>

          {loading && <Spinner message="Querying MongoDB via Express API..." />}

          {error && !loading && (
            <ErrorMessage message={error} onRetry={loadTasks} />
          )}

          {!loading && !error && tasks.length === 0 && (
            <div className="empty-state-card">
              <p>No tasks found in the database. Create your first task using the form!</p>
            </div>
          )}

          {!loading && !error && tasks.length > 0 && (
            <div className="tasks-grid">
              {tasks.map((task) => (
                <div
                  key={task._id}
                  className={`task-item-card ${task.completed ? 'completed' : ''} ${task.isOptimistic ? 'optimistic-pulse' : ''}`}
                >
                  <div className="task-item-top">
                    <span className={`priority-badge priority-${task.priority || 'medium'}`}>
                      {task.priority || 'medium'}
                    </span>
                    <span className="task-date">
                      {task.createdAt ? new Date(task.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'}
                    </span>
                  </div>

                  <h3 className="task-item-title">{task.title}</h3>
                  {task.description && (
                    <p className="task-item-desc">{task.description}</p>
                  )}

                  <div className="task-item-actions">
                    <label className="checkbox-container">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => handleToggleComplete(task)}
                      />
                      <span className="checkbox-label">
                        {task.completed ? 'Completed' : 'Mark Complete'}
                      </span>
                    </label>

                    {/* Supplementary 2: Confirmation Dialog trigger */}
                    <button
                      type="button"
                      className="delete-task-btn"
                      onClick={() => setTaskToDelete(task)}
                      title="Delete task"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Supplementary Problem 2: Confirmation Dialog Modal */}
      {taskToDelete && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal-card">
            <h3 className="modal-title">Confirm Deletion</h3>
            <p className="modal-text">
              Are you sure you want to delete the task <strong>"{taskToDelete.title}"</strong> from MongoDB? This action cannot be undone.
            </p>
            <div className="modal-actions">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => setTaskToDelete(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={confirmDelete}
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TasksPage;
