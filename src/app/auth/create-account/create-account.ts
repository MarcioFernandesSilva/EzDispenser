import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiMockService } from '../../core/services/api-mock.service';

@Component({
  selector: 'app-create-account',
  standalone: false,
  templateUrl: './create-account.html',
})
export class CreateAccount {
  createForm: FormGroup;
  strength = 0;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private api: ApiMockService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      code: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    });

    this.createForm.get('password')?.valueChanges.subscribe((val) => {
      this.calculateStrength(val);
    });
  }

  calculateStrength(pass: string) {
    let score = 0;
    if (!pass) {
      this.strength = 0;
      return;
    }
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    this.strength = score;
  }

  onSubmit() {
    if (this.createForm.invalid) return;

    const { email, code, password, confirmPassword } = this.createForm.value;

    if (password !== confirmPassword) {
      this.errorMessage = 'Senhas não conferem';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.api.createPassword(email, code, password).subscribe({
      next: () => {
        this.isLoading = false;
        alert('Conta criada com sucesso! Faça login.');
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.message || 'Erro ao criar conta';
        this.cdr.detectChanges();
      },
    });
  }
}
