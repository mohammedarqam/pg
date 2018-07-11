import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { YanPage } from './yan';

@NgModule({
  declarations: [
    YanPage,
  ],
  imports: [
    IonicPageModule.forChild(YanPage),
  ],
})
export class YanPageModule {}
