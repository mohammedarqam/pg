import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-gpl',
  templateUrl: 'gpl.html',
})
export class GplPage {
  uid : boolean = false ;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        this.uid = true;
      }else{
        this.uid = false;
      }
    });
  }
  signOut(){
    firebase.auth().signOut().then(()=>{
      this.navCtrl.setRoot("LoginPage");
    });
  }
  
  links : Array<string> =[
    "Central Govt. Links",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Orissa",
    "Puducherry",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal "
  ];
  gtLogin(){this.navCtrl.setRoot("LoginPage");}
  gtSignUp(){this.navCtrl.setRoot("SignUpPage");}
  
  gtHome(){this.navCtrl.setRoot("HomePage");}
  gtComplaints(){this.navCtrl.setRoot("ComplaintsPage");}
  gtGovtDep(){this.navCtrl.setRoot("GplPage");}
  gtNetaji(){this.navCtrl.setRoot("NpPage");}
  gtYourArea(){this.navCtrl.setRoot("YanPage");}
  gtContact(){this.navCtrl.setRoot("ContactPage");}

}
