import { Component, AfterViewInit } from '@angular/core';
import html2canvas from 'html2canvas';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
// import fs from "fs"

@Component({
  selector: 'app-interior-design',
  templateUrl: './interior-design.component.html',
  styleUrls: ['./interior-design.component.css'],
})
export class InteriorDesignComponent implements AfterViewInit {
  imageUrl: string | ArrayBuffer | null = null;
  originalPositions: { [key: string]: { left: string; top: string } } = {};
  private accessToken: string | null = null;
  capturedImageBase64: string;
  
  showingOriginal = true; 
  showingGenerated = false; 

  constructor(private authService: AuthService, private http: HttpClient) {
    this.capturedImageBase64 = ''; // Initialisation
  }

  ngAfterViewInit() {
    this.initializeDraggedElements();
    this.getAccessToken(); // Retrieve access token on init
  }

  initializeDraggedElements() {
    const draggableItems = document.querySelectorAll('.draggable-item');
    draggableItems.forEach((item: Element) => {
      const el = item as HTMLElement;
      this.originalPositions[el.id] = {
        left: el.style.left,
        top: el.style.top,
      };
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      this.imageUrl = e.target?.result || null;
    };

    reader.readAsDataURL(file);
  }

  allowDrop(event: DragEvent) {
    event.preventDefault();
  }

  drag(event: DragEvent) {
    const target = event.target as HTMLElement;
    event.dataTransfer?.setData('text', target.id);
  }

  drop(event: DragEvent) {
    event.preventDefault();
    const data = event.dataTransfer?.getData('text');
    const draggedElement = document.getElementById(data!);
    const dropTarget = event.target as HTMLElement;

    if (draggedElement) {
      if (
        dropTarget.classList.contains('model-box') ||
        dropTarget.closest('.model-box')
      ) {
        const modelBox = dropTarget.classList.contains('model-box')
          ? dropTarget
          : dropTarget.closest('.model-box');
        if (modelBox) {
          const rect = modelBox.getBoundingClientRect();
          const x = event.clientX - rect.left - draggedElement.offsetWidth / 2;
          const y = event.clientY - rect.top - draggedElement.offsetHeight / 2;

          draggedElement.style.position = 'absolute';
          draggedElement.style.left = `${x}px`;
          draggedElement.style.top = `${y}px`;
          modelBox.appendChild(draggedElement);
        }
      } else {
        const imageGroup = document.getElementById('imageGroup');
        if (imageGroup) {
          const originalPosition = this.originalPositions[draggedElement.id];
          if (originalPosition) {
            draggedElement.style.position = 'absolute';
            draggedElement.style.left = originalPosition.left;
            draggedElement.style.top = originalPosition.top;
          }
          imageGroup.appendChild(draggedElement);
        }
      }
    }
  }

  getAccessToken() {
    this.authService.getAccessToken().subscribe({
      next: (data) => {
        this.accessToken = data.access_token;
        console.log('Access Token:', this.accessToken);
      },
      error: (error) => {
        console.error('Error fetching access token:', error);
      },
    });
  }

  captureToBase64() {
    const modelBox = document.querySelector('.model-box') as HTMLElement;
    if (!modelBox) {
      console.error('Model box not found.');
      return; // Early return if modelBox is not found
    }

    // Capture the modelBox as a canvas
    html2canvas(modelBox)
      .then((canvas) => {
        const base64Image = canvas.toDataURL('image/png').split(',')[1]; // Remove data prefix
        console.log('Captured Base64:', base64Image);

        const apiKey = environment.GEMINI_API_KEY; // Consider moving this to a secure config
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

        // Prepare the payload for the API request
        const payload = {
          contents: [
            {
              parts: [
                { text: 'Décrivez cette image...' },
                {
                  inline_data: {
                    data: base64Image,
                    mime_type: 'image/png',
                  },
                },
              ],
            },
          ],
        };

        // Send the base64 image data to the Gemini API
        this.http.post(url, payload).subscribe({
          next: (response: any) => {
            console.log(response);
            const description =
              response.candidates?.[0]?.content?.parts?.[0]?.text;

            if (description) {
              console.log('Description:', description);
              // Uncomment the line below to send description to the design generation API
              this.sendToDesignGenerationAPI(description);
              this.showingGenerated = true; // Affiche l'image générée après sa création
              this.showingOriginal = false;
            } else {
              console.warn('No description received from the API.');
            }
          },
          error: (error) => {
            console.error('Error while sending request to the API:', error);
          },
        });
      })
      .catch((error) => {
        console.error('Error during HTML to canvas conversion:', error);
      });
  }

  sendToDesignGenerationAPI(description: string) {
    const userPreferences = {
      // Insérez ici les préférences de l'utilisateur (par exemple, couleurs, styles, etc.)
    };

    // Construisez le prompt en fonction de la description et des préférences de l'utilisateur
    const prompt = `${description}. ${JSON.stringify(userPreferences)}`;
    const x_key = environment.x_key;
    this.http
      .post(
        'https://api.bfl.ml/v1/flux-pro-1.1',
        {
          prompt: prompt,
          width: 1024, // Largeur souhaitée pour l'image générée
          height: 768, // Hauteur souhaitée pour l'image générée
        },
        {
          headers: {
            accept: 'application/json',
            'x-key': `${x_key}`, // Remplacez par votre clé API
            'Content-Type': 'application/json',
          },
        }
      )
      .subscribe(
        (requestResponse: any) => {
          console.log('API Request Response:', requestResponse);
          const requestId = requestResponse.id;

          // Vérifiez le statut du résultat dans une boucle
          this.checkGenerationResult(requestId);
        },
        (error) => {
          console.error(
            'Error while sending request to the generation API:',
            error
          );
        }
      );
  }

  checkGenerationResult(requestId: string) {
    const x_key = environment.x_key;

    let retryCount = 0;
    const maxRetries = 20;

    const checkStatus = () => {


      if (retryCount >= maxRetries) {
        console.error('Échec après plusieurs tentatives.');
        return;
      }
      retryCount++;

      this.http
        .get('https://api.bfl.ml/v1/get_result', {
          headers: {
            accept: 'application/json',
            'x-key': `${x_key}`, 
          },
          params: {
            id: requestId,
          },
        })
        .subscribe(
          (result: any) => {
            if (result.status === 'Ready') {
              console.log(`Result: ${result.result.sample}`);
              this.capturedImageBase64 = result.result.sample;
              console.log("Données de l'image générée (base64) :", this.capturedImageBase64);
              // Affichez ou enregistrez l'image générée ici.
            } else {
              console.log(`Status: ${result.status}`);
              // Vérifiez le statut toutes les 500 ms
              setTimeout(checkStatus, 500);
            }
          },
          (error) => {
            console.error('Error while checking generation status:', error);
          }
        );
    };

    checkStatus();
  }

  onLogout() {
    this.authService.logout();
  }

  imageUrl1: string | null = null;  // URL de l'image téléchargée

  onFileSelected1(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl1 = reader.result as string;
        this.showingOriginal = true;  // Montre l'image originale
        this.showingGenerated = false; // Cache l'image générée
      };
      reader.readAsDataURL(file);
    }
  }
  
  showOriginal(): void {
    this.showingOriginal = !!this.imageUrl; // Assurez-vous qu'une image originale est disponible
    this.showingGenerated = false;
  }
  
  showGenerated(): void {
    this.showingOriginal = false;
    this.showingGenerated = !!this.capturedImageBase64; // Assurez-vous que l'image générée est disponible
  }
  
  
  
  
  
}
