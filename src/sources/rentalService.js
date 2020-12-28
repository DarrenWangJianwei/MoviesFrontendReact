import config from './config.json'
import http from './services/httpService'
  
  function rentalsUrl(rentalId){
    return `${config.apiRentalsEndPoint}/${rentalId}`;
  }
  export function getAllRentals() {
    return http.get(config.apiRentalsEndPoint);
  }
  
  export function getRentals(rentalId) {
    return http.get(rentalsUrl(rentalId));
  }

  export function addRentals(userId,movieId){
    const userAndMovie = {};
    userAndMovie.userId = userId;
    userAndMovie.movieId = movieId;
    return http.post(config.apiRentalsEndPoint,userAndMovie);     
  }
  export function deleteRentals(userId,movieId){
    const deleteEndPoint = config.apiRentalsEndPoint+"/"+userId+"/"+movieId;
    return http.delete(deleteEndPoint);    
  }
  export function deleteRentalsById(rentalId){
    return http.delete(rentalsUrl(rentalId));    
  }
