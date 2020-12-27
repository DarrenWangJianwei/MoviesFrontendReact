import config from './config.json'
import http from './services/httpService'
  function customerUrl(user_id){
    return `${config.apiCustomersEndPoint}/${user_id}`;
  }
  export function getCustomers() {
    return http.get(config.apiCustomersEndPoint);
  }
  
  export function getCustomer(user_id) {
    return http.get(customerUrl(user_id));
  }

  export function updateCustomer(customer){
    return http.put(customerUrl(customer.user),customer);     
  }

  export function addNewCustomer(user){


  }
  
//   export function saveCustomer(user) {
//       if(!user._id){
//         return http.post(config.apiMoviesEndPoint,user);
//       }else{
//         const movieRemoveId = {...movie};
//         delete movieRemoveId._id;
//         return http.put(customerUrl(movie._id), movieRemoveId)
//       }
//   }
