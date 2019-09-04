import React, { useEffect, useRef } from 'react';
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
  messageCount: number;
  loginUserId: string;
  load: boolean;
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

function usePrevious(value: any) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value as any;
  });
  return ref.current;
}

const refList: React.RefObject<HTMLUListElement> = React.createRef();
const Chat: React.FC<ChatProps> = ({
  match: {
    params: { id },
  },
  dispatch,
  messages,
  messageCount,
  loginUserId,
  load,
}) => {
  useEffect(() => {
    if (messages.length === 0) {
      dispatch(fetchingMessages(id) as any);
    }
  }, []);
  const prev = usePrevious({ messageCount }) as any;
  useEffect(() => {
    dispatch(selectChat(id) as any);
  }, [load]);
  useEffect(() => {
    if (prev && prev.messageCount !== messageCount) {
      dispatch(selectChat(id) as any);
      if (refList.current) {
        refList.current.scrollTo(0, refList.current.scrollHeight);
      }
    }
  }, [messageCount]);
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
                imageProgress={m.imageProgress}
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

function select(
  { messages, loginUser, load }: StoreState,
  props: RouteChatProps,
) {
  const messagesInChat = messages
    .filter((message) => message.chatId === props.match.params.id)
    .sort((a, b) => a.sentAt.getTime() - b.sentAt.getTime());
  return {
    messages: messagesInChat,
    messageCount: messagesInChat.length,
    loginUserId: loginUser.id,
    load,
  };
}

export default connect(select)(Chat);
