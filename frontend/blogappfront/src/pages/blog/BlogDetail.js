import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getById } from "../../apiCalls/blogApiCalls";
import Spinner from "../../components/Spinner";
import { useTranslation } from "react-i18next";
import { format } from "timeago.js";
import CreateComment from "../comment/CreateComment";
import Comments from "../comment/Comments";

const BlogDetail = (props) => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const [blog, setBlog] = useState({
    user: {
      image: null,
    },
  });
  const [pageApiCall, setPageApiCall] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [selectedNav, setSelectedNav] = useState("comments");
  useEffect(() => {
    const getBlog = async () => {
      setPageApiCall(true);
      try {
        const { data } = await getById(id);
        setBlog(data);
      } catch (error) {
        setNotFound(true);
      }
      setPageApiCall(false);
    };
    getBlog();
  }, [id]);
  const handleChangeNavs = (item) => {
    setSelectedNav(item);
  };
  if (pageApiCall) {
    return (
      <div className="container text-center">
        <Spinner />
      </div>
    );
  }
  if (notFound) {
    return (
      <div className="container text-center alert alert-danger  d-flex">
        <span className="material-icons mr-2">error_outline</span>
        {t("noBlogFound")}
      </div>
    );
  }
  const { title, content, createdDate, user, image } = blog;
  const formatted = format(createdDate, i18n.language);
  const { firstName, lastName } = user;
  let imageSource = null;
  if (image) {
    imageSource = "/images/" + image + ".png";
  }

  return (
    <>
      <div className="card">
        <div className="card-body p-4">
          <h5 className="card-title">
            <span> {title}</span>
          </h5>
          <p className="card-text">{content}</p>
          <p className="card-text">
            <small className="text-muted">{formatted}</small>
          </p>
        </div>
        {imageSource && (
          <img
            src={imageSource}
            className="card-img-top"
            alt="..."
            height="550"
          />
        )}
        <div className="card-footer">
          <span className="blockquote-footer">
            {firstName + " " + lastName}
          </span>
        </div>
      </div>
      <ul className="nav nav-tabs mt-3">
        <li className="nav-item">
          <a
            href="#comments"
            className={
              selectedNav === "comments" ? "nav-link active" : "nav-link"
            }
            role="tab"
            data-toggle="tab"
            onClick={() => handleChangeNavs("comments")}
          >
            {t("comments")}
          </a>
        </li>
        <li className="nav-item">
          <a
            className={
              selectedNav === "addComment" ? "nav-link active" : "nav-link"
            }
            role="tab"
            data-toggle="tab"
            href="#addComment"
            onClick={() => handleChangeNavs("addComment")}
          >
            {t("addComment")}
          </a>
        </li>
      </ul>
      <div className="tab-content mb-5">
        <div id="comments" className="tab-pane in active  mt-5" role="tabpanel">
          {selectedNav === "addComment" ? (
            <CreateComment id={id} />
          ) : (
            <Comments key={id} />
          )}
        </div>
      </div>
    </>
  );
};

export default BlogDetail;
