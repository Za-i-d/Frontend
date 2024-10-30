'use client';
import axios from "axios";

async function nuevaVenta(e) {
    e.preventDefault();
    const url = "http://localhost:3000/ventas/nuevaVenta";

    // Obtener datos del formulario
    const cantidad = document.getElementById("cantidad").value;
    const nombreProducto = document.getElementById("nombre_prod").value;
    const nombreUsuario = document.getElementById("nombre_usu").value;

    // Hacer una petición al backend para obtener los IDs
    const usuarioResponse = await axios.get(`http://localhost:3000/usuarios/buscarPorNombre/${nombreUsuario}`);
    const productoResponse = await axios.get(`http://localhost:3000/productos/buscarPorNombre/${nombreProducto}`);

    // Verificar si los usuarios y productos fueron encontrados
    if (!usuarioResponse.data || !productoResponse.data) {
        alert("Usuario o producto no encontrado.");
        return;
    }

    const id_usu = usuarioResponse.data.id; // Suponiendo que el ID se devuelve así
    const id_prod = productoResponse.data.id; // Suponiendo que el ID se devuelve así

    const datos = {
        cantidad,
        id_prod,
        id_usu
    };

    const respuesta = await axios.post(url, datos);
    window.location.replace("/ventas/mostrar");
}

export default function Nuevo() {
    return (
        <div className="m-0 row justify-content-center">
            <form className="col-6 mt-5" onSubmit={nuevaVenta}>
                <div className="card">
                    <div className="card-header">
                        <h1>Nueva Venta</h1>
                    </div>
                    <div className="card-body">
                        <input id="cantidad" placeholder="Cantidad" autoFocus className="form-control mb-3" type="text" />
                        <input id="nombre_prod" placeholder="Nombre del producto" className="form-control mb-3" type="text" />
                        <input id="nombre_usu" placeholder="Nombre del usuario" className="form-control mb-3" type="text" />
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-danger col-12 mt-3 mb-3" type="submit">Guardar venta</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
