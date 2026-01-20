import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './login/login';
import { RecoverPassword } from './recover-password/recover-password';
import { CreateAccount } from './create-account/create-account';

const routes: Routes = [
  {
    path: 'login',
    component: Login,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'recover-password',
    component: RecoverPassword,
  },
  {
    path: 'create-account',
    component: CreateAccount,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
