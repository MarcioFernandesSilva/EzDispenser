import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiMockService } from '../../core/services/api-mock.service';

@Component({
  selector: 'app-recover-password',
  standalone: false,
  templateUrl: './recover-password.html',
})
export class RecoverPassword {
  step = 1;
  formEmail: FormGroup;
  formReset: FormGroup;

  isLoading = false;
  errorMessage = '';
  successMessage = '';
  emailSent = '';

  constructor(
    private fb: FormBuilder,
    private api: ApiMockService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {
    this.formEmail = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.formReset = this.fb.group({
      code: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  onRequestCode() {
    if (this.formEmail.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';
    const email = this.formEmail.get('email')?.value;

    this.api.requestPasswordReset(email).subscribe({
      next: () => {
        this.isLoading = false;
        this.step = 2;
        this.emailSent = email;
        this.successMessage = `Código enviado para ${email}. (Dica: use 123456)`;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.message || 'Erro ao enviar código';
        this.cdr.detectChanges();
      },
    });
  }

  onResetPassword() {
    if (this.formReset.invalid) return;

    const { password, confirmPassword, code } = this.formReset.value;
    if (password !== confirmPassword) {
      this.errorMessage = 'As senhas não coincidem';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.api.confirmPasswordReset(this.emailSent, code, password).subscribe({
      next: () => {
        this.isLoading = false;
        alert('Senha redefinida com sucesso! Faça login.');
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.message || 'Erro ao redefinir senha';
        this.cdr.detectChanges();
      },
    });
  }
}
