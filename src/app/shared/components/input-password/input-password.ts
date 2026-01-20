import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-password',
  standalone: false,
  templateUrl: './input-password.html',
})
export class InputPassword {
  @Input() parentForm!: FormGroup;
  @Input() controlName!: string;
  @Input() label: string = 'Senha';
  @Input() placeholder: string = 'Digite sua senha';

  showPassword = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
