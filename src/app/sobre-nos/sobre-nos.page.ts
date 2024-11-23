import { Component } from '@angular/core';

@Component({
  selector: 'app-sobre-nos',
  templateUrl: './sobre-nos.page.html',
  styleUrls: ['./sobre-nos.page.scss'],
})
export class SobreNosPage {

  zoomCard(event: any) {
    const card = event.currentTarget;

    // Remove a classe 'zoomed' de todos os cards
    const allCards = document.querySelectorAll('.zoom-card');
    allCards.forEach(c => c.classList.remove('zoomed'));

    // Adiciona a classe 'zoomed' somente ao card clicado
    card.classList.add('zoomed');
  }
}
