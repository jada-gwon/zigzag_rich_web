import React from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
  width: 100%;
  position: absolute;
`;
const Title = styled.div`
  font-weight: bold;
  display: inline-block;
  line-height: 44px;
`;

const AddonWrap = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
`;

type HeaderProps = {
  title: string;
};

const Contents: React.FC<HeaderProps> = ({ title, children }) => {
  return (
    <Wrap>
      <Title>{title}</Title>
      <AddonWrap>{children}</AddonWrap>
    </Wrap>
  );
};

export default Contents;
