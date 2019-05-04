import axios from 'axios';

var oauthServerLocation="http://localhost:9088";

export default {

    registerApi:function(data) {
        
        var authAxios = axios.create({
            baseURL: oauthServerLocation,
        });
        return new Promise((resolve, reject) => {
            authAxios({
                method: 'post',
                url: 'account/userRegister',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    username: data.username,
                    contact: data.contact,
                    firstName: data.firstName,
                    lastName: data.lastName
                },
            }).then((response) => {
                resolve(response);
            }).catch((err) => {
                reject(err);
            });
        });
    },
    registerOtpCheck(data) {
        
        var authAxios = axios.create({
            baseURL: oauthServerLocation,
        });
        console.log("Id", data)
        return new Promise((resolve, reject) => {
            authAxios({
                method: 'post',
                url: 'account/otpCheck',
                data: {
                    verifyId: data.verifyId,
                    generatedOtp: data.generatedOtp,
                },
            }).then((response) => {
                resolve(response);
            }).catch((err) => {
                reject(err);
            });
        });
    },
    otpVerify(data) {
        
        var authAxios = axios.create({
            baseURL: oauthServerLocation,
        });
        console.log(data)
        return new Promise((resolve, reject) => {
            authAxios({
                method: 'post',
                url: 'account/otpVerify',
                data: {
                    verifyId: data.verifyId,
                    generatedOtp: data.generatedOtp,
                    contact: data.contact,
                    username: data.username,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    password: data.password
                },
            }).then((response) => {
                // console.log("otp verify response",response);
                resolve(response);
            }).catch((err) => {
                reject(err);
            });
        });
    },
    mailPassword(data) {
        var authAxios = axios.create({
            baseURL: oauthServerLocation,
        });
        return new Promise((resolve, reject) => {
            authAxios({
                method: 'post',
                url: 'account/tokenVerify',
                data: {
                    verificationToken: data.verificationToken,
                    contact: data.contact,
                    // username: data.username,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    password: data.password
                },
            }).then((response) => {
                resolve(response);
            }).catch((err) => {
                reject(err);
            });
        });
    },
    userLogin(user) {
        var authAxios = axios.create({
            baseURL: oauthServerLocation,
        });
        return new Promise((resolve, reject) => {
            authAxios({
                method: 'post',
                url: 'oauth/token',
                headers: {
                    'Authorization': 'Basic ' + btoa("barClientIdPassword:password"),
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                params: {
                    'grant_type': 'password',
                    'username': user.contact,
                    'password': user.password
                }
            }).then((response) => {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access_token;
                // localStorage.setItem('isAuthenticated', true);
                resolve(response);
            }).catch((err) => {
                reject(err);
            });
        });
    }

}