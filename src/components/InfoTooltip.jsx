import success from '../images/success.svg';
import failed from '../images/failed.svg';

const InfoToolTip = ({isOpen, isSuccess, onClose}) => {
    return (
        <div className={isOpen ? `popup tooltip-popup tooltip-popup_opened` : `popup tooltip-popup`}>
            <div className="tooltip-popup__container">
                <img src={isSuccess ? success : failed} alt={isSuccess ? 'Успешная регистрация' : 'Ошибка'} className="tooltip-popup__picture"/>
                <p className="tooltip-popup__title">{isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</p>
                <button type="button" className="popup__close-button" onClick={onClose}></button>
            </div>
        </div>
    );
}

export default InfoToolTip;