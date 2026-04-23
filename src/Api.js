const BASE_URL = import.meta.env.VITE_API_URL;

const fetchJobs = async () => {
  const response = await fetch(`${BASE_URL}/jobs`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to fetch jobs");
  }

  return data;
};

const deleteJob = async (id) => {
  const response = await fetch(`${BASE_URL}/jobs/${id}`, {
    method: "DELETE",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to delete jobs");
  }

  return data;
};

const updateJob = async (id, updates) => {
  const response = await fetch(`${BASE_URL}/jobs/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to save changes");
  }

  return data;
};

const createJob = async (newJob) => {
  const response = await fetch(`${BASE_URL}/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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

export { fetchJobs, createJob, deleteJob, updateJob, generateSuggestion };
