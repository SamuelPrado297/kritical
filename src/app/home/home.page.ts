// home.page.ts
import { Component } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  isExpanding = false;

  constructor(
    private navCtrl: NavController,
    private loadingController: LoadingController
  ) {}

  async start() {
    this.isExpanding = true; // Ativa a animação de expansão

    const loading = await this.loadingController.create({
      message: 'Carregando...',
      duration: 300, // Deve corresponder ao tempo da animação
      spinner: 'crescent'
    });
    await loading.present();

    await loading.onDidDismiss();
    this.navCtrl.navigateForward('/pagina-inicial'); // Navega para a página inicial após o loading
    this.isExpanding = false; // Redefine a animação
  }
}

