import React, {useContext} from 'react';
import {CurrentUserContext} from "../contexts/CurrentUserContext";

const Card = ({card, onCardClick, onCardDelete, onCardLike}) => {
    const currentUser = useContext(CurrentUserContext);
    const handleCardClick = () => {
        onCardClick(card);
    };
    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    const handleLikeClick = () => {
        onCardLike(card);
    }
    const handleDeleteClick = () => {
        onCardDelete(card);
    }

    return (
        <div className="element">
            <img src={card.link} alt={card.name}  className="element__image" onClick={handleCardClick}/>
                <h2 className="element__title">{card.name}</h2>
                <div className="element__likes">
                    <button className={`element__button element__button-like ${isLiked && 'element__button-like_active'}`}  type="button" onClick={handleLikeClick}></button>
                    <span className="element__like-counter">{card.likes.length}</span>
                </div>
            {isOwn && <button className="element__button element__button-delete" onClick={handleDeleteClick}></button>}
        </div>
    );
};

export default Card;