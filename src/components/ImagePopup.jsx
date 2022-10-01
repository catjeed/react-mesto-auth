import React from "react";
import '../index.css';

const ImagePopup = ({card, onClose}) => {

    const handlePopupOverlayClose = (evt) => {
        if (evt.target.classList.contains('popup')) onClose();
    }

    return (
        <div className={`popup popup_type_image ${card.link && 'popup_opened'}`} onClick={handlePopupOverlayClose}>
            <div className="popup__container popup__container_type_image">
                <figure className="popup__card">
                    <img src={card.link} alt={card.name} className="popup__image" />
                        <figcaption className="popup__image-caption">{card.name}</figcaption>
                        <button type="button" className="popup__close-button" onClick={onClose}></button>
                </figure>
            </div>
        </div>
    )
}

export default ImagePopup