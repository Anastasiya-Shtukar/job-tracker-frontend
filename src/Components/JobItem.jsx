import "./Components.css";

const statusClass = {
  applied: "status-applied",
  interview: "status-interview",
  rejected: "status-rejected",
};

const JobItem = ({ title, company, status, onDelete, id }) => {
  return (
    <div>
      <h3 className="title">{title}</h3>
      <p>company: {company}</p>
      <span className={statusClass[status]}>{status}</span>
      <button onClick={() => onDelete(id)}>Delete</button>
    </div>
  );
};

export default JobItem;
