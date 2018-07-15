import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AuthoritiesMPage } from './authorities-m';

@NgModule({
  declarations: [
    AuthoritiesMPage,
  ],
  imports: [
    IonicPageModule.forChild(AuthoritiesMPage),
  ],
})
export class AuthoritiesMPageModule {}
