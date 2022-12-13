import axios from "axios";
import Cookies from 'js-cookie'
const baseUrl = process.env.NODE_ENV==='development'? 'http://localhost:8081':'https://authentication-example-api.herokuapp.com';  //to change

const Api = axios.create({
    baseURL:baseUrl,
    headers:{
        'Content-Type': 'application/json',
        accept : 'application/json',
    }
});

const Signup = async(body) =>{
    const response = Api.post('/api/signup',body).then(response=>{
        return response;
    }).catch((e)=>{
        return e.response;
    })
    return response;
}

const Login = async(body) =>{
    const response = Api.post('/api/login',body).then(response=>{
        return response
    }).catch((e)=>{
        return e.response
    })
    return response
}

const VerifyEmail = async(body) =>{
    const response = Api.get(`/api/verify-email/${body.token}`).then(response=>{
        return response;
    }).catch((e)=>{
        return e.response;
    })
    return response;
}

const Logout = async() =>{
    const response = Api.get(`/api/logout/${Cookies.get('token')}`).then(response=>{
        return response;
    }).catch((e)=>{
        return e.response;
    })
    return response;
}

const ForgetPassword = async(body) =>{
    const response = Api.get(`/api/forget-password/${body.email}`).then(response=>{
        return response
    }).catch((e)=>{
        return e.response
    })
    return response
}

const ResetPassowrd = async(body) =>{
    const response = Api.post('/api/reset-password',body).then(response=>{
        return response
    }).catch((e)=>{
        return e.response;
    })
    return response;
}

const fetchUser = async() =>{
    const response = Api.get(`/api/profile/${Cookies.get('token')}`).then(response=>{
        return response
    }).catch((e)=>{
        return e.response
    })
    return response
}
const API = { Login, Signup, VerifyEmail, Logout, ResetPassowrd, ForgetPassword, fetchUser}

export default API;