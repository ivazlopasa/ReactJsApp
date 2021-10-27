//Imports needed for this file
import { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import Comments from "../CommentsC/Comments";
import Users from "../UsersC/Users";
import Filter from "../FilterC/Filter";
import PostsContext from "../../context/PostsContext";
import {IPost} from '../../interfaces/IPost';
import { IUsers } from "../../interfaces/IUsers";
import { IComments } from "../../interfaces/IComments";

//Constant Posts with props posts for displaying all posts on homepage and hello string for rendering log in the console
const Posts = ( props: { hello: string } ) => {

  const postAppContext = useContext(PostsContext);

  const [posts, setPosts] = useState <Array<IPost>>([]); 
  const [filteredPosts, setFilteredPosts] = useState <Array<IPost>>([]);
  const [users, setUsers] = useState<Array<IUsers>>([]);
  const [comments, setPostComments] = useState<Array<IComments>>([]);

  const getSearchedPosts = (search: string) => {
    try {
      const postUser: any = users.find(
        (u: { username: string }) =>
          u.username.toLowerCase() === search.toLowerCase()
      );
      if (postUser) {
        const filteredPosts = posts.filter(
          (p: { userId: number }) => p.userId === postUser.id
        );
        console.log(postUser);
        setFilteredPosts(filteredPosts);
      } else {
        setFilteredPosts([]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    console.log(`${props.hello} Posts Component`);
      const users = postAppContext.users;
      console.log(postAppContext.users);
      setPosts(postAppContext.posts);
      setFilteredPosts(postAppContext.posts);
      setUsers(users);
      setPostComments(postAppContext.comments);
  }, [props.hello, postAppContext])

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
        <Filter getPosts={getSearchedPosts} hello={props.hello} />
      </div>
      <div className="row">
        {filteredPosts?.map((post) => {
          return (
            <div key={post.id} className="col-md-4">
              <Link to={{ pathname: `/post/${post.id}`, state: { post: post.id } }}>
                <div className="postDiv">
                  <h2 className="postTitle">
                    {post.title.length < 15 ? `${post.title}` : `${post.title.substr(0, 20)}...`}
                  </h2>
                  <p className="postBody">{post.body}.</p>
                  <h4 className="authorText">Author: 
                    <Users data={users} userId={post.userId} hello={props.hello} />
                  </h4>
                  <div className="commentsText">Comments:
                    <Comments id={post.id} hello={props.hello} />
                  </div>
                </div>
              </Link>
            </div>
          );
        })} 
      </div>
    </>
  );
};

//Exporting for use in other files
export default Posts;

