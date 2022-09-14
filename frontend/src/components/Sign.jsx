import React from "react";
import { Link } from 'react-router-dom';

function Sign({ onClose, email }) {
  return (
    <div className="header__sign">
      <p className="header__email">{email}</p>
      <Link className="header__exit" onClick={onClose} to="/sign-in">Выйти</Link>
    </div>
  )
}

export default Sign;
