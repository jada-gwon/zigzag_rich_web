import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import Contents from './Contents';
import ImageUploader from '../ImageUploader';
import { StoreState } from '../../models';
import IconUpload from '../../assets/icon-upload.svg';
import IconSearch from '../../assets/icon-search.svg';
import { SlideInOutRight } from '../TransitionSlide';

const StyledButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  :focus {
    outline: none;
  }
  :first-child {
    margin-right: 17px;
  }
`;

type RouteChatHeaderProps = RouteComponentProps<{
  id: string;
}>;

interface ChatHeaderProps extends RouteChatHeaderProps {
  title: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  title = '알수없음',
  match: {
    params: { id },
  },
}) => {
  const [openUploader, setOpenUploader] = useState(false);
  return (
    <SlideInOutRight>
      <Contents title={title}>
        <StyledButton onClick={() => setOpenUploader(!openUploader)}>
          <IconUpload />
        </StyledButton>
        <StyledButton>
          <IconSearch />
        </StyledButton>
      </Contents>
      <ImageUploader chatId={id} open={openUploader} />
    </SlideInOutRight>
  );
};

function select(
  { chats, users }: StoreState,
  {
    match: {
      params: { id },
    },
  }: RouteChatHeaderProps,
) {
  const target = chats.find((chat) => chat.id === id);
  if (target) {
    const user = users.find((u) => target.members.includes(u.id));
    return {
      title: user ? user.name : '알수없음',
    };
  }
  return {
    title: '알수없음',
  };
}

export default connect(select)(ChatHeader);
