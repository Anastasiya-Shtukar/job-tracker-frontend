import { useState } from "react";

const JobForm = ({ onAddJobs }) => {
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      setIsSubmitting(true);
      setError(null);

      const form = evt.target;
      const formData = new FormData(form);

      let title = formData.get("title").trim();
      let company = formData.get("company").trim();

      const newJob = {
        title,
        company,
        status: "applied",
      };

      if (!title || !company) {
        setError("All fields are required");
        return;
      }

      const response = await fetch("http://localhost:3000/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newJob),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to add vacancy");
      }

      onAddJobs(data.job);
      form.reset();
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="job-form-container">
      <p className="job-form-title">Add a new vacancy</p>

      <form onSubmit={handleSubmit} className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="title">
            Name
          </label>
          <input
            className="form-input"
            id="title"
            type="text"
            name="title"
            onChange={() => setError(null)}
          />
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
            onChange={() => setError(null)}
          />
        </div>

        <button
          disabled={isSubmitting}
          className="primary-button form-submit"
          type="submit"
        >
          Submit
        </button>
      </form>
      {error && <div className="form-error">{error}</div>}
    </div>
  );
};

export default JobForm;
