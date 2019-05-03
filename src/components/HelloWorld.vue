
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
      <b-col cols="12" md="8" class="login-screen left-col d-flex  justify-content-center" >
        <!-- <div class="left-col-text">
          <span>Discover your carrier</span>
        </div> -->
      </b-col>
      <b-col class="text-center">
        <div class="text-center pt-3">
        </div>
    
      </b-col>
    </b-row>
  </b-container>
</b-container>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
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
    background-image: url('/static/images/exam-success.jpg');
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
   /* color:#1b5a7c; */
   color:#ffff;
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
margin-top:100px;
color:var(--main-secondary-color);
font-size:55px;
/* font-weight:bold; */
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
