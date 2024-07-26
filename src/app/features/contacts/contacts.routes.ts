import { Routes } from "@angular/router";

const contactRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./contact-list/contact-list.component')
        .then( c => c.ContactListComponent)
    }
];

export default contactRoutes;