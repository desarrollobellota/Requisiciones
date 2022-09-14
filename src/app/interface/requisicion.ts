import { detalleReq } from './linea';

export class Requisicion {
    idReq: number;
    fechaCreacion: Date;
    fechaModificacion: Date;
    idRequisitor: string;
    idModifico: string;
    puntoEnvio: string;
    idArea: string;
    valorReq: number;
    idAlmacen: string;
    codProveedor: number;
    moneda: string;
    estado: string;
    comentario: string;
    lanzar:boolean;
    secuenciaAprobacion:number;
    idAprobador:string;
    nombreRequisitor:string;
    correo:string;
    idReqLx:number;
    idComprador:string;
    legalizacion:boolean;
    numeroOrdenCompra:number;
    errorLx:string;
    detalleReq: Array<detalleReq>=[];
    comentario_comprador:string;
    tipo:string;
}
