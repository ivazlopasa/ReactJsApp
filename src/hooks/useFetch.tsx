//Imports needed for this file
import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url: any) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = () => {
    axios.get(url).then((res) => {
      setData(res.data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    fetchData();
    return () => {
      setData([]); // This worked for me
    };
  }, []);

  return { data, isLoading };
};

//Exporting for use in other files
export default useFetch;
