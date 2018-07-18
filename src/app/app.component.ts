import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import * as firebase from 'firebase';
import { LoginMPage } from '../pages/login-m/login-m';
import { SignUpMPage } from '../pages/sign-up-m/sign-up-m';
import { HomeMPage } from '../pages/home-m/home-m';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any ;

  pages: Array<{title: string, component: any}>;
  uid : string;
  constructor(public platform: Platform) {
    this.initializeApp();

    this.pages = [
      { title: 'HOME', component: "HomeMPage" },
      { title: 'AUTHORITIES', component: "AuthoritiesMPage" },
      { title: 'COMPLAINTS', component: "ComplaintsMPage" },
      { title: 'GOVT.DEPARTMENTS LINKS', component: "GplMPage" },
      { title: 'NETAJI SPEAKS', component: "NpMPage" },
      { title: 'YOUR AREA NEWS', component: "YanMPage" },
      { title: 'CONTACT', component: "ContactMPage" },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      if(this.platform.is("core")){
        this.rootPage = "HomePage";
      }else{
        this.rootPage = "HomeMPage";
      }

      firebase.auth().onAuthStateChanged(function(user){
        this.uid = firebase.auth().currentUser.uid;
      });

    });
    }

    login(){
      this.nav.setRoot("LoginMPage");
    }
    signUp(){
      this.nav.setRoot("SignUpMPage");
    }
    signOut(){
      firebase.auth().signOut().then(()=>{
        this.nav.setRoot(HomeMPage);
      });
    }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
