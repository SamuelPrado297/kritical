// pagina-inicial.page.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginaInicialPage } from './pagina-inicial.page';
import { IonicModule, NavController } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';

describe('PaginaInicialPage', () => {
  let component: PaginaInicialPage;
  let fixture: ComponentFixture<PaginaInicialPage>;
  let navCtrl: NavController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginaInicialPage],
      imports: [IonicModule.forRoot(), RouterTestingModule],
      providers: [NavController]
    }).compileComponents();

    fixture = TestBed.createComponent(PaginaInicialPage);
    component = fixture.componentInstance;
    navCtrl = TestBed.inject(NavController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to avaliacao on goToAvaliacao', () => {
    spyOn(navCtrl, 'navigateForward');

    const game = { title: 'Test Game', image: 'test.jpg', category: 'Ação' };
    component.goToAvaliacao(game);

    expect(navCtrl.navigateForward).toHaveBeenCalledWith('/avaliacao');
  });
});
