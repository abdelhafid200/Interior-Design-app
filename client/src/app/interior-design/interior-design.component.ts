import { Component, AfterViewInit } from '@angular/core';
import html2canvas from 'html2canvas';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms'; 


@Component({
  selector: 'app-interior-design',
  templateUrl: './interior-design.component.html',
  styleUrls: ['./interior-design.component.css'],
})
export class InteriorDesignComponent implements AfterViewInit {
  imageUrl: string | ArrayBuffer | null = null;
  sizeInput: number = 100;
  originalPositions: { [key: string]: { left: string; top: string } } = {};
  selectedCategory: string = '';
  deletedElements: HTMLElement[] = [];
  constructor(
    private authService : AuthService
  ){};
  categories = {
    chaise: [
      { src: 'images/chai.png', alt: 'Chaise', id: 'chair' },
      { src: 'images/ch1.png', alt: 'Chaise', id: 'ch1' },
      { src: 'images/ch2.png', alt: 'Chaise', id: 'ch2' },
      { src: 'images/ch3.png', alt: 'Chaise', id: 'ch3' }
    ],
    table: [
      { src: 'images/table.png', alt: 'Table', id: 'table' },
      { src: 'images/tab1.png', alt: 'Table', id: 'tab1' },
      { src: 'images/tab2.png', alt: 'Table', id: 'tab2' },
      { src: 'images/tab3.png', alt: 'Table', id: 'tab3' },
      { src: 'images/tab4.png', alt: 'Table', id: 'tab4' }
  
    ],
    tv: [
      { src: 'images/tv.png', alt: 'TV', id: 'tv' },
      { src: 'images/tv1.png', alt: 'TV', id: 'tv1' },
      { src: 'images/tv2.png', alt: 'TV', id: 'tv2' },
      { src: 'images/tv3.png', alt: 'TV', id: 'tv3' },
      { src: 'images/tv4.png', alt: 'TV', id: 'tv4' },
    ],
    lit: [
      { src: 'images/lit1.png', alt: 'lit', id: 'lit1' },
      { src: 'images/lit2.png', alt: 'lit', id: 'lit2' },
      { src: 'images/lit3.png', alt: 'lit', id: 'lit3' },
      { src: 'images/lit4.png', alt: 'lit', id: 'lit4' },
     
    ],
    lus: [
      { src: 'images/lus1.png', alt: 'lit', id: 'lus1' },
      { src: 'images/lus2.png', alt: 'lit', id: 'lus2' },
      { src: 'images/lus3.png', alt: 'lit', id: 'lus3' },
      { src: 'images/lus4.png', alt: 'lit', id: 'lus4' },
     
    ],
    fau: [
      { src: 'images/fau1.png', alt: 'lit', id: 'fau1' },
      { src: 'images/fau2.png', alt: 'lit', id: 'fau2' },
      { src: 'images/fau3.png', alt: 'lit', id: 'fau3' },
      { src: 'images/fau4.png', alt: 'lit', id: 'fau4' },
      { src: 'images/fau5.png', alt: 'lit', id: 'fau5' },
     
    ],
    heu: [
      { src: 'images/heu.png', alt: 'lit', id: 'heu' },
      { src: 'images/heu1.png', alt: 'lit', id: 'heu1' },
      { src: 'images/heu2.png', alt: 'lit', id: 'heu2' },
      { src: 'images/heu3.png', alt: 'lit', id: 'heu3' },
  
    ],
    bur: [
      { src: 'images/bur1.png', alt: 'lit', id: 'bur1' },
      { src: 'images/bur2.png', alt: 'lit', id: 'bur2' },
      { src: 'images/bur3.png', alt: 'lit', id: 'bur3' },
      { src: 'images/bur4.png', alt: 'lit', id: 'bur4' },
    ],
    mir: [
      { src: 'images/mir1.png', alt: 'lit', id: 'mir1' },
      { src: 'images/mir2.png', alt: 'lit', id: 'mir2' },
      { src: 'images/mir3.png', alt: 'lit', id: 'mir3' },

    ],
    bal: [
      { src: 'images/bal1.png', alt: 'lit', id: 'bal1' },
      { src: 'images/bal2.png', alt: 'lit', id: 'bal2' },
      { src: 'images/bal3.png', alt: 'lit', id: 'bal3' },

    ],
    fen: [
      { src: 'images/fen1.png', alt: 'lit', id: 'fen1' },
      { src: 'images/fen2.png', alt: 'lit', id: 'fen2' },
      { src: 'images/fen3.png', alt: 'lit', id: 'fen3' },

    ],
    vas: [
      { src: 'images/vas1.png', alt: 'lit', id: 'vas1' },
      { src: 'images/vas2.png', alt: 'lit', id: 'vas2' },
      { src: 'images/vas3.png', alt: 'lit', id: 'vas3' },
      { src: 'images/vas4.png', alt: 'lit', id: 'vas4' },
    ],
    lum: [
      { src: 'images/lum1.png', alt: 'lit', id: 'lum1' },
      { src: 'images/lum2.png', alt: 'lit', id: 'lum2' },
      { src: 'images/lum3.png', alt: 'lit', id: 'lum3' },
      { src: 'images/lum4.png', alt: 'lit', id: 'lum4' },
   
    ],
    bou: [
      { src: 'images/bou1.png', alt: 'lit', id: 'bou1' },
      { src: 'images/bou2.png', alt: 'lit', id: 'bou2' },
      { src: 'images/bou3.png', alt: 'lit', id: 'bou3' },
    
   
    ],
    ta: [
      { src: 'images/ta1.png', alt: 'lit', id: 'ta1' },
      { src: 'images/ta2.png', alt: 'lit', id: 'ta2' },
      { src: 'images/ta3.png', alt: 'lit', id: 'ta3' },
      { src: 'images/ta4.png', alt: 'lit', id: 'ta4' },
    
   
    ],
    cui: [
      { src: 'images/cui1.png', alt: 'lit', id: 'cui1' },
      { src: 'images/cui2.png', alt: 'lit', id: 'cui2' },
      { src: 'images/cui3.png', alt: 'lit', id: 'cui3' },
      { src: 'images/cui4.png', alt: 'lit', id: 'cui4' },
      { src: 'images/cui5.png', alt: 'lit', id: 'cui5' },
      { src: 'images/cui6.png', alt: 'lit', id: 'cui6' },
      { src: 'images/cui7.png', alt: 'lit', id: 'cui7' },
      { src: 'images/cui8.png', alt: 'lit', id: 'cui8' },
      { src: 'images/cui9.png', alt: 'lit', id: 'cui9' },
      { src: 'images/cui10.png', alt: 'lit', id: 'cui10' },
      { src: 'images/cui11.png', alt: 'lit', id: 'cui11' },
      { src: 'images/cui12.png', alt: 'lit', id: 'cui12' },
      { src: 'images/cui13.png', alt: 'lit', id: 'cui13' },
      { src: 'images/cui14.png', alt: 'lit', id: 'cui14' },
      { src: 'images/cui15.png', alt: 'lit', id: 'cui15' },
      { src: 'images/cui16.png', alt: 'lit', id: 'cui16' },
      { src: 'images/cui17.png', alt: 'lit', id: 'cui17' },
      { src: 'images/cui18.png', alt: 'lit', id: 'cui18' },
      { src: 'images/cui19.png', alt: 'lit', id: 'cui19' },
      { src: 'images/cui20.png', alt: 'lit', id: 'cui20' },
      { src: 'images/cui21.png', alt: 'lit', id: 'cui21' },
      { src: 'images/cui22.png', alt: 'lit', id: 'cui22' }
   
    ],
    tm: [
      { src: 'images/tm1.png', alt: 'lit', id: 'tm1' },
      { src: 'images/tm2.png', alt: 'lit', id: 'tm2' },
      { src: 'images/tm3.png', alt: 'lit', id: 'tm3' },
     
    
   
    ],
    ar: [
      { src: 'images/ar1.png', alt: 'lit', id: 'ar1' },
      { src: 'images/ar2.png', alt: 'lit', id: 'ar2' },
      { src: 'images/ar3.png', alt: 'lit', id: 'ar3' },
      { src: 'images/ar4.png', alt: 'lit', id: 'ar4' },
      { src: 'images/ar5.png', alt: 'lit', id: 'ar5' },
      { src: 'images/ar6.png', alt: 'lit', id: 'ar6' },
      { src: 'images/ar7.png', alt: 'lit', id: 'ar7' },
      ],
      sa: [
        { src: 'images/sa1.png', alt: 'lit', id: 'sa1' },
        { src: 'images/sa2.png', alt: 'lit', id: 'sa2' },
        { src: 'images/sa3.png', alt: 'lit', id: 'sa3' },
        { src: 'images/sa4.png', alt: 'lit', id: 'sa4' },
        { src: 'images/sa5.png', alt: 'lit', id: 'sa5' },
        { src: 'images/sa6.png', alt: 'lit', id: 'sa6' },
        { src: 'images/sa7.png', alt: 'lit', id: 'sa7' },
        ],
        mu: [
          { src: 'images/mu1.png', alt: 'lit', id: 'mu1' },
          { src: 'images/mu2.png', alt: 'lit', id: 'mu2' },
          { src: 'images/mu3.png', alt: 'lit', id: 'mu3' },
          { src: 'images/mu4.png', alt: 'lit', id: 'mu4' },
          { src: 'images/mu5.png', alt: 'lit', id: 'mu5' },
          { src: 'images/mu6.png', alt: 'lit', id: 'mu6' },
          ],
          to: [
            { src: 'images/to1.png', alt: 'lit', id: 'to1' },
            { src: 'images/to2.png', alt: 'lit', id: 'to2' },
            { src: 'images/to3.png', alt: 'lit', id: 'to3' },
            { src: 'images/to4.png', alt: 'lit', id: 'to4' },
           
            ],
  };

