import axios from 'axios';
var oauthServerLocation = 'http://localhost:9088';

export default {
    onPageRefresh(session, router) {
        return new Promise((resolve, reject) => {
            if (session.exists("refresh_token")) {
                this.getAccessToken(session.get("refresh_token"))
                    .then((response) => {
                        // console.log(response);
                        session.set("access_token", response.data.access_token);
                        session.set("refresh_token", response.data.refresh_token);
                        resolve(response);
                    })
                    .catch((err) => {
                        session.clear();
                        session.destroy();
                        location.reload();
                        console.log(err);
                        reject(err);
                    });
            }
        });
    },
    getAccessToken(refreshToken) {
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
                    'grant_type': 'refresh_token',
                    'client_id': 'barClientIdPassword',
                    'refresh_token': refreshToken
                }
            }).then((response) => {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access_token;
                resolve(response);
            }).catch((err) => {
                reject(err);
            });
        });
    }
}