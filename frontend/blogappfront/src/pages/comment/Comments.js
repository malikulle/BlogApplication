import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlogComments } from "../../apiCalls/commentApiCalls";
import CommentCard from "./CommentCard";
import { useTranslation } from "react-i18next";
import Spinner from "../../components/Spinner";
import { removeComment } from "../../apiCalls/commentApiCalls";
import alertify from "alertifyjs";
export default function Comments() {
  const { t } = useTranslation();
  const { id } = useParams();
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [visible, setVisible] = useState(false);
  const [comments, setComments] = useState({
    content: [],
    last: false,
    number: 0,
  });
  useEffect(() => {
    const getComments = async () => {
      try {
        const { data } = await getBlogComments(id);
        setComments({ ...data });
      } catch (error) {}
    };
    getComments();
  }, [id]);

  const getMoreComments = async (page) => {
    setPendingApiCall(true);
    try {
      const { data } = await getBlogComments(id, page);
      setComments((previousState) => ({
        ...data,
        content: [...previousState.content, ...data.content],
      }));
    } catch (error) {}
    setPendingApiCall(false);
  };
  const onRemoveClick = async (id) => {
    try {
      await removeComment(id);
      alertify.success(t("removedComment"));
      setVisible(false);
      setComments((previousState) => ({
        ...previousState,
        content: previousState.content.filter((x) => x.id !== id),
      }));
    } catch (error) {}
  };
  const { content, last, number } = comments;
  return (
    <div>
      {content.map((item) => (
        <>
          <hr />
          <CommentCard
            key={item.id}
            item={item}
            onClick={() => onRemoveClick(item.id)}
            visible={visible}
            setVisible={setVisible}
          />
        </>
      ))}
      {!last ? (
        <div
          className="alert alert-secondary text-center"
          style={{ cursor: "pointer" }}
          onClick={() => getMoreComments(number + 1)}
        >
          {pendingApiCall ? <Spinner /> : t("loadMore")}
        </div>
      ) : null}
    </div>
  );
}
