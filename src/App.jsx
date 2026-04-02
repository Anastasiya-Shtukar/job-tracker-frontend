import { useState, useEffect } from "react";
import JobsList from "./Components/JobList";
import JobForm from "./Components/jobForm";
import "./App.css";

function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("http://localhost:3000/jobs");

        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }

        const data = await response.json();
        setJobs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadJobs();
  }, []);

  const addJobs = (newJob) => {
    setJobs((prevJobs) => [...prevJobs, newJob]);
  };

  const deleteJob = async (id) => {
    const response = await fetch(`http://localhost:3000/jobs/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const job = await response.json();

    setJobs((prev) => prev.filter((job) => job.id !== id));
  };

  const statusChange = async (id, newStatus) => {
    const response = await fetch(`http://localhost:3000/jobs/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    });

    const updateStatus = await response.json();
    setJobs((prev) =>
      prev.map((job) => (job.id === id ? { ...job, status: newStatus } : job)),
    );
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (jobs.length === 0) {
    return (
      <>
        <p>No jobs yet</p>
        <JobForm onAddJobs={addJobs} />
      </>
    );
  }

  return (
    <>
      <JobsList
        jobs={jobs}
        onDelete={deleteJob}
        onStatusChange={statusChange}
      ></JobsList>
      <JobForm onAddJobs={addJobs} />
    </>
  );
}

export default App;
