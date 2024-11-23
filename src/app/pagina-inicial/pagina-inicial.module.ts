// src/app/pagina-inicial/pagina-inicial.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PaginaInicialPage } from './pagina-inicial.page';
import { PaginaInicialPageRoutingModule } from './pagina-inicial-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaginaInicialPageRoutingModule
  ],
  declarations: [PaginaInicialPage]
})
export class PaginaInicialPageModule {}
