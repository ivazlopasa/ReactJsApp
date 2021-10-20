import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

//Constant Comments with props id to connect comments with posts and hello string for rendering log in the console
const Comments = (props: { id: number; hello: string }) => {
  const [postComments, setPostComments] = useState([]);

  const getComments = async () => {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/comments');
    return data;
    };
    const { data } = useQuery('create', getComments);
  
  useEffect(() => {
    //Console logging via props
    console.log(`${props.hello} Comments Component`);

    let allComments = data;
    console.log(data);

    const filteredComments = allComments?.filter(
      (c: { postId: number }) => props.id === c.postId
    );

    setPostComments(filteredComments);
    return () => {
      setPostComments([]); 
    }; 
  }, [data, props.hello, props.id]);

  let comments: any;
  comments = postComments;
  let counter = 1;

  if(!comments) return (<div>There are no comments for this post</div>);

  return (
    <>
      {(
        comments.map((c: { name: string; id: number }) => (
          <p key={c.id}>
            {counter++}. {c.name}
          </p>
        ))
      )}
    </>
  );
};

//Exporting for use in other files
export default Comments;