import React from 'react';
import styled, { keyframes } from 'styled-components';
import { ContentsType } from '../models';

const scaleUp = keyframes`
  from {
    transform: scale(.23);
  }
  to {
    transform: scale(1);
  }
`;

interface MessageItemProps {
  contents: string;
  contentsType: ContentsType;
  isReceived: boolean;
}

const StyledMessageItemWrap = styled.li<{ left: boolean }>`
  padding: 5px 0;
  display: block;
  text-align: ${(props) => (props.left ? 'left' : 'right')};
  transform-origin: top ${(props) => (props.left ? 'left' : 'right')};
`;

const StyledMessageItem = styled.div<{ isReceived: boolean }>`
  display: inline-block;
  border-radius: 12px;
  padding: 12px;
  font-size: 14px;
  line-height: 17px;
  max-width: 80%;
  background-color: ${(props) => (props.isReceived ? '#fff' : '#5b36ac')};
  color: ${(props) => (props.isReceived ? '#363a42' : '#fff')};
  box-shadow: ${(props) =>
    props.isReceived
      ? '0 2px 4px 0 rgba(0, 0, 0, 0.1);'
      : '0 2px 4px 0 rgba(91, 56, 177, 0.4);'};
`;

const StyledImage = styled.img`
  width: 200px;
  border-radius: 12px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  background-color: #47909b;
`;

const TransitionWrap = styled(StyledMessageItemWrap)`
  &.enter,
  &.enter-done {
    animation: ${scaleUp} 0.2s forwards;
  }
`;

const MessageItem: React.FC<MessageItemProps> = ({
  contents,
  isReceived,
  contentsType,
}) => {
  if (contentsType === ContentsType.image) {
    return (
      <TransitionWrap left={isReceived}>
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <StyledImage src={contents} />
      </TransitionWrap>
    );
  }
  return (
    <TransitionWrap left={isReceived}>
      <StyledMessageItem isReceived={isReceived}>{contents}</StyledMessageItem>
    </TransitionWrap>
  );
};

export default MessageItem;
