import React from 'react';
import styled from 'styled-components';
import { Switch, Route, Redirect } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import ChatList from '../views/ChatList';
import Chat from '../views/Chat';

const Wrap = styled.div`
  flex: 1;
`;

const Root: React.FC = () => {
  return (
    <Wrap>
      <Route
        render={({ location }) => (
          <TransitionGroup component={null}>
            <CSSTransition timeout={400} key={location.key}>
              <Switch location={location}>
                <Route path="/chats/:id" exact component={Chat} />
                <Route path="/chats" component={ChatList} />
                <Redirect path="*" to="/chats" />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    </Wrap>
  );
};

export default Root;
