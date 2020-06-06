import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { addComment } from "../../apiCalls/commentApiCalls";
import alertify from "alertifyjs";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
const CreateComment = (props) => {
  const { isLoggedIn } = useSelector((store) => ({
    isLoggedIn: store.auth.isLoggedIn,
  }));
  const { id } = props;
  const { t } = useTranslation();
  const history = useHistory();

  const [comment, setComment] = useState({
    title: null,
    content: null,
    blogId: id,
  });

  const [errors, setErrors] = useState({});

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setErrors((previousState) => ({ ...previousState, [name]: undefined }));

    setComment((previousState) => ({
      ...previousState,
      [name]: value,
    }));
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    if (!isLoggedIn) {
      history.push("/login");
      alertify.error(t("mustLogin"));
      return;
    }
    try {
      await addComment(comment);
      alertify.success(t("commentAdded"));
    } catch (error) {
      if (error.response.data.validationErrors) {
        setErrors(error.response.data.validationErrors);
      }
    }
  };

  const { title, content } = errors;
  let titleClass = "form-control";
  if (title) {
    titleClass += " is-invalid";
  }
  let contentClass = "form-control";
  if (content) {
    contentClass += " is-invalid";
  }
  return (
    <form>
      <div className="form-group">
        <label>{t("title")}</label>
        <input
          type="text"
          className={titleClass}
          placeholder={t("title")}
          name="title"
          onChange={handleOnChange}
        />
        {title && <span className="invalid-feedback">{title}</span>}
      </div>
      <label>{t("comment")}</label>
      <textarea
        className={contentClass}
        cols="30"
        rows="3"
        placeholder={t("comment")}
        name="content"
        onChange={handleOnChange}
      ></textarea>
      {content && <span className="invalid-feedback">{content}</span>}
      <button
        className="btn btn-outline-primary text-uppercase mt-3 d-flex"
        onClick={handleOnSubmit}
      >
        <span className="material-icons">send</span>&nbsp;{t("send")}
      </button>
    </form>
  );
};

export default CreateComment;
