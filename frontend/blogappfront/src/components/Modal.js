import React from "react";

const Modal = (props) => {
  const { visible, onCloseModal, onClick, title, body,cancelText,buttonText } = props;
  let className = "modal fade";
  if (visible) className += " show d-block";
  return (
    <div className={className} style={{ backgroundColor: "#000000b0" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
          </div>
          <div className="modal-body">{body}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCloseModal}
            >
              {cancelText}
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={onClick}
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
