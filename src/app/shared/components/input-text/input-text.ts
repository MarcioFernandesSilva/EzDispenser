import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-text',
  standalone: false,
  templateUrl: './input-text.html',
})
export class InputText {
  @Input() parentForm!: FormGroup;
  @Input() controlName!: string;
  @Input() label: string = '';
  @Input() placeholder: string = '';
}
