import { useEffect, useRef } from "react";

const statusClass = {
  applied: "status-applied",
  interview: "status-interview",
  rejected: "status-rejected",
};

const JobItem = ({
  title,
  company,
  status,
  job_url,
  details,
  onDelete,
  id,
  onStatusChange,
  onUpdate,
  deletingJobId,
  updatingJobId,
  highlightedJobId,
}) => {
  const ref = useRef(null);

  useEffect(() => {
    if (id === highlightedJobId && ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, []);

  return (
    <div
      className={`job-card ${id === highlightedJobId && "highlighted-job"}`}
      ref={id === highlightedJobId ? ref : null}
    >
      <div className="job-card-header">
        <div>
          <h3 className="job-title">{title}</h3>
          <p className="job-company">Company: {company}</p>
          <a
            className="job-link"
            href={job_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            🔗 View offer
          </a>
          {details !== "" && <p className="job-details">Details: {details}</p>}
        </div>

        <span className={`status-badge ${statusClass[status]}`}>{status}</span>
      </div>

      <div className="job-actions">
        <button
          className="delete-button"
          onClick={() => onDelete(id)}
          disabled={deletingJobId === id}
        >
          {deletingJobId === id ? "Deleting..." : "Delete"}
        </button>

        <select
          className="job-status-select"
          name="status"
          value={status}
          onChange={(e) => onStatusChange(id, e.target.value)}
          disabled={updatingJobId === id}
        >
          <option value="applied">applied</option>
          <option value="interview">interview</option>
          <option value="rejected">rejected</option>
        </select>
        <button
          className="delete-button"
          onClick={() => onUpdate(id)}
          disabled={updatingJobId === id || deletingJobId === id}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default JobItem;
