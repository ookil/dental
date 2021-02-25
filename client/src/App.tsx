import { useQuery } from '@apollo/client';
import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { ModalProvider } from 'styled-react-modal';
import { MainModal, Navbar, Toolbar } from './components';
import { Gif, GifWrapper } from './components/elements/Elements';
import { ModalBackground } from './components/modals/Modals.elements';
import GlobalStyle from './globalStyles';
import { GET_LOGGED_USER, UserData } from './graphql/queries/user';
import { Calendar, Dashboard } from './pages';
import store from './store/store';
import loadingGif from './images/loading.gif';
import { ClinicData, ClinicVar, GET_CLINIC } from './graphql/queries/clinic';
import { clinicIdVar } from './cache';
import MainContainer from './pages/MainContainer';

function App() {
  const { data, loading: userLoading } = useQuery<UserData>(GET_LOGGED_USER);

  clinicIdVar(data?.loggedUser.clinic.id);

  const { loading } = useQuery<ClinicData, ClinicVar>(GET_CLINIC, {
    variables: {
      clinicId: data?.loggedUser.clinic.id!,
    },
    skip: data === undefined,
  });

  if (loading || userLoading)
    return (
      <GifWrapper>
        <Gif src={loadingGif} />
      </GifWrapper>
    );

  return (
    <div style={{ minHeight: '100vh' }}>
      <Provider store={store}>
        <GlobalStyle />
        <Router>
          <ModalProvider backgroundComponent={ModalBackground}>
            <MainModal />
            <Redirect from='/' to='/dashboard' />
            <Navbar />
            <Toolbar />
            <Switch>
              <MainContainer>
                <Route exact path='/dashboard' component={Dashboard} />
                <Route exact path='/calendar' component={Calendar} />
              </MainContainer>
            </Switch>
          </ModalProvider>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
