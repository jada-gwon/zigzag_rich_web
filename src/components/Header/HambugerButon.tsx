import React from 'react';
import styled from 'styled-components';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';

const Wrap = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
`;
const StyledIconHambuger = styled.span<{ back: boolean }>`
  > svg {
    fill: #fff;
    path {
      transition: 300ms linear;
      transform-origin: center;
      :nth-child(1) {
        transform: ${({ back }) =>
          back ? 'rotate(-45deg) translateX(1px)' : 'none'};
      }
      :nth-child(2) {
        opacity: ${({ back }) => (back ? 0 : 1)};
      }
      :nth-child(3) {
        transform: ${({ back }) =>
          back ? 'rotate(45deg) translateX(1px)' : 'none'};
      }
    }
  }
`;

const HambugerIcon: React.FC<RouteComponentProps> = ({
  location: { pathname },
}) => {
  const back = /chats\/\d+/.test(pathname);
  return (
    <Wrap>
      <Link to={back ? '/chat' : '#'}>
        <StyledIconHambuger back={back}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M4 5h16v2H4z" />
            <path d="M4 11h16v2H4z" />
            <path d="M4 17h16v2H4z" />
          </svg>
        </StyledIconHambuger>
      </Link>
    </Wrap>
  );
};

export default withRouter(HambugerIcon);
