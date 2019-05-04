
<template>
<b-container fluid style="padding: 0px;">
  <b-navbar sticky toggleable="md" varient="transparent">
   <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-navbar-brand href="#" style="padding:0px;">
      <b-col class="text-center" fluid >
       <b-img src="/static/images/exams.svg" height="35"/>
          <div style="font-family: 'Berkshire Swash', cursive; font-size: 1rem;">
           <span style="color: #ec3237ff">exams</span><span  style="color: #406ab2ff">daily</span>
          </div>
       </b-col>
     </b-navbar-brand>
  <b-collapse is-nav id="nav_collapse">
    <b-navbar-nav class="ml-auto">
    </b-navbar-nav>
  </b-collapse>
</b-navbar>

 <b-container fluid style="margin-top:-88px">
    <b-row>
      <b-col cols="12" md="20" class="login-screen left-col d-flex  justify-content-center" >
        <div class="left-col-text">
          <!-- <span>Registration Page</span> -->

          <div>
           <b-card  style="max-width: 740px;">
            <b-row >
              <b-col >
                  <b-card-text>
                  <b-form v-if="registerForm" @submit="userRegister">
                      <div class="mb-4 mr-1">
                      <span style="font-size:25px;font-weight:bold;"> Sign up</span>
                      </div>
                      <div class="text-center ">                     
                      
                      <b-input  class="form-control input"
                        type="text"
                        autofocus
                        v-model="user.contact"
                        placeholder="Email/Mobile" />

                        <b-input  class="form-control input"
                        type="text"
                        autofocus
                        v-model="user.firstName"
                        placeholder="First Name" />
                    
                      
                      <b-input  class="form-control input"
                        type="text"
                        autofocus
                        v-model="user.lastName"
                        placeholder="Last Name"  />
                                                             
                      <b-input  class="form-control input"
                        type="text"
                        autofocus
                        v-model="user.username"
                        placeholder="Username" />

                        <br>
                        <b-button autofocus class="btn-sm btn-block login-btn" type="submit"> Register </b-button>
                        <hr>
                        <span>or</span>
                        <div class="text-center">
                        <p class="text-css ml-2 "><a href="#/login" >sign in to your account</a></p>
                        </div>
                    </div>
                  </b-form>

                  <div class="text-center" v-if="mailLogin">
                      <b><p style="color:#a8acbc;">Check your email for an Account Activation Link</p></b><br>
                      <!-- <b-button autofocus class="btn-sm  login-btn" style="width:150px;"  @click="$emit('loginPage')">
                          Back to Login
                      </b-button> -->
                  </div>

                  <div class="text-center" v-if="otpLogin">
                    <b><p style="color:#a8acbc;">Check your mobile for an OTP for Account Activation</p></b>
                      <b-input  class="form-control input"
                              type="password"
                              autofocus
                              v-model="user.generatedOtp"
                              placeholder="OTP"/>
                        <b-col class="d-flex justify-content-between" >
                        <!-- <b-button  class="btn-sm btn-block login-btn mr-2"  @click="$emit('loginPage')">
                            Back
                        </b-button> -->
                        <b-button autofocus class="btn-sm btn-block login-btn" @click="otpVerify" >
                            Verify
                        </b-button>
                  </b-col>
                </div>
                </b-card-text>
                </b-col>
            </b-row>
    
        </b-card>
        </div>
        </div>

        

      </b-col>
      
    </b-row>
  </b-container>
</b-container>
</template>

<script>
// import axios from 'axios';
import Account from "@/service/Account";

