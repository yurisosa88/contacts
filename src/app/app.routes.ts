import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: 'contacts', loadChildren: () => import('./features/contacts/contacts.routes') },
    {path: '', redirectTo: '/contacts', pathMatch: 'full'},    
    {path: '**', redirectTo: '/contacts', pathMatch: 'full'}
];
