<template>
    <div>
        <main-header  :currentUser="currentUser"></main-header>
    <sub-header ></sub-header>
    <div>
       <b-row>
         <b-col>
            <b-row>
         <b-col>
           <br>
      <h3><center>Pre-Application Form Entry</center></h3>
         </b-col>
         <b-col>
             <b-row>
        <!-- <b-col cols="12">
        
          <div class="preview rounded" ></div>
          <div ><b-img class="preview" width="80px" src="/static/images/noimage.jpeg"/></div>
          <input type="file" accept="image/jpeg, image/png" @change="fileSelected" title = " " style="opacity: 0.0; position: absolute; top:0; left: 0; bottom: 0; right:0; width: 100px; height:100px; margin-left:15px;margin-top:31px;"/>
          </b-col> -->

 <profile-picture @imageUrl="onSetImageUrl" :currentUser="currentUser" :image="currentUser!=null?currentUser.avatar:null"></profile-picture>
             
        </b-row>
         </b-col>
         
       </b-row> 
      
     <b-form  @submit.prevent="studentRegister">
      
      
       <br>
        <b-card>
       <b-row>
         <b-col>
           <div class="form-row">
          <label class="col-sm-3 col-form-label"  for="firstname">First Name :</label>
           <!--<input type="text" class="form-control w-25 " name="firstname" id="firstname" /> -->
         
          <b-input type="text"   v-model="student.studentFirstName" class="form-control w-50"></b-input>
        </div>
         </b-col>
         <b-col>
           <div class="form-row">
          <label class="col-sm-3 col-form-label"  for="lastname">Last Name :</label>
          <b-input type="text"  v-model="student.studentLastName" class="form-control w-50" />
        </div>
         </b-col>
         <b-col>
         
         <div class="form-row">
          <label class="col-sm-3 col-form-label"  for="appln">Application Date :</label>
          <b-input type="date" class="form-control w-50 p-3 mb-1"  v-model="student.applicationDate" />
        </div>
        </b-col>
       </b-row>
        </b-card>
       <br> 
       <b-card>
       <b-row>
          <b-col>
           <div class="form-row">
          <label class="col-sm-3 col-form-label"  for="lastname">Father's Name :</label>
          <b-input type="text" class="form-control w-50"  v-model="student.fatherName"/>
        </div>
         </b-col>
          <b-col>
           <div class="form-row">
          <label class="col-sm-3 col-form-label"  for="lastname">Mother's Name :</label>
          <b-input type="text" class="form-control w-50 p-3 mb-1" v-model="student.motherName"/>
        </div>
         </b-col>
          <b-col>
           <div class="form-row">
          <label class="col-sm-3 col-form-label"  for="lastname">Father's Occupation :</label>
          <b-input type="text" class="form-control w-50"/>
        </div>
         </b-col>
       </b-row>
       </b-card>
  <br>
  <b-card>
         <b-row>
         <b-col>
           <div class="form-row">
          <label class="col-sm-3 col-form-label"  for="firstname">Address :</label>
           <!--<input type="text" class="form-control w-25 " name="firstname" id="firstname" /> -->
         
          <b-form-textarea rows="2" class="form-control w-50" v-model="address.street"></b-form-textarea>
        </div>
         </b-col>
         <b-col>
           <div class="form-row">
          <label class="col-sm-3 col-form-label"  for="lastname">City:</label>
          <b-input type="text" class="form-control w-50" v-model="address.city" />
        </div>
         </b-col>
          <b-col>
           <div class="form-row">
          <label class="col-sm-3 col-form-label"  for="lastname">State:</label>
          <b-input type="text" class="form-control w-50" v-model="address.state"/>
        </div>
         </b-col>
          <b-col>
           <div class="form-row">
          <label class="col-sm-3 col-form-label"  for="lastname">Pincode:</label>
          <b-input type="text" class="form-control w-50 p-3 mb-1" v-model="address.zipcode" />
        </div>
         </b-col>
       </b-row>
  </b-card>
<br>
<b-card>
       <b-row>
         <b-col>
           <div class="form-row">
               <label class="col-sm-3 col-form-label"  for="lastname">Gender : </label>
               <!-- <b-form-radio-group
             :options="options"
            ></b-form-radio-group> -->
              <br>
             <b-form-radio-group v-model="student.studentGender">
        <b-form-radio value="m">Male</b-form-radio>
        <b-form-radio value="f">Female</b-form-radio>
         </b-form-radio-group>
           </div>
         </b-col>


         <b-col>
         
         <div class="form-row">
          <label class="col-sm-3 col-form-label"  for="appln">Date Of Birth:</label>
          <b-input type="date" class="form-control w-50 p-3 mb-1" v-model="student.studentDob" />
        </div>
        </b-col>

         <b-col>
         
         <div class="form-row">
          <label class="col-sm-3 col-form-label"  for="appln">Email ID :</label>
          <b-input type="email" class="form-control w-50 p-3 mb-1" v-model="student.studentEmail" />
        </div>
        </b-col>
       </b-row></b-card>
