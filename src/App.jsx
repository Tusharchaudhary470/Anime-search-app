import { useState, useEffect } from "react";

function App(){
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const[loading, setLoading] = useState(false)
  const [error, setError] = useState(null);

  async function searchedAnime(searchQuery){
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
 return(
  <div className="app"> 
  <SearchAnime
     searchQuery={searchQuery}
     setSearchQuery={setSearchQuery}
     onSearch={searchedAnime} 
     />
     
     <CardMaker data={data}
     loading={loading}
     error={error}
     searchQuery={searchQuery} />
     </div>
 )
}

function SearchAnime({searchQuery, setSearchQuery, onSearch}){
    return(
      <div className="SearchBar">
        <input 
        autoFocus
        className="SearchInput"
      type="text"
  placeholder="Search notes..."
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  onKeyDown={(e)=> e.key == "Enter" && onSearch(searchQuery)} />
  <button onClick={()=> onSearch(searchQuery)}> Search Anime</button>
  </div>
    )
}

function CardMaker({data, loading, error, searchQuery}){
  if(loading){
    return(
  <p className="message">Loading....</p>
 )
  }
  if(error){return(<p className="message"> Error: {error}</p>)}
  if(!searchQuery){return <p className="message">Search for an anime and click search anime</p>}
  if(data.length === 0 && searchQuery){
  return <p className="message">Please click search anime to search"{searchQuery}"</p>
}
  return(<div className="grid">
    {data.map(anime=>
    <div 
    className="Cards"
    key = {anime.mal_id}>
      <img src={anime.images.jpg.image_url} alt="dynamic image" />
      <h4>Title : "{anime.title}"</h4>
      <h4>Score : "{anime.score}"</h4>
    </div>
  )}
  </div> 
    
  )
}
export default App
