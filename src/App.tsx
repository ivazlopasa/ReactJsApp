//Imports needed for this file
import {useState, useEffect} from "react";
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

  const hello = "Hello From";
  const [posts, setPosts] = useState <Array<IPost>>([]); 

  const getPosts = async () => {
      const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');
      console.log(data);
      return data;
    };

  const { data /* ,isLoading */ } = useQuery('posts', getPosts);

  useEffect(() => {
   //Getting the data from json files
  if(data){
    const posts = data;
    setPosts(posts);
  }
  }, [data])

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <PostsContext.Provider value={{posts}}> 
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
        </PostsContext.Provider> 
      </QueryClientProvider>
    </>
  );
}

//Exporting for use in other files
export default App;
