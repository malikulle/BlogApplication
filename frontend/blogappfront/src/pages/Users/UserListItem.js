import React from "react";
import { Link } from "react-router-dom";
import ProfileImageWıthDefault from "../../components/ProfileImageWıthDefault";
const UserListItem = (props) => {
  const { user } = props;
  return (
    <Link
      to={`/user/${user.id}`}
      className="list-group-item list-group-item-action"
    >
      <ProfileImageWıthDefault
        image={user.image}
        className="rounded-circle"
        width="32"
        height="32"
      />
      <span className="pl-2">{user.firstName + " " + user.lastName}</span>
    </Link>
  );
};

export default UserListItem;
