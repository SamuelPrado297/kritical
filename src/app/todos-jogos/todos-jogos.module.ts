// src/app/todos-jogos/todos-jogos.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TodosJogosPageRoutingModule } from './todos-jogos-routing.module';
import { TodosJogosPage } from './todos-jogos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TodosJogosPageRoutingModule
  ],
  declarations: [TodosJogosPage]
})
export class TodosJogosPageModule {}
