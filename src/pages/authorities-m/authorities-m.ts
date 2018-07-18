import { Component } from '@angular/core';
import { NavController, IonicPage, ViewController, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';



@IonicPage()
@Component({
  selector: 'page-authorities-m',
  templateUrl: 'authorities-m.html',
})
export class AuthoritiesMPage {

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
    })
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
signOut(){
  firebase.auth().signOut().then(()=>{
    this.navCtrl.setRoot("LoginMPage")
  }) ;
}
gtLogin(){
  this.navCtrl.setRoot("LoginMPage");
}

}
