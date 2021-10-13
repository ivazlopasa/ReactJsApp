//Imports needed for this file
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { IUsers } from "../interfaces/IUsers";

//Constant Users with props userId to connect users with posts and hello string for rendering log in the console
const Users = (props: { userId: number; hello: string }) => {
  //Fetching the data from the json file
  let url = "https://jsonplaceholder.typicode.com/users";
  const { data, isLoading } = useFetch(url); useState<IUsers>();
  //const [postUsers, setPostUsers] = useState([]);

  //Displaying component in console
  useEffect(() => {
    console.log(`${props.hello} Users Component`);
  }, [props.hello]);

  return (
    <div>{!isLoading && <div>{getUsername(data, props.userId)}</div>}</div>
  );
};

//Finding the user corresponding to the Post Id
function getUsername(data: any, userId: number) {
  const user = data.find((user: { id: number }) => userId === user.id);
  return user ? user.username : "No user";
}

//Exporting for use in other files
export default Users;
