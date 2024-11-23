import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { RawgService } from '../services/rawg.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-todos-jogos',
  templateUrl: './todos-jogos.page.html',
  styleUrls: ['./todos-jogos.page.scss'],
})
export class TodosJogosPage implements OnInit {
  searchTerm: string = '';
  selectedCategory: string = 'Todos';
  showCategorySelector: boolean = false;
  categories: any[] = [];
  allGames: any[] = [];
  filteredGames: any[] = [];
  isLoading: boolean = false;

  currentPage: number = 1;
  pageSize: number = 20;
  totalGamesLoaded: number = 0;
  limit: number = 50;

  private searchSubject: Subject<string> = new Subject();

  constructor(
    private navCtrl: NavController,
    private rawgService: RawgService,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.loadGenres();
    this.loadGames();

    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.searchTerm = searchTerm;
      this.currentPage = 1; // Reinicia a página ao buscar
      this.loadGames();
    });
  }

  loadGenres() {
    this.rawgService.getGenres().subscribe(
      data => {
        this.categories = data.results.map((genre: any) => genre.slug);
      },
      error => {
        console.error('Erro ao carregar gêneros', error);
      }
    );
  }

  async loadGames(loadMore: boolean = false, event?: any) {
    if (this.totalGamesLoaded >= this.limit) {
      if (event) {
        event.target.complete();
      }
      return;
    }

    this.isLoading = true;
    const loading = await this.loadingController.create({
      message: loadMore ? 'Carregando mais jogos...' : 'Carregando jogos...',
    });
    await loading.present();

    const pageToLoad = loadMore ? this.currentPage + 1 : 1;

    this.rawgService.getGames(pageToLoad, this.pageSize, this.searchTerm, this.selectedCategory !== 'Todos' ? this.selectedCategory : '')
      .subscribe(
        data => {
          if (loadMore) {
            this.allGames = [...this.allGames, ...data.results];
            this.currentPage++;
          } else {
            this.allGames = data.results;
            this.currentPage = 1;
          }

          this.totalGamesLoaded = this.allGames.length > this.limit ? this.limit : this.allGames.length;
          this.filterGames();
          loading.dismiss();
          this.isLoading = false;

          if (loadMore && event) {
            event.target.complete();
          }
        },
        async error => {
          loading.dismiss();
          this.isLoading = false;
          const toast = await this.toastController.create({
            message: 'Erro ao carregar jogos.',
            duration: 2000,
            color: 'danger'
          });
          toast.present();

          if (loadMore && event) {
            event.target.complete();
          }
        }
      );
  }

  loadMoreGames(event: any) {
    this.loadGames(true, event);
  }

  filterGames() {
    if (this.selectedCategory === 'Todos' && !this.searchTerm) {
      this.filteredGames = this.allGames.slice(0, this.limit);
    } else {
      this.filteredGames = this.allGames.filter(game => {
        const matchesTitle = game.name.toLowerCase().includes(this.searchTerm.toLowerCase());
        const matchesCategory = this.selectedCategory === 'Todos' || game.genres.some((genre: any) => genre.slug === this.selectedCategory);
        return matchesTitle && matchesCategory;
      }).slice(0, this.limit);
    }
  }

  getGenresString(game: any): string {
    if (game.genres && game.genres.length > 0) {
      return game.genres.map((g: any) => g.name).join(', ');
    }
    return '';
  }

  // Modificação para passar descrição resumida para a navegação
  goToAvaliacao(game: any) {
    this.rawgService.getGameDetails(game.id).subscribe(gameDetails => {
      // Garantir que a descrição existe
      const gameDescription = gameDetails?.description || 'Descrição não disponível';
      
      this.navCtrl.navigateForward('/avaliacao', {
        queryParams: {
          gameName: game.name,
          gameDescription: gameDescription,
        }
      });
    });
  }
  

  onSearchChange(searchValue: string | null) {
    this.searchTerm = searchValue || '';
    this.searchSubject.next(this.searchTerm);
  }
}

