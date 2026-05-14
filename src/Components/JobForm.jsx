import { useState } from "react";
import { extractJobData, generateSuggestion } from "../Api";

const JobForm = ({ onAddJob, token }) => {
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [suggestedDetails, setSuggestedDetails] = useState(null);
  const [jobPostingText, setJobPostingText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiError, setAiError] = useState(null);
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [aiJobUrl, setAiJobUrl] = useState("");
  const [jobUrl, setJobUrl] = useState("");
  const [details, setDetails] = useState("");

  const handleExtractJobData = async () => {
    const normalizedJobPostingText = jobPostingText.trim();
    const normalizedAiJobUrl = aiJobUrl.trim();

    if (!normalizedJobPostingText && !normalizedAiJobUrl) {
      setAiError("Add job URL or descriptions first");
      return;
    }

    try {
      setIsGenerating(true);
      setAiError(null);
      setSuggestedDetails(null);

      if (normalizedAiJobUrl && !jobUrl.trim()) {
        setJobUrl(normalizedAiJobUrl);
      }

      const extractedJob = await extractJobData(
        normalizedJobPostingText,
        normalizedAiJobUrl,
        token,
      );

      if (extractedJob.title) {
        setTitle(extractedJob.title);
      }

      if (extractedJob.company) {
        setCompany(extractedJob.company);
      }

      if (extractedJob.details) {
        setDetails(extractedJob.details);
      }

      if (
        !extractedJob.title &&
        !extractedJob.company &&
        !extractedJob.details
      ) {
        return setAiError(`Couldn't extract job data. Try editing manually.`);
      }

      if (
        !extractedJob.title ||
        !extractedJob.company ||
        !extractedJob.details
      ) {
        return setAiError(
          `Some fields were filled automatically. Please review.`,
        );
      }
    } catch (error) {
      setAiError(error.message);
    } finally {
      setIsGenerating(false);
    }
  };

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

      const data = await generateSuggestion(details, token);

      setSuggestedDetails(data);
    } catch (error) {
      setAiError(error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const normalizedTitle = title.trim();
    const normalizedCompany = company.trim();
    const normalizedDetails = details.trim();
    const normalizedJobUrl = jobUrl.trim();

    if (!normalizedTitle || !normalizedCompany || !normalizedJobUrl) {
      setError("Title, company and job URL are required");
      return;
    }

    const newJob = {
      title: normalizedTitle,
      company: normalizedCompany,
      details: normalizedDetails,
      status: "applied",
      job_url: normalizedJobUrl,
    };

    try {
      setIsSubmitting(true);
      await onAddJob(newJob);

      setTitle("");
      setCompany("");
      setJobUrl("");
      setDetails("");
      setJobPostingText("");
      setSuggestedDetails(null);
      setAiError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="job-form-container">
      <p className="job-form-title">Add a new vacancy</p>

      <form onSubmit={handleSubmit} className="form">
        <div className="ai-extract-box">
          <div className="ai-extract-header">
            <p className="ai-extract-title">Extract job details with AI</p>
            <p className="ai-extract-description">
              Paste a job URL and, if needed, the full job posting text. AI will
              try to fill the fields below. You can review and edit everything
              before saving.
            </p>
          </div>

          <div className="form-vacancy-row">
            <label className="form-label" htmlFor="ai-job-url">
              Job URL for AI extraction
            </label>
            <input
              className="form-input"
              id="ai-job-url"
              value={aiJobUrl}
              type="text"
              name="ai_job_url"
              onChange={(e) => {
                setAiJobUrl(e.target.value);
                setAiError(null);
              }}
            />
          </div>
          {aiError && <div className="ai-hint">{aiError}</div>}

          <textarea
            id="job-posting-text"
            className="ai-textarea"
            value={jobPostingText}
            onChange={(e) => {
              setJobPostingText(e.target.value);
              setAiError(null);
            }}
            placeholder="Paste full job posting here..."
          />

          <div className="ai-extract-actions">
            <button
              disabled={isGenerating}
              className="primary-button ai-generate-button"
              type="button"
              onClick={handleExtractJobData}
            >
              {isGenerating ? "Extracting..." : "Extract with AI"}
            </button>
          </div>
        </div>
        <p className="manual-section-title">Or fill the details manually</p>
        <div className="form-top-row">
          <div className="form-vacancy-row">
            <label className="form-label" htmlFor="title">
              Position title
            </label>
            <input
              className="form-input"
              id="title"
              value={title}
              type="text"
              name="title"
              onChange={(e) => {
                setTitle(e.target.value);
                setError(null);
              }}
            />
          </div>

          <div className="form-vacancy-row">
            <label className="form-label" htmlFor="company">
              Company
            </label>
            <input
              className="form-input"
              id="company"
              value={company}
              type="text"
              name="company"
              onChange={(e) => {
                setCompany(e.target.value);
                setError(null);
              }}
            />
          </div>
          <div className="form-vacancy-row">
            <label className="form-label" htmlFor="job_url">
              Job URL
            </label>
            <input
              className="form-input"
              id="job_url"
              value={jobUrl}
              type="text"
              name="job_url"
              onChange={(e) => {
                setJobUrl(e.target.value);
                setError(null);
              }}
            />
          </div>
        </div>
        <div>
          <div className="form-details-row">
            <label className="form-label" htmlFor="details">
              Short notes
            </label>
            <textarea
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
            <div className="form-inline-actions">
              <button
                disabled={isGenerating}
                className="primary-button form-submit ai-generate-button"
                type="button"
                onClick={handleGenerateSuggestion}
              >
                {isGenerating ? "Generating..." : "Generate with AI"}
              </button>
            </div>
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
