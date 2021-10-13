//Imports needed for this file
import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import Comments from "./Comments";
import PostsContext from "../context/PostsContext";
import {IParams} from '../interfaces/IParams';
import {IPost} from '../interfaces/IPost';
import useFetch from "../hooks/useFetch";
import { IUsers } from "../interfaces/IUsers";

//Function Post with props id for displaying active post(the one user choose) on homepage and hello string for rendering log in the console
function Post(props: { hello: string }) {

  const value = useContext(PostsContext);

  const [activePost, setActivePost] = useState<IPost>();
  const [postUser, setPostUser] = useState<IUsers>();
  //For displaying loader until the appropriate post is found
  const [isLoading2, setIsLoading] = useState(false);
  const {id} = useParams<IParams>();

  let url = "https://jsonplaceholder.typicode.com/users";
  const { data, isLoading } = useFetch(url);


  useEffect(() => {

    console.log(`${props.hello} Post Component`);
    let users = data;
    //console.log(users);
    //console.log(value);
    
    if(value.value.length > 0){
      const currentPost = value.value.find(post => {return post.id === parseInt(id)});
      //console.log(currentPost);
      
      const user = users?.find(
        (u: { id: number }) => u.id === currentPost?.userId
      );

      setActivePost(currentPost);
      setPostUser(user); 
      setIsLoading(false);

    }
  }, [value, data]);

  let post: any;
  post = activePost;
  let loading: boolean;
  loading = isLoading;
  //console.log(activePost?.id);

  return loading ? (
    <div>
      <div className="loader"></div>
    </div>
  ) : (
    <div className="content">
      <div className="jumbotron">
        <h2>{activePost?.title}</h2>
        <div className="helloText">
        Author: {postUser?.name} , {postUser?.username} 
        </div>
        <hr className="my-4"></hr>
        <p className="bodyText">{activePost?.body}.</p>
        <div className="commentsDiv">
          <h2 className="commentsTitle">Comments</h2>
          <span className="commentsTextPost">
            <Comments id={parseInt(id)} hello={props.hello} />
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
function searchParams(): { id: any; } {
  throw new Error("Function not implemented.");
}