export default {
  name: 'RegistrationPage',
  data () {
    return {      
      user: {
        contact: "",
        username:"",
        firstName:"",
        lastName:"",
        generatedOtp:""
      },
      otpLogin:false,
      mailLogin:false,
      registerForm:true,
      verifyId:'',
    }
  },
  mounted() {
      console.log("refreshing page..");
  },
  methods: {
    userRegister: function() {
        console.log("registering..");
        let data = {
        "contact": this.user.contact,
        "username": this.user.username,
        "firstName": this.user.firstName,
        "lastName": this.user.lastName,
        }
        console.log("",data);
        Account.registerApi(data)
        .then(response => {
            console.log("registered in API..",response);
            console.log("verifyId",response.data.verifyId);
            this.verifyId=response.data.verifyId;
            if(/^([a-z0-9_\-.])+@([a-z0-9_\-.])+\.([a-z]{2,4})$/.test(this.user.contact))
            {                    
                console.log("through email");
                this.mailLogin=true;
                this.registerForm=false;
            }else {
                console.log("through mobile");
                this.otpLogin=true;
                this.registerForm=false;
                // console.log("mobile")
            }
        })
        .catch(err => {
            console.log(err);
        })
    },
    // registerApi:function(data) {
    //     var serverLocation="http://localhost:9088";
    //     var authAxios = axios.create({
    //         baseURL: serverLocation,
    //     });
    //     return new Promise((resolve, reject) => {
    //         authAxios({
    //             method: 'post',
    //             url: 'account/userRegister',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             data: {
    //                 username: data.username,
    //                 contact: data.contact,
    //                 firstName: data.firstName,
    //                 lastName: data.lastName
    //             },
    //         }).then((response) => {
    //             resolve(response);
    //         }).catch((err) => {
    //             reject(err);
    //         });
    //     });
    // },
    otpVerify: function() {
      console.log("verifying OTP",this.user.generatedOtp);
      let data={
        "verifyId":this.verifyId,
        "generatedOtp":this.user.generatedOtp,
      }
        return new Promise((resolve, reject) => {
        Account.registerOtpCheck(data)
          .then(response=>{
                console.log("OTP respnse",response.data);
                this.$store.dispatch("getUserDetails", response.data);
                this.$router.replace(this.$route.query.redirect || "/otp_password");
              resolve(response);
          })
          .catch(err=>{
            reject(err);
            console.log(err);
          });
        });
    },
    // otpCheck(data) {
    //     var serverLocation="http://localhost:9088";
    //     var authAxios = axios.create({
    //         baseURL: serverLocation,
    //     });
    //     console.log("Id", data)
    //     return new Promise((resolve, reject) => {
    //         authAxios({
    //             method: 'post',
    //             url: 'account/otpCheck',
    //             data: {
    //                 verifyId: data.verifyId,
    //                 generatedOtp: data.generatedOtp,
    //             },
    //         }).then((response) => {
    //             resolve(response);
    //         }).catch((err) => {
    //             reject(err);
    //         });
    //     });
    // },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.left-col{
  height:100vh;
}
.right-col{
  height:90vh;
}
.login-screen {
    background-image: url('/static/images/lap.jpg');
    /* background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover; */
    -moz-background-size: cover;
    -webkit-background-size: cover;
    position:relative;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
}
.login-screen:before {
    content: "";
    background: rgba(0,0,0, 0.1);
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}
.content{
font-size:30px;
margin-top:20px;
margin-left:20px
}
.input {
  font-size: 15px;
  margin: 15px 0;
  padding: 10px 20px;
  border-color: none;
  border-radius: 25px;
  background-color: #eee;
}
.fb-signin-button {
 /* This is where you control how the button looks. Be creative! */
 display: inline-block;
 padding: 4px 8px;
 border-radius: 3px;
 background-color: #4267b2;
 color: #fff;
}
.login-btn{
  /* background-color:#3ec0da; */
   /* background: #1b5a7c; */
   background-color:var(--main-primary-color);
   color:#1b5a7c;
   /* color:#ffff; */
   border-radius: 25px;
   border-color: #0000;
  font-weight:bold;
  font-size:18px;
}

.btn-secondary:hover {
    color: #ffff;
    background: #0766EB;
    border-color: #0000;
}
.Blink {
  animation: blinker 0.5s cubic-bezier(.5, 0, 1, 1) infinite alternate;
}
@keyframes blinker {
  from { opacity: 1; }
  to { opacity: 0; }
}

.navbar-light .navbar-brand {
    color:white;
       /* text-align: center; */
    font-size:2rem;
    /* margin-left:250px; */
    font-weight:bold;
}
.navbar-light .navbar-nav .nav-link:hover, .navbar-light .navbar-nav .nav-link:focus {
    color: white;
}
.navbar-light .navbar-nav .nav-link {
    color: white;
}
.custom-css{
color:var(--main-primary-color);
cursor:pointer;
font-size:12px;
}
.text-css{
color:var(--main-primary-color);
text-decoration:underline;
cursor:pointer;
/* margin-right:80px; */
}
.left-col-text{
margin-top:30px;
color:var(--main-secondary-color);
font-size:15px;
 /* font-weight:bold;  */
}
.right-col-text{
font-weight:bold;
font-size:25px;
margin-right:150px;
}

/* Shared */
.loginBtn {
  box-sizing: border-box;
  position: relative;
  /* border-radius: 25px; */
  /* width: 13em;  - apply for fixed size */
  margin: 0.2em;
  padding: 0 15px 0 46px;
  border: none;
  text-align: left;
  line-height: 34px;
  white-space: nowrap;
  /* border-radius: 0.2em; */
  font-size: 16px;
  color: #FFF;
}
.loginBtn:before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 25px;
  width: 34px;
  height: 100%;
}
.loginBtn:focus {
  outline: none;
}
.loginBtn:active {
  box-shadow: inset 0 0 0 32px rgba(0,0,0,0.1);
}


/* Facebook */
.loginBtn--facebook {
  background-color: #4C69BA;

  background-image: linear-gradient(#4C69BA, #3B55A0);
  /* border-radius: 25px; */
  /*font-family: "Helvetica neue", Helvetica Neue, Helvetica, Arial, sans-serif;*/
  text-shadow: 0 -1px 0 #354C8C;
}
.loginBtn--facebook:before {
  border-right: #364e92 1px solid;
  background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_facebook.png') 6px 6px no-repeat;
}
.loginBtn--facebook:hover,
.loginBtn--facebook:focus {
  background-color: #5B7BD5;
  background-image: linear-gradient(#5B7BD5, #4864B1);
}


/* Google */
.loginBtn--google {
  /*font-family: "Roboto", Roboto, arial, sans-serif;*/
  background: #DD4B39;
  border-radius: 25px;
}
.loginBtn--google:before {
  border-right: #BB3F30 1px solid;
  background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_google.png') 6px 6px no-repeat;
}
.loginBtn--google:hover,
.loginBtn--google:focus {
  background: #E74B37;
}
.error {
  border-color: red;
}
.error-focus {
  border-color: red;
}
.error-message {
  color: red;
  font-size: 13px;
  margin: 5px 0 0 5px;
}
.btn-block + .btn-block {
    margin-top: 0rem;
}
.loginBtn--google{

}
</style>
