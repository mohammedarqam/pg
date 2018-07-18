import { Component } from '@angular/core';
import { NavController, IonicPage, ViewController, LoadingController, ModalController } from 'ionic-angular';
import * as firebase from 'firebase';






@IonicPage()
@Component({
  selector: 'page-np',
  templateUrl: 'np.html',
})
export class NpPage {
  uid : boolean = false ;
  videos : Array<any> = [];

  constructor(
  public navCtrl: NavController,
  public modalCtrl: ModalController,
  ) {
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        this.uid = true;
      }else{
        this.uid = false;
      }
    });
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
 

  signOut(){
    firebase.auth().signOut().then(()=>{
      this.navCtrl.setRoot("LoginPage");
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
