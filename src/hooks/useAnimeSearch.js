import { useState } from "react";

function useAnimeSearch() {
  const [data, setData] = useState([])
  const[loading, setLoading] = useState(false)
  const [error, setError] = useState(null);
  
   async function searchedAnime(searchQuery){
     if (searchQuery === "") {
    setData([]);
    return;
  }
    setLoading(true)
   try {
     let result = await fetch(`https://www.omdbapi.com/?s=${searchQuery}&apikey=1e8d6b4b`);
     let newData = await result.json()
     setData(newData.Search || []);
   } catch (error) {
     setError(`error : ${error}`);
     
   }finally{
    setLoading(false);
   }
  }
  return[data,error,loading, searchedAnime]
}
export default useAnimeSearch