import {useContext} from "react";
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import Header from "./Header";

const Main = ({ onEditProfile, onAddPlace, onEditAvatar, onLogout, cards, email, ...props }) => {
    const currentUser = useContext(CurrentUserContext);

    return (
        <>
            <Header>
                <p className="header__user-email">{email}</p>
                <button className="header__button header__button_grey" onClick={onLogout}>Выйти</button>
            </Header>
            <main className="main">
                <section className="profile">
                    <div className="profile__avatar-button" onClick={onEditAvatar}>
                        <img src={currentUser.avatar} alt="Аватар" className="profile__avatar"/>
                    </div>
                    <div className="profile__info">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <p className="profile__about">{currentUser.about}</p>
                    </div>
                    <button type="button" className="profile__edit-button" onClick={onEditProfile}></button>
                    <button type="button" className="profile__add-button" onClick={onAddPlace}></button>
                </section>
                <section className="elements">
                    {cards.map((card) => (
                        <Card card={card} key={card._id} {...props}/>
                    ))}
                </section>
            </main>
        </>
    )
}

export default Main;