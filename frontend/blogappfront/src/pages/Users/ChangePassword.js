import React, { useState } from "react";
import Input from "../../components/Input";
import { useTranslation } from "react-i18next";
import Button from "../../components/Button";
import alertify from "alertifyjs";
import { changePassoword } from "../../apiCalls/userApiCalls";
import { useSelector, useDispatch } from "react-redux";
import { changePasswordSuccess } from "../../redux/actions/authActions";

const ChangePassword = () => {
  const { password } = useSelector((store) => {
    return {
      password: store.auth.password && store.auth.password,
    };
  });
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    password: null,
    newpPassword: null,
  });
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [error, setErrors] = useState({});
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setErrors((previousErrors) => ({ ...previousErrors, [name]: undefined }));
    setUser((previousState) => ({ ...previousState, [name]: value }));
  };
  const handleSubmitClick = async (e) => {
    setPendingApiCall(true);
    e.preventDefault();
    const { password: userPassword, newPassword } = user;
    if (!(password === userPassword)) {
      alertify.error(t("notMatched"));
      setPendingApiCall(false);
      return;
    }
    if (userPassword === newPassword) {
      alertify.error(t("cannotSame"));
      setPendingApiCall(false);
      return;
    }
    try {
      const { data } = await changePassoword(user);
      dispatch(changePasswordSuccess(data));
      alertify.success("changed");
    } catch (error) {
      if (error.response.data === "notMatched") {
        alertify.error(t("notMatched"));
      }
      setErrors({ ...error.response.data.validationErrors });
    }

    setPendingApiCall(false);
  };
  const { password: passwordError, newPassword: newPasswordError } = error;
  return (
    <div className="container mt-3">
      <div className="card text-center">
        <h3>{t("changePassword")}</h3>
        <div className="card-body">
          <Input
            type="text"
            name="password"
            label={t("password")}
            onChange={handleOnChange}
            error={passwordError}
          />
          <Input
            type="text"
            name="newPassword"
            label={t("newPassword")}
            onChange={handleOnChange}
            error={newPasswordError}
          />
          <div className="mt-3">
            <Button
              name={t("submit")}
              onClick={handleSubmitClick}
              pendingApiCall={pendingApiCall}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
