import React from 'react';
import { ContentsType } from '../models';

interface MessageItemProps {
  contents: string;
  contentsType: ContentsType;
  isReceived: boolean;
}

const MessageItem: React.FC<MessageItemProps> = ({ contents }) => (
  <li>{contents}</li>
);

export default MessageItem;
