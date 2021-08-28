import { Component, OnInit, Input, Type } from '@angular/core';
import { JsonFinalSolicitudes } from '../interfaces/json-final-solicitudes';
import { datosRenovacion } from '../interfaces/json-renovacion-datos';
import { RestService } from '../services/rest.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModalConfig, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { encode } from 'base64-arraybuffer';
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
    <p>{{mensaje3}}<span class="text-danger">{{mensaje4}}.</span></p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel</button>
    <button type="button" class="btn btn-danger" (click)="modal.close('Ok click')">Ok</button>
  </div>
  `
})
export class NgbdModalConfirm {
  @Input() mensaje1 = '';
  @Input() mensaje2 = '';
  @Input() mensaje3 = '';
  @Input() mensaje4 = '';
  constructor(public modal: NgbActiveModal) {}
}
const MODALS: {[name: string]: Type<any>} = {
  focusFirst: NgbdModalConfirm
  
};
@Component({
  selector: 'app-step3-rayo-plus',
  templateUrl: './step3-rayo-plus.component.html',
  styleUrls: ['./step3-rayo-plus.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class Step3RayoPlusComponent implements OnInit {

  constructor(public rest:RestService,private router: Router,config: NgbModalConfig, private modalService: NgbModal,private _Activatedroute:ActivatedRoute) { }
  public monto:number|undefined;
  public interes:number|undefined;
  public tecno:number|undefined;
  public descuento:number|undefined;
  public total:number|undefined;
  public aval:number|undefined;
  public iva:number|undefined;
  public servicioFE!:number;
  public cc1 : HTMLElement | undefined;
  public cc2 : HTMLElement | undefined;
  public cc3 : HTMLElement | undefined;
  public fecha1: string | undefined;
  public fecha2: string | undefined;
  public fecha3: string | undefined;
  public Abono1: number | undefined;
  public Abono2: number | undefined;
  public Abono3: number | undefined;
  public Abono2Texto:string|undefined;
  public plazo:string|undefined;
  
  public requirioAyudaRequrido:string|undefined;
  requirioAyuda:string[] =["Si","No"];
  login: any = [];
  token : any;
  tamanoDocOrden:any;
  tamanoDocCedula:any;
  codigoSalidaJson:any;
  jsonEntrante:any = [];
  jsonEntranteJ:String = '';
  data: datosRenovacion = history.state.data;
  @Input() procesoFinal = new JsonFinalSolicitudes();
  orden:any = [];
  orden1!:String;
  bodyFile!:String;
  cedula:any = [];
  cedula1!:String;
  bodyFilecedula!:String;
  ErrorAlCrearLaSolicitud!: boolean;
  ProcesandoSolicitudSucces!: boolean;

  ngOnInit(): void {
    console.log(this.data.plazo);
    this.monto = Number(this.data.monto);
    this.interes = Number(this.data.interes);
    this.aval = Number(this.data.aval);
    this.iva = Number(this.data.iva);
    this.tecno =Number(this.data.tecno);
    this.descuento =Number(this.data.descuento);
    this.total = Number(this.data.totalPagar);
    this.servicioFE = Number(this.data.servicioFE);
    this.plazo = this.data.plazo;
    this.cc1 = document.getElementById('fecha1')!;
    this.cc2 = document.getElementById('fecha2')!;
    this.cc3 = document.getElementById('fecha3x')!;
    this.ocultarTD(this.plazo);
    this.calculafechas(this.plazo,this.total);
    this.procesoFinal.Id = this._Activatedroute.snapshot.paramMap.get("idSolicitud");
    this.ErrorAlCrearLaSolicitud = true;
    this.ProcesandoSolicitudSucces = true;
  }

  firstDate(tdate : Date){
    var day:number = tdate.getDate();
    var month:number = tdate.getMonth() + 1;
    var year:number = tdate.getFullYear();
    var newDate;
    if(day >= 1 && day <= 6){
        newDate = "15" + "/" +month+ "/" +year;
    }else if(day >= 7 && day <= 21){
        if(month == 2){
            newDate = "28" + "/" + 2 + "/" +year;
        }else{
            newDate = "30" + "/" + month + "/" +year;
        }
    }else if(day >= 22 && day <= 31){
        month = month + 1;
        if(month == 13){
            month = 1;
            year = year + 1;
            newDate = "15" + "/" + month + "/" +year;
        }else{
            newDate = "15" + "/" +month + "/" +year;
        }
    }
    return newDate;
}

secondDate(tdate:Date){
    var day = tdate.getDate();
    var month = tdate.getMonth() + 1;
    var year = tdate.getFullYear();
    var newDate2;

    if(day >= 1 && day <= 6){
        newDate2 = "30" + "/" +month+ "/" + year ;
    }
    else if(day >= 7 && day <= 21){
        if(month == 2){
            newDate2 = 15 + "/"+3+"/"+year;
        }else{
            month = month +1;
            if(month == 13){
                month = 1;
                year = year + 1;
                newDate2 = 15+"/"+month+"/"+year;
            }else{
                newDate2 = 15+"/"+month+"/"+year;
            }
        }
    }else if(day >= 22 && day <= 31){
        month = month + 1;
        if(month == 13){
            month = 1;
            year = year + 1;
            newDate2 = 30+"/"+month+"/"+year;
        }else{
            newDate2 = 30+"/"+month+"/"+year;
        }
    }
    return newDate2;
}
thirdDate(tdate:Date){
    var day = tdate.getDate();
    var month = tdate.getMonth() + 1;
    var year = tdate.getFullYear();
    var newDate3;
    if(day >= 1 && day <= 6){
        month = month + 1;
        if(month == 13){
            month = 1;
            year = year + 1;
            newDate3 = "15"+"/"+month+"/"+year;
        }else{
            newDate3 = "15"+"/"+month+"/"+year;
        }
    }else if(day >= 7 && day <= 21){
        if(month == 2){
            newDate3 = 30+"/"+3+"/"+year;
        }else{
            month = month + 1;
            if(month == 13){
                month = 1;
                year = year + 1;
                newDate3 = 30+"/"+month+"/"+year;
            }else if(month == 1){
                newDate3 = 28+"/"+2+"/"+year;
            }else{
                newDate3 = 30+"/"+month+"/"+year;
            }
            newDate3 = 30+"/"+month+"/"+year;
        }
    }else if(day >= 22 && day <= 31){
        month = month + 2;
        if(month == 13){
            month = 1;
            year = year + 1;
            newDate3 = 15+"/"+month+"/"+year;
        }else{
            newDate3 = 15+"/"+month+"/"+year;
        }
    }
    return newDate3;
}
//

calculafechas(diaSeleccionado:string,total:number){
  let today: Date = new Date();
   if(diaSeleccionado == '15 días' ){
     this.fecha1 = this.firstDate(today);
     this.fecha2 = '';
     this.fecha3 = '';
     this.Abono1 = total;
   }else{
    if(diaSeleccionado == '30 días' ){
     
      this.fecha1 = this.firstDate(today);
      this.fecha2 = this.secondDate(today);
      this.fecha3 = '';
      this.Abono1 = total/2;
      this.Abono2 = total/2;
      this.Abono2Texto = 'Abono Final';
   }else{
    if(diaSeleccionado == '45 días'){
    
      this.fecha1 = this.firstDate(today);
      this.fecha2 = this.secondDate(today);
      this.fecha3 = this.thirdDate(today);
      this.Abono1 = total/3;
      this.Abono2 = total/3;
      this.Abono3 = total/3;
      this.Abono2Texto = 'Segundo Abono';
   }else{
    if(diaSeleccionado == 'Cliente Especial' ){
     
      this.fecha1= this.secondDate(today);
      this.Abono1 = total;
      
      this.Abono2Texto = 'Abono Final';
   }
   }
   }
 }
 }
ocultarTD(diaSeleccionado:string){
  console.log(diaSeleccionado);
      if(diaSeleccionado == '15 días' || diaSeleccionado == 'Cliente Especial' ){
        if(this.cc2 != undefined && this.cc3 != undefined){
          this.cc2.setAttribute("style", "display:none;");
          this.cc3.setAttribute("style", "display:none;");
        }
      }else{
        if(diaSeleccionado == '30 días'){
        if(this.cc2 != undefined && this.cc3 != undefined){
          this.cc2.setAttribute("style", "display;");
          this.cc3.setAttribute("style", "display:none;");
        }
      }else{
      if(diaSeleccionado == '45 días'){
        if(this.cc2 != undefined && this.cc3 != undefined){
          this.cc2.setAttribute("style", "display;");
          this.cc3.setAttribute("style", "display;");
        }

        }
      }
      }
 }

 aceptar(){
  console.log(this.procesoFinal.requirioAyuda);
    if(this.procesoFinal.ordenPatronal == null || this.procesoFinal.ordenPatronal == undefined){
      this.open('focusFirst');
    }else{
      if(this.procesoFinal.requirioAyuda == null || this.procesoFinal.requirioAyuda == undefined ){
        this.open('focusFirst');
      }else{
        if(this.tamanoDocOrden >= 3676333){
          this.open('focusFirst');
        }else{
          this.getToken();
      }  
      }
     
}
}

onFileChanged(event:any) {
    const  fileUploadBodies = this.getBase64EncodedFileData(event.target.files[0].name);
    this.tamanoDocOrden = event.target.files[0].size;
    console.log(this.orden);
    console.log('Cuerpo del archivo: '+fileUploadBodies);
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
        console.log(reader.result);
      this.procesoFinal.ordenPatronal = reader.result;
      this.orden1 = this.procesoFinal.ordenPatronal;
      const dataOrden = this.orden1.split('base64,').pop();
      console.log('Salida orden: '+dataOrden);
      this.procesoFinal.ordenPatronal = dataOrden;
    };
    this.procesoFinal.ordenPatronalContentType = event.target.files[0].type;
    this.procesoFinal.ordenPatronalName = event.target.files[0].name;
}


onFileChangedCedula(event:any) {
  const  fileUploadBodies = this.getBase64EncodedFileData(event.target.files[0].name);
  this.tamanoDocCedula = event.target.files[0].size;
  console.log(this.cedula);
  console.log('Cuerpo del archivo: '+fileUploadBodies);
  const reader = new FileReader();
  reader.readAsDataURL(event.target.files[0]);
  reader.onload = () => {
      console.log(reader.result);
    this.procesoFinal.cedula = reader.result;
    this.cedula1 = this.procesoFinal.cedula;
    const dataCedula = this.orden1.split('base64,').pop();
    console.log('Salida orden: '+dataCedula);
    this.procesoFinal.cedula = dataCedula;
  };
  this.procesoFinal.cedulaContentType = event.target.files[0].type;
  this.procesoFinal.cedulaName = event.target.files[0].name;
}

getToken(){
    this.login=[];
    this.rest.getToken().subscribe((data: {})=>{
    console.log(data);
    this.login.push(data);
    this.sendFinalSolicitud(this.login);
    console.log(this.login);
  })
}


sendFinalSolicitud(datos:any []){
  this.ProcesandoSolicitudSucces = false;
  for(let l of datos) {
    this.token = l.access_token;
    console.log("SalidaToken: "+this.token);
  }
  this.rest.postFinalizarProcesoRayoPlus(this.token,this.procesoFinal).subscribe((data: {})=>{
    console.log(data);
    this.jsonEntranteJ = String(data);
    this.jsonEntrante.push(data);
    
    console.log('Json Salida Login: '+ this.jsonEntrante);
    for(let l of this.jsonEntrante) {
        console.log(l.salarioReportado);
        this.router.navigate(['success'],{state: {data:this.jsonEntrante}});
        
         }

    //if(this.codigoSalidaJson == '001'){
      //this.router.navigate(['step3Primerizos'],{state:{jsonEntrante}});
    //}

    

});
}

getBase64EncodedFileData(file: File): Observable<string> {
    return new Observable(observer => {
      const reader = new FileReader();
  
      reader.onload = () => {
        const { result } = reader;
        const data = result as ArrayBuffer; // <--- FileReader gives us the ArrayBuffer
        const base64Encoded = encode(data); // <--- convert ArrayBuffer to base64 string
  
        observer.next(base64Encoded);
        observer.complete();
      };
  
      reader.onerror = () => {
        observer.error(reader.error);
      };
  
      reader.readAsArrayBuffer(file);
    });
  }

open(name: string) {
    const modalSalida =  this.modalService.open(MODALS[name]);
    if((this.procesoFinal.ordenPatronal == null || this.procesoFinal.ordenPatronal == undefined  ) && (this.procesoFinal.requirioAyuda == null ||  this.procesoFinal.requirioAyuda == undefined )){
        modalSalida.componentInstance.mensaje1 = 'Para poder completar el proceso debes adjuntar una';
        modalSalida.componentInstance.mensaje2 = 'orden patronal';
        modalSalida.componentInstance.mensaje3 = 'Y debes seleccionar si ';
        modalSalida.componentInstance.mensaje4 = 'necesitaste ayuda durante el proceso o no';
      }else{
        if(this.procesoFinal.requirioAyuda == null || this.procesoFinal.requirioAyuda == undefined){
            modalSalida.componentInstance.mensaje1 = 'Para poder completar el proceso debes seleccionar si';
            modalSalida.componentInstance.mensaje2 = 'necesitaste ayuda durante el proceso o no';
            modalSalida.componentInstance.mensaje3 = '';
            modalSalida.componentInstance.mensaje4 = '';
          }else{
            if(this.procesoFinal.ordenPatronal == null || this.procesoFinal.ordenPatronal == undefined){
                modalSalida.componentInstance.mensaje1 = 'Para poder completar el proceso debes adjuntar una';
                modalSalida.componentInstance.mensaje2 = 'orden patronal';
                modalSalida.componentInstance.mensaje3 = '';
                modalSalida.componentInstance.mensaje4 = '';
              }else{
                  if(this.tamanoDocOrden >= 3676333){
                    modalSalida.componentInstance.mensaje1 = 'El documento de la orden patronal supera el tamaño establecido';
                    modalSalida.componentInstance.mensaje2 = 'favor selecionar un archivo menor a 3MB';
                    modalSalida.componentInstance.mensaje3 = 'Por favor selecciona un archivo ';
                    modalSalida.componentInstance.mensaje4 = 'mas pequeño';
                  }
                }
              }
              }
                      
                  }

}
