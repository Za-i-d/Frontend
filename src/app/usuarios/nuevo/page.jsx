'use client'
import axios from "axios";
async function nuevoUsuario(e){
    e.preventDefault();
    //console.log("Estas en nuevo usu");
    const url="http://localhost:3000/usuarios/nuevoUsuario";
    const datos={
        nombre:document.getElementById("nombre").value,
        usuario:document.getElementById("usuario").value,
        password:document.getElementById("password").value

    }
   // console.log(datos); 
   const respuesta=await axios.post(url,datos);
   //console.log(respuesta.data);
   location.replace("http://localhost:3001/usuarios/mostrar");
};
export default function Nuevo() {
    return(
        <div className="m-0 row justify-content-center">
            <form className="col-6 mt-5" onSubmit={nuevoUsuario} action="" method="post">
                <div className="card">
                    <div className="card-header">
                        <h1>Nuevo Usuario</h1>
                    </div>
                    <div className="card-body">
                        <input id="nombre" placeholder="Nombre" autoFocus className="form-control mb-3" type="text" />
                        <input id="usuario" placeholder="Usuario" className="form-control mb-3" type="text" />
                        <input id="password" placeholder="Password" className="form-control mb-3" type="text" />
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-danger col-12 mt-3 mb-3" type="submit">Guardar usuario</button>
                    </div>
                </div>
            </form>
        </div>
    );
}