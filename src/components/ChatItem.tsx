import React from 'react';
import { Link } from 'react-router-dom';
import { format, isToday } from 'date-fns';
import localeKo from 'date-fns/locale/ko';
import { User, ContentsType } from '../models';

interface ChatItemProps {
  chatId: string;
  message: string;
  messageType: ContentsType;
  sentAt: number;
  unReadMessageCount: number;
  members: User[];
}

function getDateString(date: number): string {
  if (isToday(date)) {
    return format(date, 'HH:mm');
  }
  if ((new Date().getTime() - date) / (1000 * 60 * 60 * 24) < 7) {
    return format(date, 'cccc', { locale: localeKo });
  }
  return format(date, 'M월d일');
}

const ChatItem: React.FC<ChatItemProps> = ({
  chatId,
  message,
  messageType,
  unReadMessageCount,
  sentAt,
  members,
}) => (
  <li>
    <div>
      <Link to={`chats/${chatId}`}>
        <img src={members[0].profileImage} alt="user profile" />
      </Link>
    </div>
    <div>
      <Link to={`chats/${chatId}`}>
        <div>{members.map((m) => m.name).join(', ')}</div>
        <div>{messageType === ContentsType.text ? message : messageType}</div>
      </Link>
    </div>
    <div>
      <Link to={`chats/${chatId}`}>
        {/* TODO Show Date using date-fns */}
        <div>{getDateString(sentAt)}</div>
        {unReadMessageCount > 0 && <span>{unReadMessageCount}</span>}
      </Link>
    </div>
  </li>
);

export default ChatItem;
