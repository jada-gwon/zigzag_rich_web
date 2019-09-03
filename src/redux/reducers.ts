import { combineReducers } from 'redux';
import { createReducer } from 'redux-act';
import * as actions from './actions';
import { ChatRoom, Message } from '../models';
import { loginUserMock } from '../mock';

const chats = createReducer(
  {
    [actions.fetchInitailDataSuccess as any]: (_, paylodad) => paylodad.chats,
    [actions.selectChatWithLoginUser as any]: (state, payload) => {
      const targetIndex = state.findIndex(
        (chat: ChatRoom) => chat.id === payload.chatId,
      );
      return [
        ...state.slice(0, targetIndex),
        {
          ...(state[targetIndex] as object),
          unReadMessageCount: 0,
        },
        ...state.slice(targetIndex + 1),
      ];
    },
  },
  [],
);

const users = createReducer(
  {
    [actions.fetchInitailDataSuccess as any]: (_, paylodad) => paylodad.users,
  },
  [],
);

const messages = createReducer(
  {
    [actions.selectChatWithLoginUser as any]: (state: Message[], payload) =>
      state.map((message) => ({
        ...message,
        readBy:
          payload.chatId === message.chatId
            ? [...message.readBy, payload.loginUserId]
            : message.readBy,
      })),
    [actions.fetchMessagesSuccess as any]: (state, payload) => [
      ...state,
      ...payload,
    ],
  },
  [],
);

const loginUser = createReducer({}, loginUserMock);
const errors = createReducer(
  {
    [actions.pushError as any]: (state: string[], payload) => [
      payload,
      ...state,
    ],
    [actions.popError as any]: (state: string[]) => state.slice(1),
  },
  [],
);

const chatApp = combineReducers({
  loginUser,
  chats,
  users,
  messages,
  errors,
});

export default chatApp;
