import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import { GET_LOGGED_USER } from '../graphql/queries/user';
import { GET_CLINIC } from '../graphql/queries/clinic';

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

const renderWithRouter = (
  ui: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
  { route = '/dashboard' } = {}
) => {
  window.history.pushState({}, 'Test page', route);

  return render(ui, { wrapper: BrowserRouter });
};

const mocks = [
  {
    request: {
      query: GET_LOGGED_USER,
    },
    result: {
      data: {
        id: '24',
        clinic: { id: '7' },
      },
    },
  },
  {
    request: {
      query: GET_CLINIC,
      variables: {
        clinicId: '7',
      },
      result: {
        data: {
          clinic: {
            id: '7',
            settings: {
              clinicId: '7',
              workOnSaturday: false,
              workOnSunday: false,
              workStartHour: 8,
              workStartMinutes: 0,
              workEndHour: 18,
              workEndMinutes: 0,
              appointmentDuration: 30,
            },
          },
        },
      },
    },
  },
];

describe('<App />', () => {
  test('full app render with "loading" state ', () => {
    renderWithRouter(
      <MockedProvider mocks={mocks} addTypename={false}>
        <App />
      </MockedProvider>
    );

    const loadingGif = screen.getByAltText('loading');

    expect(loadingGif).toBeInTheDocument();
  });

  it('should render full app on dashboard', async () => {
    renderWithRouter(
      <MockedProvider mocks={mocks} addTypename={false}>
        <App />
      </MockedProvider>
    );

    await waitFor(() => {
      const currentPageTitle = screen.getByText(/Clinic Overview/i);
      expect(currentPageTitle).toBeInTheDocument();
    });
  });

  // it('full app render and navigation', async () => {
  //   renderWithRouter(
  //     <MockedProvider mocks={mocks} addTypename={false}>
  //       <App />
  //     </MockedProvider>
  //   );
  //   const currentPageTitle = screen.getByTestId('current-page');
  //   expect(currentPageTitle).toHaveTextContent('Clinic Overview');

  //   await waitFor(() => {
  //     fireEvent.click(screen.getByTestId('btn-calendar'));

  //     /* expect(currentPageTitle).toHaveTextContent('Calendar'); */
  //   });
  // });
});
