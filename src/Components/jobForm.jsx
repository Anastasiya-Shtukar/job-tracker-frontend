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
    <form onSubmit={handleSubmit} className="form-row">
      <input type="text" name="title" />
      <input type="text" name="company" />
      <button type="submit">submit</button>
    </form>
  );
};

export default JobForm;
