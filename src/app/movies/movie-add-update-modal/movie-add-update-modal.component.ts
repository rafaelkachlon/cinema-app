import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-movie-add-update-modal',
  templateUrl: './movie-add-update-modal.component.html',
  styleUrls: ['./movie-add-update-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieAddUpdateModalComponent implements OnInit {

  constructor(private fb: FormBuilder) {
  }

  @Output() submitted = new EventEmitter();
  form: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      publishDate: ['', [Validators.required, this.CheckDate]]
    });
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
    this.submitted.emit(this.form.value);
  }
}
