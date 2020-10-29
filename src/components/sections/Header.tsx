import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import history from '../../services/history';

import Button from '../UI/Button';
import { RootState } from '../../store';
import { signOut } from '../../store/actions/authActions';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { authenticated } = useSelector((state: RootState) => state.auth)

  const logoutClickHandler = () => {
    dispatch(signOut());
  }

  return (
    <nav className="navbar is-spaced has-shadow">
      <div className="container">
        <div className="navbar-brand">

        </div>

        <div className="navbar-end">
          <div className="navbar-items">
            {
              !authenticated ?
                <div>
                  <Button text="Sign Up" onClick={() => history.push('/register')} className="is-primary" />
                  <Button text="Sign In" onClick={() => history.push('/login')} />
                </div>
                :
                <Button text="Sign Out" onClick={logoutClickHandler} />
            }
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header;