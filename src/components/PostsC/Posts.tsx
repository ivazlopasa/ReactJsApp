//Imports needed for this file
import { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import PostsContext from "../../context/PostsContext";
import Filter from "../FilterC/Filter";
import { IPost } from "../../interfaces/IPost";
import { IUsers } from "../../interfaces/IUsers";
import { IComments } from "../../interfaces/IComments";
import Users from "../UsersC/Users";
import Comments from "../CommentsC/Comments";

//Constant Posts with props posts for displaying all posts on homepage and hello string for rendering log in the console
const Posts = (props: { filteredPosts: IPost[]; hello: string }) => {
  const postAppContext = useContext(PostsContext);
  const { posts, filterText } = postAppContext;
  const [filteredPosts, setFilteredPosts] = useState<Array<IPost>>([]);
  const [users, setUsers] = useState<Array<IUsers>>([]);
  const [, setPostComments] = useState<Array<IComments>>([]);

  useEffect(() => {
    console.log(`${props.hello} Posts Component`);
    const { users } = postAppContext;
    const { comments } = postAppContext;

    if (filterText.length > 0) {
      setFilteredPosts(props.filteredPosts);
    } else {
      setFilteredPosts(posts);
    }
    setUsers(users);
    setPostComments(comments);
  }, [
    props.hello,
    postAppContext,
    filterText,
    props.filteredPosts,
    filteredPosts,
    posts,
  ]);

  return (
    <>
      <header>
        <nav className="navbar navbar-dark bg-dark">
          <a className="navbar-brand" href="/">
            <span className="blueText">Q</span>posts
          </a>
        </nav>
      </header>
      <div className="content">
        <h1>
          <span className="blueText">Q</span>Posts
        </h1>
        <h2 className="heroText">
          <span className="blueText">Hello!</span>Every day we have some new
          posts, feel free to check it out, enjoy!
        </h2>
        <Filter hello={props.hello} />
      </div>
      <section className="row">
        {filteredPosts?.map((post) => {
          return (
            <div key={post.id} className="col-md-4">
              <Link to={`/post/${post.id}`} state={{ post: post.id }}>
                <div className="postDiv">
                  <h3 className="postTitle">
                    {post.title.length < 15
                      ? `${post.title}`
                      : `${post.title.substr(0, 20)}...`}
                  </h3>
                  <p className="postBody">{post.body}.</p>
                  <h4 className="authorText">
                    Author:
                    <Users
                      data={users}
                      userId={post.userId}
                      hello={props.hello}
                    />
                  </h4>
                  <h4 className="commentsText">
                    Comments:
                    <Comments id={post.id} hello={props.hello} />
                  </h4>
                </div>
              </Link>
            </div>
          );
        })}
      </section>
    </>
  );
};

//Exporting for use in other files
export default Posts;
