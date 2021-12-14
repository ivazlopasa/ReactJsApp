//Imports needed for this file
import { useEffect } from "react";
import { IUsers } from "../../interfaces/IUsers";

//Constant Users with props userId to connect users with posts and hello string for rendering log in the console
const Users = (props: { data: IUsers[], userId: number; hello: string }) => {

    //Displaying component in console
    useEffect(() => {
      console.log(`${props.hello} Users Component`);
    }, [props.hello]);

  function getUsername(data: any, userId: number) {
    const user = data?.find((user: { id: number }) => userId === user.id);
    return user ? user.username : "No user";
  }

  if(!props.data) return (<span>There are no users for this post</span>);
  
  return (
    <>{getUsername(props.data, props.userId)}</>
  );
};

//Exporting for use in other files
export default Users;
