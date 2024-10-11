import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-interior-design',
  templateUrl: './interior-design.component.html',
  styleUrls: ['./interior-design.component.css'] // Corrigé de styleUrl à styleUrls
})
export class InteriorDesignComponent {

  private whichArt: HTMLElement | null = null; // Stocke l'élément en cours de manipulation
  private initialWidth: number = 0; // Largeur initiale de l'élément
  private initialHeight: number = 0; // Hauteur initiale de l'élément
  private resizing: boolean = false; // Indicateur pour vérifier si l'élément est en cours de redimensionnement

  ngAfterViewInit() {
    this.dragndrop();
  }

  dragndrop() {
    let xpos = 0;
    let ypos = 0;

    const body = document.querySelector('body');
    if (!body) return; // Return if body is not found

    body.addEventListener('dragstart', (e) => {
      this.whichArt = e.target as HTMLElement; // Type assertion
      xpos = e.offsetX === undefined ? e.layerX : e.offsetX;
      ypos = e.offsetY === undefined ? e.layerY : e.offsetY;
      if (this.whichArt) {
        this.whichArt.style.zIndex = '10';
      }
    }, false);

    body.addEventListener('dragover', (e) => {
      e.preventDefault();
    }, false);

    body.addEventListener('drop', (e) => {
      e.preventDefault();
      if (this.whichArt) { // Check if whichArt is not null
        this.whichArt.style.left = e.pageX - Number(xpos) + 'px';
        this.whichArt.style.top = e.pageY - Number(ypos) + 'px';
      }
    }, false);

    body.addEventListener('touchstart', (e) => {
      e.preventDefault();
      const target = e.target as HTMLElement; // Type assertion
      const touch = e.touches[0];
      let moveOffsetX = target.offsetLeft - touch.pageX;
      let moveOffsetY = target.offsetTop - touch.pageY;

      // Reset the z-index of other images
      this.resetZ();
      target.style.zIndex = '10';

      target.addEventListener('touchmove', () => {
        let posX = touch.pageX + moveOffsetX;
        let posY = touch.pageY + moveOffsetY;
        target.style.left = posX + 'px';
        target.style.top = posY + 'px';
      }, false);
    }, false);

    // Gestion des événements de redimensionnement
    body.addEventListener('wheel', (e) => {
      e.preventDefault(); // Empêche le défilement de la page
      if (this.whichArt && !this.resizing) {
        //const currentWidth = this.whichArt.offsetWidth;
        //const currentHeight = this.whichArt.offsetHeight;

        if (e.deltaY < 0) {
          // Agrandir
          //this.whichArt.style.width = (currentWidth * 1.1) + 'px';
          //this.whichArt.style.height = (currentHeight * 1.1) + 'px';
        } else {
          // Réduire
         // this.whichArt.style.width = (currentWidth * 0.9) + 'px';
          //this.whichArt.style.height = (currentHeight * 0.9) + 'px';
        }
      }
    }, false);
  }

  resetZ() {
    const imgEl = document.querySelectorAll('img');
    for (let i = imgEl.length - 1; i >= 0; i--) {
      (imgEl[i] as HTMLElement).style.zIndex = '5';
    }
  }


  imageUrl: string | ArrayBuffer | null = null; // Pour stocker l'URL de l'image sélectionnée

  // Cette méthode est appelée quand un fichier est sélectionné
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      // Quand le fichier est chargé, on obtient une URL de l'image
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };

      reader.readAsDataURL(file); // Lire le fichier comme URL
    }
  }
  
}
