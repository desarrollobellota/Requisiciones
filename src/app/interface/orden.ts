import { RecLinea } from './rec-linea';

export class orden {
    numeroOC: number;
    linea: number;
    fechaOC: Date;
    bodega: string;
    producto: string;
    ubicacion: string;
    precioOriginal: number;
    precioUnitario: number;
    pendiente: number;
    cantidad: number;
    precioTotal: number;
    transaccion: string;
    factura: string;
    detalleRec: Array<RecLinea>=[];
    numeroReq: string;
    lote: string;
    idProvedor: string;
    nombreProveedor: string;
    descripcionProducto : string;
}