  lastClonedElement: HTMLElement | null = null;
  updateSize(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input) {
      this.sizeInput = Number(input.value);
      console.log('Updated sizeInput:', this.sizeInput);
      // Update the last cloned element's size
      if (this.lastClonedElement) {
        this.lastClonedElement.style.width = `${this.sizeInput}px`;
        this.lastClonedElement.style.height = `auto`;
      }
    }
  }
  selectCategory(category: string) {
    this.selectedCategory = category || ''; // Réinitialise si la catégorie est nulle ou vide
  }
  getValue(event: Event): string {
    const selectElement = event.target as HTMLSelectElement;
    return selectElement.value;
  }
  ngAfterViewInit() {
    this.initializeDraggedElements();
  }
  getItemsForSelectedCategory() {
    return this.categories[this.selectedCategory as keyof typeof this.categories] || [];
  }
  initializeDraggedElements() {
    const draggableItems = document.querySelectorAll('.draggable-item');
    draggableItems.forEach((item: Element) => {
      const el = item as HTMLElement;
      this.originalPositions[el.id] = {
        left: el.style.left,
        top: el.style.top
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
    event.dataTransfer?.setData("text", target.id);
  }

  drop(event: DragEvent) {
    event.preventDefault();
    const data = event.dataTransfer?.getData("text");
    const draggedElement = document.getElementById(data!);

    if (draggedElement) {
        // Créer une copie de l'élément glissé
        const clonedElement = draggedElement.cloneNode(true) as HTMLElement;
        clonedElement.style.position = 'absolute'; // Positionner la copie
        clonedElement.style.pointerEvents = 'auto'; // Assurez-vous que les événements sont activés

        const dropTarget = event.target as HTMLElement;

        if (dropTarget.classList.contains('model-box') || dropTarget.closest('.model-box')) {
            // Dropping inside the model box
            const modelBox = dropTarget.classList.contains('model-box') ? dropTarget : dropTarget.closest('.model-box');
            if (modelBox) {
                const rect = modelBox.getBoundingClientRect();
                const x = event.clientX - rect.left - (clonedElement.offsetWidth / 2);
                const y = event.clientY - rect.top - (clonedElement.offsetHeight / 2);
                const size = this.sizeInput || 200; 
                clonedElement.style.width = `${size}px`;
                clonedElement.style.height = `auto`;

                clonedElement.style.left = `${x}px`;
                clonedElement.style.top = `${y}px`;
                modelBox.appendChild(clonedElement);
                // Store reference to last cloned element
                  this.lastClonedElement = clonedElement;
                
                  this.clonedElements.push(clonedElement);
                  this.deletedElements = [];
                // Rendre le nouvel élément déplaçable
                this.makeDraggable(clonedElement);
            }
        } else {
            // Dropping outside the model box (return to image group)
            const imageGroup = document.getElementById('imageGroup');
            if (imageGroup) {
                const originalPosition = this.originalPositions[draggedElement.id];
                if (originalPosition) {
                    clonedElement.style.position = 'relative'; // Position relative pour la zone d'items
                    clonedElement.style.left = originalPosition.left;
                    clonedElement.style.top = originalPosition.top;
                }
                imageGroup.appendChild(clonedElement);

                // Rendre le nouvel élément déplaçable
                this.makeDraggable(clonedElement);
            }
        }
    }
}

clonedElements: HTMLElement[] = [];

deleteLastClonedElement() {
  if (this.clonedElements.length > 0) {
    const lastElement = this.clonedElements.pop();
    if (lastElement) {
      lastElement.remove();
      this.deletedElements.push(lastElement);
    }
  }
}
restoreLastDeletedElement() {
  if (this.deletedElements.length > 0) {
    const elementToRestore = this.deletedElements.pop();
    if (elementToRestore) {
      const modelBox = document.querySelector('.model-box');
      if (modelBox) {
        modelBox.appendChild(elementToRestore);
        this.clonedElements.push(elementToRestore);
      }
    }
  }
}
// Fonction pour rendre un élément déplaçable
makeDraggable(element: HTMLElement) {
  let isDragging = false;
  let offsetX: number;
  let offsetY: number;

  element.addEventListener('pointerdown', (e: PointerEvent) => {
      isDragging = true;

      // Calculer les offsets
      const rect = element.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;

      // Activer le drag
      element.setPointerCapture(e.pointerId);
  });

  // Écouter les mouvements de la souris
  document.addEventListener('pointermove', (moveEvent: PointerEvent) => {
      if (isDragging) {
          // Mettre à jour la position de l'élément
          element.style.position = 'absolute';
          element.style.left = `${moveEvent.clientX - offsetX - 200 }px`;
          element.style.top = `${moveEvent.clientY - offsetY - 150 }px`;
      }
  });

  // Écouter le relâchement du bouton
  document.addEventListener('pointerup', (upEvent: PointerEvent) => {
      isDragging = false;
      element.releasePointerCapture(upEvent.pointerId);
  });
}

  // Method to capture the div and convert it to base64
  captureToBase64() {
    const modelBox = document.querySelector('.model-box') as HTMLElement;
    if (modelBox) {
      html2canvas(modelBox).then(canvas => {
        const base64Image = canvas.toDataURL("image/png");
        console.log(base64Image); // Here you can use the base64 image as needed
        alert("Base64 Image: " + base64Image); // You can display it for testing purposes
      });
    }
  }
  
  

  onLogout(){
    this.authService.logout()
  }

}
