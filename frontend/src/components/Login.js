import React from 'react';

function Login(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  React.useEffect(() => {
    setEmail('');
    setPassword('');
  }, []);
  
  function handleChange(e) {
    e.target.name === "email" ? setEmail(e.target.value) : setPassword(e.target.value);
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    props.onLogin(password, email);
  }
  
  return (
    <section className="register">
      <h2 className="register__title">Вход</h2>
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
        <button className="register__submit" type="submit">Войти</button>
      </form>
    </section>
  );
}

export default Login;
