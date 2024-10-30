'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';

async function nuevoProducto(e, { params, cantidad, nombre, precio }) {
    e.preventDefault();
    const url = `http://localhost:3000/productos/editarProducto/${params.id}`;
    const datos = { cantidad, nombre, precio };
    const respuesta = await axios.put(url, datos);
    window.location.replace("/productos/mostrar");
}

export default function Nuevo({ params }) {
    const [productos, setProductos] = useState({
        cantidad: '',
        nombre: '',
        precio: ''
    });

    useEffect(() => {
        async function fetchProdData() {
            const source = await fetch(`http://localhost:3000/productos/buscarPorId/${params.id}`);
            if (source.ok) {
                const data = await source.json();
                setProductos(data);
            }
        }
        fetchProdData();
    }, [params.id]);
    
    const handleChange = (e) => {
        const { id, value } = e.target;
        setProductos((prev) => ({ ...prev, [id]: value }));
    };

    return (
        <div className="m-0 row justify-content-center">
            <form className="col-6 mt-5" onSubmit={(e) => nuevoProducto(e, { params, ...productos })}>
                <div className="card">
                    <div className="card-header">
                        <h1>Editar el producto: {productos.nombre}</h1>
                    </div>
                    <div className="card-body">
                        <input id="cantidad" placeholder="Cantidad" autoFocus className="form-control mb-3" type="text" value={productos.cantidad} onChange={handleChange} />
                        <input id="nombre" placeholder="Nombre" className="form-control mb-3" type="text" value={productos.nombre} onChange={handleChange} />
                        <input id="precio" placeholder="Precio" className="form-control mb-3" type="text" value={productos.precio} onChange={handleChange} />
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-danger col-12 mt-3 mb-3" type="submit">Guardar cambios</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
