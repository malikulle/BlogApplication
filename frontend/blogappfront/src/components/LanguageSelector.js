import React from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

const LanguageSelector = (props) => {
  const { i18n } = useTranslation();
  const onChangeLanguage = (language) => {
    axios.defaults.headers["accept-language"] = language;
    i18n.changeLanguage(language);
  };
  return (
    <div className="container">
      <img
        src="https://www.countryflags.io/tr/flat/32.png"
        style={{ cursor: "pointer" }}
        alt="tr"
        className="rounded-circle"
        onClick={() => onChangeLanguage("tr")}
      />
      <img
        src="https://www.countryflags.io/us/flat/32.png"
        style={{ cursor: "pointer" }}
        alt="en"
        className="rounded-circle"
        onClick={() => onChangeLanguage("en")}
      />
    </div>
  );
};

export default LanguageSelector;
