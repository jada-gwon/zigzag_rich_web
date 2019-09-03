import uuidv4 from 'uuid/v4';
import subDays from 'date-fns/subDays';
import subMinutes from 'date-fns/subMinutes';
import { User, ChatGroup, Message, ContentsType, ChatRoom } from '../models';

import profile1 from '../assets/img-profile-1.jpg';
import profile2 from '../assets/img-profile-2.jpg';
import profile3 from '../assets/img-profile-3.jpg';
import profile4 from '../assets/img-profile-4.jpg';
import profile5 from '../assets/img-profile-5.jpg';
import profile6 from '../assets/img-profile-6.jpg';
import profile7 from '../assets/img-profile-7.jpg';

type createMock<T> = () => T[];

const loginUserMock = {
  id: uuidv4(),
  name: '이아루',
  profileImage: 'string',
};
const userData = [
  {
    name: '장만월 사장님',
    profileImage: profile1,
  },
  {
    name: '신정근 바텐더',
    profileImage: profile3,
  },
  {
    name: '이미라 의사',
    profileImage: profile4,
  },
  {
    name: '구찬성 지배인',
    profileImage: profile5,
  },
  {
    name: '노준석 총지배인',
    profileImage: profile6,
  },
  {
    name: '김유나 인턴',
    profileImage: profile7,
  },
  {
    name: '구현모',
    profileImage: profile2,
  },
];

const userMocks: User[] = userData.map((d) => ({ ...d, id: uuidv4() }));
const chatGroupMocks: ChatGroup[] = userMocks.map((user, i) => ({
  id: i.toString(),
  members: [loginUserMock.id, user.id],
}));

const messageData = [
  {
    contents: '어딘데 출근 안하니, 죽고싶니?',
    addresserId: userMocks[0].id,
    chatId: chatGroupMocks[0].id,
    contentsType: ContentsType.text,
    isRead: false,
    m: 1,
  },
  {
    contents: '출근했냐구?',
    addresserId: userMocks[0].id,
    chatId: chatGroupMocks[0].id,
    contentsType: ContentsType.text,
    isRead: false,
    m: 4,
  },
  {
    contents: '출근했니?',
    addresserId: userMocks[0].id,
    chatId: chatGroupMocks[0].id,
    contentsType: ContentsType.text,
    isRead: true,
    m: 3,
  },
  {
    contents: '오시는 길에 와인 몇병만 사다주세요.',
    addresserId: userMocks[1].id,
    chatId: chatGroupMocks[1].id,
    contentsType: ContentsType.text,
    isRead: true,
    time: {
      h: 2,
      m: 34,
    },
  },
  {
    contents:
      '휴가 잘 보내고 계신가요? 다름이 아니라 지금 냉장고에 츄르가 다 떨어졌어요.',
    addresserId: userMocks[2].id,
    chatId: chatGroupMocks[2].id,
    contentsType: ContentsType.text,
    isRead: true,
  },
  {
    contents: '아 휴가셨군요. 약속은 다음으로 미루시죠!',
    addresserId: userMocks[3].id,
    chatId: chatGroupMocks[3].id,
    contentsType: ContentsType.text,
    isRead: true,
  },
  {
    contents:
      '휴가에서 언제 돌아오시는지요. 돌아오시면 아무말 아무말 아무말 대잔치 그냥 API 만들어주시면 안될까요 목데이터 만들기 너무 힘들어요',
    addresserId: userMocks[4].id,
    chatId: chatGroupMocks[4].id,
    contentsType: ContentsType.text,
    isRead: true,
  },
  {
    contents: '304호 키를 잃어버렸어요 어떻게 해야하죠 ㅠ',
    addresserId: userMocks[5].id,
    chatId: chatGroupMocks[5].id,
    contentsType: ContentsType.text,
    isRead: true,
  },
  {
    contents: '술먹자',
    addresserId: userMocks[6].id,
    chatId: chatGroupMocks[6].id,
    contentsType: ContentsType.text,
    isRead: true,
  },
];

const messageMocks: Message[] = messageData.map(({ m = 0, isRead, ...d }) => {
  const sentAt = m
    ? subMinutes(new Date(), m)
    : subDays(new Date(), Math.ceil(Math.random() * 6));
  return {
    ...d,
    id: uuidv4(),
    sentAt,
    createAt: sentAt,
    readBy: isRead ? [d.addresserId, loginUserMock.id] : [d.addresserId],
    failed: false,
  };
});

const chatRoomMocks: ChatRoom[] = chatGroupMocks.map((group) => {
  const messages = messageMocks
    .filter((m) => m.chatId === group.id)
    .sort((a, b) => b.sentAt.getTime() - a.sentAt.getTime());
  const { contents, sentAt, contentsType } = messages[0];
  return {
    ...group,
    lastMessage: { contents, sentAt, contentsType },
    unReadMessageCount: messages.filter(
      (m) => !m.readBy.includes(loginUserMock.id),
    ).length,
  };
});

function getMessageMock(chatId: string): Message[] {
  return messageMocks.filter((m) => m.chatId === chatId);
}

export { userMocks, getMessageMock, loginUserMock, chatRoomMocks };
