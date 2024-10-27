import { Component, AfterViewInit } from '@angular/core';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-interior-design',
  templateUrl: './interior-design.component.html',
  styleUrls: ['./interior-design.component.css']
})
export class InteriorDesignComponent implements AfterViewInit {
  imageUrl: string | ArrayBuffer | null = null;  // Uploaded image
  generatedImageUrl: string | null = null;       // Generated image (base64)
  originalPositions: { [key: string]: { left: string; top: string } } = {};
  isOriginal: boolean = true;                    // Flag to toggle between images
  imageGenerated: boolean = false;               // Flag to indicate if generated image exists

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

  // Handle file upload
  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      this.imageUrl = e.target?.result || null;
      this.isOriginal = true; // Show original after file upload
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
    const dropTarget = event.target as HTMLElement;

    if (draggedElement) {
      if (dropTarget.classList.contains('model-box') || dropTarget.closest('.model-box')) {
        // Dropping inside the model box
        const modelBox = dropTarget.classList.contains('model-box') ? dropTarget : dropTarget.closest('.model-box');
        if (modelBox) {
          const rect = modelBox.getBoundingClientRect();
          const x = event.clientX - rect.left - (draggedElement.offsetWidth / 2);
          const y = event.clientY - rect.top - (draggedElement.offsetHeight / 2);

          draggedElement.style.position = 'absolute';
          draggedElement.style.left = `${x}px`;
          draggedElement.style.top = `${y}px`;
          modelBox.appendChild(draggedElement);
        }
      } else {
        // Dropping outside the model box (return to image group)
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

  // Method to capture the div and convert it to base64
  captureToBase64() {
    const modelBox = document.querySelector('.model-box') as HTMLElement;
    if (modelBox) {
      html2canvas(modelBox).then(canvas => {
        this.generatedImageUrl = canvas.toDataURL("image/png"); // Store generated image
        this.imageGenerated = true; // Indicate that the image is generated
        this.isOriginal = false;    // Automatically show generated image
      });
    }
  }

  // Toggle to show original image
  showOriginal() {
    this.isOriginal = true;
  }

  // Toggle to show generated image
  showGenerated() {
    this.isOriginal = false;
  }
}
