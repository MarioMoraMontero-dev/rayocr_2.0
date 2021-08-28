import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Step1Component } from './step1/step1.component';
import { Step2Component } from './step2/step2.component';
import { Step3PrimerizosComponent } from './step3-primerizos/step3-primerizos.component';
import { Step4Component } from './step4/step4.component';
import { LoginComponent } from './login/login.component';
import { ClienteVistaComponent } from './cliente-vista/cliente-vista.component';
import { Step3RenovacionesComponent } from './step3-renovaciones/step3-renovaciones.component';
import { StepDireccionComponent } from './step-direccion/step-direccion.component';
import { NoCumpleRequisitosComponent } from './no-cumple-requisitos/no-cumple-requisitos.component';
import { PrestamoActivoComponent } from './prestamo-activo/prestamo-activo.component';
import { ClienteExisteComponent } from './cliente-existe/cliente-existe.component';
import { RayoPlusSolicitudComponent } from './rayo-plus-solicitud/rayo-plus-solicitud.component';
import { Step3RayoPlusComponent } from './step3-rayo-plus/step3-rayo-plus.component';
import { VistaRayoPlusComponent } from './vista-rayo-plus/vista-rayo-plus.component';


const routes: Routes = [
  {
		path: '',
		component: Step1Component
  },
  {
    path:'step1',
    component:Step1Component
  },
  {
    path:'step2/:plazo/:monto',
    component:Step2Component
  },
  {
    path:'step3Primerizos/:idSolicitud',
    component:Step3PrimerizosComponent
  },
  {
    path:'success',
    component:Step4Component
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'clientevista',
    component:ClienteVistaComponent
  },
  {
    path:'renovaciones/:idContacot/:idSolicitud',
    component:Step3RenovacionesComponent
  },
  {
    path:'direccion/:idCliente',
    component:StepDireccionComponent
  },
  {
    path:'requisitosNoCumplidos',
    component:NoCumpleRequisitosComponent
  },
  {
    path:'prestamoActivo',
    component:PrestamoActivoComponent
  },
  {
    path:'clienteExiste',
    component:ClienteExisteComponent
  },
  {
    path:'rayoplussolicitud/:cantidadPrestamosPlus/:salarioReportado/:idusuario/:cantidadPrestamos',
    component: RayoPlusSolicitudComponent
  },
  {
    path:'renovacionesRayoPlus/:idContacot/:idSolicitud',
    component:Step3RayoPlusComponent
  },
  {
    path:'vistaPagosRayoPlus/:idContacot',
    component:VistaRayoPlusComponent
  }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation:'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
