import React from 'react';

const PopupWithForm = ({name, title, isOpen, onClose, children, buttonText, onSubmit}) => {
    return (
        <div className={`popup popup_type_${name} ${isOpen ? `popup_opened` : ''}`}>
            <div className={`popup__container popup__container_type_${name}`}>
                <h2 className="popup__title">{title}</h2>
                <form className={`popup__form popup__form_type_${name}`} name={name} onSubmit={onSubmit} >
                    {children}
                    <button type="submit" className="popup__save-button">{buttonText}</button>
                </form>
                <button type="button" className="popup__close-button" onClick={onClose}></button>
            </div>
        </div>
    );
};

export default PopupWithForm;