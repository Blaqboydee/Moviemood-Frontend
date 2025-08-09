import React, {useEffect, useState} from 'react'
import axios from "axios";
import { useParams } from 'react-router-dom'
import { useFetchMovies } from "../hooks/useFetchMovies";



const Bookticket = () => {
 const params = useParams();
 const[themovie, setthemovie] = useState({})
 const {
      allmovies
    } = useFetchMovies();

useEffect(() => {
  if (params.movieSlug && allmovies.length > 0) {
    const foundMovie = allmovies.find(
      (movie) => movie.movieSlug === params.movieSlug
    );
    setthemovie(foundMovie || {});
  console.log(themovie);

  }
}, [params.movieSlug, allmovies]);

  

  return (
    <div>{themovie.title}</div>
  )
}

export default Bookticket