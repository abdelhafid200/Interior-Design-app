import { Component, AfterViewInit } from '@angular/core';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-interior-design',
  templateUrl: './interior-design.component.html',
  styleUrls: ['./interior-design.component.css']
})
export class InteriorDesignComponent implements AfterViewInit {
  imageUrl: string | ArrayBuffer | null = null;
  originalPositions: { [key: string]: { left: string; top: string } } = {};

  ngAfterViewInit() {
    this.initializeDraggedElements();
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

                clonedElement.style.left = `${x}px`;
                clonedElement.style.top = `${y}px`;
                modelBox.appendChild(clonedElement);

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
  
}

