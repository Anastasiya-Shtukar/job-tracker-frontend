import { useState, useEffect } from "react";
import JobsList from "./Components/JobList";
import JobForm from "./Components/JobForm";
import AuthForm from "./Components/AuthForm";
import {
  fetchJobs,
  createJob,
  deleteJob,
  updateJob,
  loginUser,
  registerUser,
  fetchCurrentUser,
} from "./Api";
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
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [authMode, setAuthMode] = useState("login");
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const clearSession = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setJobs([]);
  };

  const handleLogin = async (email, password) => {
    const data = await loginUser(email, password);

    localStorage.setItem("token", data.token);
    setToken(data.token);
    setUser(data.user);
    toast.success("Logged in");
  };

  const handleRegister = async (email, password) => {
    await registerUser(email, password);
    const loginData = await loginUser(email, password);

    localStorage.setItem("token", loginData.token);
    setToken(loginData.token);
    setUser(loginData.user);
    toast.success("Account created and logged in");
  };

  const handleLogout = () => {
    clearSession();
  };

  const toggleAuthMode = () => {
    setAuthMode((prev) => (prev === "login" ? "register" : "login"));
  };

  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        setIsAuthLoading(false);
        return;
      }

      try {
        const userData = await fetchCurrentUser(token);
        setUser(userData);
      } catch (err) {
        if (err.message === "Unauthorized") {
          clearSession();
        }
      } finally {
        setIsAuthLoading(false);
      }
    };

    loadUser();
  }, [token]);

  useEffect(() => {
    const loadJobs = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError(null);

        const data = await fetchJobs(token);

        setJobs(data);
      } catch (err) {
        if (err.message === "Unauthorized") {
          clearSession();
          toast.error("Session expired. Please log in again.");
          return;
        }

        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadJobs();
  }, [token]);

  const addJob = async (newJob) => {
    try {
      const data = await createJob(newJob, token);

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
      if (error.message === "Unauthorized") {
        clearSession();
      }
      throw error;
    }
  };

  const handleDeleteJob = async (id) => {
    try {
      setError(null);
      setDeletingJobId(id);

      await deleteJob(id, token);

      setJobs((prev) => prev.filter((job) => job.id !== id));
      toast.success("Job deleted");
    } catch (error) {
      setError(error.message);
      if (error.message === "Unauthorized") {
        clearSession();
      }
      toast.error(error.message);
    } finally {
      setDeletingJobId(null);
    }
  };

  const statusChange = async (id, newStatus) => {
    try {
      setUpdatingJobId(id);
      setError(null);

      const data = await updateJob(id, { status: newStatus }, token);

      setJobs((prev) =>
        prev.map((job) =>
          job.id === id ? { ...job, status: data.status } : job,
        ),
      );
      toast.success("Status updated");
    } catch (error) {
      setError(error.message);
      if (error.message === "Unauthorized") {
        clearSession();
      }
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

      const data = await updateJob(
        id,
        {
          title: updatedJob.title,
          company: updatedJob.company,
          details: updatedJob.details,
        },
        token,
      );

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
      if (error.message === "Unauthorized") {
        clearSession();
      }
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

  if (isAuthLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (!token) {
    return (
      <>
        <Toaster position="top-center" />
        <AuthForm
          mode={authMode}
          onLogin={handleLogin}
          onRegister={handleRegister}
          onToggleMode={toggleAuthMode}
        />
      </>
    );
  }

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
      <div className="app">
        <div className="app-header">
          <h1 className="app-title">AI Job Tracker</h1>

          <div className="app-user-actions">
            <span className="user-email">
              {user ? user.email : "Loading user..."}
            </span>

            <button
              onClick={handleLogout}
              className="secondary-button logout-button"
            >
              Logout
            </button>
          </div>
        </div>

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
