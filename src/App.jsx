import { useState, useEffect } from "react";
import JobsList from "./Components/JobList";
import JobForm from "./Components/jobForm";
import "./App.css";
import { fetchJobs, createJob, deleteJob, updateJob } from "./Api";
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
  const [deletingJobId, setDeletingJobId] = useState(null);
  const [updatingJobId, setUpdatingJobId] = useState(null);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchJobs();

        setJobs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadJobs();
  }, []);

  const addJob = async (newJob) => {
    const data = await createJob(newJob);

    setJobs((prevJobs) => [...prevJobs, data]);
  };

  const handleDeleteJob = async (id) => {
    try {
      setError(null);
      setDeletingJobId(id);

      await deleteJob(id);

      setJobs((prev) => prev.filter((job) => job.id !== id));
    } catch (error) {
      setError(error.message);
    } finally {
      setDeletingJobId(null);
    }
  };

  const statusChange = async (id, newStatus) => {
    try {
      setUpdatingJobId(id);
      setError(null);

      const data = await updateJob(id, { status: newStatus });

      setJobs((prev) =>
        prev.map((job) =>
          job.id === id ? { ...job, status: data.status } : job,
        ),
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setUpdatingJobId(null);
    }
  };

  const onUpdate = (id) => {
    const jobToEdit = jobs.find((job) => job.id === id);
    setEditingJob(jobToEdit);
  };

  const handleSaveEdit = async (updatedJob) => {
    setError(null);
    const id = updatedJob.id;

    const data = await updateJob(id, {
      title: updatedJob.title,
      company: updatedJob.company,
      details: updatedJob.details,
    });

    setJobs((prev) =>
      prev.map((job) =>
        job.id === id
          ? {
              ...job,
              title: data.title,
              company: data.company,
              details: data.details,
            }
          : job,
      ),
    );

    setEditingJob(null);
  };

  const onClose = () => {
    setEditingJob(null);
  };

  const normalizedQuery = searchQuery.toUpperCase().trim();

  let statusFilter = jobs.filter((job) =>
    selectedStatus === "all" ? true : job.status === selectedStatus,
  );

  let searchQueryFilter = statusFilter.filter((job) =>
    normalizedQuery === ""
      ? true
      : job.title.toUpperCase().includes(normalizedQuery) ||
        job.company.toUpperCase().includes(normalizedQuery),
  );

  let sortedJobs = searchQueryFilter.toSorted((a, b) => {
    if (sortOption === "none") {
      return 0;
    } else if (sortOption === "company-asc") {
      return a.company.localeCompare(b.company);
    } else {
      return b.company.localeCompare(a.company);
    }
  });

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
      <div className="app">
        <h1 className="app-title">AI Job Tracker</h1>
        {error && <div className="error-banner">{error}</div>}
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
          {jobs.length === 0 ? (
            <p className="empty-state">You don't have any vacancies yet</p>
          ) : statusFilter.length === 0 ? (
            <p className="empty-state">
              You don't have any vacancies with this status
            </p>
          ) : normalizedQuery !== "" && searchQueryFilter.length === 0 ? (
            <p className="empty-state">Nothing was found for your request</p>
          ) : (
            <JobsList
              jobs={sortedJobs}
              onDelete={handleDeleteJob}
              onStatusChange={statusChange}
              onUpdate={onUpdate}
              deletingJobId={deletingJobId}
              updatingJobId={updatingJobId}
            />
          )}
        </div>
        <div className="app-section">
          <JobForm onAddJob={addJob} />
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
