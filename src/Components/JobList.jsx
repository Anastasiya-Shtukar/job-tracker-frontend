import "./Components.css";
import JobItem from "./JobItem";

const Item = ({ children }) => {
  return <li className="li-job">{children}</li>;
};

const JobsList = ({ jobs, onDelete }) => {
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
            ></JobItem>
          </Item>
        );
      })}
    </ul>
  );
};

export default JobsList;
