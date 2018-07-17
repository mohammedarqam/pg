import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})
export class UploadPage {

  uid : boolean = false ;


  Name : string;
  PhoneNo : string;
  Authority : string;
  VideoTitle : string;
  Area : string;
  img1 : any;
  img2 : any;
  url : string;
  fTypeShow : string;
  fType : string;

   vRefS = firebase.storage().ref("Uploads/Videos/");
   iRefS = firebase.storage().ref("Uploads/Images/");
   vRefD = firebase.database().ref("Uploads/Videos");
   iRefD = firebase.database().ref("Uploads/Images");
   
  actRefS : any;
  actRefD : any;

  userRef = firebase.database().ref("Users");
  user :any;

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
    });



  }

  authorityRef = firebase.database().ref("Authorities");
  authorities : Array<any> = [];

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
      return false;
    }) ;
  }).then(()=>{
    this.userRef.child(firebase.auth().currentUser.uid).once('value',userSnap=>{
      this.Name = userSnap.val().Name;
      this.PhoneNo = userSnap.val().PhoneNo;
    }).then(()=>{
      loading.dismiss();
    });
  }) ;

}

upload(){
  let loading = this.loadingCtrl.create({
    content: 'Please wait...'
    });
    loading.present();

      this.actRefS.child(this.VideoTitle).put(this.img2).then(()=>{
      this.actRefS.child(this.VideoTitle).getDownloadURL().then((dURL)=>{
        this.url = dURL;
      }).then(()=>{
        this.actRefD.push({
          Name : this.Name,
          PhoneNo : this.PhoneNo,
          Authority : this.Authority,
          VideoTitle : this.VideoTitle,
          Area : this.Area,
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
  this.fType = file.name.split('.').pop();
  this.fType.toLowerCase();
  console.log(this.fType);

  switch (this.fType) {
    case "mp4":
    this.actRefS = this.vRefS;
    this.actRefD = this.vRefD;
    this.fTypeShow = "Video";
        break;
    case "png":
    this.actRefS = this.iRefS;
    this.actRefD = this.iRefD;
    this.fTypeShow = "Image";
      break;
    default:
        alert("File Not Recognised");
      break;
  }
  console.log(this.actRefD);
  console.log(this.actRefS);
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
this.PhoneNo = null;
this.Authority = null;
this.VideoTitle = null;
this.img1 = null;
this.img2 = null;
this.url = null;

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
