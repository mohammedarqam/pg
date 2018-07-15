import { Component } from '@angular/core';
import { NavController, IonicPage, ViewController, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  username : string;
  email : string;
  pass : string;
  PhoneNo : string;
  Occupation : string;
  OTP : string;
  public recaptchaVerifier:firebase.auth.RecaptchaVerifier;
  authorityRef = firebase.database().ref("Authorities");
  authorities : Array<any> = [];

  verifyCard : boolean = false;


  constructor(
  public viewCtrl : ViewController,
  public loadingCtrl : LoadingController,
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

verify(){

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
