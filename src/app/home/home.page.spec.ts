// home.page.spec.ts
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { IonicModule, NavController, LoadingController } from '@ionic/angular';
import { HomePage } from './home.page';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let navCtrl: NavController;
  let loadingController: LoadingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot(), RouterTestingModule],
      providers: [NavController, LoadingController]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    navCtrl = TestBed.inject(NavController);
    loadingController = TestBed.inject(LoadingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to pagina-inicial on start', fakeAsync(() => {
    spyOn(loadingController, 'create').and.returnValue(Promise.resolve({
      present: () => Promise.resolve(),
      onDidDismiss: () => Promise.resolve()
    } as any));
    spyOn(navCtrl, 'navigateForward');

    component.start();
    tick(300); // Simula o tempo de carregamento

    expect(loadingController.create).toHaveBeenCalled();
    expect(navCtrl.navigateForward).toHaveBeenCalledWith('/pagina-inicial');
    expect(component.isExpanding).toBeFalse();
  }));
});
