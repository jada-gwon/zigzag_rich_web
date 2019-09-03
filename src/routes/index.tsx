import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ChatList from '../views/ChatList';
import Chat from '../views/Chat';

const Root: React.FC = () => {
  return (
    <Switch>
      <Route path="/chats/:id" exact component={Chat} />
      <Route path="/chats" component={ChatList} />
      <Redirect path="*" to="/chats" />
    </Switch>
  );
};

export default Root;
