// pagina-inicial-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaginaInicialPage } from './pagina-inicial.page';

const routes: Routes = [
  {
    path: '',
    component: PaginaInicialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaginaInicialPageRoutingModule {}
