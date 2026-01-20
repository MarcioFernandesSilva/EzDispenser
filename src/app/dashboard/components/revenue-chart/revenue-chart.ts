import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-revenue-chart',
  standalone: false,
  templateUrl: './revenue-chart.html',
})
export class RevenueChart implements OnChanges {
  @Input() labels: string[] = [];
  @Input() values: number[] = [];
  points: string = '';

  viewBoxWidth = 800;
  viewBoxHeight = 200;

  protected readonly Math = Math;

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['values'] || changes['labels']) && this.values.length > 0) {
      this.calculatePoints();
    }
  }

  private calculatePoints() {
    const maxVal = Math.max(...this.values, 1) * 1.1;
    const stepX = this.viewBoxWidth / (this.values.length - 1 || 1);
    this.points = this.values
      .map((val, index) => {
        const x = index * stepX;

        const y = this.viewBoxHeight - (val / maxVal) * this.viewBoxHeight;
        return `${x},${y}`;
      })
      .join(' ');
  }
}
