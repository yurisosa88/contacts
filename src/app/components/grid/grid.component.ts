import { Component, OnInit, ViewChild, effect, inject, input, signal, viewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { FilterComponent } from "./filter/filter.component";
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { ContactService } from '@features/contacts/contact.service';
import { APP_CONSTANTS } from '@shared/contants';
import { ModalService } from '@components/modal/modal.service';
import { ModalComponent } from '@components/modal/modal.component';
import { SnackBarService } from '@shared/services/snack-bar.service';

const MATERIAL_MODULES = [MatTableModule,
  MatPaginatorModule,
  MatSortModule,MatButtonModule,MatIconModule]

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [MATERIAL_MODULES,FilterComponent],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})
export class GridComponent<T> implements OnInit {
  displayedColumns = input.required<string[]>();
  data = input.required<T[]>();
  valueToFilter = signal('');
  sortableColumn = input<string[]>([]);

  dataSource = new MatTableDataSource<T>();
  private readonly _sort = viewChild.required<MatSort>(MatSort);
  private readonly paginator = viewChild.required<MatPaginator>(MatPaginator);
  private readonly _contactSvc = inject(ContactService);
  private readonly _modalSvc = inject(ModalService);
  private readonly _snackbarSvc = inject(SnackBarService);

  constructor(){
    effect( () => {
      if(this.valueToFilter()){
        this.dataSource.filter = this.valueToFilter();
      } else {
        this.dataSource.filter = '';
      }
      if(this.data()){
        this.dataSource.data = this.data();
      }
    }, {allowSignalWrites: true} );
  }

  ngOnInit() {
    this.dataSource.data = this.data();
    this.dataSource.sort = this._sort();
    this.dataSource.paginator = this.paginator();
  }

  onDeleteContact(id:string):void{
    const confirmation = confirm(APP_CONSTANTS.MESSAGES.CONFIRMATION_PROMPT);
    if(confirmation){
      this._contactSvc.deleteContact(id);
      this._snackbarSvc.showSnackbar(APP_CONSTANTS.MESSAGES.CONTACT_DELETED);
    }
  }

  onEditContact(data: T ):void{
    this._modalSvc.openModal<ModalComponent,T>(ModalComponent,data,true);
  }

  onSelectedRow(data: T){
    this.onEditContact(data);
  }

  // applingFilter(event:any){
  //   this.dataSource.filter = event;
  // }
}


