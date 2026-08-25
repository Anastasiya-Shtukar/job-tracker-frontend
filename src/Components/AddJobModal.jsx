import AddJobForm from "./JobForm";

const AddJobModal = ({ onClose, onAddJob }) => {
  return (
    <div className="background-modal" onClick={onClose}>
      <div className="modal add-job-modal" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close add job modal"
        >
          ×
        </button>

        <AddJobForm
          onAddJob={async (newJob) => {
            await onAddJob(newJob);
            onClose();
          }}
        />
      </div>
    </div>
  );
};

export default AddJobModal;
