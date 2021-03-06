import { Component, OnInit, Input } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
} from '@angular/forms';
import { JsonDireccioCliente } from '../interfaces/json-direccion-cliente';
import { debounceTime } from 'rxjs/operators';
import { RestService } from '../services/rest.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { JsonLoginDatos } from '../interfaces/json-login-datos';
import { UsernameValidator } from '../services/validaciones.service';

@Component({
  selector: 'app-step-direccion',
  templateUrl: './step-direccion.component.html',
  styleUrls: ['./step-direccion.component.css'],
})
export class StepDireccionComponent implements OnInit {
  @Input() direcCliente = new JsonDireccioCliente();
  form!: FormGroup;
  paisValores: string[] = ['--Seleccione un valor --', 'Costa Rica'];
  provinciaValores: string[] = [];
  cantonValores: string[] = [];
  distritoValores: string[] = [];
  public pais: string | undefined;
  public provincia: string | undefined;
  public canton: string | undefined;
  public distrito: string | undefined;
  public ErrorAlCrearLaSolicitud!: boolean;
  public ProcesandoSolicitudSucces!: boolean;
  public PaisSinSeleccionar: boolean | undefined;
  login: any = [];
  token: any;
  jsonEntrante: any = [];
  jsonEntranteJ: String = '';
  idC: any = [];
  public data!: JsonLoginDatos[];
  public idCliente!: String;
  constructor(
    private formBuilder: FormBuilder,
    public rest: RestService,
    private router: Router,
    private spinnerService: NgxSpinnerService,
    private _Activatedroute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.ErrorAlCrearLaSolicitud = true;
    this.ProcesandoSolicitudSucces = true;
    this.pais == '--Seleccione un valor --';
    this.PaisSinSeleccionar = true;
  }

  provincias() {
    if (this.pais == 'Costa Rica') {
      this.canton = '';
      this.distrito = '';

      this.provinciaValores.push(
        '-Seleccione un valor-',
        'Alajuela',
        'Cartago',
        'Guanacaste',
        'Heredia',
        'Lim??n',
        'Puntarenas',
        'San Jos??'
      );
    }
  }

  cantones() {
    this.cantonValores = [];
    this.distritoValores = [];
    this.canton = '';
    this.distrito = '';
    if (this.provincia == 'San Jos??') {
      this.cantonValores.push(
        '-Seleccione un valor-',
        'San Jos??',
        'Escaz??',
        'Desamparados',
        'Puriscal',
        'Tarraz??',
        'Aserr??',
        'Mora',
        'Goicoechea',
        'Alajuelita',
        'V??squez de Coronado',
        'Santa Ana',
        'Acosta',
        'Tib??s',
        'Moravia',
        'Montes de Oca',
        'Turrubares',
        'Dota',
        'Curridabat',
        'P??rez Zeled??n',
        'Le??n Cort??z Castro'
      );
    } else {
      if (this.provincia == 'Alajuela') {
        this.cantonValores.push(
          '-Seleccione un valor-',
          'Alajuela',
          'San Ram??n',
          'Grecia',
          'San Mateo',
          'Atenas',
          'Naranjo',
          'Palmares',
          'Po??s',
          'Orotina',
          'San Carlos',
          'Zarcero',
          'Valverde Vega',
          'Upala',
          'Los Chiles',
          'Guatuso'
        );
      } else {
        if (this.provincia == 'Cartago') {
          this.cantonValores.push(
            '-Seleccione un valor-',
            'Cartago',
            'Para??so',
            'La Uni??n',
            'Jim??nez',
            'Turrialba',
            'Alvarado',
            'Oreamuno',
            'El Guarco'
          );
        } else {
          if (this.provincia == 'Guanacaste') {
            this.cantonValores.push(
              '-Seleccione un valor-',
              'Liberia',
              'Nicoya',
              'Santa Cruz',
              'Bagaces',
              'Carrillo',
              'Ca??as',
              'Abang??res',
              'Tilar??n',
              'Nandayure',
              'La Cruz',
              'Hojancha'
            );
          } else {
            if (this.provincia == 'Heredia') {
              this.cantonValores.push(
                '-Seleccione un valor-',
                'Heredia',
                'Barva',
                'Santo Domingo',
                'Santa B??rbara',
                'San Rafa??l',
                'San Isidro',
                'Bel??n',
                'Flores',
                'San Pablo',
                'Sarapiqu??'
              );
            } else {
              if (this.provincia == 'Lim??n') {
                this.cantonValores.push(
                  '-Seleccione un valor-',
                  'Pococ??',
                  'Siquirres',
                  'Talamanca',
                  'Matina',
                  'Gu??cimo',
                  'Lim??n'
                );
              } else {
                if (this.provincia == 'Puntarenas') {
                  this.cantonValores.push(
                    '-Seleccione un valor-',
                    'Puntarenas',
                    'Esparza',
                    'Buenos Aires',
                    'Montes de Oro',
                    'Osa',
                    'Aguirre',
                    'Golfito',
                    'Coto Brus',
                    'Parrita',
                    'Corredores',
                    'Garabito'
                  );
                }
              }
            }
          }
        }
      }
    }
  }

