import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { StoreState, ChatRoom, User } from '../models';
import ChatItem from '../components/ChatItem';

interface ChatListProps {
  dispatch: Dispatch<any>;
  chats: ChatRoom[];
  users: User[];
}

const ChatList: React.FC<ChatListProps> = ({ chats, users }) => {
  return (
    <div>
      <ul aria-label="대화 리스트">
        {chats.map((chat) => (
          <ChatItem
            key={chat.id}
            chatId={chat.id}
            message={chat.lastMessage.contents}
            messageType={chat.lastMessage.contentsType}
            sentAt={chat.lastMessage.sentAt.getTime()}
            unReadMessageCount={chat.unReadMessageCount}
            members={users.filter((u) => chat.members.includes(u.id))}
          />
        ))}
      </ul>
    </div>
  );
};

function select({ chats, users }: StoreState) {
  return {
    chats: chats.sort(
      (a, b) => b.lastMessage.sentAt.getTime() - a.lastMessage.sentAt.getTime(),
    ),
    users,
  };
}

export default connect(select)(ChatList);
// export default ChatList;
