'use client'
import Link from "next/link";
import axios from "axios";
export default function BorrarVentas({id}){
    async function borrar() {
        //console.log("Estas en borrar"+id);
        const url="http://localhost:3000/ventas/cambiarEstatus/"+id;
        const respuesta=await axios.put(url);
        window.location.replace("/ventas/mostrar");
    }    
    return(
        <Link href="" onClick={borrar}>cancelar venta</Link>
    );
}