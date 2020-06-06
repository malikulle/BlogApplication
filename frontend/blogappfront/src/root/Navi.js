import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../components/LanguageSelector";
import { useSelector, useDispatch } from "react-redux";
import { logoutSuccess } from "../redux/actions/authActions";
import ProfileImageWıthDefault from ".././components/ProfileImageWıthDefault";

const Navi = (props) => {
  const { t } = useTranslation();
  const history = useHistory();

  const { id, firstName, lastName, isLoggedIn, image } = useSelector(
    (store) => {
      return {
        isLoggedIn: store.auth.isLoggedIn,
        id: store.auth.id,
        firstName: store.auth.firstName,
        lastName: store.auth.lastName,
        image: store.auth.image,
      };
    }
  );
  const [menuVisible, setMenuVisible] = useState(false);
  const dispatch = useDispatch();
  const menuArea = useRef(null);
  useEffect(() => {
    document.addEventListener("click", menuClickTracker);
    return () => {
      document.removeEventListener("click", menuClickTracker);
    };
  }, [isLoggedIn]);

  const menuClickTracker = (event) => {
    if (menuArea.current === null || !menuArea.current.contains(event.target))
      setMenuVisible(false);
  };
  const onLogoutClick = () => {
    dispatch(logoutSuccess());
    history.push("/");
  };

  let links = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item active">
        <Link className="nav-link" to="/login">
          {t("login")}
        </Link>
      </li>
      <li className="nav-item active">
        <Link className="nav-link" to="/register">
          {t("register")}
        </Link>
      </li>
    </ul>
  );
  if (isLoggedIn) {
    let dropdownClass = "dropdown-menu p-0 shadow";

    if (menuVisible) dropdownClass += " show";
    links = (
      <ul className="navbar-nav ml-auto" ref={menuArea}>
        <div className="nav-item dropdown">
          <div
            className="d-flex"
            style={{ cursor: "pointer" }}
            onClick={() => setMenuVisible(true)}
          >
            <ProfileImageWıthDefault
              image={image}
              className="rounded-circle m-auto"
              width="32"
              height="32"
            />
            <span className="nav-link active dropdown-toggle">
              {firstName + " " + lastName}
            </span>
          </div>
          <div className={dropdownClass}>
            <li className="dropdown-item">
              <Link
                to={`/user/${id}`}
                style={{ textDecoration: "none" }}
                className="d-flex"
                onClick={() => setMenuVisible(false)}
              >
                <span className="material-icons" style={{ color: "#fd7e14" }}>
                  person
                </span>
                <span className="ml-2">{t("myProfile")}</span>
              </Link>
              <Link
                to="/changePassword"
                style={{ textDecoration: "none" }}
                className="d-flex"
                onClick={() => setMenuVisible(false)}
              >
                <span className="material-icons">lock</span>
                <span className="ml-2">{t("changePassword")}</span>
              </Link>
            </li>
            <li className="dropdown-item">
              <Link
                style={{ textDecoration: "none" }}
                onClick={onLogoutClick}
                to="/"
                className="d-flex"
              >
                <span className="material-icons text-danger">
                  power_settings_new
                </span>
                <span className="ml-2"> {t("logout")}</span>
              </Link>
            </li>
          </div>
        </div>
      </ul>
    );
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary ">
        <Link className="navbar-brand" to="/">
          Blog App
        </Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-auto ml-5">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                {t("home")}
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/users">
                {t("userList")}
              </Link>
            </li>
            {isLoggedIn && (
              <li className="nav-item active">
                <Link className="nav-link" to="/createBlog">
                  {t("blogCreate")}
                </Link>
              </li>
            )}
          </ul>
          {links}
          <ul className="navbar-nav">
            <LanguageSelector />
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navi;
