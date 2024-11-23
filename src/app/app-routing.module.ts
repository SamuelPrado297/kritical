// src/app/app-routing.module.ts

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home', // Redireciona para a página Home
    pathMatch: 'full'
  },
  {
    path: 'home', // Rota para a página Home
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'pagina-inicial',
    loadChildren: () => import('./pagina-inicial/pagina-inicial.module').then(m => m.PaginaInicialPageModule)
  },
  {
    path: 'todos-jogos',
    loadChildren: () => import('./todos-jogos/todos-jogos.module').then(m => m.TodosJogosPageModule)
  },
  {
    path: 'sobre-nos',
    loadChildren: () => import('./sobre-nos/sobre-nos.module').then(m => m.SobreNosPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'avaliacao',
    loadChildren: () => import('./avaliacao/avaliacao.module').then(m => m.AvaliacaoPageModule)
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./cadastro/cadastro.module').then( m => m.CadastroPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
