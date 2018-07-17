import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, LoadingController } from 'ionic-angular';

import firebase from 'firebase';



@IonicPage()
@Component({
  selector: 'page-login-m',
  templateUrl: 'login-m.html',
})
export class LoginMPage {
  phoneNumber : number

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
                this.navCtrl.setRoot("UploadMPage");
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





  gtUpload(){
    this.navCtrl.setRoot("UploadMPage");
  }
  }
  