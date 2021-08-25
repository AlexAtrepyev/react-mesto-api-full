import success from '../images/icon-success.svg';
import fail from '../images/icon-fail.svg';

function InfoTooltip(props) {
  return (
    <div className={`popup ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__container popup__container_type_form">
        <img className="popup__icon" src={props.successStatus ? success : fail} alt="success" />
        <h2 className="popup__title popup__title_type_delete">
          {props.successStatus ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </h2>
        <button className="popup__button-close" type="button" onClick={props.onClose} />
      </div>
    </div>
  );
}

export default InfoTooltip;
