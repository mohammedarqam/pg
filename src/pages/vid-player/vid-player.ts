import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-vid-player',
  templateUrl: 'vid-player.html',
})
export class VidPlayerPage {

  srce = this.navParams.get("srces");

  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams) {
  }

popup(){
  this.navCtrl.pop();
}
}
