import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ImageItem from './ImageItem';
import { sendMessage } from '../../redux/actions';
import { ContentsType } from '../../models';
import Img1 from '../../assets/img-shot-1.jpg';
import Img2 from '../../assets/img-shot-2.jpg';
import Img3 from '../../assets/img-shot-3.jpg';
import Img4 from '../../assets/img-shot-4.jpg';
import Img5 from '../../assets/img-shot-5.jpg';
import Img6 from '../../assets/img-shot-6.jpg';
import Img7 from '../../assets/img-shot-7.jpg';

const IMAGES = [Img1, Img2, Img3, Img4, Img5, Img6, Img7];

const SlideIn = keyframes`
  from {
    transform: scale3D(1, 0, 1);
    visibility: visible;
  }
`;

const SlideOut = keyframes`
  to {
    visibility: hidden;
    transform: scale3D(1, 0, 1);
  }
`;

const StyledImageUploader = styled.div`
  width: 100%;
  position: absolute;
  overflow: scroll;
  padding: 11px 16px;
  top: 100%;
  background-color: #5b36ac;
  box-sizing: border-box;
`;

const TransitionUploader = styled(StyledImageUploader)`
  transform-origin: top;
  &.enter,
  &.enter-done {
    animation: ${SlideIn} 0.3s forwards;
  }
  &.exit,
  &.exit-done {
    animation: ${SlideOut} 0.3s forwards 0.2s;
  }
`;
const StyledUL = styled.ul`
  margin: 0 -5px;
  white-space: nowrap;
`;

const ImageUploader: React.FC<{
  open: boolean;
  chatId: string;
  dispatch: Dispatch<any>;
}> = ({ open, dispatch, chatId }) => {
  return (
    <CSSTransition
      in={open}
      timeout={{
        enter: 300,
        exit: 500,
      }}
      mountOnEnter
      unmountOnExit
    >
      <TransitionUploader>
        <TransitionGroup component={StyledUL}>
          {IMAGES.map((img, i) => (
            <ImageItem
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              src={img}
              onClick={(contents: string) => {
                dispatch(sendMessage(chatId, contents, ContentsType.image));
              }}
            />
          ))}
        </TransitionGroup>
      </TransitionUploader>
    </CSSTransition>
  );
};

export default connect((_, props) => props)(ImageUploader);
