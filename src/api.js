/**
 * Central API Client for Backend Communication
 * Practical 6: Full Stack Integration React + Node + MongoDB
 */

export const BASE_URL = 'http://localhost:5000';

/**
 * Fetch all tasks from Express / MongoDB backend
 */
export const getTasks = async () => {
  const response = await fetch(`${BASE_URL}/tasks`);
  if (!response.ok) {
    throw new Error(`Failed to fetch tasks: ${response.status} ${response.statusText}`);
  }
  return response.json();
};

/**
 * Create a new task via POST /tasks
 */
export const createTask = async (taskData) => {
  const response = await fetch(`${BASE_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(taskData)
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || errorData.error || 'Failed to create task');
  }
  return response.json();
};

/**
 * Update an existing task via PUT /tasks/:id
 */
export const updateTask = async (id, updates) => {
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updates)
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || errorData.error || 'Failed to update task');
  }
  return response.json();
};

/**
 * Delete a task via DELETE /tasks/:id
 */
export const deleteTask = async (id) => {
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || errorData.error || 'Failed to delete task');
  }
  return response.json();
};

/**
 * Generate AI Task Description
 * Practical 13: Calls backend /api/ai/generate-description
 */
export const generateAiDescription = async (title) => {
  const response = await fetch(`${BASE_URL}/api/ai/generate-description`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title })
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || errorData.error || 'Failed to generate AI description');
  }
  return response.json();
};
