import React, { useEffect } from 'react';

import { setSuccess } from '../store/actions/authActions';
import { RootState } from '../store/';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/UI/Message';

const Dashboard: React.FC = () => {
  const { user, needVerification, success } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      dispatch(setSuccess(''));
    }
  }, [success, dispatch])
  return (
    <div className="section">
      <div className="container">
        {needVerification && <Message type="success" msg="Please verify your email address." />}
        <h1 className="is-size-1">Welcome {user!.name}</h1>
      </div>
    </div>
  );
}

export default Dashboard;