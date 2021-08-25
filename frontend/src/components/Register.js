import React from 'react';
import { Link } from 'react-router-dom';

function Register(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  
  function handleChange(e) {
    e.target.name === "email" ? setEmail(e.target.value) : setPassword(e.target.value);
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    props.onRegister(password, email);
  }
  
  return (
    <section className="register">
      <h2 className="register__title">Регистрация</h2>
      <form className="register__form" onSubmit={handleSubmit}>
        <input
          className="register__input"
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}
          minLength="2"
          maxLength="40"
          required
        />
        <input
          className="register__input"
          type="password"
          name="password"
          placeholder="Пароль"
          value={password}
          onChange={handleChange}
          minLength="4"
          maxLength="10"
          required
        />
        <button className="register__submit" type="submit">Зарегистрироваться</button>
      </form>
      <p className="register__checkout">
        Уже зарегистрированы? <Link to="/sign-in" className="register__link">Войти</Link>
      </p>
    </section>
  );
}

export default Register;
