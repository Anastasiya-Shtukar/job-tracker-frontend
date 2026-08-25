const JobStats = ({ total, applied, interview, rejected }) => {
  return (
    <div className="job-stats">
      <div className="stat-card">
        <p className="stat-label">Applications</p>
        <p className="stat-value">{total}</p>
      </div>

      <div className="stat-card">
        <p className="stat-label">Applied</p>
        <p className="stat-value">{applied}</p>
      </div>

      <div className="stat-card">
        <p className="stat-label">Interviews</p>
        <p className="stat-value">{interview}</p>
      </div>

      <div className="stat-card">
        <p className="stat-label">Rejected</p>
        <p className="stat-value">{rejected}</p>
      </div>
    </div>
  );
};

export default JobStats;
