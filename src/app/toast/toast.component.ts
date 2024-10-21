import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-toast',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.css'],
    providers: [MessageService], // Ajoutez MessageService en tant que fournisseur
})
export class ToastComponent {
    constructor(private messageService: MessageService) {}

    showSuccess() {
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'L\'action a été effectuée avec succès!' });
    }

    showError() {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Une erreur s\'est produite!' });
    }
}
