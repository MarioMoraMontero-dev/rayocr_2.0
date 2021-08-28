import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-rayo-plus-solicitud',
  templateUrl: './rayo-plus-solicitud.component.html',
  styleUrls: ['./rayo-plus-solicitud.component.css'],
})
export class RayoPlusSolicitudComponent implements OnInit {
  constructor(
    private _Activatedroute: ActivatedRoute,
    public rest: RestService,
    private router: Router
  ) {}
  public valorSeleccionado!: number;
  public valorSolicitar!: number;
  public descuento!: number;
  public diaSeleccionado!: number;
  public numCuota!: string | undefined;
  public interes: number | undefined;
  public subtotal: number | undefined;
  public tecnologia: number | undefined;
  public servicioFE!: number;
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
  public cantidadPrestamosRPL!: number;
  public salarioReportado!: any;
  public cantidadDePrestamos!: any;
  public montosDisponibles: any = [];
  public mostrarDatos: Boolean | undefined;
  public ErrorAlCrearLaSolicitud!: boolean;
  public ProcesandoSolicitudSucces!: boolean;
  public catidadDePrestamosTotal: number | undefined;

  login: any = [];
  token: any;
  @Input() rayoPlus = { id: '', plazo: '', montoSolicitado: '' };
  jsonEntranteJ: String = '';
  ngOnInit(): void {
    this.mostrarDatos = true;
    this.numCuota = '2 cuotas';
    this.diaSeleccionado = 30;
    this.rayoPlus.id = String(
      this._Activatedroute.snapshot.paramMap.get('idusuario')
    );
    this.cantidadPrestamosRPL = Number(
      this._Activatedroute.snapshot.paramMap.get('cantidadPrestamosPlus')
    );
    this.cantidadDePrestamos = Number(
      this._Activatedroute.snapshot.paramMap.get('cantidadPrestamos')
    );
    this.generarMontosDisponibles();
    this.cc1 = document.getElementById('fecha1')!;
    this.cc2 = document.getElementById('fecha2')!;
    this.cc3 = document.getElementById('fecha3')!;
    this.catidadDePrestamosTotal = Number(this.cantidadDePrestamos);
    this.ProcesandoSolicitudSucces = true;
    this.ErrorAlCrearLaSolicitud = true;
  }

