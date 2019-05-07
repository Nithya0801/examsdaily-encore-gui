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
    },
    getUserDetails(data) {
        var authAxios = axios.create({
            baseURL: oauthServerLocation,
        });
        return new Promise((resolve, reject) => {
            authAxios({
                method: 'get',
                url: 'account/tokenVerify?token=' + data.token,
            }).then((response) => {
                resolve(response);
            }).catch((err) => {
                reject(err);
            });
        });
    },
    getUserInfo(session) {
        var authAxios = axios.create({
            baseURL: oauthServerLocation,
        });
        // let email = contact.email;
        // console.log(email);
        return new Promise((resolve, reject) => {
            authAxios({
                method: 'get',
                url: 'manage/user/find/' + session.get("contact"),
            }).then((response) => {
                session.set('current_user', response.data);
                // if(session.get('current_user')!=null)
                //   if(session.get('current_user').avatar!=null)
                //     this.getAndLoadImage(session);
                resolve(response);
            }).catch((err) => {
                reject(err);
            });
        });
    },
    logout(accessToken) {
        var authAxios = axios.create({
            baseURL: oauthServerLocation,
        });
        return new Promise((resolve, reject) => {
            authAxios({
                method: 'post',
                url: 'oauth/token/revokeById/' + accessToken,
            }).then((response) => {
                axios.defaults.headers.common['Authorization'] = 'Bearer ';
                resolve(response);
            }).catch((err) => {
                reject(err);
            });
        });
    },
    studentRegister(data) {
        var authAxios = axios.create({
            baseURL: oauthServerLocation,
        });
        return new Promise((resolve, reject) => {
            console.log("----Student Register from Accoun Js ---"+data);
            authAxios({
                method: 'post',
                url: '/insertStudent',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    studentFirstName: data.studentFirstName,
     studentLastName : data.studentLastName,
     applicationDate : data.applicationDate,
     fatherName: data.fatherName,
     motherName: data.motherName,
     studentDob: data.studentDob,
     studentGender: data.studentGender,
     studentAddress: data.studentAddress,
     studentMobile : data.studentMobile,
     fatherMobile:data.fatherMobile,
     motherMobile: data.motherMobile,
     studentEmail: data.studentEmail,
     studentQualification: data.studentQualification,
         avatar:data.avatar           
                },
            }).then((response) => {
                console.log("#####$$$@@@",response.data);
                resolve(response);
            }).catch((err) => {
                reject(err);
            });
        });
    },

    studentInfo(data) {
        var authAxios = axios.create({
            baseURL: oauthServerLocation,
        });
        return new Promise((resolve, reject) => {
            authAxios({
                method: 'get',
                url: '/getStudentInfo/'+data
              
                
            }).then((response) => {
                console.log("Response data from UserAPI : "+response.data);
                data=response.data;
                resolve(response);
                console.log("-----/hello-----"+response);
            }).catch((err) => {
                //reject(err);
                console.log("-----/hello::error ---------"+err);
            });
            
        });
    },

}