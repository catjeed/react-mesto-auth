import React, {useEffect, useRef} from 'react';
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = ({onUpdateAvatar, ...props}) => {
    const inputRef = useRef();
    const handleSubmit = (evt) => {
        evt.preventDefault();
        onUpdateAvatar({
            avatar: inputRef.current.value,
        })
    }
    useEffect(() => {
        inputRef.current.value='';
    }, [props.isOpen]);

    return (
        <PopupWithForm
            name={"change-avatar"}
            title={"Обновить аватар"}
            buttonText={"Сохранить"}
            onSubmit={handleSubmit}
            {...props}
        >
            <input
                ref={inputRef}
                type="url"
                name="avatar"
                placeholder="Ссылка на картинку"
                id="avatar-link-input"
                className="popup__input popup__input_type_avatar-link"
                required
            />
            <span className="popup__input-error avatar-link-input-error"></span>
        </PopupWithForm>
    );
};

export default EditAvatarPopup;