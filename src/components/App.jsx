import {useEffect, useState} from 'react';
import { Route, Switch, Redirect, useHistory} from 'react-router-dom';
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from "../utilities/Api";
import * as auth from '../utilities/auth';
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";

const App = () => {
    const [ isEditProfilePopupOpen, setEditProfilePopupOpen ] = useState(false);
    const [ isAddPlacePopupOpen, setAddPlacePopupOpen ] = useState(false);
    const [ isEditAvatarPopupOpen, setEditAvatarPopupOpen ] = useState(false);
    const [ selectedCard, setSelectedCard ] = useState({});
    const [ currentUser, setCurrentUser ] = useState('');
    const [ cards, setCards ] = useState([]);
    const [currentEmail, setCurrentEmail] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
    const [isSuccessRegister, setIsSuccessRegister] = useState(false);
    const history = useHistory()

    const handleCardClick = (card) => {
        setSelectedCard(card)
    };
    const handleEditAvatarClick = () => {
        setEditAvatarPopupOpen(true);
    };
    const handleEditProfileClick = () => {
        setEditProfilePopupOpen(true);
    };
    const handleAddPlaceClick = () => {
        setAddPlacePopupOpen(true);
    };
    const closeAllPopups = () => {
        setEditProfilePopupOpen(false)
        setAddPlacePopupOpen(false)
        setEditAvatarPopupOpen(false)
        setIsRegisterPopupOpen(false)
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

    const handleRegister = ({email, password}) => {
        auth.register(email, password).then(() => {
            setIsSuccessRegister(true);
            setIsRegisterPopupOpen(true);
            history.push('/sign-in')
        })
            .catch(err => {
                console.log(err)
                setIsSuccessRegister(false);
                setIsRegisterPopupOpen(true);
            })
    }

    const handleLogin = ({email, password}) => {
        auth.login(email, password).then((res) => {
            localStorage.setItem('token', `${res.token}`)
            setCurrentEmail(email)
            setLoggedIn(true)
            history.push("/")
        })
            .catch(err => {
                console.log(err)
                setIsRegisterPopupOpen(true);
            })
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        setCurrentEmail('');
        setLoggedIn(false);
        history.push('/sign-in');
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            auth.checkToken(token)
                .then(result => {
                    if (result) {
                        setCurrentEmail(result.data.email);
                        setLoggedIn(true);
                        history.push('/');
                    }
                })
                .catch(err => console.log(err))
        }
    });

    useEffect(() => {
        if (!loggedIn) return;
        api.getUserInfo()
            .then((res) => setCurrentUser(res))
            .catch((err) => console.log(err))
        api.getInitialCards()
            .then((res) => setCards(res))
            .catch((err) => console.error(err));
    }, [loggedIn]);

    return (
        <CurrentUserContext.Provider value={currentUser}>
        <div className={'page'}>
            <Switch>
                <ProtectedRoute
                    exact path="/"
                    loggedIn={loggedIn}
                    component={Main}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    cards={cards}
                    onCardDelete={handleCardDelete}
                    onCardLike={handleCardLike}
                    email={currentEmail}
                    onLogout={handleLogout}
                />

                <Route path="/sign-up">
                    <Register onRegister={handleRegister} />
                </Route>

                <Route path="/sign-in">
                    <Login onLogin={handleLogin} />
                </Route>

                <Route path="/">
                    {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
                </Route>
            </Switch>

            <Footer/>
            <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
            <AddPlacePopup onAddPlace={handleUpdatePlace} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
            <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
            <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
        </div>
        <InfoTooltip isOpen={isRegisterPopupOpen} onClose={closeAllPopups} isSuccess={isSuccessRegister} />
        </CurrentUserContext.Provider>
    );
};

export default App;