import React, { useEffect, useState } from 'react';
import Layout from "./layout";

import { useRouteMatch, Link } from 'react-router-dom';


const saveMovie = (id) => {
  console.log(id);
  let jsonMovies = JSON.parse(localStorage.getItem("movies"));
  if(Array.isArray(jsonMovies) === false)
    jsonMovies = [];

  if(jsonMovies.includes(id) === false) {
    jsonMovies.push(id);
    localStorage.setItem("movies", JSON.stringify(jsonMovies));
  }
}

const MoviePage = () => {
  const match = useRouteMatch();
  const matchID = match.params.id;
  useEffect(() => {
    fetch("https://api.themoviedb.org/3/movie/" + matchID + "/videos?api_key=d1426caae4746a010983a3dbcf8acc35&language=en-US")
      .then(res => res.json())
      .then(
        (data) => {

        },
        (error) => {
          console.log(error);
        }
      )
  }, [matchID])

  return (
    <Layout >
      <div>{matchID}</div>
      <div>Vi gör nytt API-anrop för att hämta mer info enskilde filmen här</div>
      <div>plus gör det möjligt för användaren att spara filmen till localstorage</div>
      <button onClick={() => saveMovie(matchID)}>Save</button>
    </Layout>
  )

}

export default MoviePage;