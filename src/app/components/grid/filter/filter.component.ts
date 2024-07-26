import { ChangeDetectionStrategy, Component, input, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

const MATERIAL_MODULES = [MatFormFieldModule,MatInputModule]

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [FormsModule,MATERIAL_MODULES],
  template: `
        <mat-form-field>
          <mat-label>{{ label() }}</mat-label>
          <input matInput [(ngModel)]="filter" type="text" [placeholder]="placeholder()" />
          <!-- (keyup)="applyFilter($event)" -->
        </mat-form-field>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterComponent {
  label = input<string>('Filter');
  placeholder = input<string>('Filter...');
  filter = model('');

  //filterVal = output<any>();
}
