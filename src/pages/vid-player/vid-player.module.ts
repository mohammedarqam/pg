import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VidPlayerPage } from './vid-player';

@NgModule({
  declarations: [
    VidPlayerPage,
  ],
  imports: [
    IonicPageModule.forChild(VidPlayerPage),
  ],
})
export class VidPlayerPageModule {}
