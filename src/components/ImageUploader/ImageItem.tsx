import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { CSSTransition } from 'react-transition-group';

const StyledLI = styled.li`
  padding: 0 5px;
  display: inline-block;
`;

const FadeIn = keyframes`
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

const StyledImageWrap = styled.div`
  width: 46px;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  ::after {
    content: '';
    display: block;
    padding-top: 100%;
  }
  > img {
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
  }
`;

const TransitionImage = styled(StyledLI)`
  transform-origin: center;
  &.enter,
  &.enter-done {
    animation: ${FadeIn} 0.5s forwards;
  }
`;

const ImageItem: React.FC<{ src: string }> = ({ src }) => {
  const [inProp, updateIn] = useState(false);
  useEffect(() => {
    updateIn(true);
    return () => updateIn(false);
  }, []);
  return (
    <CSSTransition
      timeout={{
        enter: 500,
        exit: 200,
      }}
      mountOnEnter
      unmountOnExit
      in={inProp}
    >
      <TransitionImage>
        <StyledImageWrap>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <img src={src} />
        </StyledImageWrap>
      </TransitionImage>
    </CSSTransition>
  );
};

export default ImageItem;
