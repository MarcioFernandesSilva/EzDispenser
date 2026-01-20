import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing-module';
import { SharedModule } from '../shared/shared-module';
import { Login } from './login/login';
import { RecoverPassword } from './recover-password/recover-password';
import { CreateAccount } from './create-account/create-account';

@NgModule({
  declarations: [Login, RecoverPassword, CreateAccount],
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule, SharedModule],
})
export class AuthModule {}
