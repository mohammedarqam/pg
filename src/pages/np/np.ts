import { Component } from '@angular/core';
import { NavController, IonicPage, ViewController, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';






@IonicPage()
@Component({
  selector: 'page-np',
  templateUrl: 'np.html',
})
export class NpPage {

  constructor(public navCtrl: NavController,) {
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
