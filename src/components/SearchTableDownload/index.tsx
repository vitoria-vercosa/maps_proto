import styles from './styles.module.scss';

export function SearchTableDownload(){

    const onsubmit = (e) => {
        e.preventDefault();
    }
    
    return(
        <div className={styles.searchTable}>
            <h1>Result(18)</h1>
            <form className={styles.searchArea}>
                <input type="text" className={styles.inputSearch}/>
                <input type="submit" value="Download" className={styles.downloadBtn} onClick={onsubmit}/>
            </form>
        </div>

    )
}