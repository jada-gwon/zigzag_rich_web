import React from 'react';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import ChatHeader from './ChatHeader';
import ChatListHeader from './ChatListHeader';
import HambugerButon from './HambugerButon';

const StyledHeader = styled.div`
  flex: 0 0 44px;
  background-color: #5b36ac;
  color: #fff;
  text-align: center;
  position: relative;
`;

const Header: React.FC = () => {
  return (
    <StyledHeader>
      <HambugerButon />
      <Route
        render={({ location }) => (
          <TransitionGroup component={null}>
            <CSSTransition timeout={400} key={location.key}>
              <Switch location={location}>
                <Route path="/chats/:id" exact component={ChatHeader} />
                <Route path="/chats" component={ChatListHeader} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    </StyledHeader>
  );
};

export default Header;
