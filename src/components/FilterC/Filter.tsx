//Imports needed for this file
import { useEffect, useContext } from "react";
import PostsContext from "../../context/PostsContext";

//Constant Search with props getPosts for getting posts and filtering them by username, plus hello string for console log
const Filter = (props: { hello: string }) => {
  const { search, setSearch } = useContext(PostsContext);

  //Console logging via props
  useEffect(() => {
    console.log(`${props.hello} Search Component`);
  }, [props.hello]);

  return (
    <>
      <input
        className="formInput"
        type="text"
        name="postName"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {console.log(search)}
      <br />
    </>
  );
};
export default Filter;
