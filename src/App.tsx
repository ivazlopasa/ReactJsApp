//Imports needed for this file
import React from "react";
import "./App.css";
import Search from "./components/Search";
import Posts from "./components/Posts";

type MyProps = {
  hello: string;
};

//Class App is responsible for displayin the homepage(posts page)
class App extends React.Component<MyProps> {
  state = {
    posts: [],
    filteredPosts: [],
    users: [],
  };

  //Filtering posts so that search works on user's username
  getPosts = async (search: string) => {
    try {
      const postUser: any = this.state.users.find(
        (u: { username: string }) =>
          u.username.toLowerCase() === search.toLowerCase()
      );
      if (postUser) {
        const filteredPosts = this.state.posts.filter(
          (p: { userId: string }) => p.userId === postUser.id
        );
        this.setState({ filteredPosts });
      } else {
        this.setState({ filteredPosts: [] });
      }
    } catch (e) {
      console.log(e);
    }
  };

  //Getting the data from json files
  componentDidMount = async () => {
    console.log(`${this.props.hello} App Component`);
    try {
      const postAPI = await fetch(`https://jsonplaceholder.typicode.com/posts`);
      const posts = await postAPI.json();
      const usersAPI = await fetch(
        `https://jsonplaceholder.typicode.com/users`
      );
      const users = await usersAPI.json();
      this.setState({ posts, filteredPosts: posts, users });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <div>
        <div>
          <header>
            <nav className="navbar navbar-dark bg-dark">
              <a className="navbar-brand" href="#">
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
          <Search getPosts={this.getPosts} hello={this.props.hello} />
          <Posts posts={this.state.filteredPosts} hello={this.props.hello} />
        </div>
      </div>
    );
  }
}

//Exporting for use in other files
export default App;
