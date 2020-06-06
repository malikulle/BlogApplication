import React, { useState } from "react";
import Input from "../../components/Input";
import { useTranslation } from "react-i18next";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { addBlog } from "../../apiCalls/blogApiCalls";
import alertify from "alertifyjs";

const CreateBlog = () => {
  const { t } = useTranslation();
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [blog, setBlog] = useState({
    title: null,
    description: null,
    content: null,
    image: null,
  });
  const [errors, setErros] = useState({});
  const onChangeFile = (event) => {
    if (event.target.files.length < 1) return;
    const file = event.target.files[0];

    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setBlog((previousState) => ({
        ...previousState,
        image: fileReader.result,
      }));
    };
    fileReader.readAsDataURL(file);
  };
  const onClickSubmit = async (event) => {
    setPendingApiCall(true);
    event.preventDefault();
    try {
      const newBlog = {
        ...blog,
        image: blog.image && blog.image.split(",")[1],
      };
      await addBlog(newBlog);
      alertify.success(t("blogAdded"));
    } catch (error) {
      if (error.response.data.validationErrors) {
        setErros(error.response.data.validationErrors);
      }
    }
    setPendingApiCall(false);
  };

  const hanldeOnChange = (event) => {
    const { name, value } = event.target;
    setErros((previousState) => ({ ...previousState, [name]: undefined }));
    setBlog((previousState) => ({ ...previousState, [name]: value }));
  };
  const {
    title: titleError,
    description: descriptionError,
    image: imageError,
  } = errors;
  return (
    <div className="container m-auto">
      <h3 className="mb-3">{t("addBlog")}</h3>
      {blog.image && (
        <img className="img-thumbnail" alt="newImage" src={blog.image} />
      )}
      <Input
        type="file"
        name="image"
        label={t("image")}
        onChange={onChangeFile}
        error={imageError}
      />
      <Input
        type="text"
        name="title"
        label={t("title")}
        onChange={hanldeOnChange}
        error={titleError}
      />
      <div className="row mt-2">
        <div className="col-lg-7">
          <label>{t("description")}</label>
          <textarea
            className={
              descriptionError ? "form-control is-invalid" : "form-control"
            }
            name="description"
            onChange={hanldeOnChange}
          />
          {descriptionError && (
            <span className="invalid-feedback">{descriptionError}</span>
          )}
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-lg-7">
          <label>{t("content")}</label>
          <CKEditor
            editor={ClassicEditor}
            onChange={(event, editor) => {
              const data = editor.getData();
              setBlog((previousState) => ({ ...previousState, content: data }));
            }}
          />
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-lg-7">
          <button
            className="btn btn-primary btn-block"
            disabled={pendingApiCall}
            onClick={onClickSubmit}
          >
            {pendingApiCall && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
            {t("submit")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
