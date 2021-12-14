//Imports needed for this file
import {useState, useEffect} from "react";
import "./style.scss";
import Posts from "./components/PostsC/Posts";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import SinglePost from "./components/SinglePostC/SinglePost";
import PostsContext from './context/PostsContext';
import {IPost} from './interfaces/IPost';
import { useQuery } from 'react-query';
import axios from "axios";
import { ReactQueryDevtools } from 'react-query/devtools';

type MyProps = {
  hello: string;
};

//Class App is responsible for displaying the homepage(posts page)
function App (props: MyProps){

  const hello = "Hello From";
  const [posts, setPosts] = useState <Array<IPost>>([]); 
  const [users, setUsers] = useState([]);
  const [comments, setPostComments] = useState([]);

  const getPosts = async () => {
      const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');
      console.log(data);
      return data;
    };

  const { data } = useQuery('posts', getPosts);

  const getUsers = async () => {  
    const {data} = await axios.get('https://jsonplaceholder.typicode.com/users');
    return data;
  }; 
  const { data: dataUsers} = useQuery('users', getUsers); 

  const getComments = async () => {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/comments');
    return data;
    };
    const { data: dataComments } = useQuery('comments', getComments);

  useEffect(() => {
   //Getting the data from json files
  if(data){
    const posts = data;
    setPosts(posts);
  }
  if(dataUsers){
    const users = dataUsers;
    setUsers(users);
  }
  if(dataComments){
    const comments = dataComments;
    setPostComments(comments);
  }
  }, [data, dataComments, dataUsers])

  return (
    <>
      <PostsContext.Provider value={{posts, users, comments}}> 
        <BrowserRouter>
          <Switch>
            <Route path="/posts" exact>
              <Posts hello={hello}/>
            </Route>
            <Route exact path="/" render={() => (<Redirect to="/posts" />)} /> 
            <Route path="/post/:id">
              <SinglePost hello={hello} />
            </Route> 
          </Switch>
          <ReactQueryDevtools />
        </BrowserRouter>
      </PostsContext.Provider> 
    </>
  );
}

//Exporting for use in other files
export default App;
