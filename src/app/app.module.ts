import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToolbarModule} from 'primeng/toolbar';
import {MoviesModule} from './movies/movies.module';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {movieReducer} from './movies/store/reducers/movie.reducer';
import {EffectsModule} from '@ngrx/effects';
import {MovieEffects} from './movies/store/effects/movie.effect';
import {MessageService} from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToolbarModule,
    StoreModule.forRoot({state: movieReducer}),
    MoviesModule,
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    EffectsModule.forRoot([MovieEffects])
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
