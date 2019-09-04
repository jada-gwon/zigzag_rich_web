import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Transition } from 'react-transition-group';
import { ContentsType } from '../models';
import IconClose from '../assets/icon-close.svg';

interface MessageItemProps {
  contents: string;
  contentsType: ContentsType;
  isReceived: boolean;
  imageProgress?: number;
}

const scaleUp = keyframes`
  from {
    transform: scale(.23);
    > .progress {
      opacity: 0;
    }
  }
  to {
    transform: scale(1);
    > .progress {
      opacity: 1;
    }
  }
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

const StyledMessageItemWrap = styled.li<{ left: boolean }>`
  padding: 5px 0;
  display: block;
  text-align: ${(props) => (props.left ? 'left' : 'right')};
  transform-origin: top ${(props) => (props.left ? 'left' : 'right')};
  position: relative;
`;

const TransitionWrap = styled(StyledMessageItemWrap)`
  &.enter,
  &.enter-done {
    animation: ${scaleUp} 0.2s forwards;
  }
`;

const ImageWrap = styled.div`
  position: relative;
  width: 200px;
  display: inline-block;
`;

const StyledImage = styled.img`
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  background-color: #47909b;
`;

const ButtonCancelUpload = styled.button`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.8);
  border: none;
  cursor: pointer;
  :focus {
    outline: none;
  }
`;

const StyledProgressBar = styled.div<{ imageProgress: number }>`
  position: absolute;
  top: 100%;
  margin-top: 3px;
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background-color: #e5e5e7;
  ::after {
    content: '';
    display: block;
    width: ${(props) => props.imageProgress * 100}%;
    max-width: 100%;
    height: 6px;
    border-radius: 3px;
    background-color: #5b36ac;
    transition: width linear 0.3s;
  }
`;

const MessageItem: React.FC<MessageItemProps> = ({
  contents,
  isReceived,
  contentsType,
  imageProgress = 1,
}) => {
  if (contentsType === ContentsType.image) {
    return (
      <TransitionWrap left={isReceived} className="message-item">
        <ImageWrap>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <StyledImage src={contents} />
          <Transition
            in={imageProgress < 1}
            timeout={300}
            mountOnEnter
            unmountOnExit
          >
            <div className="progress">
              <ButtonCancelUpload type="button">
                <IconClose />
              </ButtonCancelUpload>
              <StyledProgressBar imageProgress={imageProgress} />
            </div>
          </Transition>
        </ImageWrap>
      </TransitionWrap>
    );
  }
  return (
    <TransitionWrap left={isReceived} className="message-item">
      <StyledMessageItem isReceived={isReceived}>{contents}</StyledMessageItem>
    </TransitionWrap>
  );
};

export default MessageItem;
