import { InitialData } from '../models';
import { chatRoomMocks, userMocks } from '../mock';

async function fetchInitialData(): Promise<InitialData> {
  return new Promise(function(resolve) {
    resolve({
      chats: chatRoomMocks,
      users: userMocks,
    });
  });
}

export default fetchInitialData;
