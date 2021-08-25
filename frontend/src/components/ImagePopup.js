function ImagePopup(props) {
  return (
    <div className={`popup popup_type_view ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__container popup__container_type_img">
        <img className="popup__image" src={props.card?.link} alt={props.card?.name} />
        <h2 className="popup__image-title">{props.card?.name}</h2>
        <button className="popup__button-close" type="button" onClick={props.onClose} />
      </div>
    </div>
  );
}

export default ImagePopup;
