export default function Noticia({params}) {
    return (
        <>
        <h1>Estas en noticia</h1>
        <p>{params.id}</p>
        </>
    );
}