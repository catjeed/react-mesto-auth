import React, { useState, useEffect } from 'react';
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = ({ onAddPlace, ...props}) => {
    const [ name, setName ] = useState('');
    const [ link, setLink] = useState('');
    const handleSubmit = (evt) => {
        evt.preventDefault();
        onAddPlace({
            name,
            link
        })
    }

    useEffect(() => {
        setName('');
        setLink('');
    }, [props.isOpen]);

    const handleTitleChange = (evt) => {
        setName(evt.target.value)
    }
    const handleLinkChange = (evt) => {
        setLink(evt.target.value)
    }
    return (
        <PopupWithForm
            name={"place"}
            title={"Новое место"}
            buttonText={"Сохранить"}
            onSubmit={handleSubmit}
            {...props}
        >
            <input
                type="text"
                name="place"
                placeholder="Название"
                id="title-input"
                className="popup__input popup__input_type_title"
                minLength="2"
                maxLength="30"
                value={name}
                required
                onChange={handleTitleChange}
            />
            <span className="popup__input-error title-input-error"/>
            <input
                type="url"
                name="link"
                placeholder="Ссылка на картинку"
                id="link-input"
                className="popup__input popup__input_type_link"
                required
                value={link}
                onChange={handleLinkChange}
            />
            <span className="popup__input-error link-input-error"/>
        </PopupWithForm>
    );
};

export default AddPlacePopup;