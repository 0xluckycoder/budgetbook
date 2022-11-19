import React, { useState } from 'react';
import { Modal } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faMagnifyingGlassPlus } from '@fortawesome/free-solid-svg-icons';
import styles from './imagePreview.module.scss';


export const ImagePreview = ({ imageSrc, setImageState, imageState, inputState, hideDelete }) => {

    const [isHover, setIsHover] = useState(false);
    const handleMouseEnter = () => setIsHover(true);
    const handleMouseLeave = () =>  setIsHover(false);
    const handleTrigger = () => setIsHover(isHover => !isHover);
    const [zoomModal, setZoomModal] = useState(false);
    
    const handleDelete = () => {
        // identify whether its a url value or blob value
        if (imageState.photos && hideDelete === false) {
            // if url
            const filteredUrls = imageState.photos.filter(url => url !== imageSrc);
            // setImageState({ photos: filteredUrls });
            setImageState({...inputState, photos: filteredUrls});
        } else {
            // if blob
            const filteredBlobs = imageState.filter(file => file.blob !== imageSrc);
            setImageState(filteredBlobs);
        }
    }



    return (
        <div 
            onMouseEnter={() => handleMouseEnter()}
            onMouseLeave={() => handleMouseLeave()}
            onClick={() => handleTrigger()}  
            className={styles.imagePreview}
        >
            <Modal
                title="Image"
                centered
                open={zoomModal}
                onCancel={() => setZoomModal(false)}
                footer={[]}
            >
                <div className={styles.zoomedImage}>
                    <img draggable="false" src={imageSrc} alt="zoom" />
                </div>
            </Modal>
            <img src={imageSrc} alt="uploaded slide item" />
            {isHover &&
                <div className={styles.iconPanel}>
                    {
                        hideDelete || <FontAwesomeIcon 
                                            onClick={() => handleDelete()} 
                                            className={styles.delete} 
                                            icon={faTrash} 
                                        />
                    }
                    <FontAwesomeIcon 
                        onClick={() => setZoomModal(true)} 
                        className={styles.zoom} 
                        icon={faMagnifyingGlassPlus} 
                    />
                </div>
            }
        </div>
    );
}