import React from 'react';
import { useQuery } from '@apollo/client';
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
import { GET_LOGGED_USER, GET_USER_PROFILE } from './graphql/queries/user';
import { Calendar, Dashboard, Patient, Patients } from './pages';
import store from './store/store';
import loadingGif from './images/loading.gif';
import { GET_CLINIC } from './graphql/queries/clinic';
import { clinicIdVar, userInfoVar } from './cache';
import MainContainer from './pages/MainContainer';
import {
  GetClinic,
  GetClinicVariables,
} from './graphql/queries/__generated__/GetClinic';
import { LoggedUser } from './graphql/queries/__generated__/loggedUser';
import ResponseModal from './components/modals/responseModals/ResponseModal';
import {
  GetUserProfile,
  GetUserProfileVariables,
} from './graphql/queries/__generated__/GetUserProfile';

function App() {
  const { data, loading: userLoading } = useQuery<LoggedUser>(GET_LOGGED_USER);

  clinicIdVar(data?.loggedUser.clinic.id);

  const { loading } = useQuery<GetClinic, GetClinicVariables>(GET_CLINIC, {
    variables: {
      clinicId: data?.loggedUser.clinic.id!,
    },
    skip: data === undefined,
  });

  const { data: userData } = useQuery<GetUserProfile, GetUserProfileVariables>(
    GET_USER_PROFILE,
    {
      variables: {
        userId: data?.loggedUser.id!,
        occupation: data?.loggedUser.occupation!,
      },
      skip: data === undefined,
    }
  );

  if (data && userData) {
    userInfoVar({
      id: data.loggedUser.id,
      occupation: data.loggedUser.occupation!,
      roles: data.loggedUser.roles,
      profile: userData.getUserProfile,
    });
  }

  if (loading || userLoading || data === undefined)
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
            <Redirect from='/' to='/dashboard' />
            <Navbar />
            <Toolbar />
            <Switch>
              <MainContainer>
                <Route exact path='/dashboard' component={Dashboard} />
                <Route exact path='/calendar' component={Calendar} />
                <Route exact path='/patients' component={Patients} />
                <Route exact path='/patient/:patientId' component={Patient} />
              </MainContainer>
            </Switch>
            <MainModal />
            <ResponseModal />
          </ModalProvider>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
