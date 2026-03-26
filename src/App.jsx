import { useState, useEffect } from "react";
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

  const statusClass = {
    applied: "status-applied",
    interview: "status-interview",
    rejected: "status-rejected",
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (jobs.length === 0) {
    return <p>No jobs yet</p>;
  }

  return (
    <ul className="ul-jobs">
      {jobs.map((job) => (
        <li key={job.id} className="li-job">
          <h3>{job.title}</h3>
          <p>{job.company}</p>
          <span className={statusClass[job.status]}>{job.status}</span>
        </li>
      ))}
    </ul>
  );
}

export default App;
