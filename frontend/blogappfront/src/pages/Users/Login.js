import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import { useTranslation } from "react-i18next";
import { login, verifyAccount, forgotPassword } from "../../apiCalls/userApiCalls";
import alertify from "alertifyjs";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/actions/authActions";

const Login = () => {
  const [user, setUser] = useState({
    email: null,
    password: null,
  });
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [modalButtonApiCall, setModalButtonApiCall] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [forgotModal, setForgotModal] = useState(false);
  const [code, setCode] = useState();
  const [emailUser , setEmailUser] = useState()
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const onCloseModal = () => {
    setModalButtonApiCall(false);
    setPendingApiCall(false);
    setOpenModal(false);
    setForgotModal(false);
  };
  const onClickModal = async (e) => {
    setPendingApiCall(true);
    e.preventDefault();
    try {
      await verifyAccount(user.email, code);
      alertify.success(t("accountActivated"));
      onCloseModal();
    } catch (error) {
      alertify.error(t("codeWrong"));
    }
    setModalButtonApiCall(false);
  };
  const onClickForgotModal = async (e) => {
    setModalButtonApiCall(true)
    try {
      await forgotPassword(emailUser)
      setForgotModal(false)
      alertify.success("Şifre Mail Olarak gitti")
    } catch (error) {
      alertify.error(t("notLogin"))
    }
    setModalButtonApiCall(false)
  }
  const onChange = (e) => {
    const { name, value } = e.target;
    setUser((previousUser) => ({ ...previousUser, [name]: value }));
  };
  const onSubmit = async (e) => {
    e.preventDefault(e);
    setPendingApiCall(true);
    try {
      const { data } = await login(user);
      dispatch(
        loginSuccess({ ...data, email: user.email, password: user.password })
      );
      history.push("/");
    } catch (error) {
      if (error.response.data.notActive) {
        setOpenModal(true);
        return;
      }
      alertify.error(t("notLogin"));
    }
    setPendingApiCall(false);
  };
  let body = (
    <>
      <span className="text-danger">{t("activeText")} </span>
      <Input
        type="text"
        name="code"
        label={t("verificationCode")}
        pendingApiCall={modalButtonApiCall}
        onChange={(e) => setCode(e.target.value)}
      />
    </>
  );
  let forgotBody = (
    <>
      <Input
        type="text"
        name="newPassword"
        label={t("email")}
        pendingApiCall={modalButtonApiCall}
        onChange={(e) => setEmailUser(e.target.value)}
      />
    </>
  );
  return (
    <div className="container">
      <Input type="text" name="email" label={t("email")} onChange={onChange} />
      <Input
        type="password"
        name="password"
        label={t("password")}
        onChange={onChange}
      />
      <div className="row mt-3 ml-5">
        <div className="col-lg-4">
          <Button
            pendingApiCall={pendingApiCall}
            name={t("login")}
            onClick={onSubmit}
          />
        </div>
        <div className="col-lg-4">
          <button className="btn btn-secondary ml-2" onClick= {() => setForgotModal(true)}>Forgot password</button>
        </div>
      </div>
      <Modal
        visible={openModal}
        title={t("verifyAccount")}
        cancelText={t("cancel")}
        buttonText={t("verify")}
        onClick={onClickModal}
        body={body}
        onCloseModal={onCloseModal}
      />
      <Modal
        visible={forgotModal}
        title={t("forgotPassword")}
        cancelText={t("cancel")}
        buttonText={t("verify")}
        onClick={onClickForgotModal}
        body={forgotBody}
        onCloseModal={onCloseModal}
      />
    </div>
  );
};

export default Login;
