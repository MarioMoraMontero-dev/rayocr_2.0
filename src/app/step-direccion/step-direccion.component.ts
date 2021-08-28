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
        'Limón',
        'Puntarenas',
        'San José'
      );
    }
  }

  cantones() {
    this.cantonValores = [];
    this.distritoValores = [];
    this.canton = '';
    this.distrito = '';
    if (this.provincia == 'San José') {
      this.cantonValores.push(
        '-Seleccione un valor-',
        'San José',
        'Escazú',
        'Desamparados',
        'Puriscal',
        'Tarrazú',
        'Aserrí',
        'Mora',
        'Goicoechea',
        'Alajuelita',
        'Vásquez de Coronado',
        'Santa Ana',
        'Acosta',
        'Tibás',
        'Moravia',
        'Montes de Oca',
        'Turrubares',
        'Dota',
        'Curridabat',
        'Pérez Zeledón',
        'León Cortéz Castro'
      );
    } else {
      if (this.provincia == 'Alajuela') {
        this.cantonValores.push(
          '-Seleccione un valor-',
          'Alajuela',
          'San Ramón',
          'Grecia',
          'San Mateo',
          'Atenas',
          'Naranjo',
          'Palmares',
          'Poás',
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
            'Paraíso',
            'La Unión',
            'Jiménez',
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
              'Cañas',
              'Abangáres',
              'Tilarán',
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
                'Santa Bárbara',
                'San Rafaél',
                'San Isidro',
                'Belén',
                'Flores',
                'San Pablo',
                'Sarapiquí'
              );
            } else {
              if (this.provincia == 'Limón') {
                this.cantonValores.push(
                  '-Seleccione un valor-',
                  'Pococí',
                  'Siquirres',
                  'Talamanca',
                  'Matina',
                  'Guácimo',
                  'Limón'
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
    if (this.canton == 'Abangáres') {
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
              'SAN JOSÉ',
              'CARRIZAL',
              'SAN ANTONIO',
              'GUÁCIMA',
              'SAN ISIDRO',
              'SABANILLA',
              'SAN RAFAEL',
              'RÍO SEGUNDO',
              'DESAMPARADOS',
              'TAMBOR',
              'GARITA',
              'SARAPIQUÍ',
              'TURRÚCARES'
            );
          } else {
            if (this.canton == 'Alajuelita') {
              this.distritoValores.push(
                '-Seleccione un valor-',
                'ALAJUELITA',
                'SAN JOSECITO',
                'SAN ANTONIO',
                'CONCEPCIÓN',
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
                if (this.canton == 'Aserrí') {
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
                      'JESÚS',
                      'MERCEDES',
                      'SAN ISIDRO',
                      'CONCEPCIÓN',
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
                        'RÍO NARANJO'
                      );
                    } else {
                      if (this.canton == 'Bagaces') {
                        this.distritoValores.push(
                          '-Seleccione un valor-',
                          'BARVA',
                          'SAN PEDRO',
                          'SAN PABLO',
                          'SAN ROQUE',
                          'SANTA LUCÍA',
                          'SAN JOSÉ DE LA MONTAÑA'
                        );
                      } else {
                        if (this.canton == 'Belén') {
                          this.distritoValores.push(
                            '-Seleccione un valor-',
                            'SAN ANTONIO',
                            'LA RIBERA',
                            'LA ASUNCIÓN'
                          );
                        } else {
                          if (this.canton == 'Buenos Aires') {
                            this.distritoValores.push(
                              '-Seleccione un valor-',
                              'BUENOS AIRES',
                              'VOLCÁN',
                              'POTRERO GRANDE',
                              'BORUCA',
                              'PILAS',
                              'COLINAS',
                              'CHÁNGUENA',
                              'BIOLLEY',
                              'BRUNKA'
                            );
                          } else {
                            if (this.canton == 'Cañas') {
                              this.distritoValores.push(
                                '-Seleccione un valor-',
                                'CAÑAS',
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
                                  'BELÉN'
                                );
                              } else {
                                if (this.canton == 'Cartago') {
                                  this.distritoValores.push(
                                    '-Seleccione un valor-',
                                    'ORIENTAL',
                                    'OCCIDENTAL',
                                    'CARMEN',
                                    'SAN NICOLÁS',
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
                                          'SÁNCHEZ',
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
                                            'PATARRÁ',
                                            'SAN CRISTÓBAL',
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
                                              'SANTA MARÍA',
                                              'JARDÍN',
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
                                              if (this.canton == 'Escazú') {
                                                this.distritoValores.push(
                                                  '-Seleccione un valor-',
                                                  'ESCAZÚ',
                                                  'SAN ANTONIO',
                                                  'SAN RAFAEL'
                                                );
                                              } else {
                                                if (this.canton == 'Esparza') {
                                                  this.distritoValores.push(
                                                    '-Seleccione un valor-',
                                                    'ESPÍRITU SANTO',
                                                    'SAN JUAN GRANDE',
                                                    'MACACONA',
                                                    'SAN RAFAEL',
                                                    'SAN JERÓNIMO',
                                                    'CALDERA'
                                                  );
                                                } else {
                                                  if (this.canton == 'Flores') {
                                                    this.distritoValores.push(
                                                      '-Seleccione un valor-',
                                                      'SAN JOAQUÍN',
                                                      'BARRANTES',
                                                      'LLORENTE'
                                                    );
                                                  } else {
                                                    if (
                                                      this.canton == 'Garabito'
                                                    ) {
                                                      this.distritoValores.push(
                                                        '-Seleccione un valor-',
                                                        'JACÓ',
                                                        'TÁRCOLES'
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
                                                          'MATA DE PLÁTANO',
                                                          'IPÍS',
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
                                                            'PUERTO JIMÉNEZ',
                                                            'GUAYCARÁ',
                                                            'PAVÓN'
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
                                                              'SAN JOSÉ',
                                                              'SAN ROQUE',
                                                              'TACARES',
                                                              'RÍO CUARTO',
                                                              'PUENTE DE PIEDRA',
                                                              'BOLÍVAR'
                                                            );
                                                          } else {
                                                            if (
                                                              this.canton ==
                                                              'Guácimo'
                                                            ) {
                                                              this.distritoValores.push(
                                                                '-Seleccione un valor-',
                                                                'GUÁCIMO',
                                                                'MERCEDES',
                                                                'POCORA',
                                                                'RÍO JIMÉNEZ',
                                                                'DUACARÍ'
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
                                                                      'Jiménez'
                                                                    ) {
                                                                      this.distritoValores.push(
                                                                        '-Seleccione un valor-',
                                                                        'JUAN VIÑAS',
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
                                                                          'La Unión'
                                                                        ) {
                                                                          this.distritoValores.push(
                                                                            '-Seleccione un valor-',
                                                                            'TRES RÍOS',
                                                                            'SAN DIEGO',
                                                                            'SAN JUAN',
                                                                            'SAN RAFAEL',
                                                                            'CONCEPCIÓN',
                                                                            'DULCE NOMBRE',
                                                                            'SAN RAMÓN',
                                                                            'RÍO AZUL'
                                                                          );
                                                                        } else {
                                                                          if (
                                                                            this
                                                                              .canton ==
                                                                            'León Cortéz Castro'
                                                                          ) {
                                                                            this.distritoValores.push(
                                                                              '-Seleccione un valor-',
                                                                              'SAN PABLO',
                                                                              'SAN ANDRÉS',
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
                                                                                'CAÑAS DULCES',
                                                                                'NACASCOLO',
                                                                                'CURUBANDÉ',
                                                                                'MAYORGA'
                                                                              );
                                                                            } else {
                                                                              if (
                                                                                this
                                                                                  .canton ==
                                                                                'Limón'
                                                                              ) {
                                                                                this.distritoValores.push(
                                                                                  '-Seleccione un valor-',
                                                                                  'LIMÓN',
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
                                                                                    'CAÑO NEGRO',
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
                                                                                      'BATÁN',
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
                                                                                          'LA UNIÓN',
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
                                                                                            'COLÓN',
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
                                                                                              'SAN JERÓNIMO',
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
                                                                                                  'SAN JOSÉ',
                                                                                                  'CIRRÍ SUR',
                                                                                                  'SAN JERÓNIMO',
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
                                                                                                    'MANSIÓN',
                                                                                                    'SAN ANTONIO',
                                                                                                    'QUEBRADA HONDA',
                                                                                                    'SÁMARA',
                                                                                                    'NOSARA',
                                                                                                    'BELÉN DE NOSARITA'
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
                                                                                                          'PUERTO CORTÉS',
                                                                                                          'PALMAR',
                                                                                                          'SIERPE',
                                                                                                          'BAHÍA BALLENA',
                                                                                                          'PIEDRAS BLANCAS',
                                                                                                          'BAHÍA DRAKE'
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
                                                                                                            'ESQUÍPULAS',
                                                                                                            'LA GRANJA',
                                                                                                            'PALMARES'
                                                                                                          );
                                                                                                        } else {
                                                                                                          if (
                                                                                                            this
                                                                                                              .canton ==
                                                                                                            'Paraíso'
                                                                                                          ) {
                                                                                                            this.distritoValores.push(
                                                                                                              '-Seleccione un valor-',
                                                                                                              'PARAÍSO',
                                                                                                              'SANTIAGO',
                                                                                                              'OROSI',
                                                                                                              'CACHÍ',
                                                                                                              'LLANOS DE SANTA LUCÍA'
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
                                                                                                                'Pérez Zeledón'
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
                                                                                                                  'CAJÓN',
                                                                                                                  'BARÚ',
                                                                                                                  'RÍO NUEVO',
                                                                                                                  'PÁRAMO'
                                                                                                                );
                                                                                                              } else {
                                                                                                                if (
                                                                                                                  this
                                                                                                                    .canton ==
                                                                                                                  'Poás'
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
                                                                                                                    'Pococí'
                                                                                                                  ) {
                                                                                                                    this.distritoValores.push(
                                                                                                                      '-Seleccione un valor-',
                                                                                                                      'GUÁPILES',
                                                                                                                      'JIMÉNEZ',
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
                                                                                                                        'CÓBANO',
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
                                                                                                                              'SAN JOSÉ',
                                                                                                                              'CONCEPCIÓN',
                                                                                                                              'SAN FRANCISCO'
                                                                                                                            );
                                                                                                                          } else {
                                                                                                                            if (
                                                                                                                              this
                                                                                                                                .canton ==
                                                                                                                              'San José'
                                                                                                                            ) {
                                                                                                                              this.distritoValores.push(
                                                                                                                                '-Seleccione un valor-',
                                                                                                                                'CARMEN',
                                                                                                                                'MERCED',
                                                                                                                                'HOSPITAL',
                                                                                                                                'CATEDRAL',
                                                                                                                                'ZAPOTE',
                                                                                                                                'SAN FRANCISCO DE DOS RÍOS',
                                                                                                                                'URUCA',
                                                                                                                                'MATA REDONDA',
                                                                                                                                'PAVAS',
                                                                                                                                'HATILLO',
                                                                                                                                'SAN SEBASTIÁN'
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
                                                                                                                                  'JESÚS MARÍA',
                                                                                                                                  'LABRADOR'
                                                                                                                                );
                                                                                                                              } else {
                                                                                                                                if (
                                                                                                                                  this
                                                                                                                                    .canton ==
                                                                                                                                  'San Rafaél'
                                                                                                                                ) {
                                                                                                                                  this.distritoValores.push(
                                                                                                                                    '-Seleccione un valor-',
                                                                                                                                    'SAN PABLO',
                                                                                                                                    'SAN RAFAEL',
                                                                                                                                    'SAN JOSECITO',
                                                                                                                                    'SANTIAGO',
                                                                                                                                    'ÁNGELES',
                                                                                                                                    'CONCEPCIÓN'
                                                                                                                                  );
                                                                                                                                } else {
                                                                                                                                  if (
                                                                                                                                    this
                                                                                                                                      .canton ==
                                                                                                                                    'San Ramón'
                                                                                                                                  ) {
                                                                                                                                    this.distritoValores.push(
                                                                                                                                      '-Seleccione un valor-',
                                                                                                                                      'SAN RAMÓN',
                                                                                                                                      'SANTIAGO',
                                                                                                                                      'SAN JUAN',
                                                                                                                                      'PIEDADES NORTE',
                                                                                                                                      'PIEDADES SUR',
                                                                                                                                      'SAN RAFAEL',
                                                                                                                                      'SAN RAFAEL',
                                                                                                                                      'ÁNGELES',
                                                                                                                                      'ALFARO',
                                                                                                                                      'VOLIO',
                                                                                                                                      'CONCEPCIÓN',
                                                                                                                                      'ZAPOTAL',
                                                                                                                                      'PEÑAS BLANCAS'
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
                                                                                                                                        'Santa Bárbara'
                                                                                                                                      ) {
                                                                                                                                        this.distritoValores.push(
                                                                                                                                          '-Seleccione un valor-',
                                                                                                                                          'SANTA BÁRBARA',
                                                                                                                                          'SAN PEDRO',
                                                                                                                                          'SAN JUAN',
                                                                                                                                          'JESÚS',
                                                                                                                                          'SANTO DOMINGO',
                                                                                                                                          'PURABÁ'
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
                                                                                                                                            'BOLSÓN',
                                                                                                                                            'VEINTISIETE DE ABRIL',
                                                                                                                                            'TEMPATE',
                                                                                                                                            'CARTAGENA',
                                                                                                                                            'CUAJINIQUIL',
                                                                                                                                            'DIRIÁ',
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
                                                                                                                                              'SANTO TOMÁS',
                                                                                                                                              'SANTA ROSA',
                                                                                                                                              'TURES',
                                                                                                                                              'PARÁ'
                                                                                                                                            );
                                                                                                                                          } else {
                                                                                                                                            if (
                                                                                                                                              this
                                                                                                                                                .canton ==
                                                                                                                                              'Sarapiquí'
                                                                                                                                            ) {
                                                                                                                                              this.distritoValores.push(
                                                                                                                                                '-Seleccione un valor-',
                                                                                                                                                'PUERTO VIEJO',
                                                                                                                                                'LA VIRGEN',
                                                                                                                                                'LAS HORQUETAS',
                                                                                                                                                'LLANURAS DEL GASPAR',
                                                                                                                                                'CUREÑA'
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
                                                                                                                                                  'ALEGRÍA'
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
                                                                                                                                                    'Tarrazú'
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
                                                                                                                                                      'Tibás'
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
                                                                                                                                                        'Tilarán'
                                                                                                                                                      ) {
                                                                                                                                                        this.distritoValores.push(
                                                                                                                                                          '-Seleccione un valor-',
                                                                                                                                                          'TILARÁN',
                                                                                                                                                          'QUEBRADA GRANDE',
                                                                                                                                                          'TRONADORA',
                                                                                                                                                          'SANTA ROSA',
                                                                                                                                                          'LÍBANO',
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
                                                                                                                                                            'CHIRRIPÓ'
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
                                                                                                                                                                'SAN JOSÉ o PIZOTE',
                                                                                                                                                                'BIJAGUA',
                                                                                                                                                                'DELICIAS',
                                                                                                                                                                'DOS RÍOS',
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
                                                                                                                                                                  'SARCHÍ NORTE',
                                                                                                                                                                  'SARCHÍ SUR',
                                                                                                                                                                  'TORO AMARILLO',
                                                                                                                                                                  'SAN PEDRO',
                                                                                                                                                                  'RODRÍGUEZ'
                                                                                                                                                                );
                                                                                                                                                              } else {
                                                                                                                                                                if (
                                                                                                                                                                  this
                                                                                                                                                                    .canton ==
                                                                                                                                                                  'Vásquez de Coronado'
                                                                                                                                                                ) {
                                                                                                                                                                  this.distritoValores.push(
                                                                                                                                                                    '-Seleccione un valor-',
                                                                                                                                                                    'SAN ISIDRO',
                                                                                                                                                                    'SAN RAFAEL',
                                                                                                                                                                    'DULCE NOMBRE DE JESÚS',
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
                                                                                                                                                                          'SANTA LUCÍA',
                                                                                                                                                                          'SAN JOSÉ DE LA MONTAÑA'
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
