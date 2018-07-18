import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import * as firebase from 'firebase';



@IonicPage()
@Component({
  selector: 'page-np-m',
  templateUrl: 'np-m.html',
})
export class NpMPage {
  uid : boolean = false ;
  videos : Array<any> = [];

  constructor(
  public navCtrl: NavController, 
  public modalCtrl: ModalController,
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
    this.getVideos();
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
    playVid(srce) {
      let profileModal = this.modalCtrl.create("VidPlayerPage",{srces : srce});
      profileModal.present();
    }
  
  gtLogin(){
    this.navCtrl.setRoot("LoginMPage");
  }
  gtUpload(){
    this.navCtrl.setRoot("UploadMPage");
  }
  signOut(){
    firebase.auth().signOut().then(()=>{
      this.navCtrl.setRoot("LoginMPage")
    }) ;
  }
  }
  