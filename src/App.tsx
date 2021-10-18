//Imports needed for this file
import React, {useState, useEffect} from "react";
import "./App.css";
import Posts from "./components/Posts";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Post from "./components/Post";
import PostsContext from './context/PostsContext';
import {IPost} from './interfaces/IPost';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import axios from "axios";

type MyProps = {
  hello: string;
};

const queryClient = new QueryClient();

//Class App is responsible for displaying the homepage(posts page)
function App (props: MyProps){

  const [posts, setPosts] = useState <Array<IPost>>([]); 
  const [filteredPosts, setFilteredPosts] = useState <Array<IPost>>([]);

  const getPosts = async () => {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');
    return data;
    };
    const { data } = useQuery('posts', getPosts);

  useEffect(() => {
   //Getting the data from json files

      const posts = data;
      setPosts(posts);
      setFilteredPosts(posts);

  }, [data])

  const hello = "Hello From";

    return (
    <div>
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
    </div>
    );
}

//Exporting for use in other files
export default App;
