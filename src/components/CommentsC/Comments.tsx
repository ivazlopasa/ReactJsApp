import { useContext, useEffect, useState } from "react";
import PostsContext from "../../context/PostsContext";

//Constant Comments with props id to connect comments with posts and hello string for rendering log in the console
const Comments = (props: { id: number; hello: string }) => {
  const [postComments, setPostComments] = useState<never[] | undefined>([]);
  const contextData = useContext(PostsContext);
  
  useEffect(() => {
    //Console logging via props
    console.log(`${props.hello} Comments Component`);

    let allComments = contextData.comments;
    console.log(allComments);     
    console.log(props.id);

    const filteredComments = allComments?.filter(
      (c: { postId: number }) => props.id === c.postId
    );
    setPostComments(filteredComments); 
    
  }, [contextData.comments, props.hello, props.id]);
  let counter = 1;

  return (
    <>
      {(
        postComments?.map((c: { name: string; id: number }) => (
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
