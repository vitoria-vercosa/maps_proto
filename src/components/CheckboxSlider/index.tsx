import styles from './styles.module.scss';

export function CheckboxSlider(props) {

    const getCheckBoxValue = (e) => {
        var check = document.getElementsByName('check')[0] as HTMLInputElement;
        props.setValueCheck(check.checked);
    }

    // getCheckBoxValue();
    // checkboxes[i].addEventListener('click', getValues, false);

    return (
        <>
            <span className={styles.spanSlider} >
                
                <label className={styles.switch}>
                    <input type="checkbox" name='check' onClick={getCheckBoxValue}/>
                    <span className={styles.slider }></span>
                </label>

            </span>
        </>
    )
}