'use client'
import Link from "next/link";
import axios from "axios";
export default function nuevaVenta({id}){
    async function venta() {
        //console.log("Estas en borrar"+id);
        const url="http://localhost:3000/ventas/nuevaVenta";
        // const respuesta=await axios.delete(url);
        window.location.replace("/ventas/nuevo");
    }
    return(
        <button className="btn btn-outline-success  mt-3 mb-3" href="" onClick={venta}>Nueva venta</button>
    );
}