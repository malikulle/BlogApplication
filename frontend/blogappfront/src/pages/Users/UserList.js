import React, { useState, useEffect } from "react";
import { getUsers } from "../../apiCalls/userApiCalls";
import { useTranslation } from "react-i18next";
import UserListItem from "./UserListItem";
import Spinner from "../../components/Spinner"

const UserList = () => {
  const [page, setPage] = useState({
    content: [],
    size: 5,
    number: 0,
  });
  const [pendingApiCall, setPendingApiCall] = useState(false)
  useEffect(() => {
    loadUsers();
  }, []);
  const onClickNext = async () => {
    setPendingApiCall(true)
    const nextPage = page.number + 1;
    await loadUsers(nextPage);
    setPendingApiCall(false)
  };
  const onClickPrevious = async () => {
    setPendingApiCall(true)
    const previousPage = page.number - 1;
    await loadUsers(previousPage);
    setPendingApiCall(false)
  };
  const loadUsers = async (page) => {
    try {
      const { data } = await getUsers(page);
      setPage(data);
    } catch (error) {}
  };
  const { t } = useTranslation();
  const { content: users, last, first } = page;
  let actionDiv = (
    <div className="card-footer">
      {first === false && (
        <button
          className="btn btn-sm btn-primary float-right"
          onClick={onClickPrevious}
        >
          {t("previous")}
        </button>
      )}
      {last === false && (
        <button className="btn btn-sm btn-primary " onClick={onClickNext}>
          {t("next")}
        </button>
      )}
    </div>
  );
  if (pendingApiCall) {
    actionDiv = (
      <Spinner />
    );
  }
  return (
    <div className="container">
      <div className="card">
        <div className="card-header text-center">
          <h3>{t("userList")}</h3>
        </div>
        {users.map((item) => (
          <UserListItem key={item.id} user={item} />
        ))}
        {actionDiv}
      </div>
    </div>
  );
};

export default UserList;
