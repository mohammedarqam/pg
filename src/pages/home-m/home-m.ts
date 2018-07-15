import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';



@IonicPage()
@Component({
  selector: 'page-home-m',
  templateUrl: 'home-m.html',
})
export class HomeMPage {

  uid : string ;

  constructor(
  public navCtrl: NavController,
   
  public navParams: NavParams) {
  }

  ionViewDidEnter(){
    if(firebase.auth().currentUser){
      this.uid = firebase.auth().currentUser.uid;
      console.log(this.uid);
    }
  }
  
  uploadHere(){
    if(this.uid){
      this.navCtrl.setRoot("UploadMPage");
    }else{
      this.navCtrl.setRoot("SignUpMPage");
    }
  }
  
  gtLogin(){
    this.navCtrl.setRoot("LoginMPage");
  }
  gtUpload(){
    this.navCtrl.setRoot("UploadMPage");
  }
  }
  