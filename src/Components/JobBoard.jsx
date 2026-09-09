import JobItem from "./JobItem";

function JobBoard({
  jobs,
  onDelete,
  onStatusChange,
  onUpdate,
  deletingJobId,
  updatingJobId,
  highlightedJobId,
}) {
  const appliedJobs = jobs.filter((job) => job.status === "applied");
  const interviewJobs = jobs.filter((job) => job.status === "interview");
  const rejectedJobs = jobs.filter((job) => job.status === "rejected");

  return (
    <div className="job-board">
      <div className="job-board-column">
        <h3>Applied</h3>

        {appliedJobs.map((job) => (
          <JobItem
            key={job.id}
            {...job}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
            onUpdate={onUpdate}
            deletingJobId={deletingJobId}
            updatingJobId={updatingJobId}
            highlightedJobId={highlightedJobId}
          />
        ))}
      </div>

      <div className="job-board-column">
        <h3>Interview</h3>

        {interviewJobs.map((job) => (
          <JobItem
            key={job.id}
            {...job}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
            onUpdate={onUpdate}
            deletingJobId={deletingJobId}
            updatingJobId={updatingJobId}
            highlightedJobId={highlightedJobId}
          />
        ))}
      </div>

      <div className="job-board-column">
        <h3>Rejected</h3>

        {rejectedJobs.map((job) => (
          <JobItem
            key={job.id}
            {...job}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
            onUpdate={onUpdate}
            deletingJobId={deletingJobId}
            updatingJobId={updatingJobId}
            highlightedJobId={highlightedJobId}
          />
        ))}
      </div>
    </div>
  );
}

export default JobBoard;
