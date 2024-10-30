'use client'
import Link from "next/link";

export default function EditarVenta({ idVenta, idProd }) {
    return (
        <Link href={`/ventas/editar/${idVenta}?id_prod=${idProd}`}>Editar</Link>
    );
}
