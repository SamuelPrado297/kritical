import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FirestoreService } from '../services/firestore.service'

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  public email: string="";
  public senha: string="";
  public gamertag: string="";
  public mensagem: string="";

  constructor(
    public router: Router,
    public toastController: ToastController,
    public firestore: FirestoreService
  ) {}

  async inserirUsuario() {
    try {
      const res = await this.firestore.criaUsuario(this.email, this.senha, this.gamertag);
      const usuario = res.user;

      this.mensagem = 'Usuário cadastrado com sucesso!';
      await this.exibeMensagem();

      await this.firestore.userFirestore(usuario.uid, this.email, this.senha, this.gamertag);

      this.router.navigate(['/login']);
    } catch (error: any) {
      // Garantir que o erro seja tratado de maneira explícita
      console.error('Erro ao registrar usuário: ', error);  // Usando 'error' para imprimir no console
      this.mensagem = "Erro ao registrar usuário";
      await this.exibeMensagem();
    }
  }

  async exibeMensagem() {
    const toast = await this.toastController.create({
      message: this.mensagem,
      duration: 2000
    });
    toast.present();
  }

  ngOnInit() {}
}