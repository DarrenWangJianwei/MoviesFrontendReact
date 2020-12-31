import config from './config.json'
import http from './services/httpService'

const userUrl = config.apiUserEndPoint;

export function registerNewUser(user){

    return http.post(userUrl,{
        email : user.username,
        password : user.password,
        name: user.name
    });
}

