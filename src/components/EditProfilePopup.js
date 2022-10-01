import React, {useContext, useState, useEffect} from 'react';
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

const EditProfilePopup = ({ onUpdateUser, ...props}) => {
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const handleSubmit = (evt) => {
        evt.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }
    const handleNameChange = (evt) => {
        setName(evt.target.value)
    }
    const handleDescriptionChange = (evt) => {
        setDescription(evt.target.value)
    }

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    return (
        <PopupWithForm
            name={"profile"}
            title={"Редактировать профиль"}
            buttonText={"Сохранить"}
            onSubmit={handleSubmit}
            {...props}
        >
            <input
                type="text"
                name="name"
                placeholder="Имя"
                id="name-input"
                className="popup__input popup__input_type_name"
                minLength="2"
                maxLength="40"
                value={ name || ''}
                onChange={handleNameChange}
                required
            />
            <span className="popup__input-error name-input-error"/>
            <input
                type="text"
                name="about"
                placeholder="О себе"
                id="about-input"
                className="popup__input popup__input_type_description"
                minLength="2"
                maxLength="200"
                value={description || ''}
                onChange={handleDescriptionChange}
                required
            />
            <span className="popup__input-error about-input-error"></span>
        </PopupWithForm>
    );
};

export default EditProfilePopup;