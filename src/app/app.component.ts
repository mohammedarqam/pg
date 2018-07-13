import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = "HomePage";

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform) {
    this.initializeApp();

    this.pages = [
      { title: 'HOME', component: "HomePage" },
      { title: 'COMPLAINTS', component: "ComplaintsPage" },
      { title: 'GOVT.DEPARTMENTS LINKS', component: "GplPage" },
      { title: 'NETAJI SPEAKS', component: "NpPage" },
      { title: 'YOUR AREA NEWS', component: "YanPage" },
      { title: 'CONTACT', component: "ContactPage" },
      { title: 'LOGIN', component: "LoginPage" },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
