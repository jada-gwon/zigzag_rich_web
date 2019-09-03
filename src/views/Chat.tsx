import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { selectChat, fetchingMessages } from '../redux/actions';
import { StoreState, Message } from '../models';
import MessageItem from '../components/MessageItem';
import SendMessageForm from '../components/SendMessageForm';

type RouteChatProps = RouteComponentProps<{
  id: string;
}>;

interface ChatProps extends RouteChatProps {
  dispatch: Dispatch<any>;
  messages: Message[];
  loginUserId: string;
}

const StyledChatView = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #f9f9fb;
`;

const StyledMessageList = styled.ul`
  padding: 20px 16px;
  flex: 1;
`;

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
    <StyledChatView>
      <StyledMessageList>
        {messages.map((m) => (
          <MessageItem
            key={m.id}
            contents={m.contents}
            contentsType={m.contentsType}
            isReceived={m.addresserId !== loginUserId}
          />
        ))}
        {/* TODO: Remove */}
        <MessageItem contents="해외 출장 중입니다." isReceived={false} />
      </StyledMessageList>
      <div>
        <SendMessageForm />
      </div>
    </StyledChatView>
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
