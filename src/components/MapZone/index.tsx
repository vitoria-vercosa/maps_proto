import { BingMaps } from '../BingMaps';
import styles from './styles.module.scss';

export function MapZone (props) {
    return (
        <div className={styles.mapzoneContainer}>
            <BingMaps localBoundary={props.localBoundary}/>
        </div>
    )
}