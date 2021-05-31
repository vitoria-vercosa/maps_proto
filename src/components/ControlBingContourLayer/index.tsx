import styles from './styles.module.scss';

export function ControlBingContourLayer() {
    return (
        <div className={styles.controlItemSection}>
            <header>
                <p>Bingmaps with ContourLayer</p>
            </header>
            <main>
                <span style={{'display':'inline-block'}}>
                    
                    <label className={styles.switch}>
                        <input type="checkbox" />
                        <span className={styles.slider }></span>
                    </label>
                </span>
            </main>

        </div>
    )
}