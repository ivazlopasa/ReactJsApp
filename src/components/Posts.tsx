//Imports needed for this file
import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Comments from "./Comments";
import Users from "./Users";

//Constant Posts with props posts for displaying all posts on homepage and hello string for rendering log in the console
const Posts = (props: { posts: any[]; hello: string }) => {
  //Console logging via props
  useEffect(() => {
    console.log(`${props.hello} Posts Component`);
  }, []);

  return (
    <div className="container">
      <div className="row">
        {props.posts.map((post) => {
          return (
            <div key={post.id} className="col-md-4">
              <Link
                to={{ pathname: `/post/${post.id}`, state: { post: post.id } }}
              >
                <div className="postDiv">
                  <div>
                    <h2 className="postTitle">
                      {post.title.length < 15
                        ? `${post.title}`
                        : `${post.title.substr(0, 20)}...`}
                    </h2>
                  </div>
                  <div>
                    <p className="postBody">{post.body}.</p>
                  </div>
                  <p className="authorText">
                    <span className="subtitle">Author:</span>
                    <Users userId={post.userId} hello={props.hello} />
                  </p>
                  <p className="commentsText">
                    <span className="subtitle">Comments:</span>
                    <Comments id={post.id} hello={props.hello} />
                  </p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

//Exporting for use in other files
export default Posts;
