//Imports needed for this file
import { title } from "node:process";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Posts from "./Posts";
import Users from "./Users";
import Comments from "./Comments";

//Function Post with props id for displaying active post(the one user choose) on homepage and hello string for rendering log in the console
function Post(props: { match: { params: { id: string } }; hello: string }) {
  const [activePost, setActivePost] = useState([]);
  const [postUser, setPostUser] = useState([]);
  //For displaying loader until the appropriate post is found
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log(`${props.hello} Post Component`);
    const getData = async () => {
      try {
        setIsLoading(true);
        let postId = props.match.params.id;

        //Fetching the data from json files
        const postsAPI = await fetch(
          `https://jsonplaceholder.typicode.com/posts`
        );
        const usersAPI = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const posts = await postsAPI.json();
        const users = await usersAPI.json();

        //Finding the post user has clicked, filtering and connecting the data from json files
        const currentPost = posts.find(
          (p: { id: Number }) => p.id.toString() === postId
        );
        const user = users.find(
          (u: { id: Number }) => u.id === currentPost.userId
        );

        setActivePost(currentPost);
        setPostUser(user);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  let post: any;
  post = activePost;
  let user: any;
  user = postUser;
  let comment: any;
  let loading: boolean;
  loading = isLoading;

  return loading ? (
    <div>
      <div className="loader"></div>
    </div>
  ) : (
    <div className="content">
      <div className="jumbotron">
        <h2>{post.title}</h2>
        <div className="helloText">
          Author: {user.name} , {user.username}
        </div>
        <hr className="my-4"></hr>
        <p className="bodyText">{post.body}.</p>
        <div className="commentsDiv">
          <h2 className="commentsTitle">Comments</h2>
          <span className="commentsTextPost">
            <Comments id={post.id} hello={props.hello} />
          </span>
        </div>
        <p className="lead">
          <Link to="/posts">
            <a className="btn btn-dark btn-lg" role="button">
              {"Go Back"}
            </a>
          </Link>
        </p>
      </div>
    </div>
  );
}
//Exporting for use in other files
export default Post;
