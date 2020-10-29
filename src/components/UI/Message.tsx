import React from 'react';

interface MessageProps {
  msg: String;
  type: 'danger' | 'success';
}

const Message: React.FC<MessageProps> = ({ msg, type }) => {
  let typeClass = '';

  typeClass = type === 'danger' ? 'is-danger' : 'is-success';

  return (
    <article className={`message ${typeClass}`}>
      <div className="message-body">{msg}</div>
    </article>
  );
}

export default Message;