import "./Components.css";

const statusClass = {
  applied: "status-applied",
  interview: "status-interview",
  rejected: "status-rejected",
};

const JobItem = ({ title, company, status, onDelete, id, onStatusChange }) => {
  return (
    <div>
      <h3 className="title">{title}</h3>
      <p>company: {company}</p>
      <span className={statusClass[status]}>{status}</span>
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
  );
};

export default JobItem;
