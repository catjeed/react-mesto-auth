import {useEffect, useState} from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from "../utilities/Api";
import * as auth from '../utilities/auth';
import AddPlacePopup from "./AddPlacePopup";
const App = () => {
    const [ isEditProfilePopupOpen, setEditProfilePopupOpen ] = useState(false);
    const [ isAddPlacePopupOpen, setAddPlacePopupOpen ] = useState(false);
    const [ isEditAvatarPopupOpen, setEditAvatarPopupOpen ] = useState(false);
    const [ selectedCard, setSelectedCard ] = useState({});
    const [ currentUser, setCurrentUser ] = useState('');
    const [ cards, setCards ] = useState([]);

    const handleCardClick = (card) => {
        setSelectedCard(card)
    };
    const handleEditAvatarClick = () => {
        setEditAvatarPopupOpen(true);
    };
    const handleEitProfileClick = () => {
        setEditProfilePopupOpen(true);
    };
    const handleAddPlaceClick = () => {
        setAddPlacePopupOpen(true);
    };
    const closeAllPopups = () => {
        setEditProfilePopupOpen(false)
        setAddPlacePopupOpen(false)
        setEditAvatarPopupOpen(false)
        setSelectedCard({});
    }
    const handleUpdateUser = (user) => {
        api.editUserInfo(user)
            .then((userData) => {
                setCurrentUser(userData);
                closeAllPopups();
        })
            .catch(err => console.log(err))
    }
    const handleUpdateAvatar = (data) => {
        api.editUserAvatar(data)
            .then((userAvatar) => {
                setCurrentUser(userAvatar);
                closeAllPopups()
            })
            .catch(err => console.log(err))
    }

    const handleCardLike = (card) => {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
            .catch(err => console.log(err))
    }

    const handleCardDelete = (card) => {
        api.deleteCard(card._id)
            .then(() => {
                setCards((cards) => cards.filter((c) => c._id !== card._id))
            })
            .catch(err => console.log(err))
    }

    const handleUpdatePlace = (data) => {
        api.addNewCard(data)
            .then((card) => {
                setCards([card, ...cards]);
                closeAllPopups()
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        api.getUserInfo()
            .then((res) => setCurrentUser(res))
            .catch((err) => console.log(err))
    }, []);

    useEffect(() => {
        api.getInitialCards()
            .then((res) => setCards(res))
            .catch((err) => console.error(err));
    }, []);

    return (
        <CurrentUserContext.Provider value={currentUser}>
        <div className={'page'}>
            <Header/>
            <Main
                onEditProfile={handleEitProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
            />
            <Footer/>
            <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
            <AddPlacePopup onAddPlace={handleUpdatePlace} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
            <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
            <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
        </div>
        </CurrentUserContext.Provider>
    );
};

export default App;