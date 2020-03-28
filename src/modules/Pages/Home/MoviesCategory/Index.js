import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import MoviesGrid from '../../../Shared/MoviesGrid/Index.js'
import DataLoading from '../../../Shared/DataLoading/index.js'
import showNotificationMessage from '../../../../util/NotificationMessage/Index.js'
import HomeApi from "../HomeApi";


const MoviesCategory = props => {

    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [availablePages, setAvailablePages] = useState(0);
    const [isDataLoading, toggleIsDataLoading] = useState(true);
    const [favouriteMovies,setFavouriteMovies] = useState(HomeApi.getFavouriteMovies());

    const toggleFavouriteFilm = movie => event => {
      let filteredFavouriteMovies = { ...favouriteMovies };
      if (filteredFavouriteMovies.hasOwnProperty(movie.id)) {
        delete filteredFavouriteMovies[movie.id];
      } else {
        filteredFavouriteMovies = {
          ...filteredFavouriteMovies,
          [movie.id]: movie
        };
      }
      setFavouriteMovies(filteredFavouriteMovies);
      HomeApi.saveFavouriteMovies(filteredFavouriteMovies);
    };

   
    useEffect(
      () => {
        HomeApi.getMovies(props.category, currentPage)
          .then(response => {
            setMovies(response.data.results);
            setAvailablePages(response.data.total_pages);
            toggleIsDataLoading(false);            
          })
          .catch(error => showNotificationMessage('Something went wrong, please reload the page'));
      },
      [props.category,currentPage]
    );

    
  if (isDataLoading) return <DataLoading />;

    return (
      <>
        <MoviesGrid
          movies={movies}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          availablePages={availablePages}
          toggleIsDataLoading={toggleIsDataLoading}
          favouriteMovies={favouriteMovies}
          toggleFavouriteFilm={toggleFavouriteFilm}
        />
      </>
    );
};

export default MoviesCategory;

MoviesCategory.propTypes = {
  category: PropTypes.string.isRequired,
};