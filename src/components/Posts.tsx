//Imports needed for this file
import { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import Comments from "./Comments";
import Users from "./Users";
import Search from "./Search";
import PostsContext from "../context/PostsContext";
import {IPost} from '../interfaces/IPost';
import axios from "axios";
import { useQuery } from "react-query";

//Constant Posts with props posts for displaying all posts on homepage and hello string for rendering log in the console
const Posts = ( props: { hello: string } ) => {

  const value = useContext(PostsContext);

  const [posts, setPosts] = useState <Array<IPost>>([]); 
  const [filteredPosts, setFilteredPosts] = useState <Array<IPost>>([]);
  const [users, setUsers] = useState([]);

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
        //console.log("post");
        //console.log(filteredPosts);
      } else {
        setFilteredPosts([]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getPosts = async () => {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/users');
    return data;
    };
    const { data } = useQuery('posts', getPosts);

  
  useEffect(() => {
      const users= data;
      const posts = value.value;

      setPosts(posts);
      setFilteredPosts(posts);
      setUsers(users);
  }, [data, props.hello, value.value])

  //Console logging via props
  useEffect(() => {
    console.log(`${props.hello} Posts Component`);
    
  }, [props.hello]); 

  if(!posts) return (<div>no posts</div>)
  return (
    <div>
        <div>
          <header>
            <nav className="navbar navbar-dark bg-dark">
              <a className="navbar-brand" href="/">
                <span className="helloText">Q</span>posts
              </a>
            </nav>
          </header>
        </div>

        <div className="content">
          <h1>
            <span className="helloText">Q</span>Posts
          </h1>
          <h2 className="heroText">
            <span className="helloText">Hello! </span>Every day we have some new
            posts, feel free to check it out, enjoy!
          </h2>
          <Search getPosts={getSearchedPosts} hello={props.hello} />
          </div>
    <div className="container">
      <div className="row">
        {filteredPosts?.map((post) => {
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
    </div>
  );
};

//Exporting for use in other files
export default Posts;

