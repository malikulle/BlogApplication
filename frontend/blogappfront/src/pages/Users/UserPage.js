import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../../apiCalls/userApiCalls";
import { useTranslation } from "react-i18next";
import ProfileCard from "./ProfileCard";
import Spinner from "../../components/Spinner";
import { getUserBlogsById } from "../../apiCalls/blogApiCalls";
import BlogUser from "../blog/BlogUser";
const UserPage = (props) => {
  const [user, setUser] = useState({});
  const [blogs, setBlogs] = useState({
    content: [],
    last: true,
    number: 0,
  });
  const [notFound, setNotFound] = useState(false);
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const { id } = useParams();
  const { t } = useTranslation();

  useEffect(() => {
    setNotFound(false);
  }, [user]);

  useEffect(() => {
    const loadUser = async () => {
      setPendingApiCall(true);
      try {
        const { data } = await getUser(id);
        setUser(data);
      } catch (error) {
        setNotFound(true);
      }
      setPendingApiCall(false);
    };
    const loadUserBlogs = async () => {
      setPendingApiCall(true);
      try {
        const { data } = await getUserBlogsById(id);
        setBlogs(data);
      } catch (error) {}
      setPendingApiCall(false);
    };
    loadUser();
    loadUserBlogs();
  }, [id]);
 
  if (pendingApiCall) {
    return (
      <div className="container text-center">
        <Spinner />
      </div>
    );
  }
  if (notFound) {
    return (
      <div className="container text-center alert alert-danger  d-flex">
        <span class="material-icons mr-2">error_outline</span>
        {t("userNotFound")}
      </div>
    );
  }
  return (
    <div className="container">
      <ProfileCard user={user} />
      <BlogUser blogs={blogs} id={id} />
    </div>
  );
};

export default UserPage;
