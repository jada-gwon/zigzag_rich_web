import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { fetchingInitailData, popError } from './redux/actions';
import Route from './routes';
import { StoreState } from './models';
import Header from './components/Header';

type RootProps = {
  dispatch: Dispatch<any>;
  errors: string[];
};

const Root: React.FC<RootProps> = ({ dispatch, errors }) => {
  useEffect(() => {
    dispatch(fetchingInitailData() as any);
  }, []);
  if (errors.length > 0) {
    window.alert(errors[0]);
    dispatch(popError());
  }
  return (
    <BrowserRouter>
      <Header />
      <Route />
    </BrowserRouter>
  );
};
function select({ errors }: StoreState) {
  return {
    errors,
  };
}

export default connect(select)(Root);
