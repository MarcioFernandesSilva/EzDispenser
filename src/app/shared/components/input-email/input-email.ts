import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-email',
  standalone: false,
  templateUrl: './input-email.html',
})
export class InputEmail {
  @Input() parentForm!: FormGroup;
  @Input() controlName: string = 'email';
  @Input() label: string = 'Email';
  @Input() placeholder: string = 'seu@email.com';
}
