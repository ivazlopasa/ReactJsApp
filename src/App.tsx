//Imports needed for this file
import { useState, useEffect } from "react";
import "./style.scss";
import Posts from "./components/PostsC/Posts";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import SinglePost from "./components/SinglePostC/SinglePost";
import PostsContext from "./context/PostsContext";
import { IPost } from "./interfaces/IPost";
import { useQuery } from "react-query";
import axios from "axios";
import { ReactQueryDevtools } from "react-query/devtools";
import { IUsers } from "./interfaces/IUsers";
import { IComments } from "./interfaces/IComments";
import SecretAnswer from "./components/SecretAnswerC/SecretAnswer";
import ProtectedRoute from "./ProtectedRoute";

type MyProps = {
  hello: string;
};

function App(props: MyProps) {
  const hello = "Hello From";
  const [posts, setPosts] = useState<Array<IPost>>([]);
  const [users, setUsers] = useState<Array<IUsers>>([]);
  const [comments, setPostComments] = useState<Array<IComments>>([]);
  const [filterText, setFilterText] = useState("");
  const [filteredPosts, setFilteredPosts] = useState<Array<IPost>>([]);

  //Getting posts data from json file
  const getPosts = async () => {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    return data;
  };
  const { data: dataPosts } = useQuery("posts", getPosts);

  //Getting users data from json file
  const getUsers = async () => {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    return data;
  };
  const { data: dataUsers } = useQuery("users", getUsers);

  //Getting comments data from json file
  const getComments = async () => {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/comments"
    );
    return data;
  };
  const { data: dataComments } = useQuery("comments", getComments);

  /**
   * Filter function for displaying filtered data
   * @param {string} filterText
   * finding in users array usernames which match/include filterText
   * if user is found, filter posts based on id
   */
  const getFilteredPosts = (filterText: string) => {
    const postUser: any = users.find((u: { username: string }) =>
      u.username.toLowerCase().includes(filterText.toLowerCase())
    );
    if (postUser) {
      const filteredPosts = posts.filter(
        (p: { userId: number }) => p.userId === postUser.id
      );
      setFilteredPosts(filteredPosts);
    }
  };

  useEffect(() => {
    if (dataPosts) {
      const posts = dataPosts;
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
    if (filterText) {
      getFilteredPosts(filterText);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataPosts, dataComments, dataUsers, posts, filterText, users]);

  return (
    <>
      <PostsContext.Provider
        value={{ posts, users, comments, filterText, setFilterText }}
      >
        <BrowserRouter>
          <Routes>
            <Route
              path="/secretAnswer/*"
              element={<SecretAnswer hello={hello} />}
            />
            <Route
              path="/posts/*"
              element={<Posts filteredPosts={filteredPosts} hello={hello} />}
            />
            <Route path="/*" element={<Navigate to="/posts" />} />
            <Route
              path="/post/:id/*"
              element={
                <ProtectedRoute
                  component={<SinglePost hello={hello} />}
                  authenticationPath={"/secretAnswer"}
                />
              }
            />
          </Routes>
          <ReactQueryDevtools />
        </BrowserRouter>
      </PostsContext.Provider>
    </>
  );
}

//Exporting for use in other files
export default App;
