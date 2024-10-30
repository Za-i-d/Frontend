'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';

async function nuevoUsuario(e, { params, nombre, usuario, password }) {
    e.preventDefault();
    const url = `http://localhost:3000/usuarios/editarUsuario/${params.id}`;
    const datos = { nombre, usuario, password };
    const respuesta = await axios.put(url, datos);
    window.location.replace("/usuarios/mostrar");
}

export default function Nuevo({ params }) {
    const [usuarios, setUsuarios] = useState({
        nombre: '',
        usuario: '',
        password: ''
    });

    useEffect(() => {
        async function fetchUserData() {
            const source = await fetch(`http://localhost:3000/usuarios/buscarPorId/${params.id}`);
            if (source.ok) {
                const data = await source.json();
                setUsuarios(data);
            }
        }
        fetchUserData();
    }, [params.id]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setUsuarios((prev) => ({ ...prev, [id]: value }));
    };

    return (
        <div className="m-0 row justify-content-center">
            <form className="col-6 mt-5" onSubmit={(e) => nuevoUsuario(e, { params, ...usuarios })}>
                <div className="card">
                    <div className="card-header">
                        <h1>Editar el usuario: {usuarios.nombre}</h1>
                    </div>
                    <div className="card-body">
                        <input id="nombre" placeholder="Nombre" autoFocus className="form-control mb-3" type="text" value={usuarios.nombre} onChange={handleChange} />
                        <input id="usuario" placeholder="Usuario" className="form-control mb-3" type="text" value={usuarios.usuario} onChange={handleChange} />
                        <input id="password" placeholder="Password" className="form-control mb-3" type="text" value={usuarios.password} onChange={handleChange} />
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-danger col-12 mt-3 mb-3" type="submit">Guardar usuario</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
