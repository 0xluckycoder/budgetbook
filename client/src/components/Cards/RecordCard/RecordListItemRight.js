import styles from './recordListItemRight.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export const RecordListItemRight = () => {
    return (
        <div className={styles.closeWrapper}>
            <FontAwesomeIcon icon={faXmark} />
        </div>
    );
}