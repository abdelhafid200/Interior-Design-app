// src/app/services/storage.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {}

  // Vérifier si localStorage est disponible (côté client uniquement)
  isLocalStorageAvailable(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  // Méthode pour obtenir un élément depuis localStorage
  getItem(key: string): string | null {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem(key);
    }
    return null;
  }

  // Méthode pour définir un élément dans localStorage
  setItem(key: string, value: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(key, value);
    }
  }

  // Méthode pour retirer un élément de localStorage
  removeItem(key: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem(key);
    }
  }
}
