import React, { FormEvent, useEffect, useState } from 'react';

import { signIn, setError } from '../store/actions/authActions';
import { RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/UI/Message';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import { Link } from 'react-router-dom';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { error } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    return () => {
      if (error) {
        dispatch(setError(''));
      }
    }
  }, [error, dispatch])

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    dispatch(signIn({ email, password }, () => setLoading(false)));
  }

  return (
    <div className="section">
      <div className="container">
        <h2 className="has-text-centered is-size-2 mb-3">Sign Up</h2>
        <form className="form" onSubmit={submitHandler}>
          {error && <Message type="danger" msg={error} />}
          <Input
            name="Email"
            value={email}
            onChange={((e) => setEmail(e.currentTarget.value))}
            placeholder="Email"
            label="Email"
          />
          <Input
            name="Password"
            value={password}
            onChange={((e) => setPassword(e.currentTarget.value))}
            placeholder="Password"
            label="Password"
            type="password"
          />
          <Button
            text={loading ? "Loading..." : "Sign In/"}
            className="is-primary is-fullwidth mt-5"
            disabled={loading}
          />
        </form>
      </div>
    </div>
  )
}

export default SignIn;

