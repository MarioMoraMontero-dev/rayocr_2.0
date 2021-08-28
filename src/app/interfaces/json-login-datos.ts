export interface JsonLoginDatos{
        direccionExacta:String;
        plazo:String;
        id: String;
        nombre: String;
        pais: String;
        provincia: String;
        caton: String;
        distrito: String;
        lugarDeTrabajo: String;
        mobilePhone: String;
        phone: String;
        cedula: String;
        email: String;
        salarioReportado: String;
        numPrestamosFirmados: String;
        cantidadPrestamosRPLS:String;
        prestamos?: (Prestamos)[] | null;
 }
                
              
              export interface Prestamos {
                codigoPrestamo: String;
                montoPrestamo: String;
                tecnologia: String;
                interes: String;
                fecha1: String;
                fecha2: String;
                fecha3: String;
                plazo: String;
                iva:String;
                tipoDescuento: String;
                descuento: String;
                totalPagar: String;
                fechaDeposito:String;
                aval:String;
                pagos?: (Pagos)[] | null;
              }
              export interface Pagos {
                estado: String;
                fechaPago: String;
                montoPagar: String;
                mora: String;
                totalMora: String;
              }
// Converts JSON strings to/from your types
export class Convert {
        public static toWelcome(json:any): JsonLoginDatos {
            return JSON.parse(JSON.stringify(json));
        }
}