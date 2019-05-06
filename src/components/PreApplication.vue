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
        <b-col cols="12">
         <!-- <label style="font-weight:bold">Photo</label> -->
          <div class="preview rounded" ></div>
          <div ><b-img class="preview" width="80px" src="/static/images/noimage.jpeg"/></div>
          <input type="file" accept="image/jpeg, image/png" @change="fileSelected" title = " " style="opacity: 0.0; position: absolute; top:0; left: 0; bottom: 0; right:0; width: 100px; height:100px; margin-left:15px;margin-top:31px;"/>
          </b-col>
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
export default {
    components:{
        MainHeader,
        SubHeader
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
              studentQualification:""

            },
            address:{
                street :"",
                city:"",
                state:"",
                zipcode:""
            },
           
            stream:"",

        }
    },
    async mounted(){
         await Global.onPageRefresh(this.$session, this.$router);
         await this.getUserInfo();
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

    fileSelected: function(e) {
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
    
      }

      console.log(data);
      console.log(addr);
      // console.log(data)
      // this.userDetails=data;
      // console.log(this.userDetails)
      Account.studentRegister(data)
        .then(response => {
         console.log(response.data);
        })
        .catch(err => {
         
          console.log(err);
          
        });
   },
     login:function(){
    this.$router.push('/');
    }
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
</style>

