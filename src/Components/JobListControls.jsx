const JobListControls = ({
  selectedStatus,
  onSelectedStatus,
  searchQuery,
  onSearchQuery,
  sortOption,
  onSortOption,
}) => {
  return (
    <div className="controls-grid">
      <div className="control-group">
        <label className="control-label" htmlFor="status">
          Filter by status
        </label>
        <select
          id="status"
          className="control-select"
          name="status"
          value={selectedStatus}
          onChange={(e) => onSelectedStatus(e.target.value)}
        >
          <option value="all">all</option>
          <option value="applied">applied</option>
          <option value="interview">interview</option>
          <option value="rejected">rejected</option>
        </select>
      </div>

      <div className="control-group">
        <label className="control-label" htmlFor="search">
          Search
        </label>
        <input
          id="search"
          className="control-input"
          value={searchQuery}
          name="search"
          type="text"
          placeholder="Search by title or company"
          onChange={(e) => onSearchQuery(e.target.value)}
        />
      </div>

      <div className="control-group">
        <label className="control-label" htmlFor="sort">
          Sort by
        </label>
        <select
          id="sort"
          className="control-select"
          name="sort"
          value={sortOption}
          onChange={(e) => onSortOption(e.target.value)}
        >
          <option value="none">None</option>
          <option value="created-desc">Newest first</option>
          <option value="created-asc">Oldest first</option>
          <option value="company-asc">Company (A-Z)</option>
          <option value="company-desc">Company (Z-A)</option>
        </select>
      </div>
    </div>
  );
};

export default JobListControls;
