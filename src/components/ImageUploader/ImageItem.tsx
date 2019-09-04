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

const StyledButton = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  transition: transform 0.1s ease;
  :focus {
    outline: none;
  }
  :active {
    transform: rotate(-8deg) scale(1.1);
  }
`;

const ImageItem: React.FC<{
  src: string;
  onClick: (contents: string) => void;
}> = ({ src, onClick }) => {
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
        <StyledButton
          onClick={(e) => {
            const { left, top } = (e.target as Element).getBoundingClientRect();
            const img = document.createElement('img');
            img.setAttribute('src', src);
            img.style.width = '46px';
            img.style.height = '46px';
            img.style.position = 'fixed';
            img.style.left = `${left}px`;
            img.style.top = `${top}px`;
            img.style.transform = 'rotate(-8deg) scale(1.1)';
            img.style.transition = '300ms ease';
            img.style.borderRadius = '5px';
            document.body.append(img);
            const { bottom, right } = (document as any)
              .querySelector('.message-item:last-child')
              .getBoundingClientRect();
            img.style.left = `${right - 46}px`;
            img.style.top = `${bottom + 5}px`;
            img.style.transform = '';
            window.setTimeout(() => {
              img.remove();
              onClick(src);
            }, 300);
          }}
        >
          <StyledImageWrap>
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <img src={src} />
          </StyledImageWrap>
        </StyledButton>
      </TransitionImage>
    </CSSTransition>
  );
};

export default ImageItem;
