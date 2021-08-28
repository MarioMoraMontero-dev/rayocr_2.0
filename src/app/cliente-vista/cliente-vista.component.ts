import { Component, OnInit, Input } from '@angular/core';
import { JsonLoginDatos, Prestamos } from '../interfaces/json-login-datos';
import { Router, ActivatedRoute } from '@angular/router';
import { RestService } from '../services/rest.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-cliente-vista',
  templateUrl: './cliente-vista.component.html',
  styleUrls: ['./cliente-vista.component.css'],
})
export class ClienteVistaComponent implements OnInit {
  public respuesta!: String;
  public data!: JsonLoginDatos[];
  public codigoPrestamo!: String;
  public fechadeposito!: String;
  public idContacto!: String;
  public fecha1!: String;
  public fecha2!: String;
  public fecha3!: String;
  public montoBruto!: String;
  public plazo!: String;
  public tecnologia!: String;
  public tipoDescuento!: String;
  public interes!: String;
  public descuento!: String;
  public totalAPagar!: String;
  public datosPago!: any[];
  public idCliente!: String;
  public ErrorAlCrearLaSolicitud!: boolean;
  public ProcesandoSolicitudSucces!: boolean;
  public DisponibleRayoPlus!: boolean;
  public salarioReportado!: String;
  public cantidadDePrestamos!: String;
  public cantidadPrestamosRPL!: String;
  login: any = [];
  token: any;
  public data2!: JsonLoginDatos[];

  jsonEntranteJ: String = '';
  jsonEntranteJ2: String = '';
  idC: any = [];
  @Input() loginValues = { email: '', pass: '', idCliente: '' };
  constructor(
    public rest: RestService,
    private router: Router,
    private spinnerService: NgxSpinnerService,
    private _Activatedroute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.DisponibleRayoPlus = true;
    this.loginValues.email = '';
    this.loginValues.pass = '';
    const contacto = localStorage.getItem('LoginContactId');
    if (contacto != null) {
      this.loginValues.idCliente = contacto;
      this.idCliente = contacto;
      this.getTokenLogin();
    } else {
      this.router.navigate(['login']);
      this.getTokenLogin();
    }

    this.ErrorAlCrearLaSolicitud = true;
    this.ProcesandoSolicitudSucces = true;
  }

  datosPrestamo(
    codigoPrestamox: String,
    fechadepositox: String,
    fecha1x: String,
    fecha2x: String,
    fecha3x: String,
    montoBrutox: String,
    plazox: String,
    tecnologiax: String,
    tipoDescuentox: String,
    interesx: String,
    descuentox: String,
    totalAPagarx: String
  ) {
    this.codigoPrestamo = codigoPrestamox;
    this.fechadeposito = fechadepositox;
    this.fecha1 = fecha1x;
    this.fecha2 = fecha2x;
    this.fecha3 = fecha3x;
    this.montoBruto = montoBrutox;
    this.plazo = plazox;
    this.tecnologia = tecnologiax;
    this.tipoDescuento = tipoDescuentox;
    this.interes = interesx;
    this.descuento = descuentox;
    this.totalAPagar = totalAPagarx;
    console.log('Testts: ' + this.codigoPrestamo);
  }

  datosDePagos(datos: String[]) {
    console.log(datos);
    this.datosPago = datos;
  }

  renovar(datos: any) {
    let jsonEntrante: any = [];
    for (let l of datos) {
      this.token = l.access_token;
      console.log('SalidaToken: ' + this.token);
    }
    this.rest
      .postRenovacion(this.token, this.idCliente, '', '', '', '', '')
      .subscribe((data: {}) => {
        console.log(data);
        jsonEntrante.push(data);
        for (let l of jsonEntrante) {
          if (l.Estado == 'Moroso') {
            this.router.navigate(['prestamoActivo']);
          } else {
            this.router.navigate(['renovaciones/', this.idCliente, l.Id], {
              state: {
                data: {
                  id: l.Id,
                  monto: l.monto,
                  interes: l.interes,
                  tecno: l.tecno,
                  descuento: l.descuento,
                  totalPagar: l.totalPagar,
                  plazo: l.plazo,
                  aval: l.aval,
                  iva: l.iva,
                  servicioFE: l.servicioFE,
                },
              },
            });
          }
        }
      });
  }

