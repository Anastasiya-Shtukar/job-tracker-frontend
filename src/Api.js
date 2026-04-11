const API = "http://localhost:3000/jobs";

const fetchJobs = async () => {
  const response = await fetch(API);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to fetch jobs");
  }

  return data;
};

const deleteJob = async (id) => {
  const response = await fetch(`${API}/${id}`, {
    method: "DELETE",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to delete jobs");
  }

  return data;
};

const updateJob = async (id, updates) => {
  const response = await fetch(`${API}/${id}`, {
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
  const response = await fetch(API, {
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

export { fetchJobs, createJob, deleteJob, updateJob };
