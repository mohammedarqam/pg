import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, LoadingController } from 'ionic-angular';

import firebase from 'firebase';



@IonicPage()
@Component({
  selector: 'page-sign-up-m',
  templateUrl: 'sign-up-m.html',
})
export class SignUpMPage {

  username : string;
  email : string;
  Occupation : string;
  phoneNumber : number
  authorityRef = firebase.database().ref("Authorities");
  authorities : Array<any> = [];


  public recaptchaVerifier:firebase.auth.RecaptchaVerifier;
  constructor(
  public navCtrl:NavController,
  public loadingCtrl : LoadingController,
  public alertCtrl:AlertController) {}

  ionViewDidEnter(){
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
  }


  signIn(phoneNumber: number){
    const appVerifier = this.recaptchaVerifier;
    const phoneNumberString = "+91" + phoneNumber;
    firebase.auth().signInWithPhoneNumber(phoneNumberString, appVerifier)
      .then( confirmationResult => {


        let prompt = this.alertCtrl.create({
        title: 'Enter the Confirmation code',
        inputs: [{ name: 'confirmationCode', placeholder: 'Confirmation Code' }],
        buttons: [
          { text: 'Cancel',
            handler: data => { console.log('Cancel clicked'); }
          },
          { text: 'Send',
            handler: data => {
              confirmationResult.confirm(data.confirmationCode)
              .then(()=>{
                let loading = this.loadingCtrl.create({
                  content: 'Please wait...'
                  });
                  loading.present();
              
                firebase.database().ref("Users/").child(firebase.auth().currentUser.uid).set({
                  Name : this.username,
                  Email : this.email,
                  PhoneNo : phoneNumber,
                  Occupation : this.Occupation,
                }).then(()=>{
                  this.navCtrl.setRoot("UploadMPage");
                  loading.dismiss();
                });
              }).catch(function (error) {
                alert("Wrong Verification Code");
                this.navCtrl.setRoot("HomeMPage");
              });
            }
          }
        ]
      }) ;
      prompt.present();
    }).catch(function (error) {
      console.error("SMS not sent", error);
    });
  
  }






  gtLogin(){
    this.navCtrl.setRoot("LoginMPage");
  }
  gtUpload(){
    this.navCtrl.setRoot("UploadMPage");
  }
  }
  