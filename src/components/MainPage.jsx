import React, { useState, useEffect } from "react";
import axios from "axios";
import "./../Requests";
import Card from "./Card";
import "./MainPage.css"


function MainPage() {
  const [movies, setmovies] = useState([]);
   const API_KEY = "6518ae7cd3d526b4453531051cc4d408";

  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en-US`
    );
    setmovies(data.results);
  };
  useEffect(() => {
    fetchTrending();
  }, []);
  return (
    <div className="main">
      <div className="heading"><h1>Trending Now</h1></div>
      <div className="trending">
        {movies && movies.map((movie) =>( <Card 
        key={movie.id} 
        id={movie.id} 
        poster={movie.poster_path} 
        title={movie.title || movie.name} date={movie.first_air_date || movie.release_date} 
        media_type={movie.media_type} 
        rating={movie.vote_average} />))}
        
      </div>
    </div>
  );
}

export default MainPage;
