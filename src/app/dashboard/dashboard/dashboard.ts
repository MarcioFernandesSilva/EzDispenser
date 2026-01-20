import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, of, concat } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ApiMockService, DashboardData } from '../../core/services/api-mock.service';
import { AuthService } from '../../core/services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
})
export class DashboardComponent implements OnInit {
  title = 'Painel de Controle';

  period$ = new BehaviorSubject<7 | 30>(30);

  // Agora aceita null (que representará o estado "Carregando...")
  dashboardData$: Observable<DashboardData | null> | undefined;

  searchTerm = '';
  sortColumn: 'date' | 'client' | 'value' = 'value';
  sortDirection: 'asc' | 'desc' = 'desc';

  constructor(
    private api: ApiMockService,
    private auth: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.dashboardData$ = this.period$.pipe(
      switchMap((period) => {
        return concat(of(null), this.api.getDashboardData(period));
      }),
    );
  }

  setPeriod(period: 7 | 30) {
    this.period$.next(period);
  }

  // Lógica de Filtro e Ordenação (Cliente-Side)
  getFilteredOrders(orders: any[]) {
    if (!orders) return [];

    let filtered = orders.filter((order) =>
      order.client.toLowerCase().includes(this.searchTerm.toLowerCase()),
    );

    filtered.sort((a, b) => {
      let valA: any = a[this.sortColumn];
      let valB: any = b[this.sortColumn];

      // Tratamento especial para Datas (dd/MM/yyyy)
      if (this.sortColumn === 'date') {
        valA = this.parseDate(a.date);
        valB = this.parseDate(b.date);
      }

      // Tratamento para Strings (Case insensitive)
      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();

      if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }

  private parseDate(dateStr: string): number {
    const [day, month, year] = dateStr.split('/');
    return new Date(+year, +month - 1, +day).getTime();
  }

  toggleSort(column: 'date' | 'client' | 'value') {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }

  deleteAccount() {
    if (!confirm('Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.')) {
      return;
    }

    this.auth.deleteAccount().subscribe({
      next: () => {
        alert('Conta excluída com sucesso!');
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        console.error(err);
        alert(err.message || 'Erro ao excluir conta.');
      },
    });
  }
}
