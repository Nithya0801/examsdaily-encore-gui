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
        <div>
        <b-card  style="max-width: 740px;">
        <b-row ><b-col>     
           <b-card-text>
                <b-row>  <b-col>
                <b-form  @submit.prevent="setPassword">
                    <div class="mb-4 mr-1">
                    <span style="font-size:25px;font-weight:bold;"> Set Password</span>                    
                    <p style="color:#a4a4a4;">{{userDetails.username}} </p>
                    </div>
                    <div class="text-center ">
                    
                        <b-input  class="form-control input"
                        type="password"
                        autofocus
                        v-model="user.password"
                        placeholder="Password" />
                    
                    
                    <b-input  class="form-control input"
                        type="password"
                        autofocus
                        v-model="user.confirmPassword"
                        placeholder="Confirm Password"/>
                    
                        <br>
                        <b-button autofocus class="btn-sm btn-block login-btn" type="submit">
                        Set Password
                        </b-button>
                        </div>
                </b-form>
                </b-col></b-row>
          </b-card-text>
        </b-col> </b-row>
        </b-card>
        </div> </div>
      </b-col>    </b-row>
</b-container>

    <!-- <form @submit.prevent="setPassword">
    <div class="text-center">
        <br>
        <img src="/static/images/exams.svg" width="56"/>
    <br><br>
    </div>
    <div class="text-center col-md-6">
            <b><p style="color: royalblue">Set Password</p></b>
            <div >
            <p style="color:#a4a4a4;">{{userDetails.username}} </p>
            </div><br>
        <input  class="form-control input"
        type="password"
        autofocus
        v-model="user.password"       
        placeholder="Password">
        
            <input  class="form-control input"
        type="password"
        autofocus
        v-model="user.confirmPassword"
        placeholder="Confirm Password">
            
        <br>
            
        <b-button autofocus class="btn-sm btn-block login-btn" type="submit">
            Set Password
        </b-button>
    </div>
    </form> -->
    
</b-container>
</template>

<script>
// import axios from 'axios';
import Account from '@/service/Account';

export default {
    data:function(){
        return{
            user:{
                contact:'',
                password:'',
                confirmPassword:'',
                token:""
            },
            // username:'',
            userDetails: this.$store.state.userDetails,
        }
    },
    async mounted() {
        console.log("refreshing otp password page..",this.userDetails);
         // await this.getUserDetails();
  this.user.contact=this.userDetails.contact;
  console.log(this.userDetails.contact);
    },
    methods: {
        setPassword:function(){
            console.log("setting password");
          let data={
            "verifyId":this.userDetails.verifyId,
            "contact":this.userDetails.contact,
            "firstName":this.userDetails.firstName,
            "lastName":this.userDetails.lastName,
            "username":this.userDetails.username,
            "generatedOtp":this.userDetails.generatedOtp,
            "password":this.user.password
          }
          console.log("user",data)
           return new Promise((resolve, reject) => {
            Account.otpVerify(data)
              .then(response=>{
                console.log("Response",response.data)
                  this.loginUser();
                  resolve(response);
              })
              .catch(err=>{
                reject(err);
                console.log(err);
              });
           });

        },
      
      loginUser:function(){
        console.log("----called---"+this.user.contact);
    //this.isLoading=true;
    Account.userLogin(this.user)
      .then(response => {
        this.$session.start();
        this.$session.set("access_token", response.data.access_token);
        this.$session.set("refresh_token", response.data.refresh_token);
        this.$session.set("contact", this.user.contact);
        // toast({
        //   type: "success",
        //   title: "Signed in successfully"
        // });
        // this.isLoading=false;
          this.$router.replace(this.$route.query.redirect || "/success");
      })
      .catch(err => {
        console.log(err);
        // swal({
        //   type: "error",
        //   title: "Bad credentials"
        // });
        return false;
      });
  }
        
    }
}
</script>

<style>
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
</style>

