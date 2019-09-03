import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import ChatList from '../views/ChatList';
import Chat from '../views/Chat';

const Root: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/chats/:id" exact component={Chat} />
        <Route path="/chats" component={ChatList} />
        <Redirect path="*" to="/chats" />
      </Switch>
    </BrowserRouter>
  );
};

export default Root;
