import logo from '../images/logo.svg';
import { Route, Link, Switch } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import Sign from './Sign';


function Header({ isOpen, onClose, onSign, onLoggedOut, email }) {
  return (
    <>
      <MediaQuery maxWidth={767}>
        {isOpen && (<Sign onClose={onLoggedOut} email={email} />)}
      </MediaQuery>
      <header className="header">
        <img src={logo} alt="Логотип сервиса Mesto" className="header__logo" />
        <MediaQuery maxWidth={767}>
          <Switch>
            <Route exact path="/">
              {isOpen ?  (<button className="header__close-button" type="button" onClick={onClose} />) :
                (<button className="header__nav" onClick={onSign} />)
              }
            </Route>
            <Route path="/sign-up">
              <Link className="header__link" to="/sign-in">Войти</Link>
            </Route>
            <Route path="/sign-in">
              <Link className="header__link" to="/sign-up">Регистрация</Link>
            </Route>
          </Switch>
          </MediaQuery>
          <MediaQuery minWidth={768}>
          <Switch>
            <Route exact path="/">
              <Sign email={email} onClose={onLoggedOut} />
            </Route>
            <Route path="/sign-up">
              <Link className="header__link" to="/sign-in">Войти</Link>
            </Route>
            <Route path="/sign-in">
              <Link className="header__link" to="/sign-up">Регистрация</Link>
            </Route>
          </Switch>
        </MediaQuery>
      </header>
    </>
  )
}

export default Header;
