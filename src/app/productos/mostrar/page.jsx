import axios from "axios";
import Boton from "@/components/productos/boton";
import BorrarProducto from "@/components/productos/borrar";
import EditarProducto from "@/components/productos/editar";

async function productos(){
    const url="http://localhost:3000/productos";
    const prod = await axios.get(url);
    return prod.data;
}
export default async function (){
    const producto = await productos();
    return(
        <div>
            <h1>Productos</h1>
            <p>Estas en productos</p>
            <table className="table">
             <thead>
                <tr>
                    <th>ID</th>
                    <th>Stock</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Editar</th>
                    <th>Borrar</th>
                </tr>
             </thead>
             <tbody>
             {
                    producto.map((producto,i)=>(
                        <tr key="{i}">
                            <td>{i+1}</td>
                            <td>{producto.cantidad}</td>
                            <td>{producto.nombre}</td>
                            <td>${producto.precio}</td>
                            <td>
                                <EditarProducto id={producto.id}/>
                            </td>
                            <td>
                                <BorrarProducto id={producto.id}/>
                            </td>
                        </tr>
                    ))
                }
             </tbody>
            </table>
            <Boton/>
        </div>
    );
}