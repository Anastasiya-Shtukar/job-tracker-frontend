import { useState } from "react";

const JobForm = ({ onAddJob }) => {
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const form = evt.target;
    const formData = new FormData(form);

    const title = formData.get("title").trim();
    const company = formData.get("company").trim();
    const details = formData.get("details").trim();

    if (!title || !company) {
      setError("All fields are required");
      return;
    }

    const newJob = {
      title,
      company,
      details,
      status: "applied",
    };

    try {
      setIsSubmitting(true);
      await onAddJob(newJob);
      form.reset();
      form.elements.title.focus();
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

        <div className="form-group">
          <label className="form-label" htmlFor="details">
            Details
          </label>
          <input
            className="form-input"
            id="details"
            type="text"
            name="details"
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
