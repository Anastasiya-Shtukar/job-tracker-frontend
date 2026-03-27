import "./Components.css";
import JobItem from "./JobItem";

const Item = ({ children }) => {
  return <li className="li-job">{children}</li>;
};

const JobsList = ({ jobs }) => {
  return (
    <ul className="ul-jobs">
      {jobs.map((job) => {
        return (
          <Item key={job.id}>
            <JobItem
              status={job.status}
              company={job.company}
              title={job.title}
            ></JobItem>
          </Item>
        );
      })}
    </ul>
  );
};

export default JobsList;
