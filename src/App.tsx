//Imports needed for this file
import React, {useState, useEffect} from "react";
import "./App.css";
import Posts from "./components/Posts";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Post from "./components/Post";
import PostsContext from './context/PostsContext';
import {IPost} from './interfaces/IPost';

type MyProps = {
  hello: string;
};

//Class App is responsible for displaying the homepage(posts page)
function App (props: MyProps){

  const [posts, setPosts] = useState <Array<IPost>>([]); 
  const [filteredPosts, setFilteredPosts] = useState <Array<IPost>>([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
   //Getting the data from json files
  const componentDidMount = async () => {
    try {
      const postAPI = await fetch(`https://jsonplaceholder.typicode.com/posts`);
      const posts = await postAPI.json();
      const usersAPI = await fetch(
        `https://jsonplaceholder.typicode.com/users`
      );
      const users = await usersAPI.json();
      setPosts(posts);
      setFilteredPosts(posts);
      setUsers(users);

    } catch (e) {
      console.log(e);
    }
  };

    //console.log(`${props.hello} App Component`);
    const getPosts = /* async */ (search: string) => {
      try {
        const postUser: any = users.find(
          (u: { username: string }) =>
            u.username.toLowerCase() === search.toLowerCase()
        );
        if (postUser) {
          const filteredPosts = posts.filter(
            (p: { userId: number }) => p.userId === postUser.id
          );
          setFilteredPosts(filteredPosts);
        } else {
          setFilteredPosts([]);
        }
      } catch (e) {
        console.log(e);
      }
    };
    componentDidMount(); 
    getPosts("");
  }, [])

  const hello = "Hello From";

    return (
    <div>
    <PostsContext.Provider value={{value: posts}}> 
    <BrowserRouter>
      <Switch>
        <Route path="/posts" exact>
          <Posts hello={hello}/>
        </Route>
          <Route exact path="/" render={() => (<Redirect to="/posts" />)} /> 
        <Route path="/post/:id">
          <Post hello={hello} />
        </Route> 
      </Switch>
    </BrowserRouter>
        <div className="content">
        </div>
    </PostsContext.Provider> 
    </div>
    );
}

//Exporting for use in other files
export default App;
