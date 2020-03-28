
const FavouriteMoviesApi = {
  getMovies: () =>{
    const movies = JSON.parse(localStorage.getItem("favouriteMovies"));
    if (movies && Object.keys(movies).length > 0) 
      return movies;
    else 
      return {};
},
  saveMovies: movies =>
    localStorage.setItem("favouriteMovies", JSON.stringify(movies))
};

export default FavouriteMoviesApi;
