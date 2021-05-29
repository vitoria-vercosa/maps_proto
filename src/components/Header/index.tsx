import styles from './styles.module.scss'

export function Header() {
    return (
        <header className={styles.headerContainer}>
            <img src="./Dell Logo.svg" alt="Dell - Service Coverage Modernization"></img>
            <p>Experimenting Maps for the Service Coverage Modernization System</p>
            <span>Dell Lead</span>
        </header>
    )
}