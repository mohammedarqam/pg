import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import * as firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-contact-m',
  templateUrl: 'contact-m.html',
})
export class ContactMPage {

  Name : string;
  Email : string;
  PhoneNo : string;
  Comments : string;

  constructor(
  public navCtrl: NavController,
  public loadingCtrl : LoadingController, 
  public toastCtrl : ToastController,
  public navParams: NavParams) {
  }



  sendContactUs(){
    let loading = this.loadingCtrl.create({
    content: 'Please wait...'
    });
    loading.present();

        firebase.database().ref("Contact Us/").push({
          Name : this.Name,
          Email : this.Email,
          PhoneNo : this.PhoneNo,
          Comments : this.Comments,
        }).then(()=>{
          this.clearData();
          this.presentToast("We will get back to you soon.");
          loading.dismiss();
        })
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 4000,
      showCloseButton: false,
    });
    toast.present();
  }

clearData(){
  this.Name = null; 
  this.Email = null;
  this.PhoneNo = null;
  this.Comments = null;
  
}

  gtLogin(){
    this.navCtrl.setRoot("LoginMPage");
  }
  gtUpload(){
    this.navCtrl.setRoot("UploadMPage");
  }
  }
  