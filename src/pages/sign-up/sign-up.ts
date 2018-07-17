import { Component } from '@angular/core';
import { NavController, IonicPage, ViewController, LoadingController, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  username : string;
  email : string;
  Occupation : string;
  phoneNumber : number
  public recaptchaVerifier:firebase.auth.RecaptchaVerifier;
  authorityRef = firebase.database().ref("Authorities");
  authorities : Array<any> = [];



  constructor(
  public viewCtrl : ViewController,
  public loadingCtrl : LoadingController,
  public alertCtrl : AlertController,
  public navCtrl: NavController) {

  }

  ionViewDidEnter(){
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    this.getAuthorities();
  }


getAuthorities(){
  let loading = this.loadingCtrl.create({
    content: 'Please wait...'
    });
    loading.present();

  this.authorityRef.once('value',itemSnapshot=>{
    this.authorities=[];
    itemSnapshot.forEach(itemSnap =>{
      this.authorities.push(itemSnap.val());
      console.log(itemSnap.val());
      return false;
    });
  }).then(()=>{
    loading.dismiss();
  }) ;

}



/*
signUp1(){
  let loading = this.loadingCtrl.create({
    content: 'Please wait...'
    });
    loading.present();

    firebase.auth().createUserWithEmailAndPassword(this.email,this.pass).then(()=>{
      firebase.database().ref("Users/").child(firebase.auth().currentUser.uid).set({
        Name : this.username,
        Email : this.email,
        Pass : this.pass,
        PhoneNo : this.PhoneNo,
        Occupation : this.Occupation,
      }).then(()=>{
        this.navCtrl.setRoot("UploadPage");
        loading.dismiss();
      });
    }).catch((e)=>{
      alert(e.message);
    })

}


signUp(){
  let loading = this.loadingCtrl.create({
    content: 'Please wait...'
    });
    loading.present();

    const appVerifier = this.recaptchaVerifier;
    const phoneNumberString = "+91" + this.PhoneNo;
    console.log("Starting to send");
    firebase.auth().signInWithPhoneNumber(phoneNumberString, appVerifier)
    .then( confirmationResult => {
    console.log("OTP Sent");
      confirmationResult.confirm(this.OTP)
      .then(function (result) {
        firebase.database().ref("Users/").child(firebase.auth().currentUser.uid).set({
          Name : this.username,
          Email : this.email,
          Pass : this.pass,
          PhoneNo : this.PhoneNo,
          Occupation : this.Occupation,
        }).then(()=>{
          this.navCtrl.setRoot("UploadPage");
          loading.dismiss();
        });
      }).catch(function (error) {
  });
}).catch(function (error) {
    alert("SMS not sent");
  });


  

  }


*/


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










gtLogin(){this.navCtrl.setRoot("LoginPage");}
gtSignUp(){this.navCtrl.setRoot("SignUpPage");}

gtHome(){this.navCtrl.setRoot("HomePage");}
gtComplaints(){this.navCtrl.setRoot("ComplaintsPage");}
gtGovtDep(){this.navCtrl.setRoot("GplPage");}
gtNetaji(){this.navCtrl.setRoot("NpPage");}
gtYourArea(){this.navCtrl.setRoot("YanPage");}
gtContact(){this.navCtrl.setRoot("ContactPage");}


}
