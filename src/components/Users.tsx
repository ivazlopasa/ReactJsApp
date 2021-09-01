//Imports needed for this file
import React, { useEffect } from "react";
import useFetch from "../hooks/useFetch";

//Constant Users with props userId to connect users with posts and hello string for rendering log in the console
const Users = (props: { userId: number; hello: string }) => {
  //Fetching the data from the json file
  let url = "https://jsonplaceholder.typicode.com/users";
  const { data, isLoading } = useFetch(url);

  //Displaying component in console
  useEffect(() => {
    console.log(`${props.hello} Users Component`);
  }, []);

  return (
    <div>{!isLoading && <div>{getUsername(data, props.userId)}</div>}</div>
  );
};

//Finding the user corresponding to the Post Id
function getUsername(data: any, userId: Number) {
  const user = data.find((user: { id: Number }) => userId === user.id);
  return user ? user.username : "No user";
}

//Exporting for use in other files
export default Users;
