import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FirestoreService } from '../services/firestore.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  public email: string="";
  public senha: string="";
  public mensagem: string="";
  public userEmail: string="";

  constructor(
    public router: Router,
    public toastController: ToastController,
    public firestore: FirestoreService
  ) {}

  async logarUsuario() {
    try {
      const res = await this.firestore.loginUsuario(this.email, this.senha);
      // O 'res' é do tipo qualquer resposta do Firebase, por exemplo, o objeto do usuário
      this.router.navigate(['/pagina-inicial']);
      console.log('Login bem-sucedido:', res);
    } catch (error: any) {
      console.error('Erro ao fazer login: ', error);
      this.mensagem = "E-mail ou senha incorreto(s)";
      await this.exibeMensagem();
    }
  }
  
  recoverPassword() {
    this.firestore.passwordReset(this.email)
    .then(async (res) => {
      console.log('Email de recuperação enviado: ',res)
      this.mensagem = "E-mail de recuperação enviado";
      await this.exibeMensagem();
    })
    .catch(async (error) => {
      console.error('Erro ao enviar e-mail de recuperação: ', error)
      this.mensagem = "E-mail não encontrado";
      this.exibeMensagem();
    })
  }

  async exibeMensagem(){
    const toast = await this.toastController.create({
      message: this.mensagem,
      duration: 2500
    });
    toast.present();
  }

  ngOnInit() {
  }
}