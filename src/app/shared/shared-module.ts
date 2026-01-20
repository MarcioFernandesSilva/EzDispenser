import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InputPassword } from './components/input-password/input-password';
import { InputEmail } from './components/input-email/input-email';
import { InputText } from './components/input-text/input-text';

@NgModule({
  declarations: [InputPassword, InputEmail, InputText],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [CommonModule, ReactiveFormsModule, InputPassword, InputEmail, InputText],
})
export class SharedModule {}
