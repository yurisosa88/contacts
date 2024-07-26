import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { GridComponent } from "../../../components/grid/grid.component";
import { ColunmKeys, Contact } from '../contac.interface';
import { ContactService } from '../contact.service';
import { tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [GridComponent],
  template: `
    <section>
        <app-grid [displayedColumns]="columnsName" [data]="dataTable()" [sortableColumn]="sortables" /> 
    </section>
  `,
  styles: ``
})
export class ContactListComponent implements OnInit {
  private readonly _contactSvc = inject(ContactService);
  private readonly _destroyRef = inject(DestroyRef);
  
  columnsName: ColunmKeys<Contact> = ['id','name','phone','email','action'];
  dataTable = signal<Contact[]>([]);
  sortables: ColunmKeys<Contact> = ['id','name','phone','email'];
  

  ngOnInit(): void {
    this.getAllContacts();
  }

  getAllContacts(){
    this._contactSvc.getAllContacts().pipe(
      takeUntilDestroyed(this._destroyRef),
      tap( (contacts:Contact[]) => this.dataTable.set(contacts))
    ).subscribe();
  }
}
