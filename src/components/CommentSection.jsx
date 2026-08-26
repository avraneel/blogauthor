import Comment from "./Comment";
import { useState, useEffect } from "react";

export function CommentSection({ postId, session }) {
  const [postComments, setPostComments] = useState([]);
  const [updateFlag, setUpdateFlag] = useState(false);
  useEffect(() => {
    async function getComments(postId) {
      const response = await fetch(
        `http://localhost:3000/comments?postId=${postId}`,
      );
      const receivedComments = await response.json();
      setPostComments(receivedComments);
    }
    getComments(postId);
  }, [updateFlag]);

  const commentComponents = postComments.map((comment) => (
    <Comment
      key={comment.id}
      id={comment.id}
      authorName={comment.author.fullname}
      date={comment.createdAt}
      content={comment.content}
      showDelete={session ? comment.author.id === session.id : false}
      updateFlag={updateFlag}
      setUpdateFlag={setUpdateFlag}
    />
  ));
  return (
    <div className="commentSection">
      <h2>Comments</h2>
      <div className="comments">{commentComponents}</div>
    </div>
  );
}
