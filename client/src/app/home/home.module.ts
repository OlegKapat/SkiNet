import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { ShareModule } from '../share/share.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule,ShareModule],
  exports: [HomeComponent],
})
export class HomeModule {}
