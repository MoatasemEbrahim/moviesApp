import React, { useState, useEffect } from "react";
import MoviesGrid from './MoviesGrid.js'
import DataLoading from "../../Shared/DataLoading/index.js";
import FavouriteMoviesApi from "./FavouriteMoviesApi";

const Favourite = props => {

  const [isLoadingData, toggleIsLoadingData] = useState(true);
  const [movies, setMovies] = useState(FavouriteMoviesApi.getMovies());

  useEffect(() => {
    setMovies(FavouriteMoviesApi.getMovies());
    toggleIsLoadingData(false);
  }, []);

  const removeFromFavouriteMovies = movieId => event => {
    const filteredMovies = { ...movies };
    delete filteredMovies[movieId];
    setMovies(filteredMovies);
    FavouriteMoviesApi.saveMovies(filteredMovies);
  };

  if (isLoadingData) return <DataLoading />;

  if (Object.values(movies).length === 0)
    return (
      <div className="pt-5">
        <h2 className="pt-5 text-center">
          It looks that you don't have any favourite movies
        </h2>
      </div>
    );

  return (
    <MoviesGrid
      movies={Object.values(movies)}
      setMovies={setMovies}
      removeFromFavouriteMovies={removeFromFavouriteMovies}
    />
  );
};

export default Favourite;