  getToken() {
    let paisT: String = '';
    let cantonT: String = '';
    let distritoT: String = '';
    let provinciaT: String = '';
    let direccionT: String = '';
    for (let d of this.data) {
      console.log('Pais: ' + d.pais);
      paisT = d.pais;
      cantonT = d.caton;
      distritoT = d.distrito;
      provinciaT = d.provincia;
      direccionT = d.direccionExacta;
    }
    if (
      paisT == '' ||
      paisT == null ||
      paisT == undefined ||
      provinciaT == '' ||
      provinciaT == null ||
      provinciaT == undefined ||
      cantonT == '' ||
      cantonT == null ||
      cantonT == undefined ||
      direccionT == '' ||
      direccionT == null ||
      direccionT == undefined ||
      distritoT == '' ||
      distritoT == null ||
      distritoT == undefined
    ) {
      let idConta = this.idCliente;
      this.router.navigate(['direccion/', idConta]);
    } else {
      this.login = [];
      this.rest.getToken().subscribe((data: {}) => {
        console.log(data);
        this.login.push(data);
        console.log(this.login);
        this.ProcesandoSolicitudSucces = false;
        this.renovar(this.login);
      });
    }
  }

  actualizarDireccion() {
    console.log('Click');
    let idConta = this.idCliente;
    this.router.navigate(['direccion/', idConta]);
  }

  getTokenLogin() {
    this.login = [];
    this.rest.getToken().subscribe((data: {}) => {
      console.log(data);
      this.login.push(data);
      this.loginCliente(this.login);
      this.vistaPagos(this.login);
      console.log(this.login);
    });
  }

  loginCliente(datos: any[]) {
    let jsonEntrante: any = [];
    for (let l of datos) {
      this.token = l.access_token;
      console.log('SalidaToken: ' + this.token);
    }
    this.rest.postlogin(this.token, this.loginValues).subscribe((data: {}) => {
      console.log(data);
      this.jsonEntranteJ = String(data);
      jsonEntrante.push(data);

      console.log('Json Salida Login: ' + jsonEntrante);
      for (let l of jsonEntrante) {
        if (l.codigoSalida == '002') {
          this.ErrorAlCrearLaSolicitud = false;
        } else {
          this.data = jsonEntrante;
        }

        if (l.DisponibleRPL == '1') {
          this.DisponibleRayoPlus = false;
        } else {
          this.DisponibleRayoPlus = true;
        }
      }
    });
  }

  goRayoplus() {
    let idConta = this.idCliente;
    for (let l of this.data) {
      this.salarioReportado = l.salarioReportado;
      this.cantidadDePrestamos = l.numPrestamosFirmados;
      this.cantidadPrestamosRPL = l.cantidadPrestamosRPLS;
    }
    this.router.navigate([
      'rayoplussolicitud/',
      this.cantidadPrestamosRPL,
      this.salarioReportado,
      idConta,
      this.cantidadDePrestamos,
    ]);
  }

  goVistaPagosRayoPlus() {
    let idConta = this.idCliente;
    this.router.navigate(['vistaPagosRayoPlus/', idConta]);
  }

  vistaPagos(datos: any[]) {
    let jsonEntrante2: any = [];
    for (let l of datos) {
      this.token = l.access_token;
      console.log('SalidaToken: ' + this.token);
    }
    this.rest
      .postvistaPagosRayoPL(this.token, this.loginValues)
      .subscribe((data: {}) => {
        console.log(data);
        this.jsonEntranteJ2 = String(data);
        jsonEntrante2.push(data);

        console.log('Json Salida Login: ' + jsonEntrante2);
        for (let l of jsonEntrante2) {
          if (l.codigoSalida == '002') {
          } else {
            this.data2 = jsonEntrante2;
          }
        }
      });
  }
}
