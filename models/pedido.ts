export interface Pedido {
    productos: {
      nombre: string;
      cantidad: number;
      precio: number;
      imagen?:string;
    }[];
    metodoPago: string;
    descuentos: number;
    total: number;
  }
  