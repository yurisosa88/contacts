import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ContactService } from '@features/contacts/contact.service';
import { ModalService } from './modal.service';
import { APP_CONSTANTS } from '@shared/contants';
import { SnackBarService } from '@shared/services/snack-bar.service';

const MATERIAL_MODULES = [MatFormField,
  MatInput,
  MatLabel,
  MatDialogModule,MatButton]

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [MATERIAL_MODULES,ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  contactForm!: FormGroup;
  private readonly _fb = inject(FormBuilder);
  private readonly _matDialog = inject(MAT_DIALOG_DATA);
  private readonly _contactSvc = inject(ContactService);
  private readonly _modalSvc = inject(ModalService);
  private readonly _snackbarSvc = inject(SnackBarService);

  ngOnInit(): void {
    this._buidForm();
    this.contactForm.patchValue(this._matDialog.data);
  }

  async addContact(){
    let message = APP_CONSTANTS.MESSAGES.CONTACT_UPDATED;
    const contact = this.contactForm.value;

    if(this._matDialog.data){
      this._contactSvc.updateContact(this._matDialog.data.id,contact);
    } else {
      await this._contactSvc.newContact(contact);
      message = APP_CONSTANTS.MESSAGES.CONTACT_ADDED;
    }
    this._snackbarSvc.showSnackbar(message);
    this._modalSvc.closeModal();
  }

  getTitle():string {
    return this._matDialog.data ? 'Edit Contact' : 'Add Contact';
  }

  private _buidForm():void {
    this.contactForm = this._fb.nonNullable.group({
      name: ['',Validators.required],
      phone: ['',Validators.required],
      email: ['',Validators.required]
    });
  }

}
