import React from "react";
import { useHistory } from "react-router-dom";

const Movie = ({ theMovie }) => {
  const history = useHistory();
  const baseImageURL = "https://image.tmdb.org/t/p/w300";

  const showMovie = id => {
    history.push("/movie/" + id);
  };

  return (
    <div onClick={() => showMovie(theMovie.id)} className="movie-card">
      {theMovie.poster_path ? (
        <img
          src={baseImageURL + theMovie.poster_path}
          alt={theMovie.original_title}
        ></img>
      ) : (
        <span style={{ width: "100%", height: "300px" }}>
          <p style={{ fontSize: "3.7rem", textAlign: "center" }}>
            {theMovie.original_title.substr(0, 1)}
          </p>
        </span>
      )}

      <div className="movie-description">
        <h2 style={{ fontWeight: "bold" }}> {theMovie.original_title} </h2>
        <p>
          {" "}
          {theMovie.overview.substr(0, 255)}
          {theMovie.overview.length > 255 && <>....</>}
        </p>
      </div>
    </div>
  );
};

export default Movie;
