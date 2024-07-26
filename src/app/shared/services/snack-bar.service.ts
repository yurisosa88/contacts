import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({providedIn: 'root'})
export class SnackBarService {
    private readonly _snackbar = inject(MatSnackBar);

    showSnackbar(message: string,action = 'ok'):void {
        this._snackbar.open(message,action, {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'right'
        })
    }
    
}