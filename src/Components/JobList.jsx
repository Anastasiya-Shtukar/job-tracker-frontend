import "./Components.css";
import JobItem from "./JobItem";

const Item = ({ children }) => {
  return <li className="li-job">{children}</li>;
};

const JobsList = ({ jobs, onDelete, onStatusChange }) => {
  return (
    <ul className="ul-jobs">
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
