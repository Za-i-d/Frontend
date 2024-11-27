'use client'
import axios from 'axios'

async function verificarLogin(e) {
    e.preventDefault();
    console.log("Funciona verificar");
    const url = "http://localhost:3000/login";
    const datos = {
        usuario : document.getElementById("usuario").value,
        password : document.getElementById("password").value,
    }
    const usuario = await axios.post(url, datos);
    console.log(usuario.data);
    if (usuario.data.tipo == "usuario"){
        window.location.replace("/usuarios/mostrar")
    } else if (usuario.data.tipo == "admin") {
        window.location.replace("/usuarios/nuevo")
    } else {
        document.getElementById("msj").innerHTML = "Sus datos fueron incorrectos, vuelta a intentar"
    }
}

export default function Login() {
    return (
        <div className="m-0 row justify-content-center">
            <form onSubmit={verificarLogin} action="" className="col-6 mt-5">
                <div className="card">
                    <div className="card-header">
                        <h1>Login</h1>
                    </div>
                    <div className="card-body">
                        <input className="form-control mb-3 " id = "usuario" type = "text" placeholder = "Usuario" autoFocus />
                        <input className="form-control mb-3" id = "password" type = "text" placeholder = "Password" />
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-primary col-12" type="submit" >Iniciar sesion</button>
                        <div id = "msj" className='text-danger fs-3'></div>
                    </div>
                </div>
            </form>
        </div>
    )
}