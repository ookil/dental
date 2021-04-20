import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { ModalProvider } from 'styled-react-modal';
import { MainModal, Navbar } from '../components';
import { ADD_PATIENT } from '../graphql/queries/patient';
import store from '../store/store';

/* jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');

  return {
    ...originalModule,
    useHistory: jest.fn(),
    useRouteMatch: jest.fn(() => {
      return { url: '/dashboard' };
    }),
  };
}); */

/* jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(() => {}),
})); */

const mocks = [
  {
    request: {
      query: ADD_PATIENT,
    },
    result: {
      data: {},
    },
  },
];

describe('<Navbar />', () => {
  const renderNavbar = () => {
    return render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Provider store={store}>
          <ModalProvider>
            <Navbar />
            <MainModal />
          </ModalProvider>
        </Provider>
      </MockedProvider>,
      {
        wrapper: MemoryRouter,
      }
    );
  };

  test('renders Navbar', () => {
    renderNavbar();

    const logo = screen.getByText(/dental/i);
    expect(logo).toBeInTheDocument();
  });

  test('opens new appointment modal from navbar', () => {
    renderNavbar();

    const newAppointementButton = screen.getByTestId('btn-newAppointment');
    expect(newAppointementButton).toBeInTheDocument();

    fireEvent.click(newAppointementButton);

    const modalContent = screen.getByTestId('modal-content');

    expect(modalContent).toBeInTheDocument();

    expect(modalContent).toHaveTextContent(/find patient/i);
    expect(modalContent).toHaveTextContent(/new patient/i);
  });

  test('opens add patient modal from navbar', () => {
    renderNavbar();

    const addPatientButton = screen.getByTestId('btn-addPatient');
    expect(addPatientButton).toBeInTheDocument();

    fireEvent.click(addPatientButton);

    const modalContent = screen.getByTestId('modal-content');

    expect(modalContent).toBeInTheDocument();

    expect(modalContent).toHaveTextContent(/personal information/i);
  });

  test('opens find patient modal from navbar', () => {
    renderNavbar();

    const findPatientButton = screen.getByTestId('btn-findPatient');
    expect(findPatientButton).toBeInTheDocument();

    fireEvent.click(findPatientButton);

    const modalContent = screen.getByTestId('modal-content');

    expect(modalContent).toBeInTheDocument();

    expect(modalContent).toHaveTextContent(/first name/i);
  });
});
