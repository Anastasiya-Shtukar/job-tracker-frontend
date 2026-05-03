import JobItem from "./JobItem";

function JobsList({
  jobs,
  onDelete,
  onStatusChange,
  onUpdate,
  deletingJobId,
  updatingJobId,
  highlightedJobId,
}) {
  return (
    <ul className="jobs-list">
      {jobs.map((job) => (
        <li key={job.id} className="jobs-list-item">
          <JobItem
            {...job}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
            onUpdate={onUpdate}
            deletingJobId={deletingJobId}
            updatingJobId={updatingJobId}
            highlightedJobId={highlightedJobId}
          />
        </li>
      ))}
    </ul>
  );
}

export default JobsList;
