import React from "react";

const Button = (props) => {
  const { pendingApiCall, onClick , name } = props;
  return (
    <button
      className="btn btn-primary"
      onClick={onClick}
      disabled={pendingApiCall}
    >
      {pendingApiCall && (
        <span className="spinner-border spinner-border-sm"></span>
      )}
      <span> {name}</span>
    </button>
  );
};

export default Button;
