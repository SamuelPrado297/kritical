import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FirestoreService } from '../services/firestore.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-avaliacao',
  templateUrl: './avaliacao.page.html',
  styleUrls: ['./avaliacao.page.scss'],
})
export class AvaliacaoPage implements OnInit {

  gameName: string = '';
  rawGameDescription: string = '';
  gameDescription: SafeHtml = '';
  showFullDescription: boolean = false;
  descriptionPreviewLength: number = 400;
  comment: string = "";
  stars: HTMLElement[] = [];
  private user: any;
  public mensagem: string = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    public toastController: ToastController,
    public firestore: FirestoreService
    ) {

    this.firestore.monitoraAuth((user) => {
      this.user = user ? user : null;
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.gameName = params['gameName'];
      this.rawGameDescription = params['gameDescription'] || 'Descrição não disponível';
      this.gameDescription = this.sanitizer.bypassSecurityTrustHtml(this.rawGameDescription);

      // Inicializa as estrelas e adiciona os event listeners de clique
      this.stars = Array.from(document.querySelectorAll<HTMLElement>('li.star-icon'));
      this.stars.forEach((star, index) => {
        star.addEventListener('click', () => this.handleStarClick(index + 1));
      });
    });
  }

  handleStarClick(rating: number) {
    this.stars.forEach((star, index) => {
      if (index < rating) {
        star.classList.add('ativo');
      } else {
        star.classList.remove('ativo');
      }
    });
  }

  async exibeMensagem(){
    const toast = await this.toastController.create({
      message: this.mensagem,
      duration: 2500
    });
    toast.present();
  }

  async submitReview() {
    if (!this.user) {
      this.mensagem = 'Você precisa estar logado para enviar uma avaliação!';
      this.router.navigate(['/login']);
      await this.exibeMensagem();
      return;
    } else {
      this.mensagem = "Avaliação feita com sucesso!";
    }

    // Conta o número de estrelas ativas
    const rating = this.stars.filter(star => star.classList.contains('ativo')).length;

    const reviewData = {
      gameName: this.gameName,
      comment: this.comment,
      userId: this.user.uid,
      stars: rating,
      timestamp: new Date()
    };

    try {
      await this.firestore.adicionaDoc(reviewData);
      this.mensagem = 'Avaliação enviada com sucesso!';
      await this.exibeMensagem();
    } catch (error) {
      console.error('Erro ao enviar avaliação:', error);
      this.mensagem = "Erro ao enviar avaliação!";
      await this.exibeMensagem();
    }
  }
}