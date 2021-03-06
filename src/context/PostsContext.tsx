import React from "react";
import { IComments } from "../interfaces/IComments";
import { IPost } from "../interfaces/IPost";
import { IUsers } from "../interfaces/IUsers";

const PostsContext = React.createContext({
  posts: [] as Array<IPost>,
  users: [] as Array<IUsers>,
  comments: [] as Array<IComments>,
  filterText: "",
  setFilterText: (filterText: string) => {},
});

export default PostsContext;
