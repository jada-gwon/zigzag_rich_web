import React from 'react';
import styled from 'styled-components';
import { ContentsType } from '../../models';

const StyledPreview = styled.div`
  position: relative;
  width: 100%;
`;

const StyledName = styled.div`
  color: #464052;
  font-size: 16px;
  height: 19px;
  margin-bottom: 3px;
  font-weight: bold;
`;
const StyledMessage = styled.div`
  font-size: 13px;
  line-height: 13px;
  height: 13px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #a4a6b0;
`;

type PreivewProps = {
  name: string;
  message: string;
  messageType: ContentsType;
};

const Preview: React.FC<PreivewProps> = ({ name, message, messageType }) => (
  <StyledPreview>
    <StyledName>{name}</StyledName>
    <StyledMessage>
      {messageType === ContentsType.text ? message : messageType}
    </StyledMessage>
  </StyledPreview>
);

export default Preview;
