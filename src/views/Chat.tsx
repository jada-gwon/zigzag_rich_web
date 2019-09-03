import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { selectChat, fetchingMessages } from '../redux/actions';
import { StoreState, Message } from '../models';
import MessageItem from '../components/MessageItem';
import SendMessageForm from '../components/SendMessageForm';
import { SlideInOutRight } from '../components/TransitionSlide';

type RouteChatProps = RouteComponentProps<{
  id: string;
}>;

interface ChatProps extends RouteChatProps {
  dispatch: Dispatch<any>;
  messages: Message[];
  loginUserId: string;
}

const StyledChatView = styled(SlideInOutRight)`
  height: 100vh;
  padding-top: 44px;
  background-color: #f9f9fb;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
`;

const StyledMessageList = styled.ul`
  padding: 20px 16px 70px;
  flex: 1;
  box-sizing: border-box;
  overflow: scroll;
  height: 100%;
`;

const FormWrap = styled.div`
  position: absolute;
  width: 100%;
  bottom: 20px;
`;

const refList: React.RefObject<HTMLUListElement> = React.createRef();
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
  useEffect(() => {
    if (refList.current) {
      refList.current.scrollTo(0, refList.current.scrollHeight);
    }
  });

  return (
    <StyledChatView>
      <StyledMessageList ref={refList as any}>
        <TransitionGroup component={null}>
          {messages.map((m) => (
            <CSSTransition key={m.id} timeout={400}>
              <MessageItem
                contents={m.contents}
                contentsType={m.contentsType}
                isReceived={m.addresserId !== loginUserId}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </StyledMessageList>
      <FormWrap>
        <SendMessageForm chatId={id} />
      </FormWrap>
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
