import { InMemoryCache, makeVar, ReactiveVar } from '@apollo/client';

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clinicAppointments: {
          //keyArgs: ['clinicId'],
          merge(_, incoming) {
            return incoming;
          },
        },
      },
    },
    Dentist: {
      fields: {
        nameWithSurname: {
          read: (_, { readField }) => {
            const name = readField('name');
            const surname = readField('surname');

            return `${name} ${surname}`;
          },
        },
      },
    },
    Patient: {
      fields: {
        nameWithSurname: {
          read: (_, { readField }) => {
            const name = readField('name');
            const surname = readField('surname');

            return `${name} ${surname}`;
          },
        },
      },
    },
  },
});

export const clinicIdVar: ReactiveVar<string> = makeVar<string>('');
