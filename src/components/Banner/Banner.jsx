import React, { useEffect, useState } from "react";
import axios from "../../axios/axios";
import requests from "../../services/requests";
import classes from "./Banner.module.css";

const Banner = () => {
  const description = "This is a test description ";

  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(requests.fetchNetflixOriginals);

      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );

      return request;
    };

    fetchData();
  }, []);

  return (
    <header
      className={classes.banner}
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
      }}
    >
      <div className={`container ${classes.bannerContents}`}>
        <h1>{movie?.title || movie?.name || movie?.original_name}</h1>

        <div className={classes.buttons}>
          <button>Play</button>

          <button>My List</button>
        </div>

        <p>
          {movie?.overview?.length > 150
            ? movie?.overview.slice(0, 150) + "..."
            : movie?.overview}
        </p>
      </div>

      <div className={classes.fadeBtm} />
    </header>
  );
};

export default Banner;
