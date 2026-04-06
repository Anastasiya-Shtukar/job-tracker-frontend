import { useState, useEffect } from "react";
import JobsList from "./Components/JobList";
import JobForm from "./Components/jobForm";
import "./App.css";
import StatusFilter from "./Components/JobListControls";
import JobListControls from "./Components/JobListControls";
import EditModal from "./Components/EditModal";

function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("none");
  const [editingJob, setEditingJob] = useState(null);

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

  const onUpdate = (id) => {
    const jobToEdit = jobs.find((job) => job.id === id);
    setEditingJob(jobToEdit);
  };

  const handleSaveEdit = async (updateJob) => {
    const id = updateJob.id;
    const response = await fetch(`http://localhost:3000/jobs/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: updateJob.title,
        company: updateJob.company,
      }),
    });

    const saveJob = await response.json();

    setJobs((prev) =>
      prev.map((job) =>
        job.id === id
          ? { ...job, title: saveJob.title, company: saveJob.company }
          : job,
      ),
    );

    setEditingJob(null);
  };

  const onClose = () => {
    setEditingJob(null);
  };

  const normalizedQuery = searchQuery.toUpperCase().trim();

  let filteredJobs = jobs
    .filter((job) =>
      selectedStatus === "all" ? true : job.status === selectedStatus,
    )
    .filter((job) =>
      searchQuery === ""
        ? true
        : job.title.toUpperCase().includes(normalizedQuery) ||
          job.company.toUpperCase().includes(normalizedQuery),
    )
    .toSorted((a, b) => {
      if (sortOption === "none") {
        return 0;
      } else if (sortOption === "company-asc") {
        return a.company.localeCompare(b.company);
      } else {
        return b.company.localeCompare(a.company);
      }
    });

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
          <JobListControls
            selectedStatus={selectedStatus}
            onSelectedStatus={setSelectedStatus}
            searchQuery={searchQuery}
            onSearchQuery={setSearchQuery}
            sortOption={sortOption}
            onSortOption={setSortOption}
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
              onUpdate={onUpdate}
            />
          )}
        </div>
        <div className="app-section">
          <JobForm onAddJobs={addJobs} />
        </div>
        {editingJob !== null && (
          <EditModal
            job={editingJob}
            onSave={handleSaveEdit}
            onClose={onClose}
          />
        )}
      </div>
    </>
  );
}

export default App;
