//Imports needed for this file
import React, { useState, useEffect } from "react";

//Constant Search with props getPosts for getting posts and filtering them by username, plus hello string for console log
const Search = (props: { getPosts: Function; hello: string }) => {
  const [search, setSearch] = useState("");

  //Console logging via props
  useEffect(() => {
    console.log(`${props.hello} Search Component`);
  }, []);
  
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(props);
        console.log("search");
        if (search) props.getPosts(search);
      }}
      style={{ marginBottom: "2rem" }}
    >
      <input
        className="formInput"
        type="text"
        name="postName"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <br />
      <button className="btn-lg btn-outline-dark">Search</button>
    </form>
  );
};
export default Search;