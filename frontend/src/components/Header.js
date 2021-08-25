import logo from '../images/logo.svg';
import { useHistory } from 'react-router-dom';

function Header(props) {
  const history = useHistory();

  function redirect() {
    history.push(props.redirectTo);
  }

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип" />
      <p className="header__account">
        {props.email}
        <button
          className={`header__action ${props.loggedIn && 'header__action_type_logged'}`}
          onClick={props.loggedIn ? props.onSignOut : redirect}
        >
          {props.buttonText}
        </button>
      </p>
    </header>
  );
}

export default Header;
