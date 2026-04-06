const JobForm = ({ onAddJobs }) => {
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const form = evt.target;
    const formData = new FormData(form);

    let title = formData.get("title");
    let company = formData.get("company");

    const newJob = {
      title,
      company,
      status: "applied",
    };

    if (!title || !company) {
      return;
    }

    const response = await fetch("http://localhost:3000/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newJob),
    });

    const createdJob = await response.json();
    onAddJobs(createdJob.job);

    form.reset();

    console.log(createdJob);
  };

  return (
    <div className="job-form-container">
      <p className="job-form-title">Add a new vacancy</p>

      <form onSubmit={handleSubmit} className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="title">
            Name
          </label>
          <input className="form-input" id="title" type="text" name="title" />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="company">
            Company
          </label>
          <input
            className="form-input"
            id="company"
            type="text"
            name="company"
          />
        </div>

        <button className="primary-button form-submit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default JobForm;
