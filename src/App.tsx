import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import Root from './Root';
import chatApp from './redux/reducers';
import './App.css';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

const store = createStoreWithMiddleware(chatApp);

const App: React.FC = () => (
  <Provider store={store}>
    <div className="App">
      <Root />
    </div>
  </Provider>
);

export default App;
