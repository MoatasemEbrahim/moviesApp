import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import moment from 'moment';

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles(theme => ({
  media: {
    height: 0,
    paddingTop: "50%",
  },
}));

const MoviesGrid = props => {
    const classes = useStyles();   

    return (
      <>
        <div className="row mx-2">
          {props.movies.map(movie => (
            <div key={movie.id} className="col-sm-12 col-md-6 col-lg-4 py-3">
              <Card>
                <CardHeader
                  action={
                    <IconButton
                      onClick={props.removeFromFavouriteMovies(movie.id)}
                      aria-label="remove from favorites"
                    >
                      <CloseIcon/>
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
                  image={`https://image.tmdb.org/t/p/w500/${
                    movie.backdrop_path
                      ? movie.backdrop_path
                      : movie.poster_path
                  }`}
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
      </>
    );
};



export default MoviesGrid;
