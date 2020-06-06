import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getUserBlogsById } from "../../apiCalls/blogApiCalls";
import Spinner from "../../components/Spinner";
import { format } from "timeago.js";
import { useSelector } from "react-redux";
import Modal from "../../components/Modal";
import { deleteBlog } from "../../apiCalls/blogApiCalls";
import alertify from "alertifyjs";

const BlogUser = (props) => {
  const { userId } = useSelector((store) => ({
    userId: store.auth.id,
  }));
  const [visible, setVisible] = useState(false);
  const { t, i18n } = useTranslation();
  const { blogs, id } = props;
  let { content, last, number } = blogs;
  const [blogPage, setBlogPage] = useState({
    content: [],
    last: true,
    number: 0,
  });
  useEffect(() => {
    setBlogPage({
      ...blogs,
    });
  }, [blogs]);
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const loadBlogs = async (page) => {
    setPendingApiCall(true);
    try {
      const { data } = await getUserBlogsById(id, page);
      content = [...content, ...data.content];
      last = data.content;
      number = data.number;
      setBlogPage((previousState) => ({
        ...previousState,
        content,
        last,
        number,
      }));
    } catch (error) {}
    setPendingApiCall(false);
  };
  const closeModal = () => {
    setVisible(false);
  };
  const onClickFromModal = async (id) => {
    try {
      await deleteBlog(id);
      alertify.success(t("removedBlog"));
      setBlogPage((previousState) => ({
        ...previousState,
        content: previousState.content.filter((x) => x.id !== id),
      }));
    } catch (error) {}
  };
  return (
    <>
      <div className="row">
        {blogPage.content.map((blog) => {
          let { id, title, description, createdDate, image } = blog;
          const formatted = format(createdDate, i18n.language);
          let imageSource = null;
          if (image) {
            imageSource = "/images/" + image + ".png";
          }
          if (description && description.length > 100) {
            description =
              description.substring(0, 100) + "   ........................";
          }
          if (title && title.length > 30) {
            title = title.substring(0, 30) + ".....";
          }
          return (
            <div className="col-lg-4 mt-3" key={id}>
              <div className="card">
                <img
                  src={imageSource}
                  className="card-img-top"
                  alt="..."
                  height="200"
                />
                <div className="card-body">
                  <h5 className="card-title">
                    <span> {title}</span>
                    {userId === blog.user.id && (
                      <>
                        <button
                          className="float-right btn btn-delete-link btn-sm "
                          onClick={() => setVisible(true)}
                        >
                          <span className="material-icons">delete_outline</span>
                        </button>
                        <Link to={`/updateBlog/${id}`} className="float-right btn btn-update-link btn-sm ">
                          <span className="material-icons">edit</span>
                        </Link>
                      </>
                    )}
                  </h5>
                  <p className="card-text">{description}</p>
                  <p className="card-text">
                    <small className="text-muted">{formatted}</small>
                  </p>
                </div>
                <div className="card-footer">
                  <Link className="btn btn-primary" to={`/blog/${id}`}>
                    {t("viewDetails")}
                  </Link>
                </div>
              </div>
              <Modal
                visible={visible}
                onCloseModal={closeModal}
                cancelText={t("cancel")}
                buttonText={t("remove")}
                title={t("removeBlog")}
                body={t("sureRemoveBlog")}
                onClick={() => onClickFromModal(id)}
              />
            </div>
          );
        })}
      </div>
      {!blogPage.last && (
        <div
          className="alert alert-secondary text-center mt-3"
          style={{ cursor: "pointer" }}
          onClick={() => loadBlogs(blogPage.number + 1)}
        >
          {pendingApiCall ? <Spinner /> : t("loadOldBlogs")}
        </div>
      )}
    </>
  );
};

export default BlogUser;
