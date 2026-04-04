import "./Components.css";
import JobItem from "./JobItem";

const Item = ({ children }) => {
  return <li className="job-card">{children}</li>;
};

const JobsList = ({ jobs, onDelete, onStatusChange }) => {
  return (
    <ul className="jobs-list">
      {jobs.map((job) => {
        return (
          <Item key={job.id}>
            <JobItem
              status={job.status}
              company={job.company}
              title={job.title}
              id={job.id}
              onDelete={onDelete}
              onStatusChange={onStatusChange}
            ></JobItem>
          </Item>
        );
      })}
    </ul>
  );
};

export default JobsList;
