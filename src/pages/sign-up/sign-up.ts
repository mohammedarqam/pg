import { Component } from '@angular/core';
import { NavController, IonicPage, ViewController, LoadingController, AlertController, ModalController } from 'ionic-angular';
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
  videos : Array<any> = [];
  public recaptchaVerifier:firebase.auth.RecaptchaVerifier;
  authorityRef = firebase.database().ref("Authorities");
  authorities : Array<any> = [];
  uid : boolean = false ;



  constructor(
  public viewCtrl : ViewController,
  public loadingCtrl : LoadingController,
  public modalCtrl: ModalController,
  public alertCtrl : AlertController,
  public navCtrl: NavController) {
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        this.uid = true;
        this.navCtrl.setRoot("HomePage");
      }else{
        this.uid = false;
      }
    });
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
      return false;
    });
  }).then(()=>{
    loading.dismiss();
  }).then(()=>{
    this.getVideos();
  }) ;

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



playVid(srce) {
  let profileModal = this.modalCtrl.create("VidPlayerPage",{srces : srce});
  profileModal.present();
}



getVideos(){
  firebase.database().ref("Uploads/Videos/").once('value',itemSnapshot=>{
    this.videos = [];
    itemSnapshot.forEach(itemSnap =>{
      var temp = itemSnap.val();
      temp.key = itemSnap.key;
      this.videos.push(temp);
    });
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
