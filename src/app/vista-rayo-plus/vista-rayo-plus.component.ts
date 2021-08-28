import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../services/rest.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { JsonLoginDatos } from '../interfaces/json-login-datos';

@Component({
  selector: 'app-vista-rayo-plus',
  templateUrl: './vista-rayo-plus.component.html',
  styleUrls: ['./vista-rayo-plus.component.css']
})
export class VistaRayoPlusComponent implements OnInit {

  constructor(public rest:RestService,private router: Router,private spinnerService:NgxSpinnerService,private _Activatedroute:ActivatedRoute) { }
  login: any = [];
  token : any;
  @Input() loginValues = {email:'',pass:'',idCliente:''};
  jsonEntranteJ2:String = '';
  public ErrorAlCrearLaSolicitud!:boolean;
  public ProcesandoSolicitudSucces!:boolean;
  public data2!:JsonLoginDatos[];
  ngOnInit(): void {
    this.loginValues.idCliente = String(this._Activatedroute.snapshot.paramMap.get("idContacot"));
    this.getTokenLogin();
  }

  getTokenLogin(){
    this.ErrorAlCrearLaSolicitud = true;
    this.ProcesandoSolicitudSucces = false;
    this.login=[];
    this.rest.getToken().subscribe((data: {})=>{
    console.log(data);
    this.login.push(data);
    this.vistaPagos(this.login);
    console.log(this.login);
    
  })
  }


  vistaPagos(datos:any []){
    let  jsonEntrante2:any = [];
   for(let l of datos) {
     this.token = l.access_token;
     console.log("SalidaToken: "+this.token);
   }
   this.rest.postvistaPagosRayoPL(this.token,this.loginValues).subscribe((data: {})=>{
     console.log(data);
     this.jsonEntranteJ2 = String(data);
     jsonEntrante2.push(data);
     
     console.log('Json Salida Login: '+ jsonEntrante2);
     for(let l of jsonEntrante2) {
       if(l.codigoSalida == '002'){
       }else{
           this.data2 = jsonEntrante2;    
          }

       }
   });
   }
 goMiembros(){
  this.router.navigate(['login']);
 }

}


