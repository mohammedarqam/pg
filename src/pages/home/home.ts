import { Component } from '@angular/core';
import { NavController, IonicPage, ViewController, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';



@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  authorityRef = firebase.database().ref("Authorities");
  authorities : Array<any> = [];

  uid : boolean = false ;

  constructor(
  public viewCtrl : ViewController,
  public loadingCtrl : LoadingController,
  public navCtrl: NavController) {
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        this.uid = true;
      }else{
        this.uid = false;
      }
    });
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

uploadHere(){
  this.navCtrl.setRoot("UploadPage");
}


signOut(){
  firebase.auth().signOut().then(()=>{
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
