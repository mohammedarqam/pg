import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComplaintsMPage } from './complaints-m';

@NgModule({
  declarations: [
    ComplaintsMPage,
  ],
  imports: [
    IonicPageModule.forChild(ComplaintsMPage),
  ],
})
export class ComplaintsMPageModule {}
