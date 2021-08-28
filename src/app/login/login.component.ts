import { Component, OnInit, Input, Type } from '@angular/core';
import { RestService } from '../services/rest.service';
import { Router } from '@angular/router';
import { JsonLoginDatos, Convert } from '../interfaces/json-login-datos';
import {NgxSpinnerService} from 'ngx-spinner'
import { SpinnerService } from '../services/spinner.service';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, Validator, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'ngbd-modal-confirm',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">Ups!!</h4>
    <button type="button" class="close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p>{{mensaje1}}<span class="text-danger"> {{mensaje2}}.</span></p>

  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel</button>
    <button type="button" class="btn btn-danger" (click)="recargarpagina()">Ok</button>
  </div>
  `
})


export class NgbdModalConfirm {
  @Input() mensaje1 = '';
  @Input() mensaje2 = '';

  constructor(public modal: NgbActiveModal) {}
  recargarpagina(){
    window.location.reload();
  }
}




const MODALS: {[name: string]: Type<any>} = {
  focusFirst: NgbdModalConfirm
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!:FormGroup;
  constructor(public rest:RestService,private router: Router,private spinnerService:SpinnerService,private formBuilder:FormBuilder,config: NgbModalConfig,private authenticationService: AuthenticationService, private modalService: NgbModal) { }
  login: any = [];
  token : any;
  codigoSalidaJson:any;
  jsonEntrante:any = [];
  jsonEntranteJ:String = '';
  public mensajeSalidaRecupe:string|undefined;
  public ErrorLogin:boolean|undefined;
  public ProcesandoLogin:boolean|undefined;
  //Limpiar input login
  get emailUser(): any { return this.form.get('emailUser'); }
  get passuser(): any { return this.form.get('passuser'); }
  @Input() loginValues = {email:'',pass:'',idCliente:''};
  @Input() recuperarEmail = {email:''};

  ngOnInit(): void {
    const contacto = localStorage.getItem("LoginContactId");
    if(contacto != null){
      this.router.navigate(['clientevista']);
    }else{
      this.buildForm();
    }
    this.ErrorLogin = true;
    this.ProcesandoLogin = true;
  }
  getToken(){
    this.login=[];
    this.rest.getToken().subscribe((data: {})=>{
    console.log(data);
    this.login.push(data);
    this.loginCliente(this.login);
    console.log(this.login);
    this.ErrorLogin = true;
    this.ProcesandoLogin = false;
  })
}


loginCliente(datos:any []){
  this.loginValues.idCliente = '';
  for(let l of datos) {
    this.token = l.access_token;
    console.log("SalidaToken: "+this.token);
  }
  this.rest.postlogin(this.token,this.loginValues).subscribe((data: {})=>{
    console.log(data);
    this.jsonEntranteJ = String(data);
    const welcome = Convert.toWelcome(this.jsonEntranteJ);
    console.log('Test: '+welcome);
    this.jsonEntrante.push(data);
    
    console.log('Json Salida Login: '+ this.jsonEntrante);
    for(let l of this.jsonEntrante) {
      if(l.codigoSalida == '002'){
        this.ErrorLogin = false;
        this.ProcesandoLogin = true;
       
      }else{
        localStorage.setItem('LoginContactId',l.id);
        console.log(l.salarioReportado);
        this.authenticationService.login();
        this.router.navigate(['clientevista']);
        
         }
      }
});
}

loginBotton(){  
  this.getToken();
}

open(name: string) {
  const modalSalida =  this.modalService.open(MODALS[name]);
      modalSalida.componentInstance.mensaje1 = 'Los datos ingresados no son validos ';
      modalSalida.componentInstance.mensaje2 = 'favor revisar el correo y la contraseña ingresados';
}

private buildForm(){
  this.form = this.formBuilder.group({
    emailuser: ['',[Validators.required,Validators.email]],
    passuser: ['',[Validators.required]],
  });
  //#region Nombre
    this.form.get('emailuser')?.valueChanges
    .subscribe(value =>{
        console.log(value);
      this.loginValues.email = value;

    });

 //#endregion Nombre

  //#region Cedula
  this.form.get('passuser')?.valueChanges
  .subscribe(value =>{
      console.log(value);
      this.loginValues.pass = value;

  });
  //#endregion Cedula



}

enviarLogin(event:Event){
  event.preventDefault();
  if(this.form.valid){
    const values = this.form.value;
    this.getToken();
  }else{
    this.form.markAllAsTouched();
    
    console.log('Error al enviar datos');
  }
  
}


getTokenRecuperarContra(){
  this.login=[];
  this.rest.getToken().subscribe((data: {})=>{
  console.log(data);
  this.login.push(data);
  this.recupeContra(this.login);
  console.log(this.login);
})
}


recupeContra(datos:any []){
  for(let l of datos) {
    this.token = l.access_token;
    console.log("SalidaToken: "+this.token);
  }
  this.rest.postRecuperarContra(this.token,this.recuperarEmail.email).subscribe((data: {})=>{
    console.log(data);
    this.jsonEntranteJ = String(data);
    this.jsonEntrante.push(data);
    
    console.log('Json Salida Login: '+ this.jsonEntrante);
    for(let l of this.jsonEntrante) {
      if(l.codigo == '002'){
        
          this.mensajeSalidaRecupe = 'Se ha enviado un correo electrónico al correo ingresado con la información solicitada';
         
      }else{
        if(l.codigoSalida == '001'){
          this.mensajeSalidaRecupe = 'El correo no coincide con la informacion almacenada en el sistema. Intente nuevamente con otro corre';
        }else{
          if(l.codigoSalida == '003'){
            this.mensajeSalidaRecupe = l.mensajeSalida;
          }else{
            if(l.codigoSalida == '004'){
              this.mensajeSalidaRecupe = l.mensajeSalida;
            }
          }
        }
        
         }
      }
});
}



openResetPass(name: string) {
  const modalSalida =  this.modalService.open(MODALS[name]);
      modalSalida.componentInstance.mensaje1 = 'Los datos ingresados no son validos ';
      modalSalida.componentInstance.mensaje2 = 'favor revisar el correo y la contraseña ingresados';
}


openRecupeContra(content:any) {
  this.modalService.open(content);
}


clearlogin() { this.emailUser.reset(); this.passuser.reset(); }

refrescarPantalla(){
  window.location.reload();
}

}

