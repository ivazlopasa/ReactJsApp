//Imports needed for this file
import { useState, useEffect } from "react";
import "./style.scss";
import Posts from "./components/PostsC/Posts";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import SinglePost from "./components/SinglePostC/SinglePost";
import PostsContext from "./context/PostsContext";
import { IPost } from "./interfaces/IPost";
import { useQuery } from "react-query";
import axios from "axios";
import { ReactQueryDevtools } from "react-query/devtools";
import { IUsers } from "./interfaces/IUsers";
import { IComments } from "./interfaces/IComments";

type MyProps = {
  hello: string;
};

//Class App is responsible for displaying the homepage(posts page)
function App(props: MyProps) {
  const hello = "Hello From";
  const [posts, setPosts] = useState<Array<IPost>>([]);
  const [users, setUsers] = useState<Array<IUsers>>([]);
  const [comments, setPostComments] = useState<Array<IComments>>([]);
  const [search, setSearch] = useState("");

  //Getting the data from json files
  const getPosts = async () => {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    console.log(data);
    return data;
  };

  const { data } = useQuery("posts", getPosts);

  const getUsers = async () => {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    return data;
  };
  const { data: dataUsers } = useQuery("users", getUsers);

  const getComments = async () => {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/comments"
    );
    return data;
  };
  const { data: dataComments } = useQuery("comments", getComments);

  const [filteredPosts, setFilteredPosts] = useState<Array<IPost>>([]);

  useEffect(() => {
    if (data) {
      const posts = data;
      setPosts(posts);
    }
    if (dataUsers) {
      const users = dataUsers;
      setUsers(users);
    }
    if (dataComments) {
      const comments = dataComments;
      setPostComments(comments);
    }
    if (search) {
      console.log(search);
      const getSearchedPosts = (search: string) => {
        try {
          const postUser: any = users.find((u: { username: string }) =>
            u.username.toLowerCase().includes(search.toLowerCase())
          );
          if (postUser) {
            const filteredPosts = posts.filter(
              (p: { userId: number }) => p.userId === postUser.id
            );
            console.log(postUser);
            setFilteredPosts(filteredPosts);
            console.log(search);
            console.log(filteredPosts);
          }
        } catch (e) {
          console.log(e);
        }
      };
      getSearchedPosts(search);
    }
  }, [data, dataComments, dataUsers, posts, search, users]);

  console.log(filteredPosts);

  return (
    <>
      <PostsContext.Provider
        value={{ posts, users, comments, search, setSearch }}
      >
        <BrowserRouter>
          <Switch>
            <Route path="/posts" exact>
              <Posts filteredPosts={filteredPosts} hello={hello} />
            </Route>
            <Route exact path="/" render={() => <Redirect to="/posts" />} />
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