  generarMontosDisponibles() {
    console.log('Entro 1');
    this.salarioReportado = Number(
      this._Activatedroute.snapshot.paramMap.get('salarioReportado')
    );

    console.log(this.salarioReportado);
    if (this.salarioReportado >= 280000 && this.salarioReportado <= 349999) {
      console.log('Entro 2: ' + this.cantidadDePrestamos);
      if (this.cantidadDePrestamos >= 3) {
        console.log('Entro');
        this.montosDisponibles.push('30000', '35000');
      }
    } else {
      if (this.salarioReportado >= 350000 && this.salarioReportado <= 424999) {
        console.log('Entro 2');
        if (this.cantidadDePrestamos >= 4) {
          console.log('Entro');
          this.montosDisponibles.push('35000', '40000');
        }
      } else {
        if (
          this.salarioReportado >= 425000 &&
          this.salarioReportado <= 499999
        ) {
          console.log('Entro 2');
          if (this.cantidadDePrestamos >= 5) {
            console.log('Entro');
            this.montosDisponibles.push('40000', '45000');
          }
        } else {
          if (
            this.salarioReportado >= 500000 &&
            this.salarioReportado <= 574999
          ) {
            console.log('Entro 2');
            if (this.cantidadDePrestamos >= 5) {
              console.log('Entro');
              this.montosDisponibles.push('40000', '45000');
            }
          } else {
            if (
              this.salarioReportado >= 575000 &&
              this.salarioReportado <= 624999
            ) {
              console.log('Entro 2');
              if (this.cantidadDePrestamos >= 7) {
                console.log('Entro');
                this.montosDisponibles.push('45000', '50000');
              }
            } else {
              if (
                this.salarioReportado >= 625000 &&
                this.salarioReportado <= 699999
              ) {
                console.log('Entro 2');
                if (this.cantidadDePrestamos >= 7) {
                  console.log('Entro');
                  this.montosDisponibles.push('55000', '60000');
                }
              } else {
                if (
                  this.salarioReportado >= 700000 &&
                  this.salarioReportado <= 849999
                ) {
                  console.log('Entro 2');
                  if (this.cantidadDePrestamos >= 8) {
                    console.log('Entro');
                    this.montosDisponibles.push('80000', '85000');
                  }
                } else {
                  if (
                    this.salarioReportado >= 850000 &&
                    this.salarioReportado <= 1249999
                  ) {
                    console.log('Entro 2');
                    if (this.cantidadDePrestamos >= 8) {
                      console.log('Entro');
                      this.montosDisponibles.push('120000', '130000');
                    }
                  } else {
                    if (
                      this.salarioReportado >= 1250000 &&
                      this.salarioReportado <= 1749999
                    ) {
                      console.log('Entro 2');
                      if (this.cantidadDePrestamos >= 5) {
                        console.log('Entro');
                        this.montosDisponibles.push(
                          '120000',
                          '130000',
                          '140000'
                        );
                      }
                    } else {
                      if (this.salarioReportado >= 1750000) {
                        console.log('Entro 2');
                        if (this.cantidadDePrestamos >= 3) {
                          console.log('Entro');
                          this.montosDisponibles.push(
                            '120000',
                            '130000',
                            '140000',
                            '150000'
                          );
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
    }
  }
  desactivarMontos(valor: any) {
    console.log(valor);
    if (valor == 0 && this.cantidadPrestamosRPL >= 0) {
      return false;
    } else {
      if (valor == 1 && this.cantidadPrestamosRPL > 0) {
        return false;
      } else {
        if (valor == 2 && this.cantidadPrestamosRPL > 1) {
          return false;
        } else {
          if (valor == 3 && this.cantidadPrestamosRPL > 2) {
            return false;
          } else {
            if (valor == 4 && this.cantidadPrestamosRPL > 3) {
              return false;
            } else {
              if (valor == 5 && this.cantidadPrestamosRPL > 4) {
                return false;
              } else {
                return true;
              }
            }
          }
        }
      }
    }
  }

  colorDebotones(valor: any) {
    console.log(valor);
    let myStyles;
    if (valor == 0 && this.cantidadPrestamosRPL >= 0) {
      myStyles = {
        margin: '10px !important',
        'background-color:': 'orange !important',
      };

      return myStyles;
    } else {
      if (valor == 1 && this.cantidadPrestamosRPL > 0) {
        myStyles = {
          margin: '10px !important',
          'background-color:': 'orange !important',
        };

        return myStyles;
      } else {
        if (valor == 2 && this.cantidadPrestamosRPL > 1) {
          myStyles = {
            margin: '10px !important',
            'background-color:': 'orange !important',
          };

          return myStyles;
        } else {
          if (valor == 3 && this.cantidadPrestamosRPL > 2) {
            myStyles = {
              margin: '10px !important',
              'background-color:': 'orange !important',
            };

            return myStyles;
          } else {
            if (valor == 4 && this.cantidadPrestamosRPL > 3) {
              myStyles = {
                margin: '10px !important',
                'background-color:': 'orange !important',
              };

              return myStyles;
            } else {
              if (valor == 5 && this.cantidadPrestamosRPL > 4) {
                myStyles = {
                  margin: '10px !important',
                  'background-color:': 'orange !important',
                };

                return myStyles;
              } else {
                myStyles = {
                  margin: '10px !important',
                  'background-color:': 'gray !important',
                };

                return myStyles;
              }
            }
          }
        }
      }
    }
  }

  obtenervalor(valor: number) {
    this.valorSeleccionado = valor;
    this.mostrarDatos = false;
    this.calcularMontos();
  }

  calcularMontos() {
    console.log(this.diaSeleccionado);
    this.interes = this.getInteres(
      this.valorSeleccionado,
      this.diaSeleccionado
    );
    this.tecnologia = this.getTecnologia(
      this.valorSeleccionado,
      this.diaSeleccionado
    );
    if (this.catidadDePrestamosTotal == undefined) {
      this.catidadDePrestamosTotal = 0;
    }
    this.descuento = this.getDescuento(
      this.valorSeleccionado,
      this.diaSeleccionado,
      this.catidadDePrestamosTotal
    );
    this.servicioFE = this.tecnologia - this.descuento;
    this.aval = this.getAval(
      this.valorSeleccionado,
      this.catidadDePrestamosTotal
    );
    this.iva = this.getIva(this.tecnologia, this.aval, this.descuento);

    this.totalPagar =
      Number(this.valorSeleccionado) +
      Number(this.servicioFE) +
      Number(this.iva) +
      this.aval +
      this.interes;
    this.calculafechas(this.diaSeleccionado, this.totalPagar);
    this.ocultarFechas(this.diaSeleccionado);
    this.rayoPlus.montoSolicitado = String(this.valorSeleccionado);
    if (this.diaSeleccionado == 15) {
      this.rayoPlus.plazo = '15 días';
    } else {
      if (this.diaSeleccionado == 30) {
        this.rayoPlus.plazo = '30 días';
      } else {
        if (this.diaSeleccionado == 45) {
          this.rayoPlus.plazo = '45 días';
        }
      }
    }
    //
  }

  getTecnologia(montoSolicitado: number, plazo: any) {
    console.log(montoSolicitado);
    var tecno = 0;
    if (montoSolicitado == 30000 || montoSolicitado == 35000) {
      tecno = plazo * 700;
    } else {
      if (montoSolicitado >= 40000 && montoSolicitado <= 55000) {
        tecno = plazo * 900;
      } else {
        if (montoSolicitado >= 60000 && montoSolicitado <= 150000) {
          tecno = plazo * 1100;
        }
      }
    }
    return tecno;
  }

  getSubTotal(valorseleccionado: number, interes: number, tecnologia: number) {
    let salida =
      Number(valorseleccionado) + Number(interes) + Number(tecnologia);

    return salida;
  }

  getAval(cantidadsolicitada: number, cantidadPrestamos: number) {
    var pAval = 0;
    if (cantidadPrestamos < 12) {
      pAval = Math.round(cantidadsolicitada * 0.14);
    } else {
      pAval = Math.round(cantidadsolicitada * 0.16);
    }

    return pAval;
  }
  getIva(tecnologia: number, aval: number, descuento: number) {
    var pIva = (tecnologia - descuento + aval) * 0.13;
    return pIva;
  }

  getInteres(valorSolicitar: number, diaSeleccionado: number) {
    var interes = 0;
    if (diaSeleccionado == 15) {
      interes = ((valorSolicitar * 0.3) / 12 / 30) * diaSeleccionado;
    }
    if (diaSeleccionado == 30) {
      interes = ((valorSolicitar * 0.3) / 12 / 30) * diaSeleccionado;
    }
    if (diaSeleccionado == 45) {
      interes = ((valorSolicitar * 0.3) / 12 / 30) * diaSeleccionado;
    }
    return interes;
  }

  getDescuento(
    valorSolicitar: number,
    diaSeleccionado: number,
    cantidadPrestamosRayoPlus: number
  ) {
    var desc = 0;
    if (diaSeleccionado == 15) {
      if (valorSolicitar == 30000) {
        if (cantidadPrestamosRayoPlus >= 12) {
          return 7379;
        } else {
          if (cantidadPrestamosRayoPlus >= 3) {
            return 5453;
          }
        }
      } else {
        if (valorSolicitar == 35000) {
          if (cantidadPrestamosRayoPlus >= 12) {
            return 7923;
          } else {
            if (cantidadPrestamosRayoPlus >= 3) {
              return 5675;
            }
          }
        } else {
          if (valorSolicitar == 40000) {
            if (cantidadPrestamosRayoPlus >= 12) {
              return 9965;
            } else {
              if (cantidadPrestamosRayoPlus >= 3) {
                return 7395;
              }
            }
          } else {
            if (valorSolicitar == 45000) {
              if (cantidadPrestamosRayoPlus >= 12) {
                return 10465;
              } else {
                if (cantidadPrestamosRayoPlus >= 3) {
                  return 7895;
                }
              }
            } else {
              if (valorSolicitar == 50000) {
                if (cantidadPrestamosRayoPlus >= 12) {
                  return 10674;
                } else {
                  if (cantidadPrestamosRayoPlus >= 3) {
                    return 7462;
                  }
                }
              } else {
                if (valorSolicitar == 55000) {
                  if (cantidadPrestamosRayoPlus >= 12) {
                    return 11174;
                  } else {
                    if (cantidadPrestamosRayoPlus >= 3) {
                      return 7962;
                    }
                  }
                } else {
                  if (valorSolicitar == 60000) {
                    if (cantidadPrestamosRayoPlus >= 12) {
                      return 11674;
                    } else {
                      if (cantidadPrestamosRayoPlus >= 3) {
                        return 8462;
                      } //
                    }
                  } else {
                    if (valorSolicitar == 80000) {
                      if (cantidadPrestamosRayoPlus >= 12) {
                        return 13137;
                      } else {
                        if (cantidadPrestamosRayoPlus >= 3) {
                          return 8319;
                        }
                      }
                    } else {
                      if (valorSolicitar == 120000) {
                        if (cantidadPrestamosRayoPlus >= 12) {
                          return 12850;
                        } else {
                          if (cantidadPrestamosRayoPlus >= 3) {
                            return 6426;
                          }
                        }
                      } else {
                        if (valorSolicitar == 130000) {
                          if (cantidadPrestamosRayoPlus >= 12) {
                            return 13350;
                          } else {
                            if (cantidadPrestamosRayoPlus >= 3) {
                              return 6926;
                            }
                          }
                        } else {
                          if (valorSolicitar == 140000) {
                            if (cantidadPrestamosRayoPlus >= 12) {
                              return 13850;
                            } else {
                              if (cantidadPrestamosRayoPlus >= 3) {
                                return 7426;
                              }
                            }
                          } else {
                            if (valorSolicitar == 150000) {
                              if (cantidadPrestamosRayoPlus >= 12) {
                                return 14350;
                              } else {
                                if (cantidadPrestamosRayoPlus >= 3) {
                                  return 7926;
                                }
                              }
                            } else {
                              if (valorSolicitar == 85000) {
                                if (cantidadPrestamosRayoPlus >= 12) {
                                  return 13137;
                                } else {
                                  if (cantidadPrestamosRayoPlus >= 3) {
                                    return 8819;
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
              }
            }
          }
        }
      }
    } else {
      if (diaSeleccionado == 30) {
        if (valorSolicitar == 30000) {
          if (cantidadPrestamosRayoPlus >= 12) {
            return 11505;
          } else {
            if (cantidadPrestamosRayoPlus >= 3) {
              return 9580;
            }
          }
        } else {
          if (valorSolicitar == 35000) {
            if (cantidadPrestamosRayoPlus >= 12) {
              return 12047;
            } else {
              if (cantidadPrestamosRayoPlus >= 3) {
                return 9800;
              }
            }
          } else {
            if (valorSolicitar == 40000) {
              if (cantidadPrestamosRayoPlus >= 12) {
                return 15590;
              } else {
                if (cantidadPrestamosRayoPlus >= 3) {
                  return 13020;
                }
              }
            } else {
              if (valorSolicitar == 45000) {
                if (cantidadPrestamosRayoPlus >= 12) {
                  return 16090;
                } else {
                  if (cantidadPrestamosRayoPlus >= 3) {
                    return 13520;
                  }
                }
              } else {
                if (valorSolicitar == 50000) {
                  if (cantidadPrestamosRayoPlus >= 12) {
                    return 15925;
                  } else {
                    if (cantidadPrestamosRayoPlus >= 3) {
                      return 12713;
                    }
                  }
                } else {
                  if (valorSolicitar == 55000) {
                    if (cantidadPrestamosRayoPlus >= 12) {
                      return 16425;
                    } else {
                      if (cantidadPrestamosRayoPlus >= 3) {
                        return 13213;
                      }
                    }
                  } else {
                    if (valorSolicitar == 60000) {
                      if (cantidadPrestamosRayoPlus >= 12) {
                        return 16925;
                      } else {
                        if (cantidadPrestamosRayoPlus >= 3) {
                          return 13713;
                        }
                      }
                    } else {
                      if (valorSolicitar == 80000) {
                        if (cantidadPrestamosRayoPlus >= 12) {
                          return 17637;
                        } else {
                          if (cantidadPrestamosRayoPlus >= 3) {
                            return 12818;
                          }
                        }
                      } else {
                        if (valorSolicitar == 120000) {
                          if (cantidadPrestamosRayoPlus >= 12) {
                            return 14350;
                          } else {
                            if (cantidadPrestamosRayoPlus >= 3) {
                              return 7925;
                            }
                          }
                        } else {
                          if (valorSolicitar == 130000) {
                            if (cantidadPrestamosRayoPlus >= 12) {
                              return 14850;
                            } else {
                              if (cantidadPrestamosRayoPlus >= 3) {
                                return 8425;
                              }
                            }
                          } else {
                            if (valorSolicitar == 140000) {
                              if (cantidadPrestamosRayoPlus >= 12) {
                                return 15350;
                              } else {
                                if (cantidadPrestamosRayoPlus >= 3) {
                                  return 8925;
                                }
                              }
                            } else {
                              if (valorSolicitar == 150000) {
                                if (cantidadPrestamosRayoPlus >= 12) {
                                  return 15850;
                                } else {
                                  if (cantidadPrestamosRayoPlus >= 3) {
                                    return 9425;
                                  }
                                }
                              } else {
                                if (valorSolicitar == 85000) {
                                  if (cantidadPrestamosRayoPlus >= 12) {
                                    return 18137;
                                  } else {
                                    if (cantidadPrestamosRayoPlus >= 3) {
                                      return 13318;
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
                }
              }
            }
          }
        }
      } else {
        if (diaSeleccionado == 45) {
          if (valorSolicitar == 30000) {
            if (cantidadPrestamosRayoPlus >= 12) {
              return 15630;
            } else {
              if (cantidadPrestamosRayoPlus >= 3) {
                return 13702;
              }
            }
          } else {
            if (valorSolicitar == 35000) {
              if (cantidadPrestamosRayoPlus >= 12) {
                return 16172;
              } else {
                if (cantidadPrestamosRayoPlus >= 3) {
                  return 13926;
                }
              }
            } else {
              if (valorSolicitar == 40000) {
                if (cantidadPrestamosRayoPlus >= 12) {
                  return 21215;
                } else {
                  if (cantidadPrestamosRayoPlus >= 3) {
                    return 18645;
                  }
                }
              } else {
                if (valorSolicitar == 45000) {
                  if (cantidadPrestamosRayoPlus >= 12) {
                    return 21715;
                  } else {
                    if (cantidadPrestamosRayoPlus >= 3) {
                      return 19145;
                    }
                  }
                } else {
                  if (valorSolicitar == 50000) {
                    if (cantidadPrestamosRayoPlus >= 12) {
                      return 21175;
                    } else {
                      if (cantidadPrestamosRayoPlus >= 3) {
                        return 17964;
                      }
                    }
                  } else {
                    if (valorSolicitar == 55000) {
                      if (cantidadPrestamosRayoPlus >= 12) {
                        return 21675;
                      } else {
                        if (cantidadPrestamosRayoPlus >= 3) {
                          return 18464;
                        }
                      }
                    } else {
                      if (valorSolicitar == 60000) {
                        if (cantidadPrestamosRayoPlus >= 12) {
                          return 22175;
                        } else {
                          if (cantidadPrestamosRayoPlus >= 3) {
                            return 18964;
                          }
                        }
                      } else {
                        if (valorSolicitar == 80000) {
                          if (cantidadPrestamosRayoPlus >= 12) {
                            return 22137;
                          } else {
                            if (cantidadPrestamosRayoPlus >= 3) {
                              return 17319;
                            }
                          }
                        } else {
                          if (valorSolicitar == 120000) {
                            if (cantidadPrestamosRayoPlus >= 12) {
                              return 15849;
                            } else {
                              if (cantidadPrestamosRayoPlus >= 3) {
                                return 9426;
                              }
                            }
                          } else {
                            if (valorSolicitar == 130000) {
                              if (cantidadPrestamosRayoPlus >= 12) {
                                return 16349;
                              } else {
                                if (cantidadPrestamosRayoPlus >= 3) {
                                  return 9926;
                                }
                              }
                            } else {
                              if (valorSolicitar == 140000) {
                                if (cantidadPrestamosRayoPlus >= 12) {
                                  return 16849;
                                } else {
                                  if (cantidadPrestamosRayoPlus >= 3) {
                                    return 10426;
                                  }
                                }
                              } else {
                                if (valorSolicitar == 150000) {
                                  if (cantidadPrestamosRayoPlus >= 12) {
                                    return 17349;
                                  } else {
                                    if (cantidadPrestamosRayoPlus >= 3) {
                                      return 10926;
                                    }
                                  }
                                } else {
                                  if (valorSolicitar == 85000) {
                                    if (cantidadPrestamosRayoPlus >= 12) {
                                      return 22637;
                                    } else {
                                      if (cantidadPrestamosRayoPlus >= 3) {
                                        return 17819;
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
                  }
                }
              }
            }
          }
        }
      }
    }

    return 0;
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
          this.cc2.setAttribute('style', 'display;');
          this.cc3.setAttribute('style', 'display:none!important;');
        }
      } else {
        if (this.diaSeleccionado == 45) {
          this.Abono2Texto = 'Segundo Abono';
          if (this.cc2 != undefined && this.cc3 != undefined) {
            this.cc2.setAttribute('style', 'display;');
            this.cc3.setAttribute('style', 'display;');
          }
        }
      }
    }
  }

  getToken() {
    this.ProcesandoSolicitudSucces = false;
    this.login = [];
    this.rest.getToken().subscribe((data: {}) => {
      console.log(data);
      this.login.push(data);
      this.solicitudRayoPlus(this.login);
      console.log(this.login);
    });
  }

  solicitudRayoPlus(datos: any[]) {
    let jsonEntrante: any = [];
    for (let l of datos) {
      this.token = l.access_token;
      console.log('SalidaToken: ' + this.token);
    }
    this.rest
      .postSolicitudRayoPlus(this.token, this.rayoPlus)
      .subscribe((data: {}) => {
        console.log(data);
        this.jsonEntranteJ = String(data);
        jsonEntrante.push(data);

        console.log('Json Salida Login: ' + jsonEntrante);
        for (let l of jsonEntrante) {
          if (l.Estado == 'Error') {
            this.ProcesandoSolicitudSucces = true;
            this.ErrorAlCrearLaSolicitud = false;
          } else {
            if (l.Estado == 'Moroso') {
              this.router.navigate(['prestamoActivo']);
            } else {
              this.router.navigate(
                ['renovacionesRayoPlus/', this.rayoPlus.id, l.Id],
                {
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
                }
              );
            }
          }
        }
      });
  }
}
