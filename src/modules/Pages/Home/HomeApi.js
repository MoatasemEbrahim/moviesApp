import axiosInstance from '../../../util/Axios/Index.js'

const HomeApi = {
  getMovies: (category, page) =>
    axiosInstance.get(`movie/${category}`, {
      params: {
        api_key: "c44b8fd4864ef98545bcc2c5c74e03d8",
        page
      }
    }),
  
  getSearchResults: (page,query) =>
    axiosInstance.get('search/movie',{
      params: {
        api_key: "c44b8fd4864ef98545bcc2c5c74e03d8",
        page,
        query
      }
    }),

  getFavouriteMovies: () => {
    const movies = JSON.parse(localStorage.getItem("favouriteMovies"));
    if (movies && Object.keys(movies).length > 0)
      return movies 
    else
      return {};
  },
  saveFavouriteMovies: movies =>
    localStorage.setItem("favouriteMovies", JSON.stringify(movies))
};

export default HomeApi;