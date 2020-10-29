import React, { FormEvent, useEffect, useState } from 'react';

import { signUp, setError } from '../store/actions/authActions';
import { RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/UI/Message';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';

const SignUp: React.FC = () => {
  const [name, setName] = useState('');
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
    dispatch(signUp({ email, password, name }, () => setLoading(false)));
  }

  return (
    <div className="section">
      <div className="container">
        <h2 className="has-text-centered is-size-2 mb-3">Sign Up</h2>
        <form className="form" onSubmit={submitHandler}>
          {error && <Message type="danger" msg={error} />}
          <Input
            name="Name"
            value={name}
            onChange={((e) => setName(e.currentTarget.value))}
            placeholder="Name"
            label="Name"
          />
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
            text={loading ? "Loading..." : "Sign Up/"}
            className="is-primary is-fullwidth mt-5"
            disabled={loading}
          />
        </form>
      </div>
    </div>
  )
}

export default SignUp;

