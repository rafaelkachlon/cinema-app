import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Movie} from '../models/movie.model';
import {ModalMode} from '../models/modal-mode.enum';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import {DynamicDialogRef} from 'primeng/dynamicdialog';

@Component({
  selector: 'app-movie-add-update-modal',
  templateUrl: './movie-add-update-modal.component.html',
  styleUrls: ['./movie-add-update-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieAddUpdateModalComponent implements OnInit {

  movie: Movie;

  constructor(private fb: FormBuilder,
              private ref: DynamicDialogRef,
              private config: DynamicDialogConfig) {
  }
  form: FormGroup;
  isNewMovie: boolean;

  ngOnInit(): void {
    this.movie = this.config.data.movie;
    const mode = this.config.data.mode as ModalMode;
    this.isNewMovie = mode === ModalMode.Create;

    this.form = this.fb.group({
      title: [this.isNewMovie ? '' : this.movie.title, Validators.required],
      description: [this.isNewMovie ? '' : this.movie.overview, Validators.required],
      publishDate: [this.isNewMovie ? '' : this.movie.release_date, [Validators.required, this.CheckDate]]
    });

  }

  get title(): string {
    return this.isNewMovie ? 'Add new movie' : `Edit ${this.movie.title}`;
  }

  CheckDate(control: AbstractControl): any {
    return isNaN(Date.parse(control.value.toString())) ? {invalidDate: true} : null;
  }

  required(fieldName: string): boolean {
    return this.form.get(fieldName).hasError('required') && this.form.get(fieldName).touched;
  }

  get invalid(): boolean {
    return (this.form.get('publishDate').hasError('invalidDate')
      && this.form.get('publishDate').touched && !this.form.get('publishDate').hasError('required'));
  }

  submit(): void {
    this.ref.close(this.form.value);
  }
}
