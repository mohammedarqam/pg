import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the UploadMPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upload-m',
  templateUrl: 'upload-m.html',
})
export class UploadMPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  gtLogin(){
    this.navCtrl.setRoot("LoginMPage");
  }
  }
  