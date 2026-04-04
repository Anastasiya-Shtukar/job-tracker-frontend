import "./Components.css";
const StatusFilter = ({ selectedStatus, onSelectedStatus }) => {
  return (
    <select
      className="filter-select"
      name="status"
      value={selectedStatus}
      onChange={(e) => onSelectedStatus(e.target.value)}
    >
      <option value={"all"}>all</option>
      <option value={"applied"}>applied</option>
      <option value={"interview"}>interview</option>
      <option value={"rejected"}>rejected</option>
    </select>
  );
};

export default StatusFilter;
