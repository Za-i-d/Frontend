import axios from "axios";
import Boton from "@/components/ventas/boton";
import BorrarVenta from "@/components/ventas/borrar";
import EditarVenta from "@/components/ventas/editar";

async function obtenerVentas() {
    const url = "http://localhost:3000/ventas";
    const response = await axios.get(url);
    return response.data;
}

// Función para obtener usuario por ID desde el backend
async function obtenerUsuarioPorId(id) {
    const url = `http://localhost:3000/usuarios/buscarPorId/${id}`;
    const response = await axios.get(url);
    console.log(response.data);
    return response.data.nombre; // Suponiendo que el nombre está en response.data.nombre
}

// Función para obtener producto por ID desde el backend
async function obtenerProductoPorId(id) {
    const url = `http://localhost:3000/productos/buscarPorId/${id}`;
    const response = await axios.get(url);
    return response.data.nombre; // Suponiendo que el nombre está en response.data.nombre
}

export default async function Ventas() {
    const ventas = await obtenerVentas();
    // Mapea cada venta para incluir nombre del usuario y producto
    const ventasConNombres = await Promise.all(
        ventas.map(async (venta) => ({
            ...venta,
            nombreUsuario: await obtenerUsuarioPorId(venta.id_usu),
            nombreProducto: await obtenerProductoPorId(venta.id_prod),
        }))
    );

    // Filtra las ventas para excluir aquellas cuyo estado es "Cancelada"
    const ventasFiltradas = ventasConNombres.filter(venta => venta.estado !== "Cancelada");

    return (
        <div>
            <h1>Ventas</h1>
            <p>Estas en ventas</p>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Usuario</th>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Estado</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Editar</th>
                        <th>Cancelar</th>
                    </tr>
                </thead>
                <tbody>
                    {ventasFiltradas.map((venta, i) => (
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{venta.nombreUsuario}</td>
                            <td>{venta.nombreProducto}</td>
                            <td>{venta.cantidad}</td>
                            <td>{venta.estado}</td>
                            <td>{venta.fecha}</td>
                            <td>{venta.hora}</td>
                            <td>
                                <EditarVenta idVenta={venta.id} idProd={venta.id_prod} idUsu = {venta.id_usu} />
                            </td>
                            <td>
                                <BorrarVenta id={venta.id} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Boton />
        </div>
    );
}
