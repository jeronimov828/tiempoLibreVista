export interface productoModel {
    nombre_producto: string;
    precio: number;
    cantidad: number;
}

export interface listaProductoModel {
    id_producto: Number,
    nombre_producto: string,
    precio: number,
    cantidad: number,
    fecha_ingreso: Date
}

export interface editarProductos {
    nombre_producto: string,
    precio: number,
    cantidad: number,
}