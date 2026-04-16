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
     let result = await fetch(`https://api.jikan.moe/v4/anime?q=${searchQuery}&limit=10`);
     let newData = await result.json()
     setData(newData.data);
   } catch (error) {
     setError(`error : ${error}`);
     
   }finally{
    setLoading(false);
   }
  }
  return[data,error,loading, searchedAnime]
}
export default useAnimeSearch