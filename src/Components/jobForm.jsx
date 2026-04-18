import { useState } from "react";

const JobForm = ({ onAddJob }) => {
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [suggestedDetails, setSuggestedDetails] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiError, setAiError] = useState(null);
  const [details, setDetails] = useState("");

  const handleGenerateSuggestion = async () => {
    const normalizedDetails = details.trim();

    if (!normalizedDetails) {
      setAiError("Add details first");
      return;
    }

    try {
      setIsGenerating(true);
      setAiError(null);
      setSuggestedDetails(null);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockSuggestion = `Short summary: ${normalizedDetails}`;

      setSuggestedDetails(mockSuggestion);
    } catch (error) {
      setAiError(error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const form = evt.target;
    const formData = new FormData(form);

    const title = formData.get("title").trim();
    const company = formData.get("company").trim();
    const normalizedDetails = details.trim();

    if (!title || !company) {
      setError("All fields are required");
      return;
    }

    const newJob = {
      title,
      company,
      details: normalizedDetails,
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
      setSuggestedDetails(null);
      setDetails("");
      setAiError(null);
    }
  };

  return (
    <div className="job-form-container">
      <p className="job-form-title">Add a new vacancy</p>

      <form onSubmit={handleSubmit} className="form">
        <div className="form-top-row">
          <div>
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

          <div>
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
        </div>
        <div>
          <div className="form-details-row">
            <label className="form-label" htmlFor="details">
              Details
            </label>
            <input
              className="form-input"
              id="details"
              type="text"
              name="details"
              value={details}
              onChange={(e) => {
                setDetails(e.target.value);
                setError(null);
              }}
            />
          </div>

          {!suggestedDetails && (
            <button
              disabled={isGenerating}
              className="primary-button form-submit ai-generate-button"
              type="button"
              onClick={handleGenerateSuggestion}
            >
              {isGenerating ? "Generating..." : "Generate with AI"}
            </button>
          )}
        </div>

        {aiError && <div className="form-error">{aiError}</div>}

        {suggestedDetails && (
          <div className="ai-suggestion-box">
            <label className="ai-suggestion-label" htmlFor="suggested-details">
              Suggested details
            </label>

            <textarea
              id="suggested-details"
              className="suggested-textarea"
              value={suggestedDetails}
              onChange={(e) => setSuggestedDetails(e.target.value)}
            />

            <div className="ai-actions">
              <button
                className="primary-button"
                type="button"
                onClick={() => {
                  setDetails(suggestedDetails);
                  setSuggestedDetails(null);
                  setAiError(null);
                }}
              >
                Use suggested version
              </button>

              <button
                className="ai-secondary-button"
                type="button"
                onClick={() => {
                  setSuggestedDetails(null);
                  setAiError(null);
                }}
              >
                Discard suggestion
              </button>
            </div>
          </div>
        )}

        <div className="form-actions">
          <button
            disabled={isSubmitting}
            className="primary-button form-submit"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
      {error && <div className="form-error">{error}</div>}
    </div>
  );
};

export default JobForm;
