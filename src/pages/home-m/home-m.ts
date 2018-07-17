import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';



@IonicPage()
@Component({
  selector: 'page-home-m',
  templateUrl: 'home-m.html',
})
export class HomeMPage {

  uid : boolean = false ;

  constructor(
  public navCtrl: NavController,
  public loadingCtrl: LoadingController,
  public navParams: NavParams) {
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        this.uid = true;
      }else{
        this.uid = false;
      }
    })
  }

  ionViewDidEnter(){
    this.checkUser();
  }

  checkUser(){
/*    if(firebase.auth().currentUser){
      this.uid = firebase.auth().currentUser.uid;
      console.log(this.uid);
    }else{
      this.uid = null;
    }

  */  }


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
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
      });
      loading.present();
  
    this.navCtrl.setRoot("UploadMPage").then(()=>{
      loading.dismiss();
    }) ;
  }


  signOut(){
    firebase.auth().signOut().then(()=>{
      this.checkUser();
    }) ;
  }

  }
  