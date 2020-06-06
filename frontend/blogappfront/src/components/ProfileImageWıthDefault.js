import React from "react";
import Profile from "../assets/prfile.png";

const ProfileImageWıthDefault = (props) => {
  const { image, tempimage } = props;
  let imageSource = Profile;
  if (image) {
    imageSource = "/images/" + image + ".png";
  }
  return (
    <img
      alt="profile"
      src={tempimage || imageSource}
      {...props}
      onError={(event) => {
        event.target.src = Profile;
      }}
    />
  );
};

export default ProfileImageWıthDefault;
