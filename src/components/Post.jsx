import { CommentSection } from "./CommentSection";
import { useState, useEffect } from "react";
import { useOutletContext, useParams } from "react-router";

export default function Post() {
  const [session, setSession] = useOutletContext();
  const { postId } = useParams();
  const [post, setPost] = useState({});
  useEffect(() => {
    async function getPosts(postId) {
      const response = await fetch(`http://localhost:3000/posts/${postId}`);
      const data = await response.json();
      setPost(data);
    }
    getPosts(postId);
  }, []);

  return (
    <article className="post">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <CommentSection postId={postId} session={session} />
    </article>
  );
}
