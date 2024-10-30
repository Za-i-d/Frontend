import styles from './styles.css';

export default function Cargando (){
    return (
        <div className={styles.loadingText}>
            <h1 className={styles.loadingText}>Esperando a que lleguen los usuarios...</h1>
        </div>
    );
}