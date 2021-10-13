import React, { useEffect, useState } from "react";

//Constant Comments with props id to connect comments with posts and hello string for rendering log in the console
const Comments = (props: { id: number; hello: string }) => {
  const [postComments, setPostComments] = useState([]);

  useEffect(() => {
    const getFilteredComments = async () => {
      const commentsAPI = await fetch(
        "https://jsonplaceholder.typicode.com/comments"
      );
      const allComments = await commentsAPI.json();

      //Filtering the comments relevant to the post id
      const filteredComments = allComments.filter(
        (c: { postId: number }) => props.id === c.postId
      );
      setPostComments(filteredComments);
    };

    //Console logging via props
    getFilteredComments();
    console.log(`${props.hello} Comments Component`);
  }, [props.hello, props.id]);

  let comments: any;
  comments = postComments;
  let counter = 1;

  return (
    <div>
      {comments.length === 0 ? (
        <div>There are no comments for this post</div>
      ) : (
        comments.map((c: { name: string; id: number }) => (
          <div key={c.id}>
            {counter++}. {c.name}
          </div>
        ))
      )}
    </div>
  );
};

//Exporting for use in other files
export default Comments;