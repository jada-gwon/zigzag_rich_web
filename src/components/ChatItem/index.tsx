import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { User, ContentsType } from '../../models';
import ProfileImage from './ProfileImage';
import Preview from './Preview';
import StyledDate from './Date';
import Badge from './Badge';

const StyledLI = styled.li`
  display: flex;
  padding: 9px 16px;
  box-sizing: border-box;
  height: 74px;
`;

const PreviewWrapper = styled.div`
  flex: 1;
  padding: 0 13px 0 15px;
  align-self: center;
`;

interface ChatItemProps {
  chatId: string;
  message: string;
  messageType: ContentsType;
  sentAt: number;
  unReadMessageCount: number;
  members: User[];
}

const ChatItem: React.FC<ChatItemProps> = ({
  chatId,
  message,
  messageType,
  unReadMessageCount,
  sentAt,
  members,
}) => (
  <StyledLI>
    <div>
      <Link to={`chats/${chatId}`}>
        <ProfileImage src={members[0].profileImage} name={members[0].name} />
      </Link>
    </div>
    <PreviewWrapper>
      <Link to={`chats/${chatId}`}>
        <Preview
          name={members[0].name}
          message={message}
          messageType={messageType}
        />
      </Link>
    </PreviewWrapper>
    <div>
      <Link to={`chats/${chatId}`}>
        <StyledDate>{sentAt}</StyledDate>
        {unReadMessageCount > 0 && <Badge>{unReadMessageCount}</Badge>}
      </Link>
    </div>
  </StyledLI>
);

export default ChatItem;
