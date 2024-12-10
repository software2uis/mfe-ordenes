export interface Pedido {
    productos: {
      idMongo: string,
      name: string;
      quantity: number;
      price: number;
      imageUrl: string;
    }[];
    metodoPago: string;
    descuentos: number;
    total: number;
  }
  