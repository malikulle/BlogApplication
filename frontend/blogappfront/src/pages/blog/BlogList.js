import React, { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import {
  getBlogs,
  getNewBlogCount,
  getNewBlogs,
} from "../../apiCalls/blogApiCalls";
import { useTranslation } from "react-i18next";
import Spinner from "../../components/Spinner";
import { deleteBlog } from "../../apiCalls/blogApiCalls";
import alertify from "alertifyjs";
const BlogList = () => {
  const { t } = useTranslation();
  const [blogPage, setBlogPage] = useState({
    content: [],
    last: true,
    number: 0,
  });

  let firstBlogId = 0;

  if (blogPage.content.length > 0) {
    firstBlogId = blogPage.content[0].id;
  }
  const [newBlogCount, setNewBlogCount] = useState(0);
  const [pendingApiCall, setPendingApiCall] = useState(false);
  useEffect(() => {
    loadBlogs();
  }, []);
  const loadBlogs = async (page) => {
    setPendingApiCall(true);
    try {
      const { data } = await getBlogs(page);
      setBlogPage((previousState) => ({
        ...data,
        content: [...previousState.content, ...data.content],
      }));
    } catch (error) {}
    setPendingApiCall(false);
  };
  const loadNewBlogs = async () => {
    setPendingApiCall(true);
    try {
      const { data } = await getNewBlogs(firstBlogId);
      setBlogPage((previousState) => ({
        ...previousState,
        content: [...data, ...previousState.content],
      }));
      setNewBlogCount(0);
    } catch (error) {}
    setPendingApiCall(false);
  };
  useEffect(() => {
    const getNewCount = async () => {
      if (firstBlogId !== 0) {
      }
      const { data } = await getNewBlogCount(firstBlogId);
      setNewBlogCount(data.count);
      try {
      } catch (error) {}
    };
    const looper = setInterval(() => {
      getNewCount(firstBlogId);
    }, 5000);
    return function cleanUp() {
      clearInterval(looper);
    };
  }, [firstBlogId]);

  if (blogPage.content.length === 0) {
    return <div className="alert alert-danger text-center">{t("noBlogs")}</div>;
  }
  const onClickFromModal = async (id) => {
    try {
      await deleteBlog(id);
      alertify.success(t("removedBlog"));
      setBlogPage((previousState) => ({
        ...previousState,
        content: previousState.content.filter((x) => x.id !== id),
      }));
    } catch (error) {}
  };
  const { content, last, number } = blogPage;
  return (
    <div>
      {newBlogCount > 0 && (
        <div
          className="alert alert-secondary text-center"
          style={{ cursor: "pointer" }}
          onClick={() => loadNewBlogs()}
        >
          {pendingApiCall ? <Spinner /> : t("loadNewBlog")}
        </div>
      )}
      {content.map((blog) => (
        <BlogCard
          key={blog.id}
          blog={blog}
          onClickFromModal={onClickFromModal}
        />
      ))}
      {!last && (
        <div
          className="alert alert-secondary text-center"
          style={{ cursor: "pointer" }}
          onClick={() => loadBlogs(number + 1)}
        >
          {pendingApiCall ? <Spinner /> : t("loadOldBlogs")}
        </div>
      )}
    </div>
  );
};
export default BlogList;
