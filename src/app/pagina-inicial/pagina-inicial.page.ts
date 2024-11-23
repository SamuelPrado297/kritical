// src/app/pagina-inicial/pagina-inicial.page.ts

import { Component } from '@angular/core'; 
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.page.html',
  styleUrls: ['./pagina-inicial.page.scss'],
})
export class PaginaInicialPage {
  currentImage = 0;
  fade: boolean = false;
  searchTerm: string = '';
  selectedCategory: string = 'Todos'; // Alterado de 'All' para 'Todos'
  showCategorySelector: boolean = false;

  slideImages: string[] = [
    'https://cdn1.epicgames.com/b30b6d1b4dfd4dcc93b5490be5e094e5/offer/RDR2476298253_Epic_Games_Wishlist_RDR2_2560x1440_V01-2560x1440-2a9ebe1f7ee202102555be202d5632ec.jpg',
    'https://cdn1.epicgames.com/spt-assets/edaff839f0734d16bc89d2ddb1dc9339/steel-magnolia-15owu.jpg',
    'https://images.alphacoders.com/134/1343589.jpeg',
    'https://wallpapercave.com/wp/wp14078587.png',
    'https://gameplayscassi.com.br/wp-content/uploads/2024/08/Black-Myth-WuKong.jpg'
  ];

  recommendedGames = [
    { title: 'Spider-Man', image: 'https://upload.wikimedia.org/wikipedia/en/e/e1/Spider-Man_PS4_cover.jpg', category: 'Ação' },
    { title: 'Horizon Forbidden West', image: 'https://upload.wikimedia.org/wikipedia/en/6/69/Horizon_Forbidden_West_cover_art.jpg', category: 'Ação' },
    { title: 'God of War', image: 'https://image.api.playstation.com/vulcan/img/rnd/202010/2821/KXv6VplN1r1bNPdfR4r29w0m.png', category: 'Aventura' },
    { title: 'Assassin’s Creed', image: 'https://store.ubisoft.com/on/demandware.static/-/Sites-masterCatalog/pt_BR/dw0c1d05f2/images/large/575ffd98a3be1633568b4d6c.jpg', category: 'Ação' },
    { title: 'The Witcher 3', image: 'https://cdn1.epicgames.com/offer/14ee004dadc142faaaece5a6270fb628/EGS_TheWitcher3WildHuntCompleteEdition_CDPROJEKTRED_S2_1200x1600-53a8fb2c0201cd8aea410f2a049aba3f', category: 'RPG' },
    { title: 'Uncharted', image: 'https://image.api.playstation.com/vulcan/ap/rnd/202111/3013/6bAF2VVEamgKclalI0oBnoAe.jpg', category: 'Aventura' },
  ];

  categories: string[] = ['Todos', 'Ação', 'Aventura', 'RPG', 'Estratégia', 'Esportes', 'Corrida']; // Alterado de 'All' para 'Todos'

  constructor(private navCtrl: NavController) {}

  goToLogin() {
    this.navCtrl.navigateForward('/login'); // Navega para a página de login
  }

  goToSobreNos() {
    this.navCtrl.navigateForward('/sobre-nos'); // Navega para a página "Sobre Nós"
  }

  goToAvaliacao(game: any) {
    this.navCtrl.navigateForward('/avaliacao'); // Navega para a página de avaliação
  }

  goToAllGames() {
    this.navCtrl.navigateForward('/todos-jogos'); // Navega para a página "Todos Jogos"
  }

  toggleCategorySelector() {
    this.showCategorySelector = !this.showCategorySelector; // Alterna a exibição do seletor de categoria
  }

  get filteredGames() {
    return this.recommendedGames.filter(game => {
      const matchesTitle = game.title.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = this.selectedCategory === 'Todos' || game.category === this.selectedCategory;
      return matchesTitle && matchesCategory;
    });
  }

  nextImage() {
    this.fade = true; // Inicia a animação de esmaecimento
    setTimeout(() => {
      this.currentImage = (this.currentImage + 1) % this.slideImages.length; // Passa para a próxima imagem
      this.fade = false; // Finaliza a animação de esmaecimento
    }, 500); // Tempo da animação
  }

  prevImage() {
    this.fade = true; // Inicia a animação de esmaecimento
    setTimeout(() => {
      this.currentImage = (this.currentImage - 1 + this.slideImages.length) % this.slideImages.length; // Volta para a imagem anterior
      this.fade = false; // Finaliza a animação de esmaecimento
    }, 500); // Tempo da animação
  }
}

