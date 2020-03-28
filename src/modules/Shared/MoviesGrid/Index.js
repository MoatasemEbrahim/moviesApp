import React from "react";
import moment from 'moment';
import PropTypes from "prop-types";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core/styles";
import defaultImage from '../../../Assets/Images/default.jpg';
const useStyles = makeStyles(theme => ({
    media: {
        height: 0,
        paddingTop: "50%",
    },
}));

const MoviesGrid = props =>{
    const { 
        movies, 
        toggleFavouriteFilm, 
        toggleIsDataLoading,
        setCurrentPage,
        favouriteMovies,
        currentPage,
        availablePages
    }=props;

    const classes = useStyles();

    const handlePagination = (event, page) => {
        toggleIsDataLoading(true);
        setCurrentPage(page);
    };

    if (movies.length === 0)
        return (
            <div className='pt-5'>
                <h2 className='pt-5 text-center'>
                There are no movies to display
                </h2>
            </div>
        )

      return (
        <>
          <div className="row mx-2">
            {movies.map(movie => (
              <div key={movie.id} className="col-sm-12 col-md-6 col-lg-4 py-3">
                <Card>
                  <CardHeader
                    action={
                      <IconButton
                        onClick={toggleFavouriteFilm(movie)}
                        aria-label="add to favorites"
                      >
                        <FavoriteIcon
                          className={
                            favouriteMovies.hasOwnProperty(movie.id)
                              ? "text-danger"
                              : ""
                          }
                        />
                      </IconButton>
                    }
                    title={movie.original_title}
                    subheader={
                      <>
                        <div className="d-inline-block">
                          <h6>
                            {moment(movie.release_date, "YYYY-MM-DD").format(
                              "MMMM DD YYYY"
                            )}
                          </h6>
                        </div>
                      </>
                    }
                  />
                  <CardMedia
                    className={classes.media}
                    image={
                      movie.backdrop_path || movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500/${
                            movie.backdrop_path
                              ? movie.backdrop_path
                              : movie.poster_path
                          }`
                        : defaultImage
                    }
                    title={movie.original_title}
                  />
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {movie.overview.length < 140
                        ? movie.overview
                        : `${movie.overview.slice(0, 140)}...`}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
          {movies.length > 0 ? (
            <div className="row m-0">
              <div className="col d-flex justify-content-around py-2 px-0">
                <Pagination
                  onChange={handlePagination}
                  page={currentPage}
                  count={availablePages}
                />
              </div>
            </div>
          ) : (
            ""
          )}
        </>
      );
}

export default MoviesGrid;

MoviesGrid.propTypes = {
  movies: PropTypes.array.isRequired,
  toggleFavouriteFilm: PropTypes.func.isRequired,
  toggleIsDataLoading: PropTypes.func.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  favouriteMovies:PropTypes.object.isRequired,
  availablePages:PropTypes.number.isRequired,
};