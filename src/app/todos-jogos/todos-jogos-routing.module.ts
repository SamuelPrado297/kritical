import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodosJogosPage } from './todos-jogos.page';

const routes: Routes = [
  {
    path: '',
    component: TodosJogosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodosJogosPageRoutingModule {}
