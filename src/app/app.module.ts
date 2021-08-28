import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select'
import { Validators } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Step1Component } from './step1/step1.component';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { MenuComponent } from './menu/menu.component';
import { Step2Component } from './step2/step2.component';
import { Step3PrimerizosComponent } from './step3-primerizos/step3-primerizos.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Step4Component } from './step4/step4.component';
import { LoginComponent } from './login/login.component';
import { ClienteVistaComponent } from './cliente-vista/cliente-vista.component';
import { Step3RenovacionesComponent } from './step3-renovaciones/step3-renovaciones.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import { InterceptorService } from './services/interceptor.service';
import { NgbModule,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StepDireccionComponent } from './step-direccion/step-direccion.component';
import { FooterComponent } from './footer/footer.component';
import { NoCumpleRequisitosComponent } from './no-cumple-requisitos/no-cumple-requisitos.component';
import { PrestamoActivoComponent } from './prestamo-activo/prestamo-activo.component';
import { ClienteExisteComponent } from './cliente-existe/cliente-existe.component';
import { RayoPlusSolicitudComponent } from './rayo-plus-solicitud/rayo-plus-solicitud.component';
import { Step3RayoPlusComponent } from './step3-rayo-plus/step3-rayo-plus.component';
import { VistaRayoPlusComponent } from './vista-rayo-plus/vista-rayo-plus.component'



@NgModule({
  declarations: [
    AppComponent,
   Step1Component,
   MenuComponent,
   Step2Component,
   Step3PrimerizosComponent,
   Step4Component,
   LoginComponent,
   ClienteVistaComponent,
   Step3RenovacionesComponent,
   StepDireccionComponent,
   FooterComponent,
   NoCumpleRequisitosComponent,
   PrestamoActivoComponent,
   ClienteExisteComponent,
   RayoPlusSolicitudComponent,
   Step3RayoPlusComponent,
   VistaRayoPlusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
