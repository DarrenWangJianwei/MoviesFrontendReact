import config from './config.json'
import http from './services/httpService'
  function movieUrl(id){
    return `${config.apiMoviesEndPoint}/${id}`;
  }
  export function getMovies() {
    return http.get(config.apiMoviesEndPoint);
  }
  
  export function getMovie(id) {
    return http.get(movieUrl(id));
  }
  
  export function saveMovie(movie) {
      if(!movie._id){
        return http.post(config.apiMoviesEndPoint,movie);
      }else{
        const movieRemoveId = {...movie};
        delete movieRemoveId._id;
        return http.put(movieUrl(movie._id), movieRemoveId)
      }
  }
  
  export async function deleteMovie(id) {
      return http.delete(movieUrl(id))
  }
  