import React, { useState } from "react";
import DefaultPNG from "../../assets/1.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { format } from "timeago.js";
import { useSelector } from "react-redux";
import Modal from "../../components/Modal";

const BlogCard = (props) => {
  const { userId } = useSelector((store) => ({
    userId: store.auth.id,
  }));
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();
  const { id, title, description, image, user, createdDate } = props.blog;
  const { i18n } = useTranslation();
  const formatted = format(createdDate, i18n.language);
  let imageSource = DefaultPNG;
  if (image) {
    imageSource = "/images/" + image + ".png";
  }
  const closeModal = () => {
    setVisible(false);
  };
  return (
    <div className="card bg-white text-dark mb-3">
      <img src={imageSource} className="card-img" alt="..." height="700" />
      <div className="card p-4">
        <h5 className="card-title">
          <span> {title}</span>
          {userId === user.id && (
            <button
              className="float-right btn btn-delete-link btn-sm "
              onClick={() => setVisible(true)}
            >
              <span className="material-icons">delete_outline</span>
            </button>
          )}
        </h5>
        <p className="card-text">{description}</p>
        <p className="card-text">{formatted}</p>
      </div>
      <div className="card-footer">
        <span className="float-left">
          {t("blogOwner") + " : " + user.firstName + " " + user.lastName}
        </span>
        <Link
          className="btn btn-outline-primary float-right"
          to={`/blog/${id}`}
        >
          {t("viewDetails")}
        </Link>
      </div>
      <Modal
        visible={visible}
        onCloseModal={closeModal}
        cancelText={t("cancel")}
        buttonText={t("remove")}
        title={t("removeBlog")}
        body={t("sureRemoveBlog")}
        onClick={() => props.onClickFromModal(id)}
      />
    </div>
  );
};

export default BlogCard;
