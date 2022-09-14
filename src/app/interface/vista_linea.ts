import { ProductoD } from './productoD';
export class vista_linea {
    id:number;
    idRequisicion: number;
    codProduct: ProductoD;
    cantidad: number;
    valorUnidad: number;
    fechaRequerida: string;
    centroCostos: string;
    tipo: string;
    fechaCompras: string;
    observacion:string
}