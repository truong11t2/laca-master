import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import {
  getComments as getCommentsApi,
  createComment as createCommentApi,
  updateComment as updateCommentApi,
  deleteComment as deleteCommentApi,
} from "./api";
import { Link as ReactLink } from "react-router-dom";
import { Link } from "@chakra-ui/react";

const Comments = ({ postId, currentUser }) => {
  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const rootComments = backendComments.filter(
    (backendComment) => backendComment.parentId === null
  );

  const getReplies = (commentId) =>
    backendComments
      .filter((backendComment) => backendComment.parentId === commentId)
      .sort((a, b) => a.createdAt - b.createdAt);

  const addComment = (text, parentId) => {
    createCommentApi(postId, parentId, text, currentUser).then((comment) => {
      setBackendComments([comment, ...backendComments]);
      setActiveComment(null);
    });
  };

  const updateComment = (text, commentId, currentUser) => {
    updateCommentApi(commentId, text, currentUser).then((comment) => {
      const updatedBackendComments = backendComments.map((backendComment) => {
        if (backendComment._id === commentId) {
          return { ...backendComment, content: text };
        }
        return backendComment;
      });
      setBackendComments(updatedBackendComments);
      setActiveComment(null);
    });
  };

  const deleteComment = (commentId, currentUser) => {
    if (window.confirm("Are you sure you want to remove comment?")) {
      deleteCommentApi(commentId, currentUser).then(() => {
        const updatedBackendComments = backendComments.filter(
          (backendComment) => backendComment._id !== commentId
        );
        setBackendComments(updatedBackendComments);
      });
    }
  };

  //Get data once when loading post
  useEffect(() => {
    getCommentsApi(postId).then((data) => {
      setBackendComments(data);
    });
  }, []);

  const storeCurrentUrl = () => {
    const previousPageUrl = window.location.href;
    console.log(previousPageUrl);
    localStorage.setItem("previousPage", JSON.stringify(previousPageUrl));
  };

  return (
    <div className="comments">
      <h3 className="comments-title">Bình luận</h3>
      {currentUser ? (
        <div>
          <div className="comment-form-title">Viết bình luận</div>
          <CommentForm submitLabel="Đăng" handleSubmit={addComment} />
        </div>
      ) : (
        <div className="comment-form-title">
          Vui lòng{" "}
          <Link
            as={ReactLink}
            to={`/login`}
            color={"blue.500"}
            onClick={storeCurrentUrl}
          >
            đăng nhập
          </Link>{" "}
          để bình luận
        </div>
      )}
      <div className="comments-container">
        {rootComments.map((rootComment) => (
          <Comment
            key={rootComment._id}
            comment={rootComment}
            replies={getReplies(rootComment._id)}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment}
            deleteComment={deleteComment}
            updateComment={updateComment}
            currentUser={currentUser}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
