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

  export function saveChangedAndRemoved(removed,changed){
    const collections = {};
    collections.removed = removed;
    collections.changed = changed;
    const changeEndPoint = `${config.apiCustomersEndPoint}/change`
    return http.post(changeEndPoint,collections)
  }
