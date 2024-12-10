export interface OrdenDTO {
  id:                    number;
  fechaCreacion?:         Date;
  estado?:                string;
  cliente:               Cliente;
  items:                 Item[];
  total:                 number;
  direccionEnvio:        string;
  ciudadEnvio:           string;
  codigoPostalEnvio:     string;
  costoEnvio:            number;
  descuentoAplicado:     number;
  tiempoEstimadoEntrega: string;
}

export interface Cliente {
  id:            number;
  nombres:       string;
  apellidos:     string;
  numeroCedula:  null;
  email:         string;
  numeroCelular: null;
}

export interface Item {
  id:       string;
  nombre:   string;
  precio:   number;
  cantidad: number;
}

export interface OrdenProduct {
  id:       string;
  nombre:   string;
  precio:   number;
  cantidad: number;
  orden:   number;
  total :  number;
  estado : string;
  fechaCreacion : Date;
}

