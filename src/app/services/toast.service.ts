import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root',
})
export class ToastService {
    constructor(private messageService: MessageService) {}

    showToast(summary: string, detail: string, severity: 'success' | 'error') {
        this.messageService.add({ severity, summary, detail });
    }
}
