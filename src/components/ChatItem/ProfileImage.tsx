import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  width: 56px;
  ::after {
    content: '';
    display: block;
    padding-top: 100%;
  }
`;

const StyledImg = styled.img`
  position: absolute;
  width: 100%;
`;

const ProfileImage: React.FC<{ name: string; src: string }> = ({
  name,
  src,
}) => (
  <StyledDiv>
    <StyledImg src={src} alt={`${name}'s profile image`} />
  </StyledDiv>
);

export default ProfileImage;