<br>
<b-card>
       <b-row>
           <b-col>
           <div class="form-row">
          <label class="col-sm-3 col-form-label"  for="lastname">Student's Mobile</label>
          <b-input type="text" class="form-control w-50" v-model="student.studentMobile"/>
        </div>
         </b-col>
          <b-col>
           <div class="form-row">
          <label class="col-sm-3 col-form-label"  for="lastname">Father's Mobile</label>
          <b-input type="text" class="form-control w-50" v-model="student.fatherMobile"/>
        </div>
         </b-col>
          <b-col>
           <div class="form-row">
          <label class="col-sm-3 col-form-label"  for="lastname">Mother's Mobile</label>
          <b-input type="text" class="form-control w-50 p-3 mb-1" v-model="student.motherMobile"/>
        </div>
         </b-col>
       </b-row>
</b-card>
<br>
<b-card>
      <b-row>
        <b-col>
             <div class="form-row">
                <label class="col-sm-3 col-form-label"  for="lastname">Qualification</label>
           <b-form-select v-model="selected" :options="qualification" class="form-control w-25"></b-form-select>
             </div>
        </b-col>

         <b-col>
           <div v-if="selected != null && selected != '10th' && selected != '12th'">
             <div class="form-row">
                <label class="col-sm-3 col-form-label"  for="lastname">Stream</label>
              <b-input type="text" class="form-control w-50 p-3 mb-1" v-model="stream" />
           </div>
             </div>
        </b-col>
      </b-row>
</b-card>
      <br>
      <b-row>
        <b-col>
           <b-button autofocus class="w-50 login-but" type="submit">
                  Register
                </b-button>
        </b-col>
      </b-row>
    </b-form> 
      
         </b-col>
       </b-row>
    </div>
    </div>
</template>

<script>
import MainHeader from '@/components/MainHeader'
import SubHeader from '@/components/SubHeader'
import Account from '@/service/Account';
import Global from '@/service/Global';
import moment from 'moment'
import ProfilePicture from '@/components/ProfilePicture'
export default {
  props: ['image'],
    components:{
        MainHeader,
        SubHeader,
        ProfilePicture
    },
   
    data:function(){
        return {
            currentUser:null,
            selected : null,
            options :[
              {text:'Male', value:'m'},
              {text:'Female',value:'f'}
            ],
            qualification:[
              {text:'-Select-',value:null},
              {text:'10th',value:'10th'},
              {text:'12th',value:'12th'},
              {text:'Bsc',value:'bsc'},
              {text:'Msc',value:'msc'},
              {text:'Bcom',value:'bcom'},
              {text:'Mcom',value:'mcom'},
              {text:'BE/B.Tech',value:'be'},
              {text:'ME/M.Tech',value:'me'},
            ],
            student :{
              studentFirstName : "",
              studentLastName : "",
              applicationDate : "",
              fatherName : "",
              motherName : "",
              studentDob : "",
              studentGender:"",
              studentAddress:{},
              studentMobile:"",
              fatherMobile:"",
              motherMobile:"",
              studentEmail:"",
              studentQualification:"",
               avatar:""

            },
            address:{
                street :"",
                city:"",
                state:"",
                zipcode:""
            },
           
            stream:"",
              files: null,
      imageData:"",
      imageUrl:null,
      studentId:"",

        }
    },
      watch:{
       
    image:function(){
       console.log("called watch...");
      this.imageUrl = this.image;
    }
  },
  // mounted(){
  //    console.log("called Mounted...");
   
  // },
    async mounted(){
         await Global.onPageRefresh(this.$session, this.$router);
         await this.getUserInfo();
         console.log("called Mounted..."+this.image);
          this.imageUrl = this.image;
    },
    methods:{
          getUserInfo() {
              console.log("getUserInfo called");
      return new Promise((resolve, reject) => {
        if (this.$session.exists("contact")) {
         Account.getUserInfo(this.$session)
            .then(response => {
              // this.$session.set("current_user", response.data);
              this.currentUser = response.data;
              console.log("Currentuser",this.currentUser)
              resolve(response);
              console.log(this.currentUser);
            })
            .catch(err => {
              console.log(err);
              reject(err);
            });
        }
      });
    },

    onSetImageUrl: function(value) {
      console.log("@@@@@@",value);
      this.student.avatar=value;
    },

    studentRegister: function() {
   
      console.log("called student Register function--")
  console.log(moment(this.student.applicationDate).format('DD/MM/YYYY'));
      let addr={
        "street" : this.address.street,
        "city" : this.address.city,
        "state" : this.address.state,
        "zipcode" : this.address.zipcode
      }
    let data = {
     "studentFirstName": this.student.studentFirstName,
     "studentLastName" : this.student.studentLastName,
     "applicationDate" : moment(this.student.applicationDate).format('DD/MM/YYYY'),
     "fatherName": this.student.fatherName,
     "motherName": this.student.motherName,
     "studentDob": moment(this.student.studentDob).format('DD/MM/YYYY'),
     "studentGender": this.student.studentGender,
     "studentAddress": addr,
     "studentMobile" : this.student.studentMobile,
     "fatherMobile":this.student.fatherMobile,
     "motherMobile": this.student.motherMobile,
     "studentEmail": this.student.studentEmail,
     "studentQualification": this.selected+" "+this.stream,
      "avatar":this.student.avatar
      }

     // console.log(data);
    
    //  console.log(addr);
      // console.log(data)
      // this.userDetails=data;
      // console.log(this.userDetails)
      Account.studentRegister(data)
        .then(response => {
         console.log("7777 *****"+response.data);
         this.studentId=response.data;
        //  Account.studentInfo(this.studentId).then(response=>{
        //    console.log("$$$$$",response.data);
        //  });
      //   this.$router.push("/viewStudentInfo")
        })
        .catch(err => {
         
          console.log(err);
          
        });
   },
     login:function(){
    this.$router.push('/');
    },
    imageSelected: function(e) {
      this.files = e.target.files || e.dataTransfer.files;
      console.log(this.files);
      this.onUploadUserImage();
      var input = event.target;
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = (e) => {
                    this.imageData = e.target.result;
                }
                reader.readAsDataURL(input.files[0]);
            }
    },
    onUploadUserImage: function() {
      return new Promise((resolve, reject) => {
          Global.uploadImage(this.files,this.$session.get("current_user").id)
            .then(response => {
              this.imageUrl = response.data;
              console.log(this.imageUrl)
              resolve(response);
            })
            .catch(err => {
              console.log(err);
              reject(err);
            });
        });
    },
    }
}
</script>

