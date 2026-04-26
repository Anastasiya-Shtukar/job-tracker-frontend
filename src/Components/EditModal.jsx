import { useState } from "react";

const EditModal = ({ job, onSave, onClose }) => {
  const [title, setTitle] = useState(job.title);
  const [company, setCompany] = useState(job.company);
  const [details, setDetails] = useState(job.details);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const normalizedTitle = title.trim();
    const normalizedCompany = company.trim();
    const normalizedDetails = details.trim();

    if (!normalizedTitle || !normalizedCompany) {
      setError("All fields are required");
      return;
    }
    const updateJob = {
      ...job,
      title: normalizedTitle,
      company: normalizedCompany,
      details: normalizedDetails,
    };

    try {
      setError(null);
      setIsSubmitting(true);
      await onSave(updateJob);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="background-modal"
      onClick={() => {
        if (isSubmitting) {
          return;
        }
        onClose();
      }}
    >
      <div className="modal edit-modal" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close edit modal"
          disabled={isSubmitting}
        >
          ×
        </button>

        <form onSubmit={handleSubmit}>
          <h3>Editing the vacancy</h3>

          <label className="form-label" htmlFor="edit-title">
            Name
          </label>
          <input
            className="form-input"
            id="edit-title"
            type="text"
            name="title"
            value={title}
            disabled={isSubmitting}
            onChange={(e) => {
              setTitle(e.target.value);
              setError(null);
            }}
          />

          <label className="form-label" htmlFor="edit-company">
            Company
          </label>
          <input
            className="form-input"
            id="edit-company"
            type="text"
            name="company"
            value={company}
            disabled={isSubmitting}
            onChange={(e) => {
              setCompany(e.target.value);
              setError(null);
            }}
          />

          <label className="form-label" htmlFor="edit-details">
            Details
          </label>
          <input
            className="form-input"
            id="edit-details"
            type="text"
            name="details"
            value={details}
            disabled={isSubmitting}
            onChange={(e) => {
              setDetails(e.target.value);
              setError(null);
            }}
          />

          {error && <div className="form-error">{error}</div>}

          <div className="modal-actions">
            <button
              type="button"
              className="modal-cancel-btn"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>

            <button
              disabled={isSubmitting}
              type="submit"
              className="modal-save-btn"
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
