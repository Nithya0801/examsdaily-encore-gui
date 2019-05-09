<template>
    <div>
       

        <b-container fluid style="margin-top:2px">
          <b-row>
            <b-col class=" app-form">
                <b-row>
                  <b-col class="justify-content-center">
                    <br><h3>Pre-Application Form</h3>
                  </b-col>
            <!-- <b-col>
                <b-row>
            <b-col cols="12">
              <div class="preview rounded" ></div>
              <div ><b-img class="preview" width="80px" src="/static/images/noimage.jpeg"/></div>
              <input type="file" accept="image/jpeg, image/png" @change="fileSelected" title = " " style="opacity: 0.0; position: absolute; top:0; left: 0; bottom: 0; right:0; width: 100px; height:100px; margin-left:15px;margin-top:31px;"/>
              </b-col>
            </b-row>
            </b-col> -->         
                </b-row> 
                <b-row>
                  <b-col></b-col>
                  <b-col cols='6'>
                    <b-card class="app-card">
                      <b-form  @submit.prevent="studentRegister" > <br>
                      <!-- <b-row > -->
                        <!-- <div class="col-md-6 float-right" >  
                          <profile-picture @imageUrl="onSetImageUrl" :currentUser="currentUser" :image="currentUser!=null?currentUser.avatar:null"></profile-picture>
                        </div>
                        <b-row>
                          <b-form-group label-cols-sm="4" label="Application Date :" label-for="appLabel"><b-form-input class="w-75 p-1 mb-5" type="date" v-model="student.applicationDate" /> </b-form-group>
                        </b-row> -->
                      <!-- </b-row> -->
                      <b-row >
                        <div class="col-md-6" align="left">
                             <b-img :src="imageUrl!=null?imageUrl.replace('__dexters_access_token_9836758498731097845__', $session.get('access_token')).replace('__dexters_resource_location_9836758498731097845__',resourceLocation.replace('images','avatars')):'/static/images/user96.png'" width="110" height="110"></b-img>
                            <!-- <b-img @imageUrl="student.avatar"></b-img> -->
                        </div>
                         <div class="col-md-6" align="left"><br>
                          <b-form-group label="Application ID :" label-for="appLabel">{{student.studentId}} </b-form-group>
                           <b-form-group label="Application Date :" label-for="appLabel">{{applnDate}} </b-form-group>
                         </div>
                      </b-row>
                      <!-- <br><br><br> -->
                      <b-row >
                        <div class="col-md-6 form-input" align="left" >
                          <b-form-group  label="First Name :" label-for="firstName">{{student.studentFirstName}} </b-form-group>
                          <!-- <b-form-group  label="Last Name :" label-for="lastName"><b-form-input type="text" v-model="student.studentFirstName" /> </b-form-group> -->
                        </div>
                        <div class="col-md-6 form-input" align="left" >
                          <!-- <b-form-group  label="First Name :" label-for="firstName"><b-form-input type="text" v-model="student.studentFirstName" /> </b-form-group> -->
                          <b-form-group  label="Last Name :" label-for="lastName">{{student.studentLastName}} </b-form-group>
                        </div>
                        
                      </b-row>
                      <b-row>
                        <div class="col-md-6 form-input" align="left" >
                          <b-form-group  label="Father's Name :" label-for="fatherName">{{student.fatherName}} </b-form-group>
                          <!-- <b-form-group  label="Mother's Name :" label-for="motherName"><b-form-input type="text" v-model="student.motherName" /> </b-form-group> -->
                        </div>
                        <div class="col-md-6 form-input" align="left" >
                          <b-form-group  label="Mother's Name :" label-for="motherName">{{student.motherName}}</b-form-group>
                      </div>
                      </b-row>
                      <b-row>
                        <div class="col-md-6 form-input" align="left">
                          <b-form-group  label="Gender :" label-for="gender">
                          <div v-if="student.studentGender=='m'">Male</div>
                          <div v-else>Female</div>
                          </b-form-group>
                          <b-form-group  label="Date Of Birth :" label-for="dob">{{Dob}} </b-form-group>
                          <b-form-group  label="Email ID :" label-for="emailId">{{student.studentEmail}} </b-form-group>
                          <b-form-group  label="Student's Mobile :" label-for="studentMobile">{{student.studentMobile}}</b-form-group>
                          <b-form-group  label="Father's Mobile :" label-for="fatherMobile">{{student.fatherMobile}} </b-form-group>
                          <b-form-group  label="Mother's Mobile :" label-for="motherMobile">{{student.motherMobile}}</b-form-group>
                        </div>
                        <!-- <div class="col-md-4" align="left">
                          <b-form-group  label="Date Of Birth :" label-for="dob"><b-form-input type="date" v-model="student.studentDob" /> </b-form-group>
                        </div>
                        <div class="col-md-4" align="left">
                            <b-form-group  label="Email ID :" label-for="emailId"><b-form-input type="email" v-model="student.studentEmail" /> </b-form-group>
                        </div> -->
                        <div class="col-md-6 form-input" align="left">
                          <b-form-group  label="Qualification :" label-for="qualification">{{student.studentQualification}}</b-form-group>
                          <!-- <b-form-group v-if="selected != null && selected != '10th' && selected != '12th'"  label="Stream :" label-for="stream"><b-form-input type="text" v-model="stream" /> </b-form-group> -->
                          <b-form-group  label="Address :" label-for="address">{{student.studentAddress.street}} </b-form-group>
                          <b-form-group  label="City :" label-for="city">{{student.studentAddress.city}}</b-form-group>
                          <b-form-group  label="State :" label-for="state">{{student.studentAddress.state}}</b-form-group>
                          <b-form-group  label="Pincode :" label-for="pincode">{{student.studentAddress.zipcode}}</b-form-group>
                          
                        </div>
                      </b-row>
                       <br>
         
        </b-form>
                    </b-card>
                  </b-col>
                  <b-col></b-col>
                </b-row>
          
          <br><br>
          
            </b-col>
          </b-row>
        
        </b-container>
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
  props: ['image','student'],
    components:{
        MainHeader,
        SubHeader,
        ProfilePicture
    },
   
    data:function(){
        return {
          applnDate:"",
          Dob:"",
            selected : null,
            imageUrl:null
        }
    },
     
  // mounted(){
  //    console.log("called Mounted...");
   
  // },
    async mounted(){
         await Global.onPageRefresh(this.$session, this.$router);
       this.applnDate=moment(this.student.applicationDate).format('DD/MM/YYYY');
       this.Dob=moment(this.student.studentDob).format('DD/MM/YYYY');
       
       this.imageUrl = this.student.avatar;
       console.log("viewstudent---",this.imageUrl);
       //  await this.getUserInfo();
        
         
    },
    methods:{
    //       getUserInfo() {
    //           console.log("getUserInfo called");
    //   return new Promise((resolve, reject) => {
    //     if (this.$session.exists("contact")) {
    //      Account.getUserInfo(this.$session)
    //         .then(response => {
    //           // this.$session.set("current_user", response.data);
    //           this.currentUser = response.data;
    //           console.log("Currentuser",this.currentUser)
    //           resolve(response);
    //           console.log(this.currentUser);
    //         })
    //         .catch(err => {
    //           console.log(err);
    //           reject(err);
    //         });
    //     }
    //   });
    // }
    onSetImageUrl(){

    }
   
    }
}
</script>
