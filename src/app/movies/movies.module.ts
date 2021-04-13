import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MoviesListComponent} from './movies-list/movies-list.component';
import {HttpClientModule} from '@angular/common/http';
import {MovieItemComponent} from './movie-item/movie-item.component';
import {UppercaseWordsPipe} from '../pipes/uppercaseWords.pipe';
import {EnglishOnlyPipe} from '../pipes/englishonly.pipe';
import {DialogModule} from 'primeng/dialog';
import {MovieOverviewModalComponent} from './movie-overview-modal/movie-overview-modal.component';
import {MovieAddUpdateModalComponent} from './movie-add-update-modal/movie-add-update-modal.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CalendarModule} from 'primeng/calendar';
import {DynamicDialogModule} from 'primeng/dynamicdialog';


@NgModule({
  declarations: [
    MoviesListComponent,
    MovieItemComponent,
    UppercaseWordsPipe,
    EnglishOnlyPipe,
    MovieOverviewModalComponent,
    MovieAddUpdateModalComponent
  ],
  exports: [
    MoviesListComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    DialogModule,
    ReactiveFormsModule,
    CalendarModule,
    DynamicDialogModule
  ]
})
export class MoviesModule {
}
