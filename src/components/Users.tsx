//Imports needed for this file
import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { IUsers } from "../interfaces/IUsers";

//Constant Users with props userId to connect users with posts and hello string for rendering log in the console
const Users = (props: { userId: number; hello: string }) => {

  const getUsers = async () => {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/users');
    return data;
    };
    const { data } = useQuery('build', getUsers);  useState<IUsers>();

  function getUsername(data: any, userId: number) {
    const user = data?.find((user: { id: number }) => userId === user.id);
    return user ? user.username : "No user";
  }

  //Displaying component in console
  useEffect(() => {
    console.log(`${props.hello} Users Component`);
  }, [props.hello]);

  if(!getUsername(data, props.userId)) return (<div>There are no users for this post</div>);
  
  return (
    <>{getUsername(data, props.userId)}</>
  );
};


//Exporting for use in other files
export default Users;
