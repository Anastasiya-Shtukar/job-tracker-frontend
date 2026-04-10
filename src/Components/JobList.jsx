import "./Components.css";
import JobItem from "./JobItem";

function JobsList({
  jobs,
  onDelete,
  onStatusChange,
  onUpdate,
  deletingJobId,
  updatingJobId,
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
          />
        </li>
      ))}
    </ul>
  );
}

export default JobsList;
