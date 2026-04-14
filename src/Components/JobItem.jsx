import "./Components.css";

const statusClass = {
  applied: "status-applied",
  interview: "status-interview",
  rejected: "status-rejected",
};

const JobItem = ({
  title,
  company,
  status,
  details,
  onDelete,
  id,
  onStatusChange,
  onUpdate,
  deletingJobId,
  updatingJobId,
}) => {
  return (
    <div className="job-card">
      <div className="job-card-header">
        <div>
          <h3 className="job-title">{title}</h3>
          <p className="job-company">Company: {company}</p>
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
