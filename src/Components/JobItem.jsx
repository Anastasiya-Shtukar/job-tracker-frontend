import "./Components.css";

const statusClass = {
  applied: "status-applied",
  interview: "status-interview",
  rejected: "status-rejected",
};

const JobItem = ({ title, company, status, onDelete, id, onStatusChange }) => {
  return (
    <div>
      <div className="job-header">
        <h3 className="title">{title}</h3>
        <span className={`status-badge ${statusClass[status]}`}>{status}</span>
      </div>

      <p className="job-meta">company: {company}</p>
      <div className="job-actions">
        <button onClick={() => onDelete(id)}>Delete</button>
        <select
          name="status"
          value={status}
          onChange={(e) => onStatusChange(id, e.target.value)}
        >
          <option value={"applied"}>applied</option>
          <option value={"interview"}>interview</option>
          <option value={"rejected"}>rejected</option>
        </select>
      </div>
    </div>
  );
};

export default JobItem;
