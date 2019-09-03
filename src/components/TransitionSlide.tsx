import styled, { keyframes } from 'styled-components';

const amount = 50;
const duration = 400;
const slideInLeft = keyframes`
  from {
    transform: translate3d(-${amount}px, 0, 0);
    opacity: 0;
  }

  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
`;

const slideOutLeft = keyframes`
  from {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }

  to {
    transform: translate3d(-${amount}px, 0, 0);
    opacity: 0;
  }
`;

const slideInRight = keyframes`
  from {
    transform: translate3d(${amount}px, 0, 0);
    opacity: 0;
  }

  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
`;

const slideOutRight = keyframes`
  from {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }

  to {
    visibility: hidden;
    transform: translate3d(${amount}px, 0, 0);
    opacity: 0;
  }
`;

const AnimationWrap = styled.div``;

export const SlideInOutLeft = styled(AnimationWrap)`
  &.enter {
    animation: ${slideInLeft} ${duration}ms forwards;
  }
  &.exit {
    animation: ${slideOutLeft} ${duration}ms forwards;
  }
`;

export const SlideInOutRight = styled(AnimationWrap)`
  &.enter {
    animation: ${slideInRight} ${duration}ms forwards;
  }
  &.exit {
    animation: ${slideOutRight} ${duration}ms forwards;
  }
`;
