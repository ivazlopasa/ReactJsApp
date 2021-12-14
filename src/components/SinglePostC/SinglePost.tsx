//Imports needed for this file
import React, { Suspense } from "react";
import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import PostsContext from "../../context/PostsContext";
import { IPost } from "../../interfaces/IPost";
import { IUsers } from "../../interfaces/IUsers";

//Function Post with props id for displaying active post(the one user choose) on homepage and hello string for rendering log in the console
function Post(props: { hello: string }) {
  const Comments = React.lazy(() => import("../CommentsC/Comments"));
  const Users = React.lazy(() => import("../UsersC/Users"));
  const { posts, users, filterText } = useContext(PostsContext);

  const [activePost, setActivePost] = useState<IPost>();
  const [postUser, setPostUser] = useState<IUsers>();

  const { id } = useParams();

  useEffect(() => {
    console.log(`${props.hello} Single Post Component`);

    //finding the current post by id from url
    if (posts?.length > 0) {
      const currentPost = posts.find((post) => {
        if (id) {
          return post.id === parseInt(id);
        }
        return id;
      });
      //finding user from post's userId
      const user = users?.find(
        (u: { id: number }) => u.id === currentPost?.userId
      );
      setActivePost(currentPost);
      setPostUser(user);
    }
  }, [posts, props.hello, id, users, filterText]);

  if (!activePost) return <div className="loader"></div>;
  return (
    <main className="content">
      <h1>{activePost?.title}</h1>
      <span className="blueText">
        <Suspense fallback={<span>Loading</span>}>
          Author:
          <Users data={users} userId={postUser?.id!} hello={props.hello} />
        </Suspense>
      </span>
      <hr className="my-4"></hr>
      <p className="bodyText">{activePost?.body}.</p>
      <section className="commentsDiv">
        <h2 className="commentsTitle">Comments</h2>
        <p className="commentsTextPost">
          <Suspense fallback={<span>Loading</span>}>
            <Comments id={activePost.id} hello={props.hello} />
          </Suspense>
        </p>
      </section>
      <Link to="/posts" className="btn btn-dark btn-lg">
        Go back
      </Link>
    </main>
  );
}
//Exporting for use in other files
export default Post;
