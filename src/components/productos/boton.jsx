'use client'
import Link from "next/link";
import axios from "axios";
export default function EditarProducto({id}){
    async function nuevoProducto() {
        //console.log("Estas en borrar"+id);
        const url="http://localhost:3000/productos/nuevoProducto";
        // const respuesta=await axios.delete(url);
        window.location.replace("/productos/nuevo");
    }
    return(
        <button href="" onClick={nuevoProducto}>Nuevo Producto</button>
    );
}