import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JsonSolicitudNew } from '../interfaces/json-solicitud-new';
import { JsonFinalSolicitudes } from '../interfaces/json-final-solicitudes';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-step3-primerizos',
  templateUrl: './step3-primerizos.component.html',
  styleUrls: ['./step3-primerizos.component.css'],
  inputs:['jsonEntrante']
})
export class Step3PrimerizosComponent implements OnInit {
  public monto:number|undefined;
  public interes:number|undefined;
  public tecno:number|undefined;
  public descuento:number|undefined;
  public total:number|undefined;
  public aval:number|undefined;
  public iva:number|undefined;
   public cc1 : HTMLElement | undefined;
  public cc2 : HTMLElement | undefined;
  public cc3 : HTMLElement | undefined;
  public fecha1: string | undefined;
  public fecha2: string | undefined;
  public fecha3: string | undefined;
  public Abono1: number | undefined;
  public Abono2: number | undefined;
  public Abono3: number | undefined;
  public servicioFE!: number;
  public Abono2Texto:string|undefined;
  public plazo:string|undefined;
  login: any = [];
  token : any;
  codigoSalidaJson:any;
  jsonEntrante:any = [];
  jsonEntranteJ:String = '';
  constructor(private _Activatedroute:ActivatedRoute,private router: Router,public rest:RestService) { }
data: JsonSolicitudNew = history.state.data;
@Input() procesoFinal = new JsonFinalSolicitudes();

  ngOnInit(): void {
    console.log(this.data.plazo);
    this.monto = Number(this.data.monto);
    this.interes = Number(this.data.interes);
    this.tecno =Number(this.data.tecno);
    this.descuento =Number(this.data.descuento);
    this.total = Number(this.data.totalPagar);
    this.aval = Number(this.data.aval);
    this.iva = Number(this.data.iva);
    this.servicioFE = Number(this.data.servicioFE);
    this.plazo = this.data.plazo;
    this.cc1 = document.getElementById('fecha1')!;
    this.cc2 = document.getElementById('fecha2')!;
    this.cc3 = document.getElementById('fecha3')!;
    this.ocultarTD(this.plazo);
    this.calculafechas(this.plazo,this.total);
    
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

calculafechas(diaSeleccionado:string,total:number){
  let today: Date = new Date();
   if(diaSeleccionado == '15'){
     this.fecha1 = this.firstDate(today);
     this.fecha2 = '';
     this.fecha3 = '';
     this.Abono1 = total;
   }else{
    if(diaSeleccionado == '30'){
     
      this.fecha1 = this.firstDate(today);
      this.fecha2 = this.secondDate(today);
      this.fecha3 = '';
      this.Abono1 = total/2;
      this.Abono2 = total/2;
      this.Abono2Texto = 'Abono final'
   }else{
    if(diaSeleccionado == '45'){
    
      this.fecha1 = this.firstDate(today);
      this.fecha2 = this.secondDate(today);
      this.fecha3 = this.thirdDate(today);
      this.Abono1 = total/3;
      this.Abono2 = total/3;
      this.Abono3 = total/3;
      this.Abono2Texto = 'Segundo Abono';
   }
   }
 }
 }
    ocultarTD(diaSeleccionado:string){
      if(diaSeleccionado == '15'){
        if(this.cc2 != undefined && this.cc3 != undefined){
          this.cc2.setAttribute("style", "display:none;");
          this.cc3.setAttribute("style", "display:none;");
        }
      }else{
        if(diaSeleccionado == '30'){
        if(this.cc2 != undefined && this.cc3 != undefined){
          this.cc2.setAttribute("style", "display;");
          this.cc3.setAttribute("style", "display:none;");
        }
      }else{
      if(diaSeleccionado == '45'){
        if(this.cc2 != undefined && this.cc3 != undefined){
          this.cc2.setAttribute("style", "display;");
          this.cc3.setAttribute("style", "display;");
        }

        }
      }
      }
}


aceptar(){
    
    this.getToken();
    
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
this.procesoFinal.Id = this._Activatedroute.snapshot.paramMap.get("idSolicitud");
  for(let l of datos) {
    this.token = l.access_token;
    console.log("SalidaToken: "+this.token);
  }
  this.rest.postFinalizarProceso(this.token,this.procesoFinal).subscribe((data: {})=>{
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

}
