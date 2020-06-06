import React, { useState, useEffect } from "react";
import ProfileImageWıthDefault from "../../components/ProfileImageWıthDefault";
import { useTranslation } from "react-i18next";
import Input from "../../components/Input";
import DatePicker from "react-date-picker";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateUser, deleteAccount } from "../../apiCalls/userApiCalls";
import { updateSuccess, logoutSuccess } from "../../redux/actions/authActions";
import alertify from "alertifyjs";
import Modal from "../../components/Modal";

const ProfileCard = (props) => {
  const { id: userId } = useSelector((store) => {
    return {
      id: store.auth.id,
    };
  });

  const { user } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [inEditMode, setInEditMode] = useState(false);
  const [myObject, setMyObject] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
  });
  const { id } = useParams();
  const [newImage, setNewImage] = useState();
  const [newDate, setNewDate] = useState(new Date(user.birthDay) || new Date());
  const [errors, setErrors] = useState({});
  const [pendingApiCall, setPendingApiCall] = useState(false);

  let { firstName, lastName, image } = user;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (!inEditMode) {
      setMyObject({
        firstName,
        lastName,
      });
      setNewDate(new Date(user.birthDay) || new Date());
      setNewImage(undefined);
    }
  }, [inEditMode, firstName, lastName, user.birthDay, newImage]);

  useEffect(() => {
    setErrors((previousError) => ({
      ...previousError,
      image: undefined,
    }));
  }, [newImage]);

  const handleOnChanged = (event) => {
    const { name, value } = event.target;
    errors[name] = undefined;
    setMyObject((previusObject) => ({ ...previusObject, [name]: value }));
  };
  const handleOnSubmit = async (event) => {
    event.preventDefault();
    setPendingApiCall(true);
    const updatedUser = {
      ...myObject,
      id: user.id,
      birthDay: newDate,
      image: newImage && newImage.split(",")[1],
    };

    try {
      const { data } = await updateUser(updatedUser);
      setMyObject({
        firstName: data.firstName,
        lastName: data.lastName,
      });
      setNewDate(new Date(data.birthDay));
      image = data.image;
      dispatch(updateSuccess(data));
      alertify.success(t("updated"));
    } catch (error) {
      if (error.data) {
        setErrors({ ...error.response.data.validationErrors });
      }
    }
    setPendingApiCall(false);
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
  const onClickFromModal = async () => {
    try {
      await deleteAccount(id);
      dispatch(logoutSuccess());
      history.push("/");
      alertify.error(t("accountDeleted"));
    } catch (error) {}
  };
  const {
    firstName: errorFirstName,
    lastName: errorLastName,
    image: errorImage,
  } = errors;

  return (
    <div className="card text-center">
      <div className="card-header">
        <ProfileImageWıthDefault
          image={image}
          tempimage={newImage}
          alt="profile-card"
          width="200"
          height="200"
          className="rounded-circle shadow"
        />
      </div>
      <div className="card-body">
        <h3>{firstName + " " + lastName}</h3>
        {Number(id) === userId && (
          <>
            {!inEditMode ? (
              <>
                <button
                  className="btn btn-primary d-inline-flex"
                  onClick={() => setInEditMode(true)}
                >
                  <span className="material-icons">create</span>
                  {t("edit")}
                </button>
                <button
                  className="btn btn-danger d-inline-flex ml-2"
                  onClick={() => setModalVisible(true)}
                >
                  <span className="material-icons">directions_walk</span>{" "}
                  {t("removeAccount")}
                </button>
              </>
            ) : (
              <div className="contianer ml-5">
                <Input type="file" onChange={onChangeFile} error={errorImage} />
                <div className="row mt-3">
                  <div className="col-lg-4">
                    <Input
                      type="text"
                      label={t("firstName")}
                      name="firstName"
                      defaultValue={firstName}
                      onChange={handleOnChanged}
                      error={errorFirstName}
                    />
                  </div>
                  <div className="col-lg-4">
                    <Input
                      type="text"
                      label={t("lastName")}
                      name="lastName"
                      onChange={handleOnChanged}
                      defaultValue={lastName}
                      error={errorLastName}
                    />
                  </div>
                  <div className="col-lg-4">
                    <label>{t("birthDay")}</label>
                    <DatePicker
                      className="form-control"
                      value={newDate}
                      onChange={(value) => setNewDate(value)}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <button
                    className="btn btn btn-primary ml-2 d-inline-flex"
                    onClick={handleOnSubmit}
                    disabled={pendingApiCall}
                  >
                    {pendingApiCall && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span className="material-icons">save</span> {t("submit")}
                  </button>
                  <button
                    className="btn btn btn-danger ml-4 d-inline-flex"
                    onClick={() => setInEditMode(false)}
                  >
                    <span className="material-icons">close</span>
                    {t("cancel")}
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <Modal
        visible={modalVisible}
        title={t("removeAccount")}
        body={t("sureDeleteAccount")}
        cancelText={t("cancel")}
        buttonText={t("remove")}
        onCloseModal={() => setModalVisible(false)}
        onClick={onClickFromModal}
      />
    </div>
  );
};

export default ProfileCard;
