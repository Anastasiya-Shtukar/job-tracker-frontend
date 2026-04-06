import { useState } from "react";

const EditModal = ({ job, onSave, onClose }) => {
  const [title, setTitle] = useState(job.title);
  const [company, setCompany] = useState(job.company);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (!title || !company) {
      return;
    }
    const updateJob = {
      ...job,
      title,
      company,
    };

    onSave(updateJob);
  };

  return (
    <div className="background-modal" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close edit modal"
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
            onChange={(e) => setTitle(e.target.value)}
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
            onChange={(e) => setCompany(e.target.value)}
          />

          <div className="modal-actions">
            <button
              type="button"
              className="modal-cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button type="submit" className="modal-save-btn">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
