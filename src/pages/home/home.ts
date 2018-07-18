import { Component } from '@angular/core';
import { NavController, IonicPage, ViewController, LoadingController, ModalController } from 'ionic-angular';
import * as firebase from 'firebase';



@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  mainSrc = "assets/imgs/91.mp4"
  authorityRef = firebase.database().ref("Authorities");
  authorities : Array<any> = [];
  videos : Array<any> = [];
  uid : boolean = false ;

  constructor(
  public viewCtrl : ViewController,
  public loadingCtrl : LoadingController,
  public modalCtrl: ModalController,
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

  playVid(srce) {
    let profileModal = this.modalCtrl.create("VidPlayerPage",{srces : srce});
    profileModal.present();
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




uploadHere(){
  if(this.uid){
    this.navCtrl.setRoot("UploadPage");
  }else{
    this.navCtrl.setRoot("SignUpPage");
  }
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
