import { useState, useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';

function Login({ onAutorisation, validDefault, setValidDefault, offValideDefault }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [validTextEmail, setValidTextEmail] = useState('');
  const [validTextPassword, setValidTextPassword] = useState('');

  const history = useHistory();
  const buttonSubmitClassName = !validityForm() ? "content-sign__save-button content-sign__save-button_invalid" : "content-sign__save-button";

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
    setIsValidEmail(evt.target.validity.valid);
    setValidTextEmail(evt.target.validationMessage);
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
    setIsValidPassword(evt.target.validity.valid);
    setValidTextPassword(evt.target.validationMessage);
    setValidDefault();
  }

  function validityForm() {
    return  validDefault && isValidEmail && isValidPassword;
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAutorisation({ password, email });
    setEmail('');
    setPassword('');
  }

  useEffect(() => {
    offValideDefault();
  }, [])

  return(
    <div className="content-sign">
      <form className="content-sign__form" onSubmit={handleSubmit}>
        <h2 className="content-sign__title">Вход</h2>
        <input
          className="content-sign__input"
          type="email"
          id="email"
          name="email"
          value={email || ""}
          onChange={handleChangeEmail}
          required
          placeholder="Email" />
        <span id="email-error" className="content-sign__error">{validTextEmail}</span>
        <input
          className="content-sign__input"
          type="password"
          id="password"
          name="password"
          value={password || ""}
          onChange={handleChangePassword}
          required
          placeholder="Пароль"
          minLength="8" />
        <span id="password-error" className="content-sign__error">{validTextPassword}</span>
        <button
          type="submit"
          className={buttonSubmitClassName}
          name="submit"
          disabled={!validityForm()}>Войти
        </button>
      </form>
    </div>
  )
}
export default withRouter(Login);
