export class ProveedorD {
    codProveedor: number;
    nombreProveedor: string;
    direccion: string;
    tipoProveedor: string;
    monedaProveedor: string;
    codPais: string;
    mail1: string;
    nit: string;
    grupoImpositivo: string;
    condicionesPago: string;


    toString():String{
        return this.codProveedor+' '+this.nombreProveedor;
    }
}