<style>
.login-btn{
  /* background-color:#3ec0da; */
   /* background: #1b5a7c; */
   background-color:royalblue;
   /* color:#1b5a7c; */
   color:#ffff;
   border-radius: 25px;
   border-color: #0000;
  font-weight:bold;
  font-size:18px;
}

.modal-content {
  border-radius: 1.3rem;
}
.profileUpload {
  width: 100px;
  height: 100px;
  -moz-border-radius: 50px;
  -webkit-border-radius: 50px;
  border-radius: 50px;
  background-image: url("/static/images/noimage.jpeg");
  background-size: 100px 100px;
  cursor: pointer;
}
.nav-link {
  display: block;
  /* padding: 0rem 1.2rem; */
  padding: 0rem 2rem;
  font-size: 17px;
  font-weight: bold;
  /* padding: 0.5rem 1.1rem; */
}
.nav-tabs .nav-link {
  border: 1px solid transparent;
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
}
.card-header {
  padding: 0.5rem 0rem 0.5rem 3.5rem;
  margin-bottom: 0;
  background-color: white;
  border-bottom: none;
}
.nav-tabs .nav-link.active,
.nav-tabs .nav-item.show .nav-link {
  color: #00a1b5;
  border: none;
  border-bottom: 2px solid #00a1b5;
  border-color: #00a1b5 #00a1b5 00a1b5 #fff;
}
a {
  color: black;
  text-decoration: none;
  background-color: transparent;
  -webkit-text-decoration-skip: objects;
}
.btn-edit {
  width: 100px;
  margin-right: 30px;
  border-radius: 20px;
  background-color: #00a1b5;
  font-size: 15px;
  font-weight: bold;
}
.profile-pic {
	position: relative;
	display: inline-block;
}

.profile-pic .editImage {
	display: block;
  cursor:pointer;
}
.profile-pic:hover .editImage {
	display: block;
  cursor:pointer;
}

.editImage {
  cursor:pointer;
	padding-top: 0px;
	padding-right: 5px;
  padding-left: 5px;
  padding-bottom: 0px;
  border-radius: 25px;
  background-color:rgb(201, 202, 200);
	position: absolute;
	right: -1px;
	top:82px;
	display: none;
}

.editImage a {
	color:white;
}
</style>

