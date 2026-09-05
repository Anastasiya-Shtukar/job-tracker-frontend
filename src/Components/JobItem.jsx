import { useState, useEffect, useRef } from "react";

const statusClass = {
  applied: "status-applied",
  interview: "status-interview",
  rejected: "status-rejected",
};

const formatDate = (dateValue) => {
  if (!dateValue) return "";

  return new Date(dateValue).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const JobItem = ({
  title,
  company,
  status,
  job_url,
  details,
  created_at,
  updated_at,
  onDelete,
  id,
  onStatusChange,
  onUpdate,
  deletingJobId,
  updatingJobId,
  highlightedJobId,
}) => {
  const ref = useRef(null);
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false);
  const isLongDetails = details?.length > 180;
  const lessDetails = details?.slice(0, 180);

  useEffect(() => {
    if (id === highlightedJobId && ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [id, highlightedJobId]);

  const isUpdated =
    created_at &&
    updated_at &&
    new Date(updated_at).getTime() !== new Date(created_at).getTime();

  return (
    <article
      className={`job-card ${id === highlightedJobId ? "highlighted-job" : ""}`}
      ref={id === highlightedJobId ? ref : null}
    >
      <div className="job-card-header">
        <div className="job-card-heading">
          <h3 className="job-title">{title}</h3>
          <p className="job-company">{company}</p>
        </div>

        <span className={`status-badge ${statusClass[status]}`}>{status}</span>
      </div>

      <div className="job-meta">
        <span className="job-meta-item">Added {formatDate(created_at)}</span>

        {isUpdated && (
          <span className="job-meta-item">
            Updated {formatDate(updated_at)}
          </span>
        )}

        <a
          className="job-link"
          href={job_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          View offer
        </a>
      </div>

      {details && (
        <div className="job-details-section">
          <p className="job-details-label">Details</p>
          {!isLongDetails ? (
            <p className="job-details">{details}</p>
          ) : isDetailsExpanded ? (
            <div>
              <p className="job-details">{details}</p>
              <button
                type="button"
                className="details-toggle-button"
                onClick={() => setIsDetailsExpanded(false)}
              >
                Show less
              </button>
            </div>
          ) : (
            <div>
              <p className="job-details">{lessDetails}...</p>
              <button
                type="button"
                className="details-toggle-button"
                onClick={() => setIsDetailsExpanded(true)}
              >
                Show more
              </button>
            </div>
          )}
        </div>
      )}

      <div className="job-actions">
        <div className="job-status-control">
          <label className="job-status-label" htmlFor={`status-${id}`}>
            Status
          </label>

          <select
            id={`status-${id}`}
            className="job-status-select"
            name="status"
            value={status}
            onChange={(e) => onStatusChange(id, e.target.value)}
            disabled={updatingJobId === id}
          >
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div className="job-action-buttons">
          <button
            type="button"
            className="secondary-button job-edit-button"
            onClick={() => onUpdate(id)}
            disabled={updatingJobId === id || deletingJobId === id}
          >
            Edit
          </button>

          <button
            type="button"
            className="delete-button"
            onClick={() => onDelete(id)}
            disabled={deletingJobId === id}
          >
            {deletingJobId === id ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </article>
  );
};

export default JobItem;
