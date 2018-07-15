import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any ;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform) {
    this.initializeApp();

    this.pages = [
      { title: 'HOME', component: "HomePageM" },
      { title: 'COMPLAINTS', component: "ComplaintsMPage" },
      { title: 'GOVT.DEPARTMENTS LINKS', component: "GplMPage" },
      { title: 'NETAJI SPEAKS', component: "NpMPage" },
      { title: 'YOUR AREA NEWS', component: "YanMPage" },
      { title: 'CONTACT', component: "ContactMPage" },
      { title: 'LOGIN', component: "LoginMPage" },
      { title: 'Sign Up', component: "SignUpMPage" },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      if(this.platform.is("core")){
        this.rootPage = "HomePage";
      }else{
        this.rootPage = "HomeMPage";
      }

    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