  distritos() {
    this.distrito = '';
    this.distritoValores = [];
    if (this.canton == 'Abang??res') {
      this.distritoValores.push(
        '-Seleccione un valor-',
        'LAS JUNTAS',
        'SIERRA',
        'SAN JUAN',
        'COLORADO'
      );
    } else {
      if (this.canton == 'Acosta') {
        this.distritoValores.push(
          '-Seleccione un valor-',
          'GUAITIL Villa',
          'PALMICHAL',
          'CANGREJAL',
          'SAN IGNACIO',
          'SABANILLAS'
        );
      } else {
        if (this.canton == 'Aguirre') {
          this.distritoValores.push(
            '-Seleccione un valor-',
            'QUEPOS',
            'SAVEGRE',
            'NARANJITO'
          );
        } else {
          if (this.canton == 'Alajuela') {
            this.distritoValores.push(
              '-Seleccione un valor-',
              'ALAJUELA',
              'SAN JOS??',
              'CARRIZAL',
              'SAN ANTONIO',
              'GU??CIMA',
              'SAN ISIDRO',
              'SABANILLA',
              'SAN RAFAEL',
              'R??O SEGUNDO',
              'DESAMPARADOS',
              'TAMBOR',
              'GARITA',
              'SARAPIQU??',
              'TURR??CARES'
            );
          } else {
            if (this.canton == 'Alajuelita') {
              this.distritoValores.push(
                '-Seleccione un valor-',
                'ALAJUELITA',
                'SAN JOSECITO',
                'SAN ANTONIO',
                'CONCEPCI??N',
                'SAN FELIPE'
              );
            } else {
              if (this.canton == 'Alvarado') {
                this.distritoValores.push(
                  '-Seleccione un valor-',
                  'PACAYAS',
                  'CERVANTES',
                  'CAPELLADES'
                );
              } else {
                if (this.canton == 'Aserr??') {
                  this.distritoValores.push(
                    '-Seleccione un valor-',
                    'ASERRI',
                    'TARBACA',
                    'VUELTA DE JORCO',
                    'SAN GABRIEL',
                    'LEGUA',
                    'MONTERREY',
                    'SALITRILLOS'
                  );
                } else {
                  if (this.canton == 'Atenas') {
                    this.distritoValores.push(
                      '-Seleccione un valor-',
                      'ATENAS',
                      'JES??S',
                      'MERCEDES',
                      'SAN ISIDRO',
                      'CONCEPCI??N',
                      'SAN JOSE',
                      'SANTA EULALIA',
                      'ESCOBAL'
                    );
                  } else {
                    if (this.canton == 'Bagaces') {
                      this.distritoValores.push(
                        '-Seleccione un valor-',
                        'BAGACES',
                        'LA FORTUNA',
                        'MOGOTE',
                        'R??O NARANJO'
                      );
                    } else {
                      if (this.canton == 'Bagaces') {
                        this.distritoValores.push(
                          '-Seleccione un valor-',
                          'BARVA',
                          'SAN PEDRO',
                          'SAN PABLO',
                          'SAN ROQUE',
                          'SANTA LUC??A',
                          'SAN JOS?? DE LA MONTA??A'
                        );
                      } else {
                        if (this.canton == 'Bel??n') {
                          this.distritoValores.push(
                            '-Seleccione un valor-',
                            'SAN ANTONIO',
                            'LA RIBERA',
                            'LA ASUNCI??N'
                          );
                        } else {
                          if (this.canton == 'Buenos Aires') {
                            this.distritoValores.push(
                              '-Seleccione un valor-',
                              'BUENOS AIRES',
                              'VOLC??N',
                              'POTRERO GRANDE',
                              'BORUCA',
                              'PILAS',
                              'COLINAS',
                              'CH??NGUENA',
                              'BIOLLEY',
                              'BRUNKA'
                            );
                          } else {
                            if (this.canton == 'Ca??as') {
                              this.distritoValores.push(
                                '-Seleccione un valor-',
                                'CA??AS',
                                'PALMIRA',
                                'SAN MIGUEL',
                                'BEBEDERO',
                                'POROZAL'
                              );
                            } else {
                              if (this.canton == 'Carrillo') {
                                this.distritoValores.push(
                                  '-Seleccione un valor-',
                                  'FILADELFIA',
                                  'PALMIRA',
                                  'SARDINAL',
                                  'BEL??N'
                                );
                              } else {
                                if (this.canton == 'Cartago') {
                                  this.distritoValores.push(
                                    '-Seleccione un valor-',
                                    'ORIENTAL',
                                    'OCCIDENTAL',
                                    'CARMEN',
                                    'SAN NICOL??S',
                                    'AGUACALIENTE o SAN FRANCISCO',
                                    'GUADALUPE o ARENILLA',
                                    'LLANO GRANDE',
                                    'QUEBRADILLA',
                                    'CORRALILLO',
                                    'TIERRA BLANCA',
                                    'DULCE NOMBRE'
                                  );
                                } else {
                                  if (this.canton == 'Corredores') {
                                    this.distritoValores.push(
                                      '-Seleccione un valor-',
                                      'CORREDOR',
                                      'LA CUESTA',
                                      'CANOAS',
                                      'LAUREL'
                                    );
                                  } else {
                                    if (this.canton == 'Coto Brus') {
                                      this.distritoValores.push(
                                        '-Seleccione un valor-',
                                        'SAN VITO',
                                        'SABALITO',
                                        'AGUABUENA',
                                        'LIMONCITO',
                                        'PITTIER',
                                        'GUTIERREZ BRAUN'
                                      );
                                    } else {
                                      if (this.canton == 'Curridabat') {
                                        this.distritoValores.push(
                                          '-Seleccione un valor-',
                                          'CURRIDABAT',
                                          'GRANADILLA',
                                          'S??NCHEZ',
                                          'TIRRASES'
                                        );
                                      } else {
                                        if (this.canton == 'Desamparados') {
                                          this.distritoValores.push(
                                            '-Seleccione un valor-',
                                            'DESAMPARADOS',
                                            'SAN MIGUEL',
                                            'SAN JUAN DE DIOS',
                                            'SAN RAFAEL ARRIBA',
                                            'SAN ANTONIO',
                                            'FRAILES',
                                            'PATARR??',
                                            'SAN CRIST??BAL',
                                            'ROSARIO',
                                            'DAMAS',
                                            'SAN RAFAEL ABAJO',
                                            'GRAVILIAS',
                                            'LOS GUIDO'
                                          );
                                        } else {
                                          if (this.canton == 'Dota') {
                                            this.distritoValores.push(
                                              '-Seleccione un valor-',
                                              'SANTA MAR??A',
                                              'JARD??N',
                                              'COPEY'
                                            );
                                          } else {
                                            if (this.canton == 'El Guarco') {
                                              this.distritoValores.push(
                                                '-Seleccione un valor-',
                                                'EL TEJAR',
                                                'SAN ISIDRO',
                                                'TOBOSI',
                                                'PATIO DE AGUA'
                                              );
                                            } else {
                                              if (this.canton == 'Escaz??') {
                                                this.distritoValores.push(
                                                  '-Seleccione un valor-',
                                                  'ESCAZ??',
                                                  'SAN ANTONIO',
                                                  'SAN RAFAEL'
                                                );
                                              } else {
                                                if (this.canton == 'Esparza') {
                                                  this.distritoValores.push(
                                                    '-Seleccione un valor-',
                                                    'ESP??RITU SANTO',
                                                    'SAN JUAN GRANDE',
                                                    'MACACONA',
                                                    'SAN RAFAEL',
                                                    'SAN JER??NIMO',
                                                    'CALDERA'
                                                  );
                                                } else {
                                                  if (this.canton == 'Flores') {
                                                    this.distritoValores.push(
                                                      '-Seleccione un valor-',
                                                      'SAN JOAQU??N',
                                                      'BARRANTES',
                                                      'LLORENTE'
                                                    );
                                                  } else {
                                                    if (
                                                      this.canton == 'Garabito'
                                                    ) {
                                                      this.distritoValores.push(
                                                        '-Seleccione un valor-',
                                                        'JAC??',
                                                        'T??RCOLES'
                                                      );
                                                    } else {
                                                      if (
                                                        this.canton ==
                                                        'Goicoechea'
                                                      ) {
                                                        this.distritoValores.push(
                                                          '-Seleccione un valor-',
                                                          'GUADALUPE',
                                                          'SAN FRANCISCO',
                                                          'CALLE BLANCOS',
                                                          'MATA DE PL??TANO',
                                                          'IP??S',
                                                          'RANCHO REDONDO',
                                                          'PURRAL'
                                                        );
                                                      } else {
                                                        if (
                                                          this.canton ==
                                                          'Golfito'
                                                        ) {
                                                          this.distritoValores.push(
                                                            '-Seleccione un valor-',
                                                            'GOLFITO',
                                                            'PUERTO JIM??NEZ',
                                                            'GUAYCAR??',
                                                            'PAV??N'
                                                          );
                                                        } else {
                                                          if (
                                                            this.canton ==
                                                            'Grecia'
                                                          ) {
                                                            this.distritoValores.push(
                                                              '-Seleccione un valor-',
                                                              'GRECIA',
                                                              'SAN ISIDRO',
                                                              'SAN JOS??',
                                                              'SAN ROQUE',
                                                              'TACARES',
                                                              'R??O CUARTO',
                                                              'PUENTE DE PIEDRA',
                                                              'BOL??VAR'
                                                            );
                                                          } else {
                                                            if (
                                                              this.canton ==
                                                              'Gu??cimo'
                                                            ) {
                                                              this.distritoValores.push(
                                                                '-Seleccione un valor-',
                                                                'GU??CIMO',
                                                                'MERCEDES',
                                                                'POCORA',
                                                                'R??O JIM??NEZ',
                                                                'DUACAR??'
                                                              );
                                                            } else {
                                                              if (
                                                                this.canton ==
                                                                'Guatuso'
                                                              ) {
                                                                this.distritoValores.push(
                                                                  '-Seleccione un valor-',
                                                                  'BUENAVISTA',
                                                                  'COTE',
                                                                  'KATIRA'
                                                                );
                                                              } else {
                                                                if (
                                                                  this.canton ==
                                                                  'Heredia'
                                                                ) {
                                                                  this.distritoValores.push(
                                                                    '-Seleccione un valor-',
                                                                    'HEREDIA',
                                                                    'SAN FRANCISCO',
                                                                    'ULLOA',
                                                                    'VARABLANCA',
                                                                    'MERCEDES'
                                                                  );
                                                                } else {
                                                                  if (
                                                                    this
                                                                      .canton ==
                                                                    'Hojancha'
                                                                  ) {
                                                                    this.distritoValores.push(
                                                                      '-Seleccione un valor-',
                                                                      'HOJANCHA',
                                                                      'MONTE ROMO',
                                                                      'PUERTO CARRILLO',
                                                                      'HUACAS'
                                                                    );
                                                                  } else {
                                                                    if (
                                                                      this
                                                                        .canton ==
                                                                      'Jim??nez'
                                                                    ) {
                                                                      this.distritoValores.push(
                                                                        '-Seleccione un valor-',
                                                                        'JUAN VI??AS',
                                                                        'TUCURRIQUE',
                                                                        'PEJIBAYE'
                                                                      );
                                                                    } else {
                                                                      if (
                                                                        this
                                                                          .canton ==
                                                                        'La Cruz'
                                                                      ) {
                                                                        this.distritoValores.push(
                                                                          '-Seleccione un valor-',
                                                                          'LA CRUZ',
                                                                          'SANTA CECILIA',
                                                                          'LA GARITA',
                                                                          'SANTA ELENA'
                                                                        );
                                                                      } else {
                                                                        if (
                                                                          this
                                                                            .canton ==
                                                                          'La Uni??n'
                                                                        ) {
                                                                          this.distritoValores.push(
                                                                            '-Seleccione un valor-',
                                                                            'TRES R??OS',
                                                                            'SAN DIEGO',
                                                                            'SAN JUAN',
                                                                            'SAN RAFAEL',
                                                                            'CONCEPCI??N',
                                                                            'DULCE NOMBRE',
                                                                            'SAN RAM??N',
                                                                            'R??O AZUL'
                                                                          );
                                                                        } else {
                                                                          if (
                                                                            this
                                                                              .canton ==
                                                                            'Le??n Cort??z Castro'
                                                                          ) {
                                                                            this.distritoValores.push(
                                                                              '-Seleccione un valor-',
                                                                              'SAN PABLO',
                                                                              'SAN ANDR??S',
                                                                              'LLANO BONITO',
                                                                              'SAN ISIDRO',
                                                                              'SANTA CRUZ',
                                                                              'SAN ANTONIO'
                                                                            );
                                                                          } else {
                                                                            if (
                                                                              this
                                                                                .canton ==
                                                                              'Liberia'
                                                                            ) {
                                                                              this.distritoValores.push(
                                                                                '-Seleccione un valor-',
                                                                                'LIBERIA',
                                                                                'CA??AS DULCES',
                                                                                'NACASCOLO',
                                                                                'CURUBAND??',
                                                                                'MAYORGA'
                                                                              );
                                                                            } else {
                                                                              if (
                                                                                this
                                                                                  .canton ==
                                                                                'Lim??n'
                                                                              ) {
                                                                                this.distritoValores.push(
                                                                                  '-Seleccione un valor-',
                                                                                  'LIM??N',
                                                                                  'VALLE LA ESTRELLA',
                                                                                  'MATAMA'
                                                                                );
                                                                              } else {
                                                                                if (
                                                                                  this
                                                                                    .canton ==
                                                                                  'Los Chiles'
                                                                                ) {
                                                                                  this.distritoValores.push(
                                                                                    '-Seleccione un valor-',
                                                                                    'LOS CHILES',
                                                                                    'CA??O NEGRO',
                                                                                    'EL AMPARO',
                                                                                    'SAN JORGE'
                                                                                  );
                                                                                } else {
                                                                                  if (
                                                                                    this
                                                                                      .canton ==
                                                                                    'Matina'
                                                                                  ) {
                                                                                    this.distritoValores.push(
                                                                                      '-Seleccione un valor-',
                                                                                      'MATINA',
                                                                                      'BAT??N',
                                                                                      'CARRANDI'
                                                                                    );
                                                                                  } else {
                                                                                    if (
                                                                                      this
                                                                                        .canton ==
                                                                                      'Montes de Oca'
                                                                                    ) {
                                                                                      this.distritoValores.push(
                                                                                        '-Seleccione un valor-',
                                                                                        'SAN PEDRO',
                                                                                        'SABANILLA',
                                                                                        'MERCEDES',
                                                                                        'SAN RAFAEL'
                                                                                      );
                                                                                    } else {
                                                                                      if (
                                                                                        this
                                                                                          .canton ==
                                                                                        'Montes de Oro'
                                                                                      ) {
                                                                                        this.distritoValores.push(
                                                                                          '-Seleccione un valor-',
                                                                                          'MIRAMAR',
                                                                                          'LA UNI??N',
                                                                                          'SAN ISIDRO'
                                                                                        );
                                                                                      } else {
                                                                                        if (
                                                                                          this
                                                                                            .canton ==
                                                                                          'Mora'
                                                                                        ) {
                                                                                          this.distritoValores.push(
                                                                                            '-Seleccione un valor-',
                                                                                            'COL??N',
                                                                                            'GUAYABO',
                                                                                            'TABARCIA',
                                                                                            'PIEDRAS NEGRAS',
                                                                                            'PICAGRES',
                                                                                            'JARIS',
                                                                                            'QUITIRRISI'
                                                                                          );
                                                                                        } else {
                                                                                          if (
                                                                                            this
                                                                                              .canton ==
                                                                                            'Moravia'
                                                                                          ) {
                                                                                            this.distritoValores.push(
                                                                                              '-Seleccione un valor-',
                                                                                              'SAN VICENTE',
                                                                                              'SAN JER??NIMO',
                                                                                              'LA TRINIDAD'
                                                                                            );
                                                                                          } else {
                                                                                            if (
                                                                                              this
                                                                                                .canton ==
                                                                                              'Nandayure'
                                                                                            ) {
                                                                                              this.distritoValores.push(
                                                                                                '-Seleccione un valor-',
                                                                                                'CARMONA',
                                                                                                'SANTA RITA',
                                                                                                'ZAPOTAL',
                                                                                                'PORVENIR',
                                                                                                'BEJUCO',
                                                                                                'SAN PABLO'
                                                                                              );
                                                                                            } else {
                                                                                              if (
                                                                                                this
                                                                                                  .canton ==
                                                                                                'Naranjo'
                                                                                              ) {
                                                                                                this.distritoValores.push(
                                                                                                  '-Seleccione un valor-',
                                                                                                  'NARANJO',
                                                                                                  'SAN MIGUEL',
                                                                                                  'SAN JOS??',
                                                                                                  'CIRR?? SUR',
                                                                                                  'SAN JER??NIMO',
                                                                                                  'SAN JUAN',
                                                                                                  'EL ROSARIO',
                                                                                                  'PALMITOS'
                                                                                                );
                                                                                              } else {
                                                                                                if (
                                                                                                  this
                                                                                                    .canton ==
                                                                                                  'Nicoya'
                                                                                                ) {
                                                                                                  this.distritoValores.push(
                                                                                                    '-Seleccione un valor-',
                                                                                                    'NICOYA',
                                                                                                    'MANSI??N',
                                                                                                    'SAN ANTONIO',
                                                                                                    'QUEBRADA HONDA',
                                                                                                    'S??MARA',
                                                                                                    'NOSARA',
                                                                                                    'BEL??N DE NOSARITA'
                                                                                                  );
                                                                                                } else {
                                                                                                  if (
                                                                                                    this
                                                                                                      .canton ==
                                                                                                    'Oreamuno'
                                                                                                  ) {
                                                                                                    this.distritoValores.push(
                                                                                                      '-Seleccione un valor-',
                                                                                                      'SAN RAFAEL',
                                                                                                      'COT',
                                                                                                      'POTRERO CERRADO',
                                                                                                      'CIPRESES',
                                                                                                      'SANTA ROSA'
                                                                                                    );
                                                                                                  } else {
                                                                                                    if (
                                                                                                      this
                                                                                                        .canton ==
                                                                                                      'Orotina'
                                                                                                    ) {
                                                                                                      this.distritoValores.push(
                                                                                                        '-Seleccione un valor-',
                                                                                                        'OROTINA',
                                                                                                        'EL MASTATE',
                                                                                                        'HACIENDA VIEJA',
                                                                                                        'COYOLAR',
                                                                                                        'LA CEIBA'
                                                                                                      );
                                                                                                    } else {
                                                                                                      if (
                                                                                                        this
                                                                                                          .canton ==
                                                                                                        'Osa'
                                                                                                      ) {
                                                                                                        this.distritoValores.push(
                                                                                                          '-Seleccione un valor-',
                                                                                                          'PUERTO CORT??S',
                                                                                                          'PALMAR',
                                                                                                          'SIERPE',
                                                                                                          'BAH??A BALLENA',
                                                                                                          'PIEDRAS BLANCAS',
                                                                                                          'BAH??A DRAKE'
                                                                                                        );
                                                                                                      } else {
                                                                                                        if (
                                                                                                          this
                                                                                                            .canton ==
                                                                                                          'Palmares'
                                                                                                        ) {
                                                                                                          this.distritoValores.push(
                                                                                                            '-Seleccione un valor-',
                                                                                                            'ZARAGOZA',
                                                                                                            'BUENOS AIRES',
                                                                                                            'SANTIAGO',
                                                                                                            'CANDELARIA',
                                                                                                            'ESQU??PULAS',
                                                                                                            'LA GRANJA',
                                                                                                            'PALMARES'
                                                                                                          );
                                                                                                        } else {
                                                                                                          if (
                                                                                                            this
                                                                                                              .canton ==
                                                                                                            'Para??so'
                                                                                                          ) {
                                                                                                            this.distritoValores.push(
                                                                                                              '-Seleccione un valor-',
                                                                                                              'PARA??SO',
                                                                                                              'SANTIAGO',
                                                                                                              'OROSI',
                                                                                                              'CACH??',
                                                                                                              'LLANOS DE SANTA LUC??A'
                                                                                                            );
                                                                                                          } else {
                                                                                                            if (
                                                                                                              this
                                                                                                                .canton ==
                                                                                                              'Parrita'
                                                                                                            ) {
                                                                                                              this.distritoValores.push(
                                                                                                                '-Seleccione un valor-',
                                                                                                                'PARRITA'
                                                                                                              );
                                                                                                            } else {
                                                                                                              if (
                                                                                                                this
                                                                                                                  .canton ==
                                                                                                                'P??rez Zeled??n'
                                                                                                              ) {
                                                                                                                this.distritoValores.push(
                                                                                                                  '-Seleccione un valor-',
                                                                                                                  'SAN ISIDRO DE EL GENERAL',
                                                                                                                  'EL GENERAL',
                                                                                                                  'DANIEL FLORES',
                                                                                                                  'RIVAS',
                                                                                                                  'SAN PEDRO',
                                                                                                                  'PLATANARES',
                                                                                                                  'PEJIBAYE',
                                                                                                                  'CAJ??N',
                                                                                                                  'BAR??',
                                                                                                                  'R??O NUEVO',
                                                                                                                  'P??RAMO'
                                                                                                                );
                                                                                                              } else {
                                                                                                                if (
                                                                                                                  this
                                                                                                                    .canton ==
                                                                                                                  'Po??s'
                                                                                                                ) {
                                                                                                                  this.distritoValores.push(
                                                                                                                    '-Seleccione un valor-',
                                                                                                                    'SAN PEDRO',
                                                                                                                    'SAN JUAN',
                                                                                                                    'SAN RAFAEL',
                                                                                                                    'CARRILLOS',
                                                                                                                    'SABANA REDONDA'
                                                                                                                  );
                                                                                                                } else {
                                                                                                                  if (
                                                                                                                    this
                                                                                                                      .canton ==
                                                                                                                    'Pococ??'
                                                                                                                  ) {
                                                                                                                    this.distritoValores.push(
                                                                                                                      '-Seleccione un valor-',
                                                                                                                      'GU??PILES',
                                                                                                                      'JIM??NEZ',
                                                                                                                      'RITA',
                                                                                                                      'ROXANA',
                                                                                                                      'CARIARI',
                                                                                                                      'COLORADO',
                                                                                                                      'LA COLONIA'
                                                                                                                    );
                                                                                                                  } else {
                                                                                                                    if (
                                                                                                                      this
                                                                                                                        .canton ==
                                                                                                                      'Puntarenas'
                                                                                                                    ) {
                                                                                                                      this.distritoValores.push(
                                                                                                                        '-Seleccione un valor-',
                                                                                                                        'ACAPULCO',
                                                                                                                        'EL ROBLE',
                                                                                                                        'ARANCIBIA',
                                                                                                                        'PUNTARENAS',
                                                                                                                        'PITAHAYA',
                                                                                                                        'CHOMES',
                                                                                                                        'LEPANTO',
                                                                                                                        'PAQUERA',
                                                                                                                        'MANZANILLO',
                                                                                                                        'GUACIMAL',
                                                                                                                        'BARRANCA',
                                                                                                                        'MONTE VERDE',
                                                                                                                        'C??BANO',
                                                                                                                        'CHACARITA',
                                                                                                                        'CHIRA'
                                                                                                                      );
                                                                                                                    } else {
                                                                                                                      if (
                                                                                                                        this
                                                                                                                          .canton ==
                                                                                                                        'Puriscal'
                                                                                                                      ) {
                                                                                                                        this.distritoValores.push(
                                                                                                                          '-Seleccione un valor-',
                                                                                                                          'SANTIAGO',
                                                                                                                          'MERCEDES SUR',
                                                                                                                          'BARBACOAS',
                                                                                                                          'GRIFO ALTO',
                                                                                                                          'SAN RAFAEL',
                                                                                                                          'CANDELARITA',
                                                                                                                          'DESAMPARADITOS',
                                                                                                                          'SAN ANTONIO',
                                                                                                                          'CHIRES'
                                                                                                                        );
                                                                                                                      } else {
                                                                                                                        if (
                                                                                                                          this
                                                                                                                            .canton ==
                                                                                                                          'San Carlos'
                                                                                                                        ) {
                                                                                                                          this.distritoValores.push(
                                                                                                                            '-Seleccione un valor-',
                                                                                                                            'QUESADA',
                                                                                                                            'FLORENCIA',
                                                                                                                            'BUENAVISTA',
                                                                                                                            'AGUAS ZARCAS',
                                                                                                                            'VENECIA',
                                                                                                                            'PITAL',
                                                                                                                            'LA FORTUNA',
                                                                                                                            'LA TIGRA',
                                                                                                                            'LA PALMERA',
                                                                                                                            'VENADO',
                                                                                                                            'CUTRIS',
                                                                                                                            'MONTERREY',
                                                                                                                            'POCOSOL'
                                                                                                                          );
                                                                                                                        } else {
                                                                                                                          if (
                                                                                                                            this
                                                                                                                              .canton ==
                                                                                                                            'San Isidro'
                                                                                                                          ) {
                                                                                                                            this.distritoValores.push(
                                                                                                                              '-Seleccione un valor-',
                                                                                                                              'SAN ISIDRO',
                                                                                                                              'SAN JOS??',
                                                                                                                              'CONCEPCI??N',
                                                                                                                              'SAN FRANCISCO'
                                                                                                                            );
                                                                                                                          } else {
                                                                                                                            if (
                                                                                                                              this
                                                                                                                                .canton ==
                                                                                                                              'San Jos??'
                                                                                                                            ) {
                                                                                                                              this.distritoValores.push(
                                                                                                                                '-Seleccione un valor-',
                                                                                                                                'CARMEN',
                                                                                                                                'MERCED',
                                                                                                                                'HOSPITAL',
                                                                                                                                'CATEDRAL',
                                                                                                                                'ZAPOTE',
                                                                                                                                'SAN FRANCISCO DE DOS R??OS',
                                                                                                                                'URUCA',
                                                                                                                                'MATA REDONDA',
                                                                                                                                'PAVAS',
                                                                                                                                'HATILLO',
                                                                                                                                'SAN SEBASTI??N'
                                                                                                                              );
                                                                                                                            } else {
                                                                                                                              if (
                                                                                                                                this
                                                                                                                                  .canton ==
                                                                                                                                'San Mateo'
                                                                                                                              ) {
                                                                                                                                this.distritoValores.push(
                                                                                                                                  '-Seleccione un valor-',
                                                                                                                                  'SAN MATEO',
                                                                                                                                  'DESMONTE',
                                                                                                                                  'JES??S MAR??A',
                                                                                                                                  'LABRADOR'
                                                                                                                                );
                                                                                                                              } else {
                                                                                                                                if (
                                                                                                                                  this
                                                                                                                                    .canton ==
                                                                                                                                  'San Rafa??l'
                                                                                                                                ) {
                                                                                                                                  this.distritoValores.push(
                                                                                                                                    '-Seleccione un valor-',
                                                                                                                                    'SAN PABLO',
                                                                                                                                    'SAN RAFAEL',
                                                                                                                                    'SAN JOSECITO',
                                                                                                                                    'SANTIAGO',
                                                                                                                                    '??NGELES',
                                                                                                                                    'CONCEPCI??N'
                                                                                                                                  );
                                                                                                                                } else {
                                                                                                                                  if (
                                                                                                                                    this
                                                                                                                                      .canton ==
                                                                                                                                    'San Ram??n'
                                                                                                                                  ) {
                                                                                                                                    this.distritoValores.push(
                                                                                                                                      '-Seleccione un valor-',
                                                                                                                                      'SAN RAM??N',
                                                                                                                                      'SANTIAGO',
                                                                                                                                      'SAN JUAN',
                                                                                                                                      'PIEDADES NORTE',
                                                                                                                                      'PIEDADES SUR',
                                                                                                                                      'SAN RAFAEL',
                                                                                                                                      'SAN RAFAEL',
                                                                                                                                      '??NGELES',
                                                                                                                                      'ALFARO',
                                                                                                                                      'VOLIO',
                                                                                                                                      'CONCEPCI??N',
                                                                                                                                      'ZAPOTAL',
                                                                                                                                      'PE??AS BLANCAS'
                                                                                                                                    );
                                                                                                                                  } else {
                                                                                                                                    if (
                                                                                                                                      this
                                                                                                                                        .canton ==
                                                                                                                                      'Santa Ana'
                                                                                                                                    ) {
                                                                                                                                      this.distritoValores.push(
                                                                                                                                        '-Seleccione un valor-',
                                                                                                                                        'SANTA ANA',
                                                                                                                                        'SALITRAL',
                                                                                                                                        'POZOS',
                                                                                                                                        'URUCA',
                                                                                                                                        'PIEDADES',
                                                                                                                                        'BRASIL'
                                                                                                                                      );
                                                                                                                                    } else {
                                                                                                                                      if (
                                                                                                                                        this
                                                                                                                                          .canton ==
                                                                                                                                        'Santa B??rbara'
                                                                                                                                      ) {
                                                                                                                                        this.distritoValores.push(
                                                                                                                                          '-Seleccione un valor-',
                                                                                                                                          'SANTA B??RBARA',
                                                                                                                                          'SAN PEDRO',
                                                                                                                                          'SAN JUAN',
                                                                                                                                          'JES??S',
                                                                                                                                          'SANTO DOMINGO',
                                                                                                                                          'PURAB??'
                                                                                                                                        );
                                                                                                                                      } else {
                                                                                                                                        if (
                                                                                                                                          this
                                                                                                                                            .canton ==
                                                                                                                                          'Santa Cruz'
                                                                                                                                        ) {
                                                                                                                                          this.distritoValores.push(
                                                                                                                                            '-Seleccione un valor-',
                                                                                                                                            'SANTA CRUZ',
                                                                                                                                            'BOLS??N',
                                                                                                                                            'VEINTISIETE DE ABRIL',
                                                                                                                                            'TEMPATE',
                                                                                                                                            'CARTAGENA',
                                                                                                                                            'CUAJINIQUIL',
                                                                                                                                            'DIRI??',
                                                                                                                                            'CABO VELAS',
                                                                                                                                            'TAMARINDO'
                                                                                                                                          );
                                                                                                                                        } else {
                                                                                                                                          if (
                                                                                                                                            this
                                                                                                                                              .canton ==
                                                                                                                                            'Santo Domingo'
                                                                                                                                          ) {
                                                                                                                                            this.distritoValores.push(
                                                                                                                                              '-Seleccione un valor-',
                                                                                                                                              'SAN VICENTE',
                                                                                                                                              'SAN MIGUEL',
                                                                                                                                              'PARACITO',
                                                                                                                                              'SANTO TOM??S',
                                                                                                                                              'SANTA ROSA',
                                                                                                                                              'TURES',
                                                                                                                                              'PAR??'
                                                                                                                                            );
                                                                                                                                          } else {
                                                                                                                                            if (
                                                                                                                                              this
                                                                                                                                                .canton ==
                                                                                                                                              'Sarapiqu??'
                                                                                                                                            ) {
                                                                                                                                              this.distritoValores.push(
                                                                                                                                                '-Seleccione un valor-',
                                                                                                                                                'PUERTO VIEJO',
                                                                                                                                                'LA VIRGEN',
                                                                                                                                                'LAS HORQUETAS',
                                                                                                                                                'LLANURAS DEL GASPAR',
                                                                                                                                                'CURE??A'
                                                                                                                                              );
                                                                                                                                            } else {
                                                                                                                                              if (
                                                                                                                                                this
                                                                                                                                                  .canton ==
                                                                                                                                                'Siquirres'
                                                                                                                                              ) {
                                                                                                                                                this.distritoValores.push(
                                                                                                                                                  '-Seleccione un valor-',
                                                                                                                                                  'SIQUIRRES',
                                                                                                                                                  'PACUARITO',
                                                                                                                                                  'FLORIDA',
                                                                                                                                                  'GERMANIA',
                                                                                                                                                  'EL CAIRO',
                                                                                                                                                  'ALEGR??A'
                                                                                                                                                );
                                                                                                                                              } else {
                                                                                                                                                if (
                                                                                                                                                  this
                                                                                                                                                    .canton ==
                                                                                                                                                  'Talamanca'
                                                                                                                                                ) {
                                                                                                                                                  this.distritoValores.push(
                                                                                                                                                    '-Seleccione un valor-',
                                                                                                                                                    'BRATSI',
                                                                                                                                                    'SIXAOLA',
                                                                                                                                                    'CAHUITA',
                                                                                                                                                    'TELIRE'
                                                                                                                                                  );
                                                                                                                                                } else {
                                                                                                                                                  if (
                                                                                                                                                    this
                                                                                                                                                      .canton ==
                                                                                                                                                    'Tarraz??'
                                                                                                                                                  ) {
                                                                                                                                                    this.distritoValores.push(
                                                                                                                                                      '-Seleccione un valor-',
                                                                                                                                                      'SAN MARCOS',
                                                                                                                                                      'SAN LORENZO',
                                                                                                                                                      'SAN CARLOS'
                                                                                                                                                    );
                                                                                                                                                  } else {
                                                                                                                                                    if (
                                                                                                                                                      this
                                                                                                                                                        .canton ==
                                                                                                                                                      'Tib??s'
                                                                                                                                                    ) {
                                                                                                                                                      this.distritoValores.push(
                                                                                                                                                        '-Seleccione un valor-',
                                                                                                                                                        'SAN JUAN',
                                                                                                                                                        'CINCO ESQUINAS',
                                                                                                                                                        'ANSELMO LLORENTE',
                                                                                                                                                        'LEON XIII',
                                                                                                                                                        'COLIMA'
                                                                                                                                                      );
                                                                                                                                                    } else {
                                                                                                                                                      if (
                                                                                                                                                        this
                                                                                                                                                          .canton ==
                                                                                                                                                        'Tilar??n'
                                                                                                                                                      ) {
                                                                                                                                                        this.distritoValores.push(
                                                                                                                                                          '-Seleccione un valor-',
                                                                                                                                                          'TILAR??N',
                                                                                                                                                          'QUEBRADA GRANDE',
                                                                                                                                                          'TRONADORA',
                                                                                                                                                          'SANTA ROSA',
                                                                                                                                                          'L??BANO',
                                                                                                                                                          'TIERRAS MORENAS',
                                                                                                                                                          'ARENAL'
                                                                                                                                                        );
                                                                                                                                                      } else {
                                                                                                                                                        if (
                                                                                                                                                          this
                                                                                                                                                            .canton ==
                                                                                                                                                          'Turrialba'
                                                                                                                                                        ) {
                                                                                                                                                          this.distritoValores.push(
                                                                                                                                                            '-Seleccione un valor-',
                                                                                                                                                            'LA SUIZA',
                                                                                                                                                            'PERALTA',
                                                                                                                                                            'SANTA CRUZ',
                                                                                                                                                            'TURRIALBA',
                                                                                                                                                            'SANTA TERESITA',
                                                                                                                                                            'PAVONES',
                                                                                                                                                            'TUIS',
                                                                                                                                                            'TAYUTIC',
                                                                                                                                                            'SANTA ROSA',
                                                                                                                                                            'TRES EQUIS',
                                                                                                                                                            'LA ISABEL',
                                                                                                                                                            'CHIRRIP??'
                                                                                                                                                          );
                                                                                                                                                        } else {
                                                                                                                                                          if (
                                                                                                                                                            this
                                                                                                                                                              .canton ==
                                                                                                                                                            'Turrubares'
                                                                                                                                                          ) {
                                                                                                                                                            this.distritoValores.push(
                                                                                                                                                              '-Seleccione un valor-',
                                                                                                                                                              'SAN PABLO',
                                                                                                                                                              'SAN PEDRO',
                                                                                                                                                              'SAN JUAN DE MATA',
                                                                                                                                                              'SAN LUIS',
                                                                                                                                                              'CARARA'
                                                                                                                                                            );
                                                                                                                                                          } else {
                                                                                                                                                            if (
                                                                                                                                                              this
                                                                                                                                                                .canton ==
                                                                                                                                                              'Upala'
                                                                                                                                                            ) {
                                                                                                                                                              this.distritoValores.push(
                                                                                                                                                                '-Seleccione un valor-',
                                                                                                                                                                'UPALA',
                                                                                                                                                                'AGUAS CLARAS',
                                                                                                                                                                'SAN JOS?? o PIZOTE',
                                                                                                                                                                'BIJAGUA',
                                                                                                                                                                'DELICIAS',
                                                                                                                                                                'DOS R??OS',
                                                                                                                                                                'YOLILLAL',
                                                                                                                                                                'CANALETE'
                                                                                                                                                              );
                                                                                                                                                            } else {
                                                                                                                                                              if (
                                                                                                                                                                this
                                                                                                                                                                  .canton ==
                                                                                                                                                                'Valverde Vega'
                                                                                                                                                              ) {
                                                                                                                                                                this.distritoValores.push(
                                                                                                                                                                  '-Seleccione un valor-',
                                                                                                                                                                  'SARCH?? NORTE',
                                                                                                                                                                  'SARCH?? SUR',
                                                                                                                                                                  'TORO AMARILLO',
                                                                                                                                                                  'SAN PEDRO',
                                                                                                                                                                  'RODR??GUEZ'
                                                                                                                                                                );
                                                                                                                                                              } else {
                                                                                                                                                                if (
                                                                                                                                                                  this
                                                                                                                                                                    .canton ==
                                                                                                                                                                  'V??squez de Coronado'
                                                                                                                                                                ) {
                                                                                                                                                                  this.distritoValores.push(
                                                                                                                                                                    '-Seleccione un valor-',
                                                                                                                                                                    'SAN ISIDRO',
                                                                                                                                                                    'SAN RAFAEL',
                                                                                                                                                                    'DULCE NOMBRE DE JES??S',
                                                                                                                                                                    'PATALILLO',
                                                                                                                                                                    'CASCAJAL'
                                                                                                                                                                  );
                                                                                                                                                                } else {
                                                                                                                                                                  if (
                                                                                                                                                                    this
                                                                                                                                                                      .canton ==
                                                                                                                                                                    'Zarcero'
                                                                                                                                                                  ) {
                                                                                                                                                                    this.distritoValores.push(
                                                                                                                                                                      '-Seleccione un valor-',
                                                                                                                                                                      'ZARCERO',
                                                                                                                                                                      'LAGUNA',
                                                                                                                                                                      'GUADALUPE',
                                                                                                                                                                      'PALMIRA',
                                                                                                                                                                      'ZAPOTE',
                                                                                                                                                                      'BRISAS'
                                                                                                                                                                    );
                                                                                                                                                                  } else {
                                                                                                                                                                    if (
                                                                                                                                                                      this
                                                                                                                                                                        .canton ==
                                                                                                                                                                      'San Pablo'
                                                                                                                                                                    ) {
                                                                                                                                                                      this.distritoValores.push(
                                                                                                                                                                        '-Seleccione un valor-',
                                                                                                                                                                        'SAN PABLO'
                                                                                                                                                                      );
                                                                                                                                                                    } else {
                                                                                                                                                                      if (
                                                                                                                                                                        this
                                                                                                                                                                          .canton ==
                                                                                                                                                                        'Barva'
                                                                                                                                                                      ) {
                                                                                                                                                                        this.distritoValores.push(
                                                                                                                                                                          '-Seleccione un valor-',
                                                                                                                                                                          'BARVA',
                                                                                                                                                                          'SAN PEDRO',
                                                                                                                                                                          'SAN PABLO',
                                                                                                                                                                          'SAN ROQUE',
                                                                                                                                                                          'SANTA LUC??A',
                                                                                                                                                                          'SAN JOS?? DE LA MONTA??A'
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
  private buildForm() {
    this.form = this.formBuilder.group({
      pais: ['', [Validators.required]],
      provincia: ['', [Validators.required]],
      canton: ['', [Validators.required]],
      distrito: ['', [Validators.required]],
      direccionExacta: [
        '',
        [
          Validators.required,
          Validators.maxLength(245),
          UsernameValidator.cannotContainSpace,
        ],
      ],
    });
    this.form.controls['pais'].setValue('--Seleccione un valor --', {
      onlySelf: true,
    });

    //#region pais
    this.form.get('pais')?.valueChanges.subscribe((value) => {
      console.log(value);
      this.pais = value;
      this.provincias();
      this.direcCliente.pais = value;
      this.PaisSinSeleccionar = true;
    });
    //#endregion pais

    //#region Provincia
    this.form.get('provincia')?.valueChanges.subscribe((value) => {
      console.log(value);
      this.provincia = value;
      this.cantones();
      this.direcCliente.provincia = value;
    });
    //#endregion Provincia

    //#region Canton
    this.form.get('canton')?.valueChanges.subscribe((value) => {
      console.log(value);
      this.canton = value;
      this.distritos();
      this.direcCliente.canton = value;
    });
    //#endregion Canton

    //#region Distrito
    this.form.get('distrito')?.valueChanges.subscribe((value) => {
      console.log(value);

      this.direcCliente.distrito = value;
    });
    //#endregion Distrito

    //#region  DireccionExacta
    this.form.get('direccionExacta')?.valueChanges.subscribe((value) => {
      console.log(value);
      this.direcCliente.direccionExacta = value;
      console.log(this.direcCliente.direccionExacta);
    });

    //#endregion DireccionExacta
  }
  actualizarDireccion(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      this.PaisSinSeleccionar = true;
      const values = this.form.value;
    } else {
      if (this.pais == '--Seleccione un valor --') {
        this.PaisSinSeleccionar = false;
      }
      this.form.markAllAsTouched();
      console.log('Error al enviar datos');
    }
  }

  renovar(datos: any) {
    for (let l of datos) {
      this.token = l.access_token;
      console.log('SalidaToken: ' + this.token);
    }
    let IdCont = this._Activatedroute.snapshot.paramMap.get('idCliente');
    console.log('IDCONTACTO: ' + IdCont);
    this.rest
      .postRenovacion(
        this.token,
        IdCont!,
        this.direcCliente.pais,
        this.direcCliente.provincia,
        this.direcCliente.canton,
        this.direcCliente.distrito,
        this.direcCliente.direccionExacta
      )
      .subscribe((data: {}) => {
        console.log(data);
        this.jsonEntranteJ = String(data);
        this.jsonEntrante.push(data);
        console.log('Json Salida Login: ' + this.jsonEntrante);

        for (let l of this.jsonEntrante) {
          if (l.Estado == 'Error') {
            this.ErrorAlCrearLaSolicitud = false;
            this.ProcesandoSolicitudSucces = true;
          } else {
            if (l.Estado == 'Moroso') {
              this.router.navigate(['prestamoActivo']);
            } else {
              //iva:l.iva,
              console.log('Total a pagar: ' + l.totalPaga);
              this.router.navigate(['renovaciones/', IdCont, l.Id], {
                state: {
                  data: {
                    id: l.Id,
                    monto: l.monto,
                    interes: l.interes,
                    tecno: l.tecno,
                    descuento: l.descuento,
                    totalPagar: l.totalPagar,
                    aval: l.aval,
                    plazo: l.plazo,
                    servicioFE: l.servicioFE,
                  },
                },
              });
            }
          }
        }
      });
  }

  getToken() {
    if (this.pais != '--Seleccione un valor --') {
      this.login = [];
      this.rest.getToken().subscribe((data: {}) => {
        console.log(data);
        this.login.push(data);
        console.log(this.login);
        this.renovar(this.login);
        this.ErrorAlCrearLaSolicitud = true;
        this.ProcesandoSolicitudSucces = false;
      });
    } else {
      this.PaisSinSeleccionar = false;
    }
  }

  cleanUnnecessaryWhiteSpaces(cadena: string) {
    return cadena.replace(/\s{2,}/g, ' ').trim();
  }
}
