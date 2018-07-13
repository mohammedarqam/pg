import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import * as firebase from 'firebase';
import { MyApp } from './app.component';


firebase.initializeApp({
  apiKey: "AIzaSyCJ-EBGd5j2pjvnDp0wxA_bDa0PMg4MO3c",
  authDomain: "publicgrief.firebaseapp.com",
  databaseURL: "https://publicgrief.firebaseio.com",
  projectId: "publicgrief",
  storageBucket: "publicgrief.appspot.com",
  messagingSenderId: "797036267148"
});

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
