//Imports needed for this file
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Comments from "../CommentsC/Comments";
import PostsContext from "../../context/PostsContext";
import {IParams} from '../../interfaces/IParams';
import {IPost} from '../../interfaces/IPost';
import { IUsers } from "../../interfaces/IUsers";

//Function Post with props id for displaying active post(the one user choose) on homepage and hello string for rendering log in the console
function Post(props: { hello: string }) {

  const {posts} = useContext(PostsContext);
  const {users} = useContext(PostsContext);

  const [activePost, setActivePost] = useState<IPost>();
  const [postUser, setPostUser] = useState<IUsers>();
  const {id} = useParams<IParams>();
  
  useEffect(() => {
    console.log(`${props.hello} Post Component`);
    console.log(posts);

    if(posts?.length > 0){
      const currentPost = posts.find(post => {return post.id === parseInt(id)});
      const user = users?.find(
        (u: { id: number }) => u.id === currentPost?.userId
      );

      setActivePost(currentPost);
      setPostUser(user); 
    }
  }, [posts, props.hello, id, users]);

  if(!activePost) return (<div className="loader"></div>);
  return(
    <div className="content">
      <h2>{activePost?.title}</h2>
      <h5 className="blueText">
        Author: {postUser?.name} , {postUser?.username} 
      </h5>
      <hr className="my-4"></hr>
      <p className="bodyText">{activePost?.body}.</p>
      <div className="commentsDiv">
        <h2 className="commentsTitle">Comments</h2>
        <span className="commentsTextPost">
          <Comments id={parseInt(id)} hello={props.hello} /> 
        </span>
      </div>
      <a href="/posts" className="btn btn-dark btn-lg">Go back</a>
    </div>
  ); 
}
//Exporting for use in other files
export default Post;