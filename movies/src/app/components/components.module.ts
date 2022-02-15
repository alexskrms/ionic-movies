import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideshowBackdropComponent } from './slideshow-backdrop/slideshow-backdrop.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';
import { SlideshowPosterComponent } from './slideshow-poster/slideshow-poster.component';
import { SlideshowPairsComponent } from './slideshow-pairs/slideshow-pairs.component';
import { DetailComponent } from './detail/detail.component';



@NgModule({
  entryComponents: [
    DetailComponent
  ],
  declarations: [SlideshowBackdropComponent, SlideshowPosterComponent, SlideshowPairsComponent, DetailComponent],
  exports: [
    SlideshowBackdropComponent, SlideshowPosterComponent, SlideshowPairsComponent, DetailComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule
  ]
})
export class ComponentsModule { }
