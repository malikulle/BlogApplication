import React from "react";
import ProfileImageWıthDefault from "../../components/ProfileImageWıthDefault";
import { useSelector } from "react-redux";
import Modal from "../../components/Modal";
import { useTranslation } from "react-i18next";

const CommentCard = (props) => {
  const { userId } = useSelector((store) => ({
    userId: store.auth.id,
  }));
  const { t } = useTranslation();
  const { item } = props;
  const { id, title, comment, user } = item;
  const { firstName, lastName, image } = user;

  return (
    <div key={id} className="media mt-3">
      <ProfileImageWıthDefault
        image={image}
        style={{ width: "40px" }}
        height="40"
        className="mr-3 rounded-circle"
      />
      <div className="media-body">
        <h5 className="mt-0">
          {firstName + " " + lastName}
          {userId === user.id && (
            <button
              className="float-right btn btn-delete-link btn-sm "
              onClick={() => props.setVisible(true)}
            >
              <span className="material-icons">delete_outline</span>
            </button>
          )}
        </h5>
        <h6 className="card-title">
          <span> {title}</span>
        </h6>
        <p>{comment}</p>
      </div>
      <Modal
        visible={props.visible}
        onCloseModal={() => props.setVisible(false)}
        cancelText={t("cancel")}
        buttonText={t("remove")}
        title={t("removeComment")}
        body={t("sureRemoveComment")}
        onClick={props.onClick}
      />
    </div>
  );
};
export default CommentCard;
