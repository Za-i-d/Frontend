'use client'
import Link from "next/link";
import axios from "axios";
export default function EditarUsuario({id}){
    async function nuevoUsuario() {
        //console.log("Estas en borrar"+id);
        const url="http://localhost:3000/usuarios/nuevoUsuario";
        // const respuesta=await axios.delete(url);
        window.location.replace("/usuarios/nuevo");
    }    
    return(
        <button href="" onClick={nuevoUsuario}>Nuevo Usuario</button>
    );
}