import { usuarioModel } from "../models/usuario.model";
import { axiosInstance } from "../config";
import Swal from "sweetalert2";

class usuarioModule {
    private _usuario: usuarioModel[] = []

    async iniciarSesion() {
        let datos: usuarioModel = {
            usuario: (document.querySelector("#usuario") as HTMLInputElement).value,
            contrasena: (document.querySelector("#password") as HTMLInputElement).value
        }

        await axiosInstance.post("login", datos).then((response) => {
            console.log("Respuesta del servidor:", response); // Verifica qué contiene la respuesta
            if (response.data.token) {
                sessionStorage.setItem("token", response.data.token);
                console.log("La acción fue realizada");
                Swal.fire({
                    icon: "success",
                    title: "Inicio de sesión exitoso",
                    text: "Redirigiendo...",
                    timer: 2000, // Espera 2 segundos antes de redirigir
                    showConfirmButton: false
                });

                // 🔹 Redirigir después de 2 segundos
                setTimeout(() => {
                    window.location.href = "pagina.html"; // 🔹 Cambia por tu URL de destino
                }, 2000);
            }
        }).catch(error => {
            console.log("Error en la solicitud", error)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Error al iniciar sesion",
            });
        })
    }
}

export default new usuarioModule();