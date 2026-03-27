import "./Components.css";

const statusClass = {
  applied: "status-applied",
  interview: "status-interview",
  rejected: "status-rejected",
};

const JobItem = ({ title, company, status }) => {
  return (
    <div>
      <h3 className="title">{title}</h3>
      <p>company: {company}</p>
      <span className={statusClass[status]}>{status}</span>
    </div>
  );
};

export default JobItem;
