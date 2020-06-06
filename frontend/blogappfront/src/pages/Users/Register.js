import React, { useState } from "react";
import Input from "../../components/Input";
import { addUser } from "../../apiCalls/userApiCalls";
import DatePicker from "react-date-picker";
import Button from "../../components/Button";
import alertify from "alertifyjs";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import ProfileImageWıthDefault from "../../components/ProfileImageWıthDefault";

const Register = () => {
  const [user, setUser] = useState({
    email: null,
    firstName: null,
    lastName: null,
    birthDay: new Date(),
    password: null,
    image: null,
    repassword: null,
  });
  const [pendigApiCall, setPendigApiCall] = useState(false);
  const [date, setDate] = useState(new Date());
  const [errors, setErrors] = useState({});

  const { t } = useTranslation();
  const history = useHistory();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    const errorss = { ...errors };
    errorss[name] = undefined;
    setErrors(errorss);
    setUser((previousUser) => ({ ...previousUser, [name]: value }));
  };
  const onDateChange = (value) => {
    setUser((previousUser) => ({ ...previousUser, birthDay: value }));
    setDate(value);
  };
  const onChangeFile = (event) => {
    if (event.target.files.length < 1) return;
    const file = event.target.files[0];

    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setUser((previousState) => ({
        ...previousState,
        image: fileReader.result,
      }));
    };
    fileReader.readAsDataURL(file);
  };
  const onSubmit = async (e) => {
    setPendigApiCall(true);
    e.preventDefault();
    try {
      const {
        email,
        firstName,
        lastName,
        birthDay,
        password,
        repassword,
        image,
      } = user;
      if (password !== repassword) {
        alertify.error(t("passwordNotMatch"));
        setPendigApiCall(false);
        return;
      }
      const newUser = {
        email,
        firstName,
        lastName,
        password,
        birthDay,
        image: image && image.split(",")[1],
      };
      await addUser(newUser);
      alertify.success(t("userCreated"));
      history.push("/login");

      setPendigApiCall(false);
    } catch (error) {
      setErrors({ ...error.response.data.validationErrors });
      setPendigApiCall(false);
    }
  };
  const { image } = user;
  const { email, firstName, lastName, password } = errors;
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-lg-9">
          <Input
            type="text"
            name="email"
            error={email}
            label={t("email")}
            onChange={handleOnChange}
          />
          <Input
            type="text"
            name="firstName"
            error={firstName}
            label={t("firstName")}
            onChange={handleOnChange}
          />
          <Input
            type="text"
            name="lastName"
            error={lastName}
            label={t("lastName")}
            onChange={handleOnChange}
          />
          <label>{t("birthDay")}</label>
          <div className="row">
            <div className="col-lg-7">
              <DatePicker
                className="form-control"
                value={date}
                onChange={onDateChange}
              />
            </div>
          </div>

          <Input
            error={password}
            type="password"
            name="password"
            label={t("password")}
            onChange={handleOnChange}
          />
          <Input
            type="password"
            name="repassword"
            label={t("rePassword")}
            onChange={handleOnChange}
          />
        </div>
        <div className="col-lg-3">
          <ProfileImageWıthDefault
            tempimage={image}
            alt="profile-card"
            width="200"
            height="200"
            className="rounded-circle shadow"
          />
          <Input
            type="file"
            name="image"
            label={t("profilePP")}
            onChange={onChangeFile}
          />
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-lg-7 text-center">
          <Button
            onClick={onSubmit}
            pendingApiCall={pendigApiCall}
            name={t("register")}
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
