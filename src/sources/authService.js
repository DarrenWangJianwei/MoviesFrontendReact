import config from './config.json'
import http from './services/httpService'
import jwtDecode from 'jwt-decode';

const authUrl = config.apiAuthEndPoint;
const tokenKey = "token";

http.setJwt(getJwt());

async function login(username,password){
    const { data: jwt } = await http.post(authUrl,{email:username,password})
    localStorage.setItem(tokenKey, jwt);
}

function logout(){
    localStorage.removeItem(tokenKey);
}

function loginWithJwt(Jwt){
    localStorage.setItem(tokenKey, Jwt);
}

function getCurrentUser(){
    try {
        const jwt = localStorage.getItem(tokenKey);
        return jwtDecode(jwt);
      } catch (error) {
        return null;
      }
}
function getJwt(){
    return localStorage.getItem(tokenKey);
}

const auth ={
    login,logout,loginWithJwt,getCurrentUser,getJwt
}
export default auth;
