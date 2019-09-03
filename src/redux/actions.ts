import { Dispatch } from 'redux';
import { createAction } from 'redux-act';
import { InitialData, Message, StoreState } from '../models';
import fetchInitialData from '../api/fetchInitialData';
import fetchMessages from '../api/fetchMessages';

export const fetchInitailDataSuccess = createAction(
  'api request successed fetching chat list',
  (initialData: InitialData) => initialData,
);

export function fetchingInitailData() {
  return function(dispatch: Dispatch<any>) {
    fetchInitialData().then((data) =>
      dispatch(fetchInitailDataSuccess(data as InitialData)),
    );
  };
}

export const selectChatWithLoginUser = createAction(
  'select chat',
  (chatId: string, loginUserId: string) => ({
    chatId,
    loginUserId,
  }),
);

export function selectChat(chatId: string) {
  return function(dispatch: Dispatch<any>, getStore: () => StoreState) {
    console.log(getStore());
    const { loginUser } = getStore();
    dispatch(selectChatWithLoginUser(chatId, loginUser.id));
  };
}

export const fetchMessagesSuccess = createAction(
  'api request successed fetching message list',
  (messages: Message[]) => messages,
);

export const pushError = createAction(
  'push error',
  (message: string) => message,
);

export const popError = createAction('pop error');

export function fetchingMessages(chatId: string) {
  return async function(dispatch: Dispatch<any>) {
    try {
      const messages = await fetchMessages(chatId);
      dispatch(fetchMessagesSuccess(messages));
    } catch {
      dispatch(pushError('존재하지 않는 대화방입니다.'));
    }
  };
}
// export const sendMessage = createAction(
//   'select chat',
//   (
//     addresserId: string,
//     chatId: string,
//     contents: string,
//     contentsType: ContentsType,
//   ) => ({
//     addresserId,
//     chatId,
//     contents,
//     contentsType,
//   }),
// );