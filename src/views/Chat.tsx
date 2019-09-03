import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps, Link } from 'react-router-dom';
import { selectChat, fetchingMessages } from '../redux/actions';
import { StoreState, Message } from '../models';
import MessageItem from '../components/MessageItem';

type RouteChatProps = RouteComponentProps<{
  id: string;
}>;

interface ChatProps extends RouteChatProps {
  dispatch: Dispatch<any>;
  messages: Message[];
  loginUserId: string;
}

const Chat: React.FC<ChatProps> = ({
  match: {
    params: { id },
  },
  dispatch,
  messages,
  loginUserId,
}) => {
  useEffect(() => {
    dispatch(selectChat(id) as any);
    if (messages.length === 0) {
      dispatch(fetchingMessages(id) as any);
    }
  }, []);
  return (
    <div>
      <Link to="/chats">back</Link>
      <h1>
        chat
        {id}
      </h1>
      <ul>
        {messages.map((m) => (
          <MessageItem
            key={m.id}
            contents={m.contents}
            contentsType={m.contentsType}
            isReceived={m.addresserId === loginUserId}
          />
        ))}
      </ul>
    </div>
  );
};

function select({ messages, loginUser }: StoreState, props: RouteChatProps) {
  return {
    messages: messages
      .filter((message) => message.chatId === props.match.params.id)
      .sort((a, b) => a.sentAt.getTime() - b.sentAt.getTime()),
    loginUserId: loginUser.id,
  };
}

export default connect(select)(Chat);
