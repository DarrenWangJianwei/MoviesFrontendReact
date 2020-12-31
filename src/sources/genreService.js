import http from './services/httpService'
import config from './config.json'
  
  export function getGenres() {
    const genres = http.get(config.apiGenresEndPoint);
    return genres;
  }
  