import { useState, useEffect } from "react";
import JobsList from "./Components/JobList";
import JobForm from "./Components/jobForm";
import "./App.css";
import StatusFilter from "./Components/StatusFilter";

function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("all");

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
  let filteredJobs = [];

  if (selectedStatus === "all") {
    filteredJobs = jobs;
  } else {
    filteredJobs = jobs.filter((job) => job.status === selectedStatus);
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <div className="app">
        <h1 className="app-title">AI Job Tracker</h1>
        <div className="app-controls">
          <StatusFilter
            selectedStatus={selectedStatus}
            onSelectedStatus={setSelectedStatus}
          />
        </div>

        <div className="app-section">
          {filteredJobs.length === 0 ? (
            <p className="empty-state">
              You haven’t added any jobs in this category
            </p>
          ) : (
            <JobsList
              jobs={filteredJobs}
              onDelete={deleteJob}
              onStatusChange={statusChange}
            />
          )}
        </div>
        <div className="app-section">
          <JobForm onAddJobs={addJobs} />
        </div>
      </div>
    </>
  );
}

export default App;
