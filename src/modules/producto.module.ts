import { productoModel, listaProductoModel, editarProductos } from "../models/producto.model";
import { axiosInstance } from "../config";
import Swal from 'sweetalert2'
import { data } from "jquery";
const ListaProductos = require("./../components/ListaProductos.hbs")
const editarProductosVista = require('./../components/editarProductosVista.hbs')

class productoModule {
    private _productos: productoModel[] = [];
    private _listaProductoModel: listaProductoModel[] = [];
    private _editarRegistros: editarProductos[] = [];

    async crear() {
        let datos: productoModel = {
            nombre_producto: (document.querySelector("#NombreProducto") as HTMLInputElement).value,
            precio: parseInt((document.querySelector("#PrecioProducto") as HTMLInputElement).value),
            cantidad: parseInt((document.querySelector("#CantidadProducto") as HTMLInputElement).value)
        }

        await axiosInstance.post("productos", datos).then((response) => {
            console.log("Respuesta del servidor:", response); // Verifica qué contiene la respuesta
            if (response.data.status) {
                console.log("La acción fue realizada");
                Swal.fire("Exitoso!", "Preciona el boton!", "success");
            }
        }).catch(error => {
            console.log("Error en la solicitud", error)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Error al guardar",
            });
        })
    }

    async listarProductos() {
        // Usando axiosInstance para obtener datos
        axiosInstance.get("productos").then(({ data }) => {
            // Asegurarse de que la respuesta tiene la estructura esperada
            if (data.status) {
                // Declarar y asignar la variable correctamente
                let productos = data.list;

                // Corregir 'inerHTML' a 'innerHTML'
                (document.querySelector("#tablaPrdoctos") as HTMLElement).innerHTML = ListaProductos({ productos });
            }
        }).catch(error => {
            console.log("Error en la solicitud", error)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Error al listar",
            });
        })
    }

    async mostrarInformacionProductos(id: any) {
        axiosInstance.get(`productos/${id}`).then(({ data }) => {
            if (data.status) {

                let productosEditar = data.item;

                // Obtener el contenedor del formulario de edición e inyectar los datos
                const formEditarElement = document.querySelector("#formEditar") as HTMLElement;
                formEditarElement.innerHTML = editarProductosVista({ productosEditar });

                // Guardar el ID del producto en el formulario (para enviarlo más tarde)
                (document.querySelector("#formEditar") as HTMLElement).setAttribute('data-id', id.toString());


                const formEditar = document.getElementById("productoEditar");
                if (formEditar) {
                    formEditar.style.display = "block"; // Mostrar el formulario
                }
                console.log(data.item);
            }
        }).catch(error => {
            console.error("Error al obtener el producto:", error);
        });
    }

    async cerraFormulario() {
        const formEditar = document.getElementById("productoEditar");
        if (formEditar) {
            formEditar.style.display = "none"; // Oculta el formulario de edición
        }
    }

    async editarRegistro(id: any) {
        let editar: editarProductos = {
            nombre_producto: (document.querySelector("#editarNombreProducto") as HTMLInputElement).value,
            precio: parseInt((document.querySelector("#editarPrecio") as HTMLInputElement).value),
            cantidad: parseInt((document.querySelector("#editarCantidad") as HTMLInputElement).value)
        }

        axiosInstance.put(`productos/${id}`, editar).then(({ data }) => {
            console.log("Respuesta del servidor:", data); // Verifica qué contiene la respuesta
            if (data.status) {
                console.log("La acción fue realizada");
                Swal.fire("Exitoso!", "Preciona el boton!", "success");
            }
        }).catch(error => {
            console.log("Error en la solicitud", error)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Error al guardar",
            });
        })
    }

}

export default new productoModule();