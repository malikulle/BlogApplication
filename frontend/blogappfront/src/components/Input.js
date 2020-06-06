import React from "react";

const Input = (props) => {
  const { type, error, name, label, onChange, defaultValue } = props;

  let className = "form-control";

  if(type === "file") className += "-file"

  if (error) className += " is-invalid";
  return (
    <div className="row">
      <div className="col-lg-7">
        <label>{label}</label>
        <input
          type={type}
          className={className}
          name={name}
          onChange={onChange}
          defaultValue={defaultValue}
        />
        <span className="invalid-feedback">{error}</span>
      </div>
    </div>
  );
};

export default Input;
