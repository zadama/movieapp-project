import React, { useEffect } from "react";
import Movie from "./Movie";

const MoviesList = props => {
  //props.moviesLis.sort((a, b) => b.vote_average - a.vote_average).
  return (
    <div style={{ marginTop: "50px" }} className="movies-container">
      {props.moviesList.map((movie, i) => {
        return (
          <React.Fragment key={i}>
            {movie.overview.length < 50 ? null : <Movie theMovie={movie} />}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default MoviesList;
