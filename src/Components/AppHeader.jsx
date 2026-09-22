const AppHeader = ({ email, onLogOut, theme, onThemeChange }) => {
  return (
    <div className="app-header">
      <h1 className="app-title">AI Job Tracker</h1>

      <div className="app-user-actions">
        <div className="theme-switch">
          <button
            type="button"
            className={`theme-switch-button ${
              theme === "cute" ? "active" : ""
            }`}
            onClick={() => onThemeChange("cute")}
          >
            ♡ Cute
          </button>

          <button
            type="button"
            className={`theme-switch-button ${
              theme === "brutal" ? "active" : ""
            }`}
            onClick={() => onThemeChange("brutal")}
          >
            Brutal
          </button>
        </div>

        <span className="user-email">{email ? email : "Loading user..."}</span>

        <button
          type="button"
          onClick={onLogOut}
          className="secondary-button logout-button"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AppHeader;
