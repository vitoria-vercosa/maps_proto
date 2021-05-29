import { ControlBingBoundaries } from '../ControlBingBoundaries';
import styles from './styles.module.scss';

export function ControlBar(props) {
    return (
        <div className={styles.controlBarContainer}>
            <header>
                <strong>Control Maps</strong>
            </header>
            <ControlBingBoundaries setLocalBoundary={props.setLocalBoundary} />
            <footer>

            </footer>
        </div>
    )
}