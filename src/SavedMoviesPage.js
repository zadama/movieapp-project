import React, { useState } from "react"
import Layout from "./layout";
import MoviesList from "./MoviesList"

let movies;

function update() {
  let jsonMovies = JSON.parse(localStorage.getItem("movies"));
  if (Array.isArray(jsonMovies) === false)
    jsonMovies = [];

  movies = jsonMovies;
  console.log(jsonMovies);
}

const SavedMoviesPage = () => {
  update();
  return (
    <Layout >
      <div>Här kan vi vi återanvända movieslist/movie komponenter, dock ska data som skickas till komponenterna</div>
      <div>hämtas från localstorage, dvs., i denna komponent/page hämtar vi localstorage data.</div>
      <MoviesList moviesList={movies} />
    </Layout>
  )

}

export default SavedMoviesPage;