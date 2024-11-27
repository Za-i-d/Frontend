'use client';
import { useState } from 'react';
import axios from "axios";
import Autocomplete from '@/components/busquedas/buscadorProductos';

async function nuevaVenta(e, cantidad, id_prod, id_usu) {
    e.preventDefault();
    const url = "http://localhost:3000/ventas/nuevaVenta";

    const datos = {
        cantidad,
        id_prod,
        id_usu
    };

    try {
        await axios.post(url, datos);
        window.location.replace("/ventas/mostrar");
    } catch (error) {
        console.error("Error saving sale:", error);
    }
}

export default function Nuevo() {
    const [cantidad, setCantidad] = useState('');
    const [id_prod, setIdProd] = useState(null);
    const [id_usu, setIdUsu] = useState(null);

    return (
        <div className="m-0 row justify-content-center">
            <form className="col-6 mt-5" onSubmit={(e) => nuevaVenta(e, cantidad, id_prod, id_usu)}>
                <div className="card">
                    <div className="card-header">
                        <h1>Nueva Venta</h1>
                    </div>
                    <div className="card-body">
                        <input
                            id="cantidad"
                            placeholder="Cantidad"
                            className="form-control mb-3"
                            type="text"
                            value={cantidad}
                            onChange={(e) => setCantidad(e.target.value)}
                        />
                        
                        {/* Autocompletado para Nombre del Producto */}
                        <Autocomplete
                            placeholder="Nombre del producto"
                            searchUrl="http://localhost:3000/productos/buscarPorNombre"
                            onSelect={(producto) => setIdProd(producto.id)}
                        />

                        {/* Autocompletado para Nombre del Usuario */}
                        <Autocomplete
                            placeholder="Nombre del usuario"
                            searchUrl="http://localhost:3000/usuarios/buscarPorNombre"
                            onSelect={(usuario) => setIdUsu(usuario.id)}
                        />
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-danger col-12 mt-3 mb-3" type="submit" disabled={!id_prod || !id_usu}>
                            Guardar venta
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
