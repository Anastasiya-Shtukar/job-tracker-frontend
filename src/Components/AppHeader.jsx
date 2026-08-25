const AppHeader = ({ email, onLogOut }) => {
  return (
    <div className="app-header">
      <h1 className="app-title">AI Job Tracker</h1>

      <div className="app-user-actions">
        <span className="user-email">{email ? email : "Loading user..."}</span>

        <button onClick={onLogOut} className="secondary-button logout-button">
          Logout
        </button>
      </div>
    </div>
  );
};

export default AppHeader;
