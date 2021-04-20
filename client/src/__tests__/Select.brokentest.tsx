 import React from 'react';
// import { cleanup, render, screen } from '@testing-library/react';
// import Select from '../components/elements/Select';

// const options = [
//   {
//     id: '1',
//     name: 'John',
//     surname: 'Earth',
//     nameWithSurname: 'Adam Sky',
//   },
//   {
//     id: '2',
//     name: 'Adam',
//     surname: 'Sky',
//     nameWithSurname: 'Adam Sky',
//   },
//   {
//     id: '3',
//     name: 'Aang',
//     surname: 'Air',
//     nameWithSurname: 'Aang Air',
//   },
//   {
//     id: '4',
//     name: 'Katara',
//     surname: 'Water',
//     nameWithSurname: 'Katara Water',
//   },
//   {
//     id: '5',
//     name: 'Appa',
//     surname: 'Sky',
//     nameWithSurname: 'Appa Sky',
//   },
// ];

// const defaultProps = {
//   label: 'Patient',
//   placeholder: 'Please choose one',
//   fieldName: 'patientId',
//   readFrom: 'id',
//   displayFrom: 'nameWithSurname',
//   handleSelectChange(key: string, value: string | number) {
//     console.log(key, value);
//   },
//   options,
// };

// afterEach(cleanup);

// describe('<Select />', () => {
//   test('renders custom select', () => {
//     render(<Select {...defaultProps} />);
//     const linkElement = screen.getByText(/patient/i);
//     expect(linkElement).toBeInTheDocument();
//   });

//   // can't test click event
//   test('toggles dropdown onClick', () => {
//     render(<Select {...defaultProps} />);

//     const selectElement = screen.getByText(/Please choose one/i);
//     const dropdownOption = screen.queryByText(/Aang Air/i); // The standard getBy methods throw an error when they can't find an element

//     // check initial state
//     expect(selectElement).toBeInTheDocument();
//     expect(dropdownOption).not.toBeInTheDocument();

//     // toggle click
//     userEvent.click(selectElement);
//   });
// });
