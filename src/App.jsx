import { useState, useEffect } from "react";
import JobsList from "./Components/JobList";
import JobForm from "./Components/JobForm";
import { fetchJobs, createJob, deleteJob, updateJob } from "./Api";
import JobListControls from "./Components/JobListControls";
import EditModal from "./Components/EditModal";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("created-desc");
  const [editingJob, setEditingJob] = useState(null);
  const [deletingJobId, setDeletingJobId] = useState(null);
  const [updatingJobId, setUpdatingJobId] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [highlightedJobId, setHighlightedJobId] = useState(null);

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
    try {
      const data = await createJob(newJob);

      setJobs((prevJobs) => [...prevJobs, data]);
      toast.success("Job added successfully");
      setHighlightedJobId(data.id);
      setTimeout(() => {
        setHighlightedJobId((currentId) =>
          currentId === data.id ? null : currentId,
        );
      }, 2000);
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  const handleDeleteJob = async (id) => {
    try {
      setError(null);
      setDeletingJobId(id);

      await deleteJob(id);

      setJobs((prev) => prev.filter((job) => job.id !== id));
      toast.success("Job deleted");
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
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
      toast.success("Status updated");
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    } finally {
      setUpdatingJobId(null);
    }
  };

  const onUpdate = (id) => {
    const jobToEdit = jobs.find((job) => job.id === id);
    setEditingJob(jobToEdit);
  };

  const handleSaveEdit = async (updatedJob) => {
    try {
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
      toast.success("Job updated");
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
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
    }

    if (sortOption === "company-asc") {
      return a.company.localeCompare(b.company);
    }

    if (sortOption === "company-desc") {
      return b.company.localeCompare(a.company);
    }

    if (sortOption === "created-desc") {
      return new Date(b.created_at) - new Date(a.created_at);
    }

    if (sortOption === "created-asc") {
      return new Date(a.created_at) - new Date(b.created_at);
    }

    return 0;
  });

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
      <Toaster position="top-center" />
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
          <div className="controls-actions">
            <button
              className="primary-button"
              type="button"
              onClick={() => setIsAddModalOpen(true)}
            >
              Add vacancy
            </button>
          </div>
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
              highlightedJobId={highlightedJobId}
            />
          )}
        </div>
        {editingJob !== null && (
          <EditModal
            job={editingJob}
            onSave={handleSaveEdit}
            onClose={onClose}
          />
        )}

        {isAddModalOpen && (
          <div
            className="background-modal"
            onClick={() => setIsAddModalOpen(false)}
          >
            <div
              className="modal add-job-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setIsAddModalOpen(false)}
              >
                ×
              </button>

              <JobForm
                onAddJob={async (newJob) => {
                  await addJob(newJob);
                  setIsAddModalOpen(false);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
