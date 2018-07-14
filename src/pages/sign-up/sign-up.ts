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


  authorityRef = firebase.database().ref("Authorities");
  authorities : Array<any> = [];

  verifyCard : boolean = false;


  constructor(
  public viewCtrl : ViewController,
  public loadingCtrl : LoadingController,
  public navCtrl: NavController) {

  }

  ionViewDidEnter(){
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


recaptchaVerifier = new firebase.auth.RecaptchaVerifier({
    'size': 'invisible',
  });



signUp(){

  var appVerifier = this.recaptchaVerifier;
  firebase.auth().signInWithPhoneNumber(this.PhoneNo, appVerifier)
      .then(function (confirmationResult) {
          this.verifyCard = true;
          
      }).catch(function (error) {
          alert(error.message)
      });




  this.verifyCard = true;
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
