const BASE_URL = import.meta.env.VITE_API_URL;

const fetchJobs = async (token) => {
  const response = await fetch(`${BASE_URL}/jobs`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to fetch jobs");
  }

  return data;
};

const deleteJob = async (id, token) => {
  const response = await fetch(`${BASE_URL}/jobs/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to delete jobs");
  }

  return data;
};

const updateJob = async (id, updates, token) => {
  const response = await fetch(`${BASE_URL}/jobs/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updates),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to save changes");
  }

  return data;
};

const createJob = async (newJob, token) => {
  const response = await fetch(`${BASE_URL}/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newJob),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to add vacancy");
  }

  return data.job;
};

const generateSuggestion = async (details) => {
  const response = await fetch(`${BASE_URL}/ai/suggest-details`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ details }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to generate response");
  }

  return data.suggestion;
};

const extractJobData = async (text, url) => {
  const response = await fetch(`${BASE_URL}/ai/extract-job`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text, url }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to generate response");
  }

  return data.job;
};

const registerUser = async (email, password) => {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Registration error");
  }

  return data;
};

const loginUser = async (email, password) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Login error");
  }

  return data;
};

const fetchCurrentUser = async (token) => {
  const response = await fetch(`${BASE_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to fetch user");
  }

  return data.user;
};

export {
  fetchJobs,
  createJob,
  deleteJob,
  updateJob,
  generateSuggestion,
  extractJobData,
  registerUser,
  loginUser,
  fetchCurrentUser,
};
