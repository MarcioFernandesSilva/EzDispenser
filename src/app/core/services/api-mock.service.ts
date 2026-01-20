import { Injectable } from '@angular/core';
import { Observable, of, timer, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export interface DashboardData {
  kpis: { revenue: number; orders: number; averageTicket: number };
  recentOrders: { date: string; client: string; value: number; status: 'completed' | 'pending' }[];
  chartData: { labels: string[]; values: number[] };
}

@Injectable({
  providedIn: 'root',
})
export class ApiMockService {
  constructor() {}

  getDashboardData(days: 7 | 30 = 30): Observable<DashboardData> {
    const delaySimulado = Math.random() * 600 + 600;

    return timer(delaySimulado).pipe(
      switchMap(() => {
        const multiplier = days === 30 ? 1 : 0.5;
        const isWeek = days === 7;

        const data: DashboardData = {
          kpis: {
            revenue: 15400.5 * multiplier,
            orders: Math.floor(120 * multiplier),
            averageTicket: 128.33 * multiplier,
          },
          recentOrders: [
            {
              date: '25/10/2023',
              client: 'Padaria do João',
              value: 150.0 * multiplier,
              status: 'completed',
            },
            {
              date: '24/10/2023',
              client: 'Supermercado Dia',
              value: 2500.5 * multiplier,
              status: 'pending',
            },
            {
              date: '23/10/2023',
              client: 'Dona Maria',
              value: 45.9 * multiplier,
              status: 'completed',
            },
            {
              date: '22/10/2023',
              client: 'Posto Ipiranga',
              value: 1200.0 * multiplier,
              status: 'completed',
            },
            {
              date: '21/10/2023',
              client: 'Farmácia Global',
              value: 85.5 * multiplier,
              status: 'pending',
            },
          ],
          chartData: {
            labels: isWeek
              ? ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']
              : Array.from({ length: 10 }, (_, i) => `Dia ${i * 3 + 1}`),
            values: isWeek
              ? [
                  1200 * multiplier,
                  1500 * multiplier,
                  900 * multiplier,
                  2100 * multiplier,
                  1800 * multiplier,
                  3200 * multiplier,
                  2500 * multiplier,
                ]
              : Array.from({ length: 10 }, () => Math.floor(Math.random() * 10000 + 5000)),
          },
        };
        return of(data);
      }),
    );
  }

  // Auth: Login
  login(email: string, pass: string): Observable<{ token: string }> {
    const delaySimulado = Math.random() * 600 + 600;
    return timer(delaySimulado).pipe(
      switchMap(() => {
        // USUÁRIO SEMENTE (SEED) PARA TESTES
        const SEED_USER = { email: 'admin@ez.com', pass: '123456' };

        // 1. Verifica se é o usuário seed
        if (email === SEED_USER.email && pass === SEED_USER.pass) {
          return of({ token: 'mock-jwt-token-admin-123' });
        }

        // 2. Tenta buscar usuário salvo no "Banco de Dados" Local
        const storedPassword = localStorage.getItem('mock_user_' + email);

        if (storedPassword && pass === storedPassword) {
          return of({ token: 'mock-jwt-token-user-' + Date.now() });
        } else {
          // Se não achou no storage nem é o seed, ou senha errada -> ERRO real
          return throwError(() => new Error('Credenciais Inválidas'));
        }
      }),
    );
  }

  // Auth: Request Password Reset
  requestPasswordReset(email: string): Observable<{ resetId: string }> {
    const delaySimulado = Math.random() * 600 + 600;
    return timer(delaySimulado).pipe(
      switchMap(() => {
        if (!email.includes('@')) return throwError(() => new Error('Email inválido'));

        // Validação: Usuário existe?
        const isSeed = email === 'admin@ez.com';
        const storedUser = localStorage.getItem('mock_user_' + email);

        if (!isSeed && !storedUser) {
          return throwError(() => new Error('Usuário não encontrado. Crie uma conta primeiro.'));
        }

        return of({ resetId: 'reset-id-simulated-999' });
      }),
    );
  }

  // Auth: Confirm Password Reset
  confirmPasswordReset(email: string, code: string, newPassword: string): Observable<void> {
    const delaySimulado = Math.random() * 600 + 600;
    return timer(delaySimulado).pipe(
      switchMap(() => {
        if (code !== '123456') return throwError(() => new Error('Código inválido ou expirado'));

        // SALVA A NOVA SENHA NO STORAGE
        localStorage.setItem('mock_user_' + email, newPassword);

        return of(void 0);
      }),
    );
  }

  // Auth: Create Password
  createPassword(email: string, code: string, newPassword: string): Observable<void> {
    const delaySimulado = Math.random() * 600 + 600;
    return timer(delaySimulado).pipe(
      switchMap(() => {
        if (code !== '123456') return throwError(() => new Error('Código inválido'));
        if (newPassword.length < 8)
          return throwError(() => new Error('Senha deve ter no mínimo 8 caracteres'));

        // Validação 1: Proibir criação com email do Admin
        if (email === 'admin@ez.com') {
          return throwError(() => new Error('Este email é reservado ao administrador.'));
        }

        // Validação 2: Usuário já existe? (Não deixar sobrescrever)
        const storedUser = localStorage.getItem('mock_user_' + email);
        if (storedUser) {
          return throwError(() => new Error('Este usuário já possui cadastro. Faça Login.'));
        }

        // SALVA O USUÁRIO NO STORAGE (SIMULANDO DB)
        localStorage.setItem('mock_user_' + email, newPassword);

        return of(void 0);
      }),
    );
  }

  deleteAccount(email: string): Observable<void> {
    const delaySimulado = 500;
    return timer(delaySimulado).pipe(
      switchMap(() => {
        if (email === 'admin@ez.com') {
          return throwError(() => new Error('O administrador não pode ser deletado.'));
        }

        localStorage.removeItem('mock_user_' + email);
        return of(void 0);
      }),
    );
  }
}
