import config from './config.json'
import http from './services/httpService'
  
  function rentalsUrl(user_id){
    return `${config.apiRentalsEndPoint}/${user_id}`;
  }
  export function getAllRentals() {
    return http.get(config.apiRentalsEndPoint);
  }
  
  export function getRentals(user_id) {
    return http.get(rentalsUrl(user_id));
  }

  export function addRentals(userId,movieId){
    const userAndMovie = {};
    userAndMovie.userId = userId;
    userAndMovie.movieId = movieId;
    console.log('userAndMovie',userAndMovie);
    return http.post(config.apiRentalsEndPoint,userAndMovie);     
  }
  export function deleteRentals(userId,movieId){
    const userAndMovie = {};
    userAndMovie.userId = userId;
    userAndMovie.movieId = movieId;
    console.log('userAndMovie',userAndMovie);
    const deleteEndPoint = config.apiRentalsEndPoint+"/"+userId+"/"+movieId;
    return http.delete(deleteEndPoint,userAndMovie);    
  }

