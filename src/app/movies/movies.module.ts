import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MoviesListComponent} from './movies-list/movies-list.component';
import {HttpClientModule} from '@angular/common/http';
import {MovieItemComponent} from './movie-item/movie-item.component';
import {UppercaseWordsPipe} from '../pipes/uppercaseWords.pipe';
import {EnglishOnlyPipe} from '../pipes/englishonly.pipe';
import {DialogModule} from 'primeng/dialog';
import { MovieOverviewModalComponent } from './movie-overview-modal/movie-overview-modal.component';


@NgModule({
  declarations: [
    MoviesListComponent,
    MovieItemComponent,
    UppercaseWordsPipe,
    EnglishOnlyPipe,
    MovieOverviewModalComponent
  ],
  exports: [
    MoviesListComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    DialogModule
  ]
})
export class MoviesModule {
}
