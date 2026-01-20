import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-revenue-chart',
  standalone: false,
  templateUrl: './revenue-chart.html',
})
export class RevenueChart implements OnChanges {
  // @Input: Portas de entrada de dados
  @Input() labels: string[] = [];
  @Input() values: number[] = [];
  points: string = '';
  // Dimensões internas do SVG (proporção 4:1)
  viewBoxWidth = 800;
  viewBoxHeight = 200;
  // Hackzinho para poder usar Math.max no HTML se precisar
  protected readonly Math = Math;
  // Lifecycle Hook: Roda sempre que os Inputs mudam
  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['values'] || changes['labels']) && this.values.length > 0) {
      this.calculatePoints();
    }
  }
  // Matemática pura: Transforma valores (R$) em pontos X,Y do SVG
  private calculatePoints() {
    const maxVal = Math.max(...this.values, 1) * 1.1; // 10% de folga no topo
    const stepX = this.viewBoxWidth / (this.values.length - 1 || 1);
    this.points = this.values
      .map((val, index) => {
        const x = index * stepX;
        // Regra de três: Se MaxVal é AlturaTotal (200), então Val é Y
        const y = this.viewBoxHeight - (val / maxVal) * this.viewBoxHeight;
        return `${x},${y}`;
      })
      .join(' ');
  }
}
