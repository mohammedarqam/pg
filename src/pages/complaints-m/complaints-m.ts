import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import * as firebase from 'firebase';




@IonicPage()
@Component({
  selector: 'page-complaints-m',
  templateUrl: 'complaints-m.html',
})
export class ComplaintsMPage {

  Name : string;
  Email : string;
  PhoneNo : string;
  Category : string;
  Comments : string;
  img1 : any;
  img2 : any;

  uid : boolean = false ;

  compRef=firebase.database().ref("Complaints");
  authorityRef = firebase.database().ref("Authorities");
  authorities : Array<any> = [];
  url : string;
  constructor(
  public navCtrl: NavController,
  public loadingCtrl : LoadingController, 
  public toastCtrl : ToastController,
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
    this.getCategories();
  }
  getCategories(){
    
    this.authorityRef.once('value',itemSnapshot=>{
      this.authorities=[];
      itemSnapshot.forEach(itemSnap =>{
        this.authorities.push(itemSnap.val());
        return false;
      });
    });
  }

  sendComplaint(){
    let loading = this.loadingCtrl.create({
    content: 'Please wait...'
    });
    loading.present();

    firebase.storage().ref("Complaints/Images/" + this.Name).put(this.img2).then(()=>{
      firebase.storage().ref("Complaints/Images/" + this.Name).getDownloadURL().then((dURL)=>{
        this.url = dURL;
      }).then(()=>{
        firebase.database().ref("Complaints/").push({
          Name : this.Name,
          Email : this.Email,
          PhoneNo : this.PhoneNo,
          Category : this.Category,
          Comments : this.Comments,
          File : this.url,
        }).then(()=>{
          this.clearData();
          this.presentToast("Complaint Posted");
          loading.dismiss();
        })
      })
    })
  }


  fileChange(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();

      reader.onload = (event: any) => {
        this.img1 = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
    let fileList: FileList = event.target.files;
    let file: File = fileList[0];
    this.img2 = file;
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
  this.Category = null;
  this.Comments = null;
  this.img1 = null;
  this.img2 = null;
  this.url = null;
  
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
