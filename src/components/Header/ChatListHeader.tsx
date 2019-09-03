import React from 'react';
import Contents from './Contents';
import IconPerson from '../../assets/icon-person.svg';
import { SlideInOutLeft } from '../TransitionSlide';

const ChatListHeader: React.FC = () => {
  return (
    <SlideInOutLeft>
      <Contents title="채팅">
        <IconPerson />
      </Contents>
    </SlideInOutLeft>
  );
};

export default ChatListHeader;
