export default async function Info({params}) {
    var source = await fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`);
    if (source.ok){
        const usuario = await source.json();
        return (
            <>
            <h1>Esta es la informacion de: {usuario.name}</h1>
            <p><strong>Username: </strong> {usuario.username}</p>
            <p><strong>Email: </strong> {usuario.email}</p>
            <p><strong>Teléfono: </strong> {usuario.phone}</p>
            <p><strong>Sitio web: </strong> {usuario.website}</p>
            <h2>Dirección: </h2>
            <p>{usuario.address.street}, {usuario.address.suite}, {usuario.address.city}, {usuario.address.zipcode}</p>
            <h2>Compañía: </h2>
            <p><strong>Nombre: </strong> {usuario.company.name}</p>
            <p><strong>Frase: </strong> {usuario.company.catchPhrase}</p>
            <p><strong>BS: </strong> {usuario.company.bs}</p>
            </>
        );
    } else{
        return (
            <p> Usuario no encontrado </p>
        );
    }
}