
import axios from "axios";
import Boton from "@/components/usuarios/boton";
import BorrarUsuario from "@/components/usuarios/borrar";
import EditarUsuario from "@/components/usuarios/editar";

async function getSessionUsuario(){
    console.log("Estas en getSession");
    const url = "http://localhost:3000/getSessionUsuario"
    const sessionValida = await axios.get(url);
    console.log(sessionValida.data);
    
}

async function usuarios(){
    const url="http://localhost:3000/usuarios";
    const usuarios = await axios.get(url);
    return usuarios.data;
}
export default async function (){
    await getSessionUsuario();
    const usuario = await usuarios();
    return(
        <div>
            <h1>Usuarios</h1>
            <p>Estas en usuarios</p>
            <table className="table">
             <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Tipo de usuario</th>
                    <th>Editar</th>
                    <th>Borrar</th>
                </tr>
             </thead>
             <tbody>
             {
                    usuario.map((usuario,i)=>(
                        <tr key="{i}">
                            <td>{i+1}</td>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.usuario}</td>
                            <td>
                                <EditarUsuario id={usuario.id}/>
                            </td>
                            <td>
                                <BorrarUsuario id={usuario.id}/>
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