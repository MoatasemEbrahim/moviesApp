import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import MoviesGrid from '../../../Shared/MoviesGrid/Index.js'
import DataLoading from '../../../Shared/DataLoading/index.js'
import showNotificationMessage from "../../../../util/NotificationMessage/Index.js";
import HomeApi from "../HomeApi";


const MoviesSearch = props => {

    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [availablePages, setAvailablePages] = useState(0);
    const [isDataLoading, toggleIsDataLoading] = useState(true);
    const [favouriteMovies, setFavouriteMovies] = useState(HomeApi.getFavouriteMovies());

    const toggleFavouriteFilm = movie => event => {
        let filteredMovies = { ...favouriteMovies };
        if (filteredMovies.hasOwnProperty(movie.id)) {
            delete filteredMovies[movie.id];
        } else {
            filteredMovies = {
                ...filteredMovies,
                [movie.id]: movie
            };
        }
        setFavouriteMovies(filteredMovies);
        HomeApi.saveFavouriteMovies(filteredMovies);
    };

    useEffect(
      () => {
        HomeApi.getSearchResults(currentPage, props.searchText)
          .then(response => {
            setMovies(response.data.results);
            setAvailablePages(response.data.total_pages);
            toggleIsDataLoading(false);
          })
          .catch(error =>
            showNotificationMessage(
              "Something went wrong, please reload the page"
            )
          );
      },
      [currentPage, props.submitSearch] // eslint-disable-line react-hooks/exhaustive-deps
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

export default MoviesSearch;


MoviesSearch.propTypes = {
  searchText: PropTypes.string.isRequired,
  submitSearch: PropTypes.bool.isRequired
};