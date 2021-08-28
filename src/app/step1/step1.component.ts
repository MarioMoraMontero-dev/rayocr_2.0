import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.css'],
})
export class Step1Component implements OnInit {
  //
  constructor(private router: Router) {}
  public valorSolicitar!: number;
  public diaSeleccionado!: number;
  public numCuota!: string | undefined;
  public interes: number | undefined;
  public subtotal: number | undefined;
  public tecnologia: number | undefined;
  public aval: number | undefined;
  public iva: number | undefined;
  public totalPagar: number | undefined;
  public fecha1: string | undefined;
  public fecha2: string | undefined;
  public fecha3: string | undefined;
  public Abono1: number | undefined;
  public Abono2: number | undefined;
  public Abono3: number | undefined;
  public cc1: HTMLElement | undefined;
  public cc2: HTMLElement | undefined;
  public cc3: HTMLElement | undefined;
  public Abono2Texto: String | undefined;
  public Abono1Texto: String | undefined;

  ngOnInit(): void {
    this.cc1 = document.getElementById('1Row')!;
    this.cc2 = document.getElementById('2Row')!;
    this.cc3 = document.getElementById('3Row')!;
    this.valorSolicitar = 40000;
    this.diaSeleccionado = 30;
    this.numCuota = '2 cuotas';
    this.calculafechas(30, 64730.0);
    this.calcularMontos();
    this.ocultarFechas(30);
  }
  calcularMontos() {
    if (this.valorSolicitar == 55000) {
      this.valorSolicitar = 75000;
    } else {
      if (this.valorSolicitar == 60000) {
        this.valorSolicitar = 100000;
      } else {
        if (this.valorSolicitar == 45000) {
          this.valorSolicitar = 50000;
        }
      }
    }

    console.log(this.diaSeleccionado);
    this.interes = this.getInteres(this.valorSolicitar, this.diaSeleccionado);

    this.tecnologia = this.getTecnologia(
      this.valorSolicitar,
      this.diaSeleccionado
    );
    this.aval = this.getAval(this.valorSolicitar);
    this.iva = this.getIva(this.tecnologia + this.aval);
    this.subtotal =
      this.valorSolicitar +
      this.interes +
      this.tecnologia +
      this.aval +
      this.iva;

    this.totalPagar = this.subtotal;
    this.calculafechas(this.diaSeleccionado, this.totalPagar);
    this.ocultarFechas(this.diaSeleccionado);
  }

