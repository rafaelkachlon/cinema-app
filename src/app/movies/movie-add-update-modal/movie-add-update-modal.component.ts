import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Movie} from '../models/movie.model';
import {ModalMode} from '../models/modal-mode.enum';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {ValidatorsService} from '../validators/validators.service';
import {Genre} from '../models/movie-details.model';
import {MoviesService} from '../movies.service';

@Component({
  selector: 'app-movie-add-update-modal',
  templateUrl: './movie-add-update-modal.component.html',
  styleUrls: ['./movie-add-update-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieAddUpdateModalComponent implements OnInit {

  movie: Movie;
  genres: Genre[];

  constructor(private fb: FormBuilder,
              private ref: DynamicDialogRef,
              private config: DynamicDialogConfig,
              private validators: ValidatorsService,
              private movieService: MoviesService) {
  }

  form: FormGroup;
  isNewMovie: boolean;

  ngOnInit(): void {
    this.genres = this.movieService.Genres;
    this.movie = this.config.data.movie;
    const mode = this.config.data.mode as ModalMode;
    this.isNewMovie = mode === ModalMode.Create;

    this.form = this.fb.group({
      title: [
        this.isNewMovie ? '' : this.movie.title,
        [Validators.required]
      ],
      overview: [this.isNewMovie ? '' : this.movie.overview, Validators.required],
      release_date: [this.isNewMovie ? '' : this.movie.release_date, [Validators.required, this.validators.CheckDate]],
      runtime: [this.isNewMovie ? '' : this.movie.runtime, [Validators.required, Validators.minLength(0)]],
      genres: [this.isNewMovie ? [] : this.movie.genres, [Validators.required]]
    });
    if (this.isNewMovie) {
      this.form.get('title').setAsyncValidators(this.validators.CheckIfTitleExists.bind(this.validators));
    }

  }

  get title(): string {
    return this.isNewMovie ? 'Add new movie' : `Edit ${this.movie.title}`;
  }

  required(fieldName: string): boolean {
    return this.form.get(fieldName).hasError('required') && this.form.get(fieldName).touched;
  }

  get titleExists(): boolean {
    return this.form.get('title').hasError('titleExists') && this.form.get('title').dirty;
  }

  get invalid(): boolean {
    return (this.form.get('release_date').hasError('invalidDate')
      && this.form.get('release_date').touched && !this.form.get('release_date').hasError('required'));
  }

  submit(): void {
    this.ref.close(this.form.value);
  }
}
