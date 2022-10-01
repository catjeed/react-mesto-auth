import {useContext} from "react";
import Card from "./Card";
import '../index.css';
import {CurrentUserContext} from "../contexts/CurrentUserContext";

const Main = ({ onEditProfile, onAddPlace, onEditAvatar, cards, ...props }) => {
    const currentUser = useContext(CurrentUserContext);

    return (
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
    )
}

export default Main;