  getTecnologia(montoSolicitado: number, plazo: any) {
    var tecno = 0;
    if (montoSolicitado == 20000) {
      if (plazo == 15) {
        tecno = 15 * 250;
      } else {
        if (plazo == 30) {
          tecno = 30 * 250;
        } else {
          if (plazo == 45) {
            tecno = 45 * 250;
          }
        }
      }
    } else {
      if (montoSolicitado == 25000) {
        if (plazo == 15) {
          tecno = 15 * 400;
        } else {
          if (plazo == 30) {
            tecno = 30 * 400;
          } else {
            if (plazo == 45) {
              tecno = 45 * 400;
            }
          }
        }
      } else {
        if (montoSolicitado >= 30000 && montoSolicitado <= 35000) {
          if (plazo == 15) {
            tecno = 15 * 425;
          } else {
            if (plazo == 30) {
              tecno = 30 * 425;
            } else {
              if (plazo == 45) {
                tecno = 45 * 425;
              }
            }
          }
        } else {
          if (montoSolicitado == 40000) {
            if (plazo == 15) {
              tecno = 15 * 500;
            } else {
              if (plazo == 30) {
                tecno = 30 * 500;
              } else {
                if (plazo == 45) {
                  tecno = 45 * 500;
                }
              }
            }
          } else {
            if (montoSolicitado == 50000) {
              if (plazo == 15) {
                tecno = 15 * 550;
              } else {
                if (plazo == 30) {
                  tecno = 30 * 550;
                } else {
                  if (plazo == 45) {
                    tecno = 45 * 550;
                  }
                }
              }
            } else {
              if (montoSolicitado == 75000) {
                if (plazo == 15) {
                  tecno = 15 * 800;
                } else {
                  if (plazo == 30) {
                    tecno = 30 * 800;
                  } else {
                    if (plazo == 45) {
                      tecno = 45 * 800;
                    }
                  }
                }
              } else {
                if (montoSolicitado == 100000) {
                  if (plazo == 15) {
                    tecno = 15 * 1000;
                  } else {
                    if (plazo == 30) {
                      tecno = 30 * 1000;
                    } else {
                      if (plazo == 45) {
                        tecno = 45 * 1000;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    return tecno;
  }
  getAval(valorsolicitado: number) {
    var pAval = Math.round(valorsolicitado * 0.06);
    return pAval;
  }
  getIva(tecnologia: number) {
    var pIva = Math.round(tecnologia * 0.13);
    return pIva;
  }

  getInteres(valorSolicitar: number, diaSeleccionado: number) {
    var interes = 0;
    if (diaSeleccionado == 15) {
      switch (valorSolicitar) {
        case 20000:
          interes = 250;
          return 250;
        case 25000:
          interes = 312.5;
          return 312.5;
        case 30000:
          interes = 375;
          return 375;
        case 35000:
          interes = 437.5;
          return 437.5;
        case 40000:
          interes = 500;
          return 500;
        case 50000:
          interes = 625;
          return 625;
        case 75000:
          interes = 937.5;
          return 937.5;
        case 100000:
          interes = 1250;
          return 1250;
      }
    }
    if (diaSeleccionado == 30) {
      switch (valorSolicitar) {
        case 20000:
          interes = 500;
          return 500;
        case 25000:
          interes = 625;
          return 625;
        case 30000:
          interes = 750;
          return 750;
        case 35000:
          interes = 875;
          return 875;
        case 40000:
          interes = 1000;
          return 1000;
        case 50000:
          interes = 1250;
          return 1250;
        case 75000:
          interes = 1875;
          return 1875;
        case 100000:
          interes = 2500;
          return 2500;
      }
    }
    if (diaSeleccionado == 45) {
      switch (valorSolicitar) {
        case 20000:
          interes = 750;
          return 750;
        case 25000:
          interes = 937.5;
          return 937.5;
        case 30000:
          interes = 1125;
          return 1125;
        case 35000:
          interes = 1312.5;
          return 1312.5;
        case 40000:
          interes = 1500;
          return 1500;
        case 50000:
          interes = 1875;
          return 1875;
        case 75000:
          interes = 2812.5;
          return 2812.5;
        case 100000:
          interes = 3750;
          return 3750;
      }
    }
    return interes;
  }

  calculafechas(diaSeleccionado: number, total: number) {
    let today: Date = new Date();
    if (diaSeleccionado == 15) {
      this.numCuota = '1 cuota';
      this.fecha1 = this.firstDate(today);
      this.fecha2 = '';
      this.fecha3 = '';
      this.Abono1 = total;
      this.Abono1Texto = 'Abono Unico';
    } else {
      if (this.diaSeleccionado == 30) {
        this.numCuota = '2 cuotas';
        this.fecha1 = this.firstDate(today);
        this.fecha2 = this.secondDate(today);
        this.fecha3 = '';
        this.Abono1 = total / 2;
        this.Abono2 = total / 2;
        this.Abono2Texto = 'Abono';
        this.Abono1Texto = 'Primer Abono';
      } else {
        if (this.diaSeleccionado == 45) {
          this.numCuota = '3 cuotas';
          this.fecha1 = this.firstDate(today);
          this.fecha2 = this.secondDate(today);
          this.fecha3 = this.thirdDate(today);
          this.Abono1 = total / 3;
          this.Abono2 = total / 3;
          this.Abono3 = total / 3;
          this.Abono1Texto = 'Primer Abono';
        }
      }
    }
  }
  firstDate(tdate: Date) {
    var day: number = tdate.getDate();
    var month: number = tdate.getMonth() + 1;
    var year: number = tdate.getFullYear();
    var newDate;
    if (day >= 1 && day <= 6) {
      newDate = '15' + '/' + month + '/' + year;
    } else if (day >= 7 && day <= 21) {
      if (month == 2) {
        newDate = '28' + '/' + 2 + '/' + year;
      } else {
        newDate = '30' + '/' + month + '/' + year;
      }
    } else if (day >= 22 && day <= 31) {
      month = month + 1;
      if (month == 13) {
        month = 1;
        year = year + 1;
        newDate = '15' + '/' + month + '/' + year;
      } else {
        newDate = '15' + '/' + month + '/' + year;
      }
    }
    return newDate;
  }

  secondDate(tdate: Date) {
    var day = tdate.getDate();
    var month = tdate.getMonth() + 1;
    var year = tdate.getFullYear();
    var newDate2;

    if (day >= 1 && day <= 6) {
      newDate2 = '30' + '/' + month + '/' + year;
    } else if (day >= 7 && day <= 21) {
      if (month == 2) {
        newDate2 = 15 + '/' + 3 + '/' + year;
      } else {
        month = month + 1;
        if (month == 13) {
          month = 1;
          year = year + 1;
          newDate2 = 15 + '/' + month + '/' + year;
        } else {
          newDate2 = 15 + '/' + month + '/' + year;
        }
      }
    } else if (day >= 22 && day <= 31) {
      month = month + 1;
      if (month == 13) {
        month = 1;
        year = year + 1;
        newDate2 = 30 + '/' + month + '/' + year;
      } else {
        newDate2 = 30 + '/' + month + '/' + year;
      }
    }
    return newDate2;
  }
  thirdDate(tdate: Date) {
    var day = tdate.getDate();
    var month = tdate.getMonth() + 1;
    var year = tdate.getFullYear();
    var newDate3;
    if (day >= 1 && day <= 6) {
      month = month + 1;
      if (month == 13) {
        month = 1;
        year = year + 1;
        newDate3 = '15' + '/' + month + '/' + year;
      } else {
        newDate3 = '15' + '/' + month + '/' + year;
      }
    } else if (day >= 7 && day <= 21) {
      if (month == 2) {
        newDate3 = 30 + '/' + 3 + '/' + year;
      } else {
        month = month + 1;
        if (month == 13) {
          month = 1;
          year = year + 1;
          newDate3 = 30 + '/' + month + '/' + year;
        } else if (month == 1) {
          newDate3 = 28 + '/' + 2 + '/' + year;
        } else {
          newDate3 = 30 + '/' + month + '/' + year;
        }
        newDate3 = 30 + '/' + month + '/' + year;
      }
    } else if (day >= 22 && day <= 31) {
      month = month + 2;
      if (month == 13) {
        month = 1;
        year = year + 1;
        newDate3 = 15 + '/' + month + '/' + year;
      } else {
        newDate3 = 15 + '/' + month + '/' + year;
      }
    }
    return newDate3;
  }

  ocultarFechas(diaSeleccionado: number) {
    if (diaSeleccionado == 15) {
      if (this.cc2 != undefined && this.cc3 != undefined) {
        this.cc2.setAttribute('style', 'display:none!important;');
        this.cc3.setAttribute('style', 'display:none!important;');
      }
    } else {
      if (this.diaSeleccionado == 30) {
        this.Abono2Texto = 'Abono final';
        if (this.cc2 != undefined && this.cc3 != undefined) {
          this.cc2.setAttribute('style', 'display;font-size:14px;');
          this.cc3.setAttribute('style', 'display:none!important;');
        }
      } else {
        if (this.diaSeleccionado == 45) {
          this.Abono2Texto = 'Segundo Abono';
          if (this.cc2 != undefined && this.cc3 != undefined) {
            this.cc2.setAttribute('style', 'display;font-size:14px;');
            this.cc3.setAttribute('style', 'display;font-size:14px;');
          }
        }
      }
    }
  }

  goStep2() {
    this.router.navigate(['step2/', this.diaSeleccionado, this.valorSolicitar]);
  }
}
