import React, { useEffect, useState } from "react";
import axios from "../../axios/axios";
import classes from "./Row.module.css";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);

  const imageUrl = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(fetchUrl);

      setMovies(request.data.results);

      return request;
    };

    fetchData();
  }, [fetchUrl]);

  return (
    <div className="container">
      <div className={classes.row}>
        <h2>{title}</h2>

        <div className={classes.posters}>
          {movies?.map(
            (movie) =>
              ((isLargeRow && movie.poster_path) ||
                (!isLargeRow && movie.backdrop_path)) && (
                <img
                  className={`${classes.poster} ${
                    isLargeRow && classes.posterLarge
                  }`}
                  key={movie.id}
                  src={`${imageUrl}${
                    isLargeRow ? movie.poster_path : movie.backdrop_path
                  }`}
                  alt={movie.name}
                />
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default Row;
