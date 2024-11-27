'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

async function editarVentas(e, { params, cantidad, id_prod, id_usu }) {
    e.preventDefault();

    const url = `http://localhost:3000/ventas/editarVenta/${params.id}`;
    const datos = { cantidad, id_prod, id_usu }; // Solo envía los IDs y la cantidad
    try {
        const respuesta = await axios.put(url, datos);
        window.location.replace("/ventas/mostrar");
    } catch (error) {
        console.error("Error al editar la venta:", error);
    }
}

export default function Nuevo({ params }) {
    const searchParams = useSearchParams();
    const id_prod = searchParams.get('id_prod');
    const id_usu = searchParams.get('id_usu');

    const [ventas, setVentas] = useState({
        cantidad: '',
        nombreProducto: '',
        nombreUsuario: '',
        id_prod: id_prod || '', // Almacena los IDs
        id_usu: id_usu || ''
    });
    const [sugerenciasProductos, setSugerenciasProductos] = useState([]);
    const [sugerenciasUsuarios, setSugerenciasUsuarios] = useState([]);

    useEffect(() => {
        async function fetchVentData() {
            if (id_prod) {
                const prodResponse = await fetch(`http://localhost:3000/productos/buscarPorId/${id_prod}`);
                if (prodResponse.ok) {
                    const prodData = await prodResponse.json();
                    setVentas((prev) => ({ ...prev, nombreProducto: prodData.nombre }));
                }
            }
            if (id_usu) {
                const usuResponse = await fetch(`http://localhost:3000/usuarios/buscarPorId/${id_usu}`);
                if (usuResponse.ok) {
                    const usuData = await usuResponse.json();
                    setVentas((prev) => ({ ...prev, nombreUsuario: usuData.nombre }));
                }
            }
        }
        fetchVentData();
    }, [id_prod, id_usu]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setVentas((prev) => ({ ...prev, [id]: value }));
        if (id === "nombreProducto") buscarSugerenciasProductos(value);
        else if (id === "nombreUsuario") buscarSugerenciasUsuarios(value);
    };

    const buscarSugerenciasProductos = async (query) => {
        if (query.length >= 2) {
            const response = await axios.get(`http://localhost:3000/productos/buscarPorNombre/${query}`);
            setSugerenciasProductos(response.data);
        } else setSugerenciasProductos([]);
    };

    const buscarSugerenciasUsuarios = async (query) => {
        if (query.length >= 2) {
            const response = await axios.get(`http://localhost:3000/usuarios/buscarPorNombre/${query}`);
            setSugerenciasUsuarios(response.data);
        } else setSugerenciasUsuarios([]);
    };

    const seleccionarSugerenciaProducto = (producto) => {
        setVentas((prev) => ({ ...prev, nombreProducto: producto.nombre, id_prod: producto.id })); // Asigna el ID y el nombre
        setSugerenciasProductos([]);
    };

    const seleccionarSugerenciaUsuario = (usuario) => {
        setVentas((prev) => ({ ...prev, nombreUsuario: usuario.nombre, id_usu: usuario.id })); // Asigna el ID y el nombre
        setSugerenciasUsuarios([]);
    };

    return (
        <div className="m-0 row justify-content-center">
            <form className="col-6 mt-5" onSubmit={(e) => editarVentas(e, { params, ...ventas })}>
                <div className="card">
                    <div className="card-header">
                        <h1>Editar la venta</h1>
                    </div>
                    <div className="card-body">
                        <input
                            id="cantidad"
                            placeholder="Cantidad"
                            className="form-control mb-3"
                            type="text"
                            value={ventas.cantidad}
                            onChange={handleChange}
                        />
                        <input
                            id="nombreProducto"
                            placeholder="Nombre del Producto"
                            className="form-control mb-3"
                            type="text"
                            value={ventas.nombreProducto}
                            onChange={handleChange}
                        />
                        {sugerenciasProductos.length > 0 && (
                            <ul className="list-group mb-3">
                                {sugerenciasProductos.map((prod) => (
                                    <li
                                        key={prod.id}
                                        className="list-group-item"
                                        onClick={() => seleccionarSugerenciaProducto(prod)}
                                    >
                                        {prod.nombre}
                                    </li>
                                ))}
                            </ul>
                        )}
                        <input
                            id="nombreUsuario"
                            placeholder="Nombre del Usuario"
                            className="form-control mb-3"
                            type="text"
                            value={ventas.nombreUsuario}
                            onChange={handleChange}
                        />
                        {sugerenciasUsuarios.length > 0 && (
                            <ul className="list-group mb-3">
                                {sugerenciasUsuarios.map((usu) => (
                                    <li
                                        key={usu.id}
                                        className="list-group-item"
                                        onClick={() => seleccionarSugerenciaUsuario(usu)}
                                    >
                                        {usu.nombre}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-danger col-12 mt-3 mb-3" type="submit">Guardar cambios</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
