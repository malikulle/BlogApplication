import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getById, updateBlogVm } from "../../apiCalls/blogApiCalls";
import { useTranslation } from "react-i18next";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Input from "../../components/Input";
import { useSelector } from "react-redux";
import alertify from "alertifyjs";
const UpdateBlog = () => {
  const { userId } = useSelector((state) => ({
    userId: state.auth.id,
  }));

  const { id } = useParams();
  const { t } = useTranslation();

  const [notFound, setNotFound] = useState(false);
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [errors, setErros] = useState({});
  const [blog, setBlog] = useState({
    id: null,
    content: null,
    description: " ",
    title: null,
    image: null,
  });
  useEffect(() => {
    const getBlogById = async () => {
      try {
        const { data } = await getById(id);
        setBlog({
          ...data,
        });
      } catch (error) {
        setNotFound(true);
      }
    };
    getBlogById();
  }, [id]);

  const hanldeOnChange = (event) => {
    const { name, value } = event.target;
    setBlog((previousState) => ({ ...previousState, [name]: value }));
    setErros((previousState) => ({ ...previousState, [name]: undefined }));
  };
  const onChangeFile = (event) => {
    if (event.target.files.length < 1) return;
    const file = event.target.files[0];

    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setNewImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };
  const onClickUpdateSubmit = async () => {
    setPendingApiCall(true);
    try {
      const { content, description, title, id } = blog;
      const updatedBlog = {
        content,
        description,
        image: newImage === null ? null : newImage.split(",")[1],
        title,
        id,
      };
      await updateBlogVm({ ...updatedBlog, userId });
      alertify.success(t("blogUpdated"));
    } catch (error) {
      if (error.response.data.validationErrors) {
        setErros(error.response.data.validationErrors);
      }
    }
    setPendingApiCall(false);
  };
  if (notFound) {
    return (
      <div className="alert alert-danger text-center">{t("blogNotFound")}</div>
    );
  }
  let { title, content, description, image } = blog;
  image = "/images/" + image + ".png";
  const {
    title: titleError,
    description: descriptionError,
    image: imageError,
  } = errors;
  return (
    <div className="container m-auto">
      <h3 className="mb-3">{t("editBlog")}</h3>
      {image && (
        <img className="img-thumbnail" alt="newImage" src={newImage || image} />
      )}
      <Input
        type="file"
        name="image"
        label={t("image")}
        error={imageError}
        onChange={onChangeFile}
      />
      <Input
        type="text"
        name="title"
        label={t("title")}
        defaultValue={title}
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
            value={description}
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
            data={content}
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
            onClick={() => onClickUpdateSubmit()}
            disabled={pendingApiCall}
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

export default UpdateBlog